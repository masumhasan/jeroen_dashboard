import React, { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string; // tailwind gradient e.g. "from-amber-400 to-yellow-600"
  glowColor: string; // rgba
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  gradient,
  glowColor,
  delay = 0,
}) => {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  const numericValue =
    typeof value === "string" ? parseInt(value.replace(/,/g, ""), 10) : value;
  const displayValue =
    typeof value === "string" && value.includes(",")
      ? count.toLocaleString()
      : count;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    const steps = 60;
    const increment = numericValue / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCount(Math.min(Math.round(increment * step), numericValue));
      if (step >= steps) clearInterval(interval);
    }, 1200 / steps);
    return () => clearInterval(interval);
  }, [visible, numericValue]);

  return (
    <>
      <style>{`
        @keyframes blob-drift {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(5px,-7px) scale(1.07); }
        }
        @keyframes card-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .stat-blob    { animation: blob-drift 5s ease-in-out infinite; }
        .stat-shimmer { background-size: 200% 100%; animation: card-shimmer 2.5s linear infinite; }
      `}</style>

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(24px) scale(0.96)",
          transition: `opacity 0.6s ease ${delay}ms, transform 0.65s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
        }}
        className="relative group cursor-default"
      >
        {/* Gradient border shell */}
        <div
          className={`absolute inset-0 rounded-2xl bg-linear-to-br ${gradient} opacity-40 group-hover:opacity-70 transition-opacity duration-500`}
        />

        {/* Card body */}
        <div
          className="relative rounded-2xl p-5 overflow-hidden m-px"
          style={{ background: "#fff" }}
        >
          {/* Shimmer */}
          <div
            className="stat-shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.05) 50%, transparent 65%)",
            }}
          />

          {/* Glow blob */}
          <div
            className="stat-blob absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-500"
            style={{ background: glowColor }}
          />

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-black">
                {label}
              </p>
              <h3 className="text-[2rem] font-black tracking-tight leading-none tabular-nums text-black">
                {displayValue}
              </h3>
              {/* Progress bar */}
              <div className="mt-3 h-0.5 w-14 rounded-full overflow-hidden bg-white/10">
                <div
                  className={`h-full rounded-full bg-linear-to-r ${gradient}`}
                  style={{
                    width: visible ? "100%" : "0%",
                    transition: `width 1.1s ease ${delay + 500}ms`,
                  }}
                />
              </div>
            </div>

            {/* Icon */}
            <div className="relative">
              <div
                className={`p-3 rounded-xl bg-linear-to-br ${gradient} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                style={{ boxShadow: `0 6px 20px ${glowColor}` }}
              >
                <Icon size={21} className="text-white" />
              </div>
              <span
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                style={{
                  border: `1.5px solid ${glowColor}`,
                  animation: "ping 1.4s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatCard;
