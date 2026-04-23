import { useState } from "react";
import toast from "react-hot-toast";
import type { ManagedUser, UserStatus } from "./useGetUserManagement";
import { useUpdateUserStatusMutation } from "../api/usermanagementApi";

export type ActionType = "block" | "unblock" | null;

interface UseUserActionsProps {
  updateUserStatus: (id: string | number, status: UserStatus) => void;
}

const useUserActions = ({ updateUserStatus }: UseUserActionsProps) => {
  const [confirmTarget, setConfirmTarget] = useState<{
    user: ManagedUser;
    action: ActionType;
  } | null>(null);
  const [isActing, setIsActing] = useState(false);
  const [updateStatus] = useUpdateUserStatusMutation();

  const openConfirm = (user: ManagedUser, action: ActionType) =>
    setConfirmTarget({ user, action });

  const closeConfirm = () => setConfirmTarget(null);

  const handleConfirm = async () => {
    if (!confirmTarget) return;
    setIsActing(true);
    try {
      const newStatus: UserStatus =
        confirmTarget.action === "block" ? "suspended" : "active";

      await updateStatus({
        userId: String(confirmTarget.user.id),
        status: newStatus,
      }).unwrap();
      updateUserStatus(confirmTarget.user.id, newStatus);

      toast.success(
        confirmTarget.action === "block"
          ? `${confirmTarget.user.name} has been suspended.`
          : `${confirmTarget.user.name} has been unblocked.`,
      );
      setConfirmTarget(null);
    } catch (_error) {
      toast.error("Failed to update user status");
    } finally {
      setIsActing(false);
    }
  };

  return { confirmTarget, openConfirm, closeConfirm, handleConfirm, isActing };
};

export default useUserActions;
