import React, { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChevronDown } from "lucide-react";

interface Props {
  title: string;
  data: { name: string; count: number }[];
  barColor: string;
  barColorEnd: string;
  year: number;
  onYearChange: (y: number) => void;
}

const CustomTooltip = ({ active, payload, label, barColor }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-4 py-3 rounded-xl text-sm font-bold shadow-2xl border"
        style={{
          background: "#fff",
          borderColor: `${barColor}30`,
          color: barColor,
        }}
      >
        <p className="text-[11px] mb-1 font-normal text-black">{label}</p>
        <p>{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const GlowBar = (props: any) => {
  const { x, y, width, height, fill, glowColor } = props;
  return (
    <g>
      <rect
        x={x - 1}
        y={y}
        width={width + 2}
        height={height + 2}
        rx={4}
        fill={glowColor}
        style={{ filter: "blur(5px)", opacity: 0.3 }}
      />
      <rect x={x} y={y} width={width} height={height} rx={4} fill={fill} />
    </g>
  );
};

const BarChartCard: React.FC<Props> = ({
  title,
  data,
  barColor,
  barColorEnd,
  year,
  onYearChange,
}) => {
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const years = Array.from({ length: 10 }, (_, i) => 2024 + i);
  const gradientId = `bar-grad-${title.replace(/\s/g, "")}`;

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
    // Run after paint + again after short delay for animation frames
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
        border: `1px solid ${barColor}20`,
        boxShadow: `0 4px 32px ${barColor}12`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-[1.5px] rounded-b-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${barColor}80, transparent)`,
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: barColor }}
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
                background: `linear-gradient(90deg, ${barColor}, ${barColorEnd})`,
              }}
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setIsYearOpen(!isYearOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all"
              style={{
                background: `${barColor}12`,
                border: `1px solid ${barColor}25`,
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
                style={{ background: "#fff", borderColor: `${barColor}25` }}
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
                      color: y === year ? barColor : "#000",
                      background: y === year ? `${barColor}15` : "transparent",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = `${barColor}10`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        y === year ? `${barColor}15` : "transparent")
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
            <BarChart
              data={data}
              margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={barColor} stopOpacity={1} />
                  <stop
                    offset="100%"
                    stopColor={barColorEnd}
                    stopOpacity={0.5}
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
              <Tooltip
                content={<CustomTooltip barColor={barColor} />}
                cursor={{ fill: `${barColor}08`, radius: 6 } as any}
              />
              <Bar
                dataKey="count"
                fill={`url(#${gradientId})`}
                barSize={16}
                background={{ fill: "transparent", stroke: "none" }}
                shape={(props: any) => (
                  <GlowBar {...props} glowColor={barColor} />
                )}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      activeIndex === index ? barColor : `url(#${gradientId})`
                    }
                    opacity={
                      activeIndex === null || activeIndex === index ? 1 : 0.4
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BarChartCard;
