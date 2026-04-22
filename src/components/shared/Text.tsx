interface TextProps {
  text: string;
  color?: string; // optional color, default to white
}

const Text = ({ text, color = "text-white" }: TextProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className={`text-2xl font-bold text-center tracking-tight ${color}`}>
        {text}
      </h2>
      {/* Gold accent underline */}
      <div
        className="h-0.5 w-10 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #C9A367, transparent)",
        }}
      />
    </div>
  );
};

export default Text;
