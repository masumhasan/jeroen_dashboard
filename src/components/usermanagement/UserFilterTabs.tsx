import React from "react";
import type { FilterTab } from "@/services/hooks/useGetUserManagement";

interface UserFilterTabsProps {
  active: FilterTab;
  onChange: (tab: FilterTab) => void;
}

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All Users" },
  { key: "active", label: "Active" },
  { key: "suspended", label: "Suspended" },
];

const UserFilterTabs: React.FC<UserFilterTabsProps> = ({
  active,
  onChange,
}) => {
  return (
    <div
      className="flex items-center gap-1 p-1 rounded-xl"
      style={{
        background: "#fff",
        border: "1px solid rgba(137, 149, 127, 0.12)",
      }}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className="relative px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200"
            style={{
              color: isActive ? "#fff" : "#000",
              background: isActive ? "#89957F" : "transparent",
              boxShadow: isActive
                ? "0 2px 12px rgba(137, 149, 127, 0.4)"
                : "none",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default UserFilterTabs;
