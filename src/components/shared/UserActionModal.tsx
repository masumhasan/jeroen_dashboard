import React from "react";
import { X, Trash2, Loader2 } from "lucide-react";
import type { ActionType } from "@/services/hooks/useUserAction";
import type { ManagedUser } from "@/services/hooks/useGetUserManagement";

interface UserActionModalProps {
  user: ManagedUser;
  action: ActionType;
  isActing: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const UserActionModal: React.FC<UserActionModalProps> = ({
  user,
  action,
  isActing,
  onConfirm,
  onClose,
}) => {
  const isDelete = action === "delete";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm"
        style={{ background: "rgba(0,0,0,0.45)" }}
        onClick={!isActing ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "#fff",
          border: "1px solid rgba(239,68,68,0.2)",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(239,68,68,0.08)",
        }}
      >
        {/* Top accent */}
        <div
          className="h-0.75"
          style={{
            background: "linear-gradient(90deg, #ef4444, #f87171)",
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(239,68,68,0.1)",
              }}
            >
              <Trash2 size={16} style={{ color: "#ef4444" }} />
            </div>
            <span
              className="text-sm font-black tracking-tight"
              style={{ color: "#ef4444" }}
            >
              {isDelete ? "Are you sure !" : "Confirm"}
            </span>
          </div>
          <button
            type="button"
            onClick={!isActing ? onClose : undefined}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: "rgba(0,0,0,0.05)",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <X size={13} style={{ color: "rgba(0,0,0,0.4)" }} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 pb-2 text-center">
          <p className="text-sm" style={{ color: "#374151" }}>
            {isDelete
              ? `Do you want to Delete ${user.name}'s profile ?`
              : "This action cannot be undone."}
          </p>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 pt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isActing}
            className="w-full py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "#fff",
              boxShadow: "0 4px 14px rgba(239,68,68,0.35)",
            }}
          >
            {isActing ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              "Confirm"
            )}
          </button>

          <button
            type="button"
            onClick={!isActing ? onClose : undefined}
            disabled={isActing}
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "rgba(0,0,0,0.04)",
              color: "#6b7280",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
            onMouseEnter={(e) => {
              if (!isActing)
                e.currentTarget.style.background = "rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.04)";
            }}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default UserActionModal;
