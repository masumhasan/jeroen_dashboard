import React from "react";

type Status = "active" | "suspended" | "pending" | "banned";

interface StatusBadgeProps {
  status: Status;
}

const STATUS_CONFIG: Record<
  Status,
  { label: string; color: string; bg: string; dot: string }
> = {
  active: {
    label: "Active",
    color: "rgba(52,211,153,0.9)",
    bg: "rgba(16,185,129,0.1)",
    dot: "rgba(52,211,153,0.8)",
  },
  suspended: {
    label: "Suspended",
    color: "rgba(251,191,36,0.9)",
    bg: "rgba(245,158,11,0.1)",
    dot: "rgba(251,191,36,0.8)",
  },
  pending: {
    label: "Pending",
    color: "rgba(96,165,250,0.9)",
    bg: "rgba(59,130,246,0.1)",
    dot: "rgba(96,165,250,0.8)",
  },
  banned: {
    label: "Banned",
    color: "rgba(156,163,175,0.9)",
    bg: "rgba(107,114,128,0.1)",
    dot: "rgba(156,163,175,0.8)",
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = STATUS_CONFIG[status] ?? {
    label: status ?? "Unknown",
    color: "rgba(0,0,0,0.4)",
    bg: "rgba(0,0,0,0.06)",
    dot: "rgba(0,0,0,0.3)",
  };

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{ background: config.bg, border: `1px solid ${config.color}22` }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: config.dot }}
      />
      <span
        className="text-[11px] font-bold tracking-wide"
        style={{ color: config.color }}
      >
        {config.label}
      </span>
    </div>
  );
};

export default StatusBadge;
