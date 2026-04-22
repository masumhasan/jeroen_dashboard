import React, { useState, useRef, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

interface Props {
  title: string;
  data: { name: string; count: number }[];
  strokeColor: string;
  gradientFrom: string;
  gradientTo: string;
  year: number;
  onYearChange: (y: number) => void;
}

const CustomTooltip = ({ active, payload, label, strokeColor }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-4 py-3 rounded-xl text-sm font-bold shadow-2xl border"
        style={{
          background: "#fff",
          borderColor: `${strokeColor}30`,
          color: strokeColor,
        }}
      >
        <p className="text-[11px] mb-1 font-normal text-black">{label}</p>
        <p>{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const AreaChartCard: React.FC<Props> = ({
  title,
  data,
  strokeColor,
  gradientFrom,
  gradientTo,
  year,
  onYearChange,
}) => {
  const [isYearOpen, setIsYearOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const years = Array.from({ length: 10 }, (_, i) => 2024 + i);
  const gradientId = `area-grad-${title.replace(/\s/g, "")}`;

  // Directly remove the first <rect> recharts injects into the SVG (the border/bg)
  useEffect(() => {
    const remove = () => {
      const svg = wrapperRef.current?.querySelector(".recharts-surface");
      if (svg) {
        const firstRect = svg.querySelector("rect:first-child");
        if (firstRect) {
          (firstRect as SVGRectElement).setAttribute("fill", "none");
          (firstRect as SVGRectElement).setAttribute("stroke", "none");
          (firstRect as SVGRectElement).style.display = "none";
        }
      }
    };
    const t1 = setTimeout(remove, 0);
    const t2 = setTimeout(remove, 100);
    const t3 = setTimeout(remove, 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [data, year]);

  return (
    <div
      className="relative rounded-2xl overflow-visible"
      style={{
        background: "#fff",
        border: `1px solid ${strokeColor}20`,
        boxShadow: `0 4px 32px ${gradientFrom}12`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-[1.5px] rounded-b-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${strokeColor}80, transparent)`,
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: gradientFrom }}
      />

      <div className="p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 relative z-50">
          <div>
            <h3 className="font-bold text-base tracking-tight text-black">
              {title}
            </h3>
            <div
              className="mt-1 h-0.5 w-8 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${strokeColor}, ${gradientTo})`,
              }}
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setIsYearOpen(!isYearOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all"
              style={{
                background: `${strokeColor}12`,
                border: `1px solid ${strokeColor}25`,
                color: `#000`,
              }}
            >
              {year}
              <ChevronDown
                size={11}
                strokeWidth={3}
                className={`transition-transform duration-200 ${isYearOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isYearOpen && (
              <div
                className="absolute z-50 right-0 top-full mt-2 w-24 rounded-xl shadow-2xl border overflow-hidden"
                style={{
                  background: "#fff",
                  borderColor: `${strokeColor}25`,
                }}
              >
                {years.map((y) => (
                  <div
                    key={y}
                    onClick={() => {
                      onYearChange(y);
                      setIsYearOpen(false);
                    }}
                    className="px-4 py-2 text-xs cursor-pointer transition-all"
                    style={{
                      color: y === year ? strokeColor : "#000",
                      background:
                        y === year ? `${strokeColor}15` : "transparent",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = `${strokeColor}10`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        y === year ? `${strokeColor}15` : "transparent")
                    }
                  >
                    {y}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chart */}
        <div ref={wrapperRef} className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={gradientFrom}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="100%"
                    stopColor={gradientTo}
                    stopOpacity={0.01}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 10,
                  fill: "#000",
                  fontWeight: 600,
                }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 10,
                  fill: "#000",
                  fontWeight: 600,
                }}
              />
              <Tooltip content={<CustomTooltip strokeColor={strokeColor} />} />
              <Area
                type="monotone"
                dataKey="count"
                stroke={strokeColor}
                strokeWidth={2.5}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: strokeColor,
                  stroke: "#18131f",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AreaChartCard;
