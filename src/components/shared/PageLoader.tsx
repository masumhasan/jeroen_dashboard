import AppIcon from "@/assets/images/AppIcon.svg";
import ShowSvg from "@/components/shared/ShowSvg";

const PageLoader = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#0F0B18" }}
    >
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(255,255,255,0.5)_50%)] bg-size-[100%_4px]" />

      {/* Ambient glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(137, 149, 127, 0.12) 0%, transparent 70%)",
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      />

      {/* Secondary smaller glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(137, 149, 127, 0.08) 0%, transparent 70%)",
          animation: "pulse-glow 2s ease-in-out infinite reverse",
        }}
      />

      <div className="relative flex flex-col items-center z-10">
        <div className="relative mb-10">
          {/* Outer ping ring */}
          <div
            className="absolute rounded-full animate-ping"
            style={{
              inset: "-16px",
              border: "1px solid rgba(137, 149, 127, 0.15)",
              animationDuration: "2s",
            }}
          />
          {/* Inner static ring */}
          <div
            className="absolute rounded-full"
            style={{
              inset: "-8px",
              border: "1px solid rgba(137, 149, 127, 0.2)",
            }}
          />

          {/* Icon box */}
          <div
            className="relative p-3 rounded-2xl"
            style={{
              background: "rgba(137, 149, 127, 0.08)",
              border: "1px solid rgba(137, 149, 127, 0.2)",
              boxShadow: "0 0 32px rgba(137, 149, 127, 0.2)",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <ShowSvg
              icon={AppIcon}
              width={52}
              height={52}
              alt="ReCallPro Logo"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] uppercase tracking-[0.3em] font-bold"
              style={{
                color: "#89957F",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            >
              System
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Booting
            </span>
          </div>

          {/* Progress bar */}
          <div
            className="w-40 h-0.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #89957F, #a8b49e, transparent)",
                backgroundSize: "200% 100%",
                animation: "loading-sweep 1.8s linear infinite",
              }}
            />
          </div>

          {/* Dots */}
          <div className="flex gap-1.5 mt-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{
                  background: "#89957F",
                  animation: `dot-bounce 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes loading-sweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%            { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
