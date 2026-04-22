import React from "react";

const Shimmer = ({ style }: { style?: React.CSSProperties }) => (
  <>
    <style>{`
      @keyframes cp-shimmer {
        0%   { background-position: -600px 0; }
        100% { background-position: 600px 0; }
      }
      .cp-shimmer {
        background: linear-gradient(
          90deg,
          rgba(137, 149, 127, 0.04) 25%,
          rgba(137, 149, 127, 0.12) 50%,
          rgba(137, 149, 127, 0.04) 75%
        );
        background-size: 600px 100%;
        animation: cp-shimmer 1.8s ease-in-out infinite;
        border-radius: 8px;
      }
    `}</style>
    <div className="cp-shimmer" style={style} />
  </>
);

const LineRow = ({
  width,
  opacity = 1,
}: {
  width: string | number;
  opacity?: number;
}) => <Shimmer style={{ width, height: 13, marginBottom: 10, opacity }} />;

interface ContentPageSkeletonProps {
  title?: string;
}

const ContentPageSkeleton: React.FC<ContentPageSkeletonProps> = () => (
  <div
    className="min-h-screen p-6 flex flex-col gap-5"
    style={{ background: "#ffffff" }}
  >
    {/* Header */}
    <div className="flex flex-col gap-2">
      <Shimmer style={{ width: 200, height: 24 }} />
      <Shimmer style={{ width: 130, height: 11 }} />
    </div>

    {/* Card */}
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "#ffffff",
        border: "1.5px solid #f3f4f6",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Top accent */}
      <div
        className="h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(137, 149, 127, 0.4), transparent)",
        }}
      />

      {/* Title inside card */}
      <div className="px-6 pt-5 pb-3 space-y-2">
        <Shimmer style={{ width: 160, height: 16 }} />
        <Shimmer style={{ width: 32, height: 3, borderRadius: 999 }} />
      </div>

      {/* Toolbar skeleton */}
      <div className="px-6">
        <div
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-t-xl"
          style={{
            background: "#fafafa",
            border: "1.5px solid #f3f4f6",
            borderBottom: "none",
          }}
        >
          {[28, 52, 28, 28, 28, 28, 28, 28, 28, 28, 28].map((w, i) => (
            <Shimmer
              key={i}
              style={{ width: w, height: 26, borderRadius: 6 }}
            />
          ))}
        </div>

        {/* Editor body */}
        <div
          className="px-5 py-5 rounded-b-xl space-y-2 mb-6"
          style={{
            border: "1.5px solid #f3f4f6",
            borderTop: "none",
            minHeight: 340,
            background: "#ffffff",
          }}
        >
          {[
            "95%",
            "88%",
            "100%",
            "72%",
            "0%",
            "95%",
            "80%",
            "100%",
            "65%",
            "90%",
            "0%",
            "85%",
            "100%",
            "78%",
          ].map((w, i) =>
            w === "0%" ? (
              <div key={i} style={{ height: 12 }} />
            ) : (
              <LineRow key={i} width={w} opacity={1 - i * 0.04} />
            ),
          )}
        </div>
      </div>
    </div>

    {/* Save button */}
    <Shimmer style={{ width: "100%", height: 48, borderRadius: 12 }} />
  </div>
);

export default ContentPageSkeleton;
