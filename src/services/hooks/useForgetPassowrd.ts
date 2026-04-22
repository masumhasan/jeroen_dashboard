import { useState } from "react";
import toast from "react-hot-toast";

const DUMMY_REGISTERED_EMAIL = "admin@robbywork.com";

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
    await new Promise((res) => setTimeout(res, 800));

    if (email === DUMMY_REGISTERED_EMAIL) {
      toast.success("OTP sent to your email address.");
      setIsLoading(false);
      return true;
    } else {
      toast.error("No account found with this email address.");
      setIsLoading(false);
      return false;
    }
  };

  return { handleForgotPassword, isLoading };
};

export default useForgotPassword;
