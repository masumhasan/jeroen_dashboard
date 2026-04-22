import React from "react";

const Shimmer = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <>
    <style>{`
      @keyframes um-shimmer {
        0%   { background-position: -600px 0; }
        100% { background-position: 600px 0; }
      }
      .um-shimmer {
        background: linear-gradient(
          90deg,
          rgba(137, 149, 127, 0.04) 25%,
          rgba(137, 149, 127, 0.12) 50%,
          rgba(137, 149, 127, 0.04) 75%
        );
        background-size: 600px 100%;
        animation: um-shimmer 1.8s ease-in-out infinite;
      }
    `}</style>
    <div className={`um-shimmer rounded-lg ${className ?? ""}`} style={style} />
  </>
);

export const SkeletonUserToolbar: React.FC = () => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
    <Shimmer style={{ width: 240, height: 40, borderRadius: 12 }} />
    <div
      className="flex items-center gap-1 p-1 rounded-xl"
      style={{ background: "#fafafa", border: "1.5px solid #f3f4f6" }}
    >
      {[88, 72, 100].map((w, i) => (
        <Shimmer key={i} style={{ width: w, height: 30, borderRadius: 8 }} />
      ))}
    </div>
  </div>
);

const SkeletonRow: React.FC<{ index: number }> = ({ index }) => (
  <tr style={{ borderBottom: "1px solid #f9fafb", opacity: 1 - index * 0.07 }}>
    <td className="py-3.5 px-4">
      <Shimmer style={{ width: 16, height: 14, borderRadius: 4 }} />
    </td>
    <td className="py-3.5 px-4">
      <div className="flex items-center gap-3">
        <Shimmer
          style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0 }}
        />
        <div className="space-y-1.5">
          <Shimmer style={{ width: 100, height: 13 }} />
          <Shimmer style={{ width: 130, height: 10, borderRadius: 6 }} />
        </div>
      </div>
    </td>
    <td className="py-3.5 px-4">
      <Shimmer style={{ width: 120, height: 13 }} />
    </td>
    <td className="py-3.5 px-4">
      <Shimmer style={{ width: 150, height: 13 }} />
    </td>
    <td className="py-3.5 px-4">
      <Shimmer style={{ width: 80, height: 13 }} />
    </td>
    <td className="py-3.5 px-4">
      <Shimmer style={{ width: 64, height: 22, borderRadius: 999 }} />
    </td>
    <td className="py-3.5 px-4">
      <div className="flex items-center gap-1">
        <Shimmer style={{ width: 32, height: 32, borderRadius: 8 }} />
        <Shimmer style={{ width: 32, height: 32, borderRadius: 8 }} />
      </div>
    </td>
  </tr>
);

export const SkeletonUserTable: React.FC<{ rows?: number }> = ({
  rows = 8,
}) => (
  <div
    className="rounded-2xl overflow-hidden"
    style={{
      background: "#ffffff",
      border: "1.5px solid #f3f4f6",
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    }}
  >
    <div
      className="h-[1.5px]"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(137, 149, 127, 0.4), transparent)",
      }}
    />
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ borderBottom: "1.5px solid #f3f4f6" }}>
            {[48, 220, 140, 170, 100, 90, 100].map((w, i) => (
              <th key={i} className="py-3 px-4" style={{ width: w }}>
                <Shimmer style={{ width: w * 0.5, height: 10 }} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <SkeletonRow key={i} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const SkeletonUserPagination: React.FC = () => (
  <div className="flex items-center gap-1.5 justify-center pt-2 pb-4">
    {[32, 32, 32, 32, 24, 32, 32].map((w, i) => (
      <Shimmer key={i} style={{ width: w, height: 32, borderRadius: 8 }} />
    ))}
  </div>
);

const UserManagementSkeleton: React.FC = () => (
  <div className="min-h-screen p-6 space-y-5" style={{ background: "#ffffff" }}>
    <div className="flex flex-col gap-2">
      <Shimmer style={{ width: 200, height: 24, borderRadius: 8 }} />
      <Shimmer style={{ width: 120, height: 11, borderRadius: 6 }} />
    </div>
    <SkeletonUserToolbar />
    <SkeletonUserTable rows={8} />
    <SkeletonUserPagination />
  </div>
);

export default UserManagementSkeleton;
