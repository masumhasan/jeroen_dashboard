import { useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/config/apiConfig";

const useSetNewPassword = () => {
  const location = useLocation();

  const email = location.state?.email || "";
  const resetToken = String(location.state?.resetToken || "");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSetNewPassword = async (): Promise<boolean> => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return false;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }

    if (!resetToken) {
      toast.error("Session expired. Please start the password reset again.");
      return false;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resetToken, newPassword }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = json?.message || "Failed to reset password.";
        toast.error(typeof msg === "string" ? msg : "Failed to reset password.");
        return false;
      }
      toast.success("Password reset successfully.");
      return true;
    } catch {
      toast.error("Network error. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    resetToken,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    handleSetNewPassword,
  };
};

export default useSetNewPassword;
