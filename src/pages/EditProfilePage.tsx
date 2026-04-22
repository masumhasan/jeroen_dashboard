import ProfileHeader from "@/components/editprofile/ProfileHeader";
import ProfileTabs from "@/components/editprofile/ProfileTabs";
import EditProfileForm from "@/components/editprofile/EditProfileForm";
import ChangePasswordForm from "@/components/editprofile/ChangePasswordForm";
import { useGetProfile } from "@/services/hooks/useGetProfile";

export default function EditProfilePage() {
  const {
    isSaving,
    profile,
    activeTab,
    setActiveTab,
    userName,
    setUserName,
    avatarPreview,
    handleAvatarChange,
    handleSaveProfile,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
  } = useGetProfile();

  return (
    <div
      className="min-h-screen p-6 flex flex-col gap-5 justify-center items-center"
      style={{ background: "#fff" }}
    >
      {/* ─── Banner ───────────────────────────────────────────── */}
      {profile && (
        <ProfileHeader
          profile={profile}
          avatarPreview={avatarPreview}
          onAvatarChange={handleAvatarChange}
        />
      )}

      {/* ─── Card ────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-6 space-y-6 max-w-lg w-full mx-auto"
        style={{
          background: "#fff",
          border: "1px solid rgba(137, 149, 127, 0.1)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-8 right-8 h-[1.5px] rounded-b-full pointer-events-none" />

        {/* Tabs */}
        <ProfileTabs active={activeTab} onChange={setActiveTab} />

        {/* Form */}
        {activeTab === "edit" ? (
          <EditProfileForm
            userName={userName}
            onUserNameChange={setUserName}
            onSave={handleSaveProfile}
            isLoading={isSaving}
          />
        ) : (
          <ChangePasswordForm
            currentPassword={currentPassword}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            onCurrentPasswordChange={setCurrentPassword}
            onNewPasswordChange={setNewPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onSave={handleChangePassword}
            isLoading={isSaving}
          />
        )}
      </div>
    </div>
  );
}
