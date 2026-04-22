import React, { useRef } from "react";
import { Camera } from "lucide-react";
import type { AdminProfile } from "@/services/api/profileApi";

interface ProfileHeaderProps {
  profile: AdminProfile;
  avatarPreview?: string;
  onAvatarChange: (file: File) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  avatarPreview,
  onAvatarChange,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const initials = profile.fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="relative rounded-2xl overflow-hidden p-6 flex items-center gap-5 w-3xl"
      style={{
        background: "#89957F",
        boxShadow: "0 8px 32px rgba(201,163,103,0.35)",
      }}
    >
      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "150px",
        }}
      />

      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center"
          style={{
            border: "3px solid rgba(255,255,255,0.7)",
            background: "rgba(255,255,255,0.2)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt={profile.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-black" style={{ color: "#fff" }}>
              {initials}
            </span>
          )}
        </div>

        {/* Camera button */}
        <button
          onClick={() => fileRef.current?.click()}
          className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
          style={{
            background: "#0F0B18",
            border: "2px solid rgba(201,163,103,0.6)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          <Camera size={12} style={{ color: "#C9A367" }} />
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onAvatarChange(file);
          }}
        />
      </div>

      {/* Name & Role */}
      <div>
        <h2
          className="text-2xl font-black tracking-tight"
          style={{
            color: "#fff",
            textShadow: "0 1px 2px rgba(255,255,255,0.2)",
          }}
        >
          {profile.fullName}
        </h2>
        <p className="text-sm font-semibold mt-0.5">Admin</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
