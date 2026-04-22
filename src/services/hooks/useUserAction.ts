import { useState } from "react";
import toast from "react-hot-toast";
import type { ManagedUser, UserStatus } from "./useGetUserManagement";

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

  const openConfirm = (user: ManagedUser, action: ActionType) =>
    setConfirmTarget({ user, action });

  const closeConfirm = () => setConfirmTarget(null);

  const handleConfirm = async () => {
    if (!confirmTarget) return;
    setIsActing(true);

    // TODO: replace with real API call
    await new Promise((res) => setTimeout(res, 800));

    const newStatus: UserStatus =
      confirmTarget.action === "block" ? "suspended" : "active";

    updateUserStatus(confirmTarget.user.id, newStatus);

    toast.success(
      confirmTarget.action === "block"
        ? `${confirmTarget.user.name} has been suspended.`
        : `${confirmTarget.user.name} has been unblocked.`,
    );

    setIsActing(false);
    setConfirmTarget(null);
  };

  return { confirmTarget, openConfirm, closeConfirm, handleConfirm, isActing };
};

export default useUserActions;
