import React from "react";
import { Trash2 } from "lucide-react";
import type { DashboardUserRole } from "@/services/api/usermanagementApi";
import type { ManagedUser } from "@/services/hooks/useGetUserManagement";
import type { ActionType } from "@/services/hooks/useUserAction";
import { canDashboardStaffDeleteUser } from "@/services/hooks/useUserAction";
import UserActionModal from "@/components/shared/UserActionModal";

const ALL_ROLES: DashboardUserRole[] = ["user", "moderator", "admin", "superadmin"];

interface UserManagementTableProps {
  data: ManagedUser[];
  currentPage: number;
  pageSize?: number;
  confirmTarget: { user: ManagedUser; action: ActionType } | null;
  isActing: boolean;
  onAction: (user: ManagedUser, action: ActionType) => void;
  onConfirm: () => void;
  onClose: () => void;
  canManageRoles: boolean;
  viewerRole: DashboardUserRole | null;
  viewerUserId: string | null;
  roleDrafts: Partial<Record<string, DashboardUserRole>>;
  onRoleDraftChange: (userId: string, role: DashboardUserRole) => void;
  onSaveRole: (userId: string) => void;
  savingUserId: string | null;
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
  canManageRoles,
  viewerRole,
  viewerUserId,
  roleDrafts,
  onRoleDraftChange,
  onSaveRole,
  savingUserId,
}) => {
  const roleOptions: DashboardUserRole[] =
    viewerRole === "superadmin"
      ? ALL_ROLES
      : ALL_ROLES.filter((r) => r !== "superadmin");

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
                <Th width="112px">Joined</Th>
                <Th width="220px">User Role</Th>
                <Th width="120px">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-16 text-center text-sm"
                    style={{ color: "#000" }}
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                data.map((user, index) => {
                  const globalIndex = (currentPage - 1) * pageSize + index;
                  const uid = String(user.id);
                  const canDelete = canDashboardStaffDeleteUser(
                    viewerRole,
                    viewerUserId,
                    user,
                  );
                  const effectiveRole =
                    roleDrafts[uid] !== undefined ? roleDrafts[uid]! : user.role;
                  const dirty = effectiveRole !== user.role;

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
                        <span className="text-sm tabular-nums" style={{ color: "#000" }}>
                          {user.joined}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {canManageRoles ? (
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <select
                              className="text-sm rounded-lg border border-gray-200 px-2 py-1.5 bg-white min-w-[160px]"
                              style={{ borderColor: "rgba(137,149,127,0.35)" }}
                              value={effectiveRole}
                              onChange={(e) =>
                                onRoleDraftChange(
                                  uid,
                                  e.target.value as DashboardUserRole
                                )
                              }
                              disabled={savingUserId === uid}
                            >
                              {roleOptions.map((r) => (
                                <option key={r} value={r}>
                                  {r.charAt(0).toUpperCase() + r.slice(1)}
                                </option>
                              ))}
                            </select>
                            {dirty ? (
                              <button
                                type="button"
                                onClick={() => onSaveRole(uid)}
                                disabled={savingUserId === uid}
                                className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white shrink-0 disabled:opacity-50"
                                style={{ background: "#89957F" }}
                              >
                                {savingUserId === uid ? "…" : "Update"}
                              </button>
                            ) : null}
                          </div>
                        ) : (
                          <span className="text-sm capitalize" style={{ color: "#000" }}>
                            {user.role}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => canDelete && onAction(user, "delete")}
                          disabled={!canDelete}
                          title={
                            canDelete
                              ? "Delete user"
                              : "You cannot delete this account"
                          }
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-40 disabled:pointer-events-none disabled:hover:scale-100"
                          style={{
                            background: "rgba(239,68,68,0.08)",
                            border: "1px solid rgba(239,68,68,0.2)",
                          }}
                          onMouseEnter={(e) => {
                            if (!canDelete) return;
                            e.currentTarget.style.background =
                              "rgba(239,68,68,0.18)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              "rgba(239,68,68,0.08)";
                          }}
                        >
                          <Trash2 size={15} style={{ color: "#ef4444" }} />
                        </button>
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
