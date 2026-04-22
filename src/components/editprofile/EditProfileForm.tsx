import React from "react";
import ProfileInput from "./ProfileInput";

interface EditProfileFormProps {
  userName: string;
  onUserNameChange: (val: string) => void;
  onSave: () => void;
  isLoading: boolean;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  userName,
  onUserNameChange,
  onSave,
  isLoading,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-base font-black text-black tracking-tight">
        Edit Your Profile
      </h3>

      <div className="space-y-5">
        <ProfileInput
          label="User Name"
          value={userName}
          onChange={onUserNameChange}
          placeholder="Enter your name"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={onSave}
        disabled={isLoading}
        className="w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 relative overflow-hidden"
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
              className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
              style={{
                borderColor: "rgba(255,255,255,0.4)",
                borderTopColor: "transparent",
              }}
            />
            Saving...
          </span>
        ) : (
          "Save & Change"
        )}
      </button>
    </div>
  );
};

export default EditProfileForm;
