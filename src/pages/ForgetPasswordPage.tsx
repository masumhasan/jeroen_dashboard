import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "@/components/shared/AuthCard";
import Inputbox from "@/components/shared/Inputbox";
import Button from "@/components/shared/Button";
import useForgotPassword from "@/services/hooks/useForgetPassowrd";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { handleForgotPassword, isLoading } = useForgotPassword();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleForgotPassword(email);
    if (success) {
      navigate("/dashboard/verify-otp", { state: { email } });
    }
  };

  return (
    <AuthCard
      title="Forgot Password?"
      subtitle="Enter your email and we'll send you a verification code."
      footer={
        <button
          onClick={() => navigate("/dashboard/login")}
          className="w-full text-center text-xs mt-6 transition-colors block"
          style={{ color: "#89957F" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#89957F")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#89957F")}
        >
          ← Back to Sign In
        </button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Inputbox
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="pt-2">
          <Button
            buttonText="Send Code"
            loading={isLoading}
            disabled={isLoading}
            bgColor="bg-[#89957F]"
          />
        </div>
      </form>
    </AuthCard>
  );
};

export default ForgotPasswordPage;
