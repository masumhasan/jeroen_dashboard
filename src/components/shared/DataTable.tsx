import React from "react";

export interface Column<T> {
  key: string;
  label: string;
  width?: string;
  render: (row: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
  title?: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  emptyMessage?: string;
  isLoading?: boolean;
}

const SkeletonRow = ({ cols }: { cols: number }) => (
  <tr>
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-5 py-4">
        <div
          className="h-4 rounded-lg animate-pulse"
          style={{
            background: "rgba(137, 149, 127, 0.08)",
            width: i === 0 ? "32px" : i === 1 ? "160px" : "80%",
          }}
        />
      </td>
    ))}
  </tr>
);

function DataTable<T>({
  title,
  subtitle,
  columns,
  data,
  keyExtractor,
  emptyMessage = "No data available.",
  isLoading = false,
}: DataTableProps<T>) {
  return (
    <>
      <style>{`
        .datatable-row {
          transition: background 0.18s ease;
        }
        .datatable-row:hover {
          background: rgba(137, 149, 127, 0.05) !important;
        }
        .datatable-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .datatable-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .datatable-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(137, 149, 127, 0.2);
          border-radius: 999px;
        }
        .datatable-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(137, 149, 127, 0.4);
        }
      `}</style>

      <div
        className="w-full rounded-2xl overflow-hidden relative"
        style={{
          background: "#fff",
          border: "1px solid rgba(137, 149, 127, 0.15)",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(137, 149, 127, 0.06)",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-8 right-8 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(137, 149, 127, 0.4), transparent)",
          }}
        />

        {/* Ambient glow */}
        <div
          className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(137, 149, 127, 0.05)" }}
        />

        {/* Header */}
        {(title || subtitle) && (
          <div
            className="px-6 py-5 flex items-center justify-between relative z-10"
            style={{ borderBottom: "1px solid rgba(137, 149, 127, 0.1)" }}
          >
            <div>
              {title && (
                <h2
                  className="text-base font-bold tracking-tight"
                  style={{ color: "#000" }}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs mt-0.5" style={{ color: "#000" }}>
                  {subtitle}
                </p>
              )}
            </div>
            {/* Accent underline */}
            <div
              className="h-0.5 w-8 rounded-full absolute bottom-0 left-6"
              style={{
                background: "linear-gradient(90deg, #89957F, transparent)",
              }}
            />
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto datatable-scrollbar relative z-10">
          <table className="w-full min-w-150 border-collapse">
            <thead>
              <tr
                style={{ borderBottom: "1px solid rgba(137, 149, 127, 0.1)" }}
              >
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-5 py-3.5 text-left"
                    style={{ width: col.width }}
                  >
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: "#000" }}
                    >
                      {col.label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} cols={columns.length} />
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-5 py-16 text-center text-sm"
                    style={{ color: "#000" }}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr
                    key={keyExtractor(row, index)}
                    className="datatable-row"
                    style={{
                      borderBottom:
                        index < data.length - 1
                          ? "1px solid rgba(137, 149, 127, 0.08)"
                          : "none",
                    }}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-5 py-4 text-sm"
                        style={{ color: "#000" }}
                      >
                        {col.render(row, index)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DataTable;
