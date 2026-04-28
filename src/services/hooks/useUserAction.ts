import { useState } from "react";
import toast from "react-hot-toast";
import type { ManagedUser } from "./useGetUserManagement";
import type { DashboardUserRole } from "../api/usermanagementApi";
import { useDeleteUserMutation } from "../api/usermanagementApi";

export type ActionType = "delete" | null;

/** Matches backend rules: moderators → user role only; admins → not superadmin; no self-delete. */
export function canDashboardStaffDeleteUser(
  viewerRole: DashboardUserRole | null,
  viewerUserId: string | null,
  target: ManagedUser,
): boolean {
  if (!viewerRole || !viewerUserId) return false;
  if (String(target.id) === String(viewerUserId)) return false;
  if (viewerRole === "superadmin") return true;
  if (viewerRole === "admin") return target.role !== "superadmin";
  if (viewerRole === "moderator") return target.role === "user";
  return false;
}

interface UseUserActionsProps {
  onDeleted: () => void;
}

const useUserActions = ({ onDeleted }: UseUserActionsProps) => {
  const [confirmTarget, setConfirmTarget] = useState<{
    user: ManagedUser;
    action: ActionType;
  } | null>(null);
  const [isActing, setIsActing] = useState(false);
  const [deleteUser] = useDeleteUserMutation();

  const openConfirm = (user: ManagedUser, action: ActionType) =>
    setConfirmTarget({ user, action });

  const closeConfirm = () => setConfirmTarget(null);

  const handleConfirm = async () => {
    if (!confirmTarget || confirmTarget.action !== "delete") return;
    setIsActing(true);
    try {
      await deleteUser({
        userId: String(confirmTarget.user.id),
      }).unwrap();
      onDeleted();
      toast.success(`${confirmTarget.user.name} has been deleted.`);
      setConfirmTarget(null);
    } catch (_error) {
      toast.error("Failed to delete user");
    } finally {
      setIsActing(false);
    }
  };

  return { confirmTarget, openConfirm, closeConfirm, handleConfirm, isActing };
};

export default useUserActions;
