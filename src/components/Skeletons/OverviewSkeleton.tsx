import React from "react";

export const SkeletonStatCard: React.FC = () => (
  <div
    className="rounded-2xl p-5 animate-pulse"
    style={{
      background: "#ffffff",
      border: "1.5px solid #f3f4f6",
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    }}
  >
    <div className="flex justify-between items-start">
      <div className="space-y-3 flex-1">
        <div
          className="h-2.5 w-20 rounded-full"
          style={{ background: "rgba(137, 149, 127, 0.1)" }}
        />
        <div
          className="h-8 w-24 rounded-xl"
          style={{ background: "rgba(137, 149, 127, 0.08)" }}
        />
        <div
          className="h-1.5 w-14 rounded-full"
          style={{ background: "rgba(137, 149, 127, 0.06)" }}
        />
      </div>
      <div
        className="w-12 h-12 rounded-xl"
        style={{ background: "rgba(137, 149, 127, 0.08)" }}
      />
    </div>
  </div>
);

export const SkeletonChartCard: React.FC = () => (
  <div
    className="rounded-2xl p-6 animate-pulse"
    style={{
      background: "#ffffff",
      border: "1.5px solid #f3f4f6",
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    }}
  >
    <div className="flex justify-between items-center mb-6">
      <div className="space-y-2">
        <div
          className="h-4 w-36 rounded-full"
          style={{ background: "rgba(137, 149, 127, 0.1)" }}
        />
        <div
          className="h-1.5 w-8 rounded-full"
          style={{ background: "rgba(137, 149, 127, 0.07)" }}
        />
      </div>
      <div
        className="h-7 w-16 rounded-lg"
        style={{ background: "rgba(137, 149, 127, 0.08)" }}
      />
    </div>

    <div className="flex items-end gap-2 h-48 px-2">
      {[65, 40, 75, 55, 85, 45, 70, 60, 80, 50, 90, 68].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-md"
          style={{
            height: `${h}%`,
            background: `rgba(137, 149, 127, ${0.06 + (h / 100) * 0.1})`,
          }}
        />
      ))}
    </div>

    <div className="flex gap-2 mt-3 px-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-2 rounded-full"
          style={{ background: "rgba(137, 149, 127, 0.06)" }}
        />
      ))}
    </div>
  </div>
);

export const SkeletonTable: React.FC = () => (
  <div
    className="rounded-2xl overflow-hidden animate-pulse"
    style={{
      background: "#ffffff",
      border: "1.5px solid #f3f4f6",
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    }}
  >
    <div className="px-6 py-5" style={{ borderBottom: "1.5px solid #f3f4f6" }}>
      <div
        className="h-4 w-32 rounded-full"
        style={{ background: "rgba(137, 149, 127, 0.1)" }}
      />
      <div
        className="h-3 w-48 rounded-full mt-2"
        style={{ background: "rgba(137, 149, 127, 0.07)" }}
      />
    </div>

    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-6 px-6 py-4"
        style={{ borderBottom: i < 4 ? "1.5px solid #f9fafb" : "none" }}
      >
        <div
          className="h-3 w-5 rounded-full shrink-0"
          style={{ background: "rgba(137, 149, 127, 0.07)" }}
        />
        <div
          className="h-3 w-32 rounded-full shrink-0"
          style={{ background: "rgba(137, 149, 127, 0.07)" }}
        />
        <div
          className="h-3 w-28 rounded-full shrink-0"
          style={{ background: "rgba(137, 149, 127, 0.07)" }}
        />
        <div
          className="h-6 w-16 rounded-full shrink-0"
          style={{ background: "rgba(137, 149, 127, 0.09)" }}
        />
      </div>
    ))}
  </div>
);
