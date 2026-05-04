import React from "react";

interface Props {
  active: string;
  onChange: (val: string) => void;
}

const statuses = ["All", "Pending", "Approved", "Declined"];

const statusKeyMap: Record<string, string> = {
  All: "All",
  Pending: "pending",
  Approved: "approved",
  Declined: "declined",
};

const UserRecipeStatusTabs: React.FC<Props> = ({ active, onChange }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {statuses.map((s) => {
        const value = statusKeyMap[s];
        const isActive = active === value;
        return (
          <button
            key={s}
            onClick={() => onChange(value)}
            className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200"
            style={
              isActive
                ? {
                    background: "#89957F",
                    color: "#fff",
                    boxShadow: "0 2px 8px rgba(137,149,127,0.3)",
                  }
                : {
                    background: "rgba(137,149,127,0.08)",
                    color: "#555",
                  }
            }
          >
            {s}
          </button>
        );
      })}
    </div>
  );
};

export default UserRecipeStatusTabs;
