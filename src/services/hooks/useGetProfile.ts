import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TOKEN_KEY = "access_token_recall_pro_dashboard";

export type ProfileTab = "edit" | "password";

const DUMMY_PROFILE = {
  _id: "dummy_admin_001",
  fullName: "John Anderson",
  email: "john.anderson@example.com",
  profilePicture: "",
};

export function useGetProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProfileTab>("edit");

  const [userName, setUserName] = useState(DUMMY_PROFILE.fullName);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    DUMMY_PROFILE.profilePicture || undefined,
  );

  const handleAvatarChange = (file: File) => {
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    if (!userName.trim()) {
      toast.error("User name cannot be empty.");
      return;
    }
    toast.success("Profile updated successfully.");
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    localStorage.removeItem(TOKEN_KEY);
    toast.success("Password changed. Please sign in again.");
    navigate("/dashboard/login");
  };

  return {
    isLoading: false,
    isSaving: false,
    profile: DUMMY_PROFILE,
    activeTab,
    setActiveTab,
    userName,
    setUserName,
    avatarPreview,
    handleAvatarChange,
    handleSaveProfile,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
  };
}
