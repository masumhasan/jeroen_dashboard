import React from "react";
import { ShieldOff, ShieldCheck } from "lucide-react";
import type { ManagedUser } from "@/services/hooks/useGetUserManagement";
import type { ActionType } from "@/services/hooks/useUserAction";
import UserActionModal from "@/components/shared/UserActionModal";

interface UserManagementTableProps {
  data: ManagedUser[];
  currentPage: number;
  pageSize?: number;
  confirmTarget: { user: ManagedUser; action: ActionType } | null;
  isActing: boolean;
  onAction: (user: ManagedUser, action: ActionType) => void;
  onConfirm: () => void;
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
        className="w-9 h-9 rounded-full object-cover shrink-0"
        style={{ border: "1px solid rgba(137, 149, 127, 0.2)" }}
      />
    );
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
      style={{
        background:
          "linear-gradient(135deg, rgba(137, 149, 127, 0.2), rgba(137, 149, 127, 0.08))",
        border: "1px solid rgba(137, 149, 127, 0.25)",
        color: "#000",
      }}
    >
      {initials}
    </div>
  );
};

const Th = ({
  children,
  width,
}: {
  children: React.ReactNode;
  width?: string;
}) => (
  <th
    className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-[0.15em] whitespace-nowrap"
    style={{ color: "#000", width }}
  >
    {children}
  </th>
);

const UserManagementTable: React.FC<UserManagementTableProps> = ({
  data,
  currentPage,
  pageSize = 10,
  confirmTarget,
  isActing,
  onAction,
  onConfirm,
  onClose,
}) => {
  return (
    <>
      {confirmTarget && (
        <UserActionModal
          user={confirmTarget.user}
          action={confirmTarget.action}
          isActing={isActing}
          onConfirm={onConfirm}
          onClose={onClose}
        />
      )}

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#fff",
          border: "1px solid rgba(137, 149, 127, 0.1)",
        }}
      >
        <div
          className="h-[1.5px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(137, 149, 127, 0.5), transparent)",
          }}
        />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr
                style={{ borderBottom: "1px solid rgba(137, 149, 127, 0.08)" }}
              >
                <Th width="48px">#</Th>
                <Th width="220px">User</Th>
                <Th>Phone Number</Th>
                <Th>Joined</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-16 text-center text-sm"
                    style={{ color: "#000" }}
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                data.map((user, index) => {
                  const globalIndex = (currentPage - 1) * pageSize + index;
                  const isSuspended = user.status === "suspended";

                  return (
                    <tr
                      key={user.id}
                      className="transition-colors duration-150"
                      style={{
                        borderBottom: "1px solid rgba(137, 149, 127, 0.06)",
                      }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLTableRowElement
                        ).style.background = "rgba(137, 149, 127, 0.05)";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLTableRowElement
                        ).style.background = "transparent";
                      }}
                    >
                      <td className="py-3.5 px-4">
                        <span
                          className="text-xs font-medium"
                          style={{ color: "#000" }}
                        >
                          {globalIndex + 1}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={user.name} src={user.avatar} />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-black truncate">
                              {user.name}
                            </p>
                            <p
                              className="text-[11px] truncate"
                              style={{ color: "#555" }}
                            >
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-sm" style={{ color: "#000" }}>
                          {user.phone}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-sm" style={{ color: "#000" }}>
                          {user.joined}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {isSuspended ? (
                          <button
                            onClick={() => onAction(user, "unblock")}
                            title="Unblock user"
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                            style={{
                              background: "rgba(16,185,129,0.08)",
                              border: "1px solid rgba(16,185,129,0.2)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(16,185,129,0.18)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "rgba(16,185,129,0.08)";
                            }}
                          >
                            <ShieldCheck
                              size={15}
                              style={{ color: "#10b981" }}
                            />
                          </button>
                        ) : (
                          <button
                            onClick={() => onAction(user, "block")}
                            title="Suspend user"
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                            style={{
                              background: "rgba(239,68,68,0.08)",
                              border: "1px solid rgba(239,68,68,0.2)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(239,68,68,0.18)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "rgba(239,68,68,0.08)";
                            }}
                          >
                            <ShieldOff size={15} style={{ color: "#ef4444" }} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserManagementTable;
