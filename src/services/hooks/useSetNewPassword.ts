import { useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const useSetNewPassword = () => {
  const location = useLocation();

  const email = location.state?.email || "";
  const verificationCode = String(location.state?.verificationCode || "");

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

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    toast.success("Password reset successfully.");
    setIsLoading(false);
    return true;
  };

  return {
    email,
    verificationCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    handleSetNewPassword,
  };
};

export default useSetNewPassword;
