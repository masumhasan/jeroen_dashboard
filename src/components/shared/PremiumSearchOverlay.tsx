import React, { useEffect } from "react";
import { X, Search, Loader2, Users } from "lucide-react";
import type { ManagedUser } from "@/services/hooks/useGetUserManagement";

interface PremiumSearchOverlayProps {
  search: string;
  users: ManagedUser[];
  totalResults: number;
  isLoading: boolean;
  onClose: () => void;
}

const Avatar = ({ name, src }: { name: string; src?: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  if (src)
    return (
      <img
        src={src}
        alt={name}
        className="w-10 h-10 rounded-full object-cover shrink-0"
        style={{ border: "1px solid rgba(137, 149, 127, 0.25)" }}
      />
    );
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
      style={{
        background:
          "linear-gradient(135deg, rgba(137, 149, 127, 0.2), rgba(137, 149, 127, 0.08))",
        border: "1px solid rgba(137, 149, 127, 0.25)",
        color: "#89957F",
      }}
    >
      {initials}
    </div>
  );
};

const PremiumSearchOverlay: React.FC<PremiumSearchOverlayProps> = ({
  search,
  users,
  totalResults,
  isLoading,
  onClose,
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm"
        style={{ background: "rgba(9,6,15,0.75)" }}
        onClick={onClose}
      />

      <div
        className="fixed top-[12%] left-1/2 -translate-x-1/2 z-50 w-full max-w-xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "",
          border: "1px solid rgba(137, 149, 127, 0.15)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="h-[1.5px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(137, 149, 127, 0.6), transparent)",
          }}
        />

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
        >
          <div className="flex items-center gap-2.5">
            <Search size={14} style={{ color: "rgba(137, 149, 127, 0.6)" }} />
            <span className="text-sm font-semibold text-white">
              Results for <span style={{ color: "#89957F" }}>"{search}"</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {!isLoading && (
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-md"
                style={{
                  background: "rgba(137, 149, 127, 0.1)",
                  color: "rgba(137, 149, 127, 0.7)",
                  border: "1px solid rgba(137, 149, 127, 0.15)",
                }}
              >
                {totalResults} found
              </span>
            )}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:scale-110 transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <X size={13} style={{ color: "rgba(255,255,255,0.5)" }} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          className="max-h-105 overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(137, 149, 127, 0.2) transparent",
          }}
        >
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2
                size={22}
                className="animate-spin"
                style={{ color: "#89957F" }}
              />
              <p
                className="text-xs font-medium"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Searching...
              </p>
            </div>
          )}

          {!isLoading && users.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(137, 149, 127, 0.08)",
                  border: "1px solid rgba(137, 149, 127, 0.12)",
                }}
              >
                <Users
                  size={20}
                  style={{ color: "rgba(137, 149, 127, 0.4)" }}
                />
              </div>
              <p
                className="text-sm font-semibold"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                No users found
              </p>
              <p
                className="text-[11px]"
                style={{ color: "rgba(255,255,255,0.15)" }}
              >
                Try a different name
              </p>
            </div>
          )}

          {!isLoading &&
            users.map((user, i) => (
              <div
                key={user.id}
                className="flex items-center gap-4 px-5 py-3.5 transition-all duration-150 cursor-default"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(137, 149, 127, 0.06)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <span
                  className="text-xs font-medium w-5 text-center shrink-0"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  {i + 1}
                </span>

                <Avatar name={user.name} src={user.avatar} />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user.name}
                  </p>
                  <p
                    className="text-[11px] truncate"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {user.email}
                  </p>
                </div>

                <div className="hidden sm:block text-right shrink-0">
                  <p
                    className="text-[11px]"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {user.phone}
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    Joined {user.joined}
                  </p>
                </div>

                <span
                  className="flex items-center gap-1.5 text-[11px] font-semibold capitalize shrink-0"
                  style={{
                    color:
                      user.status === "active"
                        ? "#10b981"
                        : "rgba(255,255,255,0.3)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{
                      background:
                        user.status === "active"
                          ? "#10b981"
                          : "rgba(255,255,255,0.2)",
                    }}
                  />
                  {user.status}
                </span>
              </div>
            ))}
        </div>

        {/* Footer */}
        {!isLoading && users.length > 0 && (
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
          >
            <p
              className="text-[11px]"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Press{" "}
              <kbd
                className="px-1.5 py-0.5 rounded text-[10px] font-bold mx-1"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                ESC
              </kbd>{" "}
              to close
            </p>
            <p
              className="text-[11px] font-semibold"
              style={{ color: "rgba(137, 149, 127, 0.5)" }}
            >
              {totalResults} result{totalResults !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PremiumSearchOverlay;
