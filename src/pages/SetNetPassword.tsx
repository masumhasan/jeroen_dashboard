import { useNavigate } from "react-router-dom";
import AuthCard from "@/components/shared/AuthCard";
import Inputbox from "@/components/shared/Inputbox";
import Button from "@/components/shared/Button";
import useSetNewPassword from "@/services/hooks/useSetNewPassword";

const SetNewPasswordPage = () => {
  const navigate = useNavigate();
  const {
    email,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    handleSetNewPassword,
  } = useSetNewPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await handleSetNewPassword();
    if (success) navigate("/dashboard/login");
  };

  return (
    <AuthCard
      title="Set New Password"
      subtitle={
        <>
          Create a new password for{" "}
          <span style={{ color: "#89957F" }} className="font-semibold">
            {email || "your account"}
          </span>
        </>
      }
      footer={
        <button
          onClick={() => navigate("/dashboard/verify-otp")}
          className="w-full text-center text-xs mt-6 transition-colors block"
          style={{ color: "#89957F" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#89957F")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#89957F")}
        >
          ← Back
        </button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Inputbox
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Inputbox
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="pt-2">
          <Button
            buttonText="Update Password"
            loading={isLoading}
            disabled={isLoading}
            bgColor="bg-[#89957F]"
          />
        </div>
      </form>
    </AuthCard>
  );
};

export default SetNewPasswordPage;
