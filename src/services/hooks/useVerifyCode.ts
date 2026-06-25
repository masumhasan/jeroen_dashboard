import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/config/apiConfig";

const useVerifyCode = () => {
  const location = useLocation();
  const email = location.state?.email || "";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(data)) return;
    const newCode = [...code];
    data.split("").forEach((char, index) => {
      newCode[index] = char;
    });
    setCode(newCode);
    const nextIndex = data.length < 6 ? data.length : 5;
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (): Promise<{
    success: boolean;
    resetToken?: string;
  }> => {
    const codeString = code.join("");
    if (codeString.length !== 6 || code.some((d) => d === "")) {
      toast.error("Please enter all 6 digits.");
      return { success: false };
    }

    setIsVerifying(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: codeString }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = json?.message || "Invalid OTP. Please try again.";
        toast.error(typeof msg === "string" ? msg : "Invalid OTP.");
        return { success: false };
      }
      toast.success("OTP verified successfully.");
      const resetToken = json?.data?.resetToken || "";
      return { success: true, resetToken };
    } catch {
      toast.error("Network error. Please try again.");
      return { success: false };
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email not found. Please go back and try again.");
      return;
    }

    setIsResending(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = json?.message || "Failed to resend OTP.";
        toast.error(typeof msg === "string" ? msg : "Failed to resend OTP.");
        return;
      }
      toast.success(`New OTP sent to ${email}.`);
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return {
    email,
    code,
    inputRefs,
    isVerifying,
    isResending,
    handleInputChange,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    handleResend,
  };
};

export default useVerifyCode;
