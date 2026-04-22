import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const UserPagination: React.FC<UserPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const pages = getPages();
  const btnBase = { minWidth: "32px", height: "32px" };

  return (
    <div className="flex items-center gap-1.5 justify-center">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center px-2 rounded-lg text-xs font-semibold transition-all duration-200"
        style={{
          ...btnBase,
          background: "#000",
          border: "1px solid rgba(137, 149, 127, 0.12)",
          color: "#fff",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        <ChevronLeft size={14} />
      </button>

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="flex items-center justify-center text-xs"
            style={{ ...btnBase, color: "#000" }}
          >
            ···
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className="flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-200"
            style={{
              ...btnBase,
              background:
                currentPage === page ? "#89957F" : "rgba(137, 149, 127, 0.06)",
              border:
                currentPage === page
                  ? "none"
                  : "1px solid rgba(137, 149, 127, 0.1)",
              color: currentPage === page ? "#fff" : "#000",
              boxShadow:
                currentPage === page
                  ? "0 2px 12px rgba(137, 149, 127, 0.35)"
                  : "none",
            }}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-2 rounded-lg text-xs font-semibold transition-all duration-200"
        style={{
          ...btnBase,
          background: "#000",
          border: "1px solid rgba(137, 149, 127, 0.12)",
          color: "#fff",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default UserPagination;
