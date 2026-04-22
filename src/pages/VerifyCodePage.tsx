import { useNavigate } from "react-router-dom";
import AuthCard from "@/components/shared/AuthCard";
import Button from "@/components/shared/Button";
import useVerifyCode from "@/services/hooks/useVerifyCode";

const VerifyCodePage = () => {
  const navigate = useNavigate();
  const {
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
  } = useVerifyCode();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ← must be called BEFORE any await
    const result = await handleSubmit();
    if (result.success) {
      navigate("/dashboard/set-newpassword", {
        state: { email, verificationCode: result.otpAsNumber },
      });
    }
  };

  return (
    <AuthCard
      title="Verification Code"
      subtitle={
        <>
          We sent a 6-digit code to{" "}
          <span style={{ color: "#89957F" }} className="font-semibold">
            {email || "your email"}
          </span>
        </>
      }
      footer={
        <>
          <p className="text-center text-xs mt-6" style={{ color: "#000" }}>
            Didn't receive the email?{" "}
            <button
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold transition-colors disabled:cursor-not-allowed"
              style={{
                color: isResending ? "#89957F" : "#89957F",
              }}
              onMouseEnter={(e) => {
                if (!isResending) e.currentTarget.style.color = "#89957F";
              }}
              onMouseLeave={(e) => {
                if (!isResending) e.currentTarget.style.color = "#89957F";
              }}
            >
              {isResending ? "Sending..." : "Resend"}
            </button>
          </p>
          <button
            onClick={() => navigate("/dashboard/forget-password")}
            className="w-full text-center text-xs mt-4 transition-colors block"
            style={{ color: "#89957F" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#89957F")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#89957F")}
          >
            ← Back
          </button>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex justify-center gap-2 sm:gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              maxLength={1}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="w-11 h-12 sm:w-13 sm:h-14 text-center text-lg font-bold
                text-black rounded-xl outline-none transition-all duration-200 caret-transparent"
              style={{
                background: digit ? "#fff" : "#fff",
                border: digit ? "1px solid #89957F" : "1px solid #000",
                boxShadow: digit ? "0 0 12px rgba(201,163,103,0.2)" : "none",
                color: digit ? "#89957F" : "black",
              }}
              onFocus={(e) => {
                e.currentTarget.style.border = "1px solid #000";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(201,163,103,0.12)";
              }}
              onBlur={(e) => {
                if (!digit) {
                  e.currentTarget.style.border = "1px solid #000";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            />
          ))}
        </div>

        <div className="pt-2">
          <Button
            buttonText="Verify Code"
            loading={isVerifying}
            disabled={isVerifying}
            bgColor="bg-[#89957F]"
          />
        </div>
      </form>
    </AuthCard>
  );
};

export default VerifyCodePage;
