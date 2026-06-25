import { useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/config/apiConfig";

const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (email: string): Promise<boolean> => {
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = json?.message || "Failed to send OTP.";
        toast.error(typeof msg === "string" ? msg : "Failed to send OTP.");
        return false;
      }
      toast.success("OTP sent to your email address.");
      return true;
    } catch {
      toast.error("Network error. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleForgotPassword, isLoading };
};

export default useForgotPassword;
