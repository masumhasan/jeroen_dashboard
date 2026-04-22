import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const DUMMY_OTP = "123456";

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
    otpAsNumber?: number;
  }> => {
    const codeString = code.join("");
    if (codeString.length !== 6 || code.some((d) => d === "")) {
      toast.error("Please enter all 6 digits.");
      return { success: false };
    }

    setIsVerifying(true);
    await new Promise((res) => setTimeout(res, 800));

    if (codeString === DUMMY_OTP) {
      toast.success("OTP verified successfully.");
      setIsVerifying(false);
      return { success: true, otpAsNumber: Number(codeString) };
    } else {
      toast.error("Invalid OTP. Please try again.");
      setIsVerifying(false);
      return { success: false };
    }
  };

  const handleResend = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email not found. Please go back and try again.");
      return;
    }

    setIsResending(true);
    await new Promise((res) => setTimeout(res, 800));
    toast.success(`OTP resent to ${email}. Use code: ${DUMMY_OTP}`);
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    setIsResending(false);
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
