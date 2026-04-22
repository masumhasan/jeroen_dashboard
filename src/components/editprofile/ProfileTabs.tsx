import React from "react";
import type { ProfileTab } from "@/services/hooks/useGetProfile";

interface ProfileTabsProps {
  active: ProfileTab;
  onChange: (tab: ProfileTab) => void;
}

const TABS: { key: ProfileTab; label: string }[] = [
  { key: "edit", label: "Edit Profile" },
  { key: "password", label: "Change Password" },
];

const ProfileTabs: React.FC<ProfileTabsProps> = ({ active, onChange }) => {
  return (
    <div
      className="flex items-center gap-6 border-b"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className="relative pb-3 text-sm font-semibold transition-colors duration-200"
            style={{
              color: isActive ? "#89957F" : "#000",
            }}
          >
            {tab.label}
            {/* Active underline */}
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300"
              style={{
                background: isActive ? "#89957F" : "transparent",
                transform: isActive ? "scaleX(1)" : "scaleX(0)",
              }}
            />
          </button>
        );
      })}
    </div>
  );
};

export default ProfileTabs;
