import React from "react";
import ProfileInput from "./ProfileInput";

interface ChangePasswordFormProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  onCurrentPasswordChange: (val: string) => void;
  onNewPasswordChange: (val: string) => void;
  onConfirmPasswordChange: (val: string) => void;
  onSave: () => void;
  isLoading: boolean;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  currentPassword,
  newPassword,
  confirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSave,
  isLoading,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-base font-black text-white tracking-tight">
        Change Password
      </h3>

      <div className="space-y-5">
        <ProfileInput
          label="Current Password"
          value={currentPassword}
          onChange={onCurrentPasswordChange}
          type="password"
          placeholder="Enter current password"
        />
        <ProfileInput
          label="New Password"
          value={newPassword}
          onChange={onNewPasswordChange}
          type="password"
          placeholder="Enter new password"
        />
        <ProfileInput
          label="Confirm New Password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          type="password"
          placeholder="Re-enter new password"
        />
      </div>

      {/* Password strength hint */}
      {newPassword.length > 0 && (
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((level) => {
            const strength =
              newPassword.length < 6
                ? 1
                : newPassword.length < 8
                  ? 2
                  : /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)
                    ? 4
                    : 3;
            const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
            return (
              <div
                key={level}
                className="h-1 flex-1 rounded-full transition-all duration-300"
                style={{
                  background:
                    level <= strength
                      ? colors[strength - 1]
                      : "rgba(255,255,255,0.08)",
                }}
              />
            );
          })}
          <span
            className="text-[10px] font-bold uppercase tracking-wider ml-1 whitespace-nowrap"
            style={{
              color:
                newPassword.length < 6
                  ? "#ef4444"
                  : newPassword.length < 8
                    ? "#f97316"
                    : /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)
                      ? "#22c55e"
                      : "#eab308",
            }}
          >
            {newPassword.length < 6
              ? "Weak"
              : newPassword.length < 8
                ? "Fair"
                : /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)
                  ? "Strong"
                  : "Good"}
          </span>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={onSave}
        disabled={isLoading}
        className="w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200"
        style={{
          background: isLoading ? "rgba(201,163,103,0.4)" : "#89957F",
          color: isLoading ? "rgba(255,255,255,0.5)" : "#fff",
          boxShadow: isLoading ? "none" : "0 4px 20px rgba(201,163,103,0.35)",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span
              className="w-4 h-4 rounded-full border-2 animate-spin"
              style={{
                borderColor: "rgba(255,255,255,0.4)",
                borderTopColor: "transparent",
              }}
            />
            Updating...
          </span>
        ) : (
          "Update Password"
        )}
      </button>
    </div>
  );
};

export default ChangePasswordForm;
