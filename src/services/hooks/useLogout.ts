import { useState } from "react";
import toast from "react-hot-toast";

const TOKEN_KEY = "access_token_recall_pro_dashboard";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      localStorage.removeItem(TOKEN_KEY);
      toast.success("Logged out successfully!");
      return true;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Logout failed. Please try again.";
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogout, isLoading };
};

export default useLogout;
