interface ButtonProps {
  buttonText: string;
  handleSubmit?: () => void;
  loading?: boolean;
  disabled?: boolean;
  bgColor?: string;
}

const Button = ({
  buttonText,
  handleSubmit,
  loading,
  disabled,
  bgColor = "bg-white",
}: ButtonProps) => {
  const isGold = bgColor === "bg-[#89957F]";

  return (
    <div className="flex items-center justify-center">
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading || disabled}
        className="w-full py-3 text-sm font-bold tracking-wide rounded-xl
          transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
          flex items-center justify-center gap-2 relative overflow-hidden"
        style={
          isGold
            ? {
                background:
                  "linear-gradient(135deg, #89957F 0%, #89957F 50%, #89957F 100%)",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(201,163,103,0.35)",
              }
            : {
                background: "white",
                color: "#18181b",
              }
        }
        onMouseEnter={(e) => {
          if (!loading && !disabled && isGold) {
            e.currentTarget.style.boxShadow =
              "0 6px 28px rgba(201,163,103,0.55)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          if (isGold) {
            e.currentTarget.style.boxShadow =
              "0 4px 20px rgba(201,163,103,0.35)";
            e.currentTarget.style.transform = "translateY(0)";
          }
        }}
      >
        {/* Shimmer sweep */}
        {isGold && (
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)",
              backgroundSize: "200% 100%",
              animation: "btn-shimmer 2.5s linear infinite",
            }}
          />
        )}

        <span className="relative z-10">
          {loading ? (
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              style={{ color: isGold ? "#1a0f00" : "#18181b" }}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            buttonText
          )}
        </span>
      </button>

      <style>{`
        @keyframes btn-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </div>
  );
};

export default Button;
