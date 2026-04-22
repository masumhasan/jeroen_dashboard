import React from "react";
import DataTable from "@/components/shared/DataTable";
import type { Column } from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";

export interface User {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  phone: string;
  location: string;
  joined: string;
  status: "active" | "suspended";
}

interface RecentUsersTableProps {
  data: User[];
  isLoading?: boolean;
}

const Avatar = ({ name, src }: { name: string; src?: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  if (src)
    return (
      <img
        src={src}
        alt={name}
        className="w-9 h-9 rounded-full object-cover"
        style={{ border: "1px solid rgba(137, 149, 127, 0.2)" }}
      />
    );
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
      style={{
        background:
          "linear-gradient(135deg, rgba(137, 149, 127, 0.2), rgba(137, 149, 127, 0.08))",
        border: "1px solid rgba(137, 149, 127, 0.25)",
        color: "#000",
      }}
    >
      {initials}
    </div>
  );
};

const RecentUsersTable: React.FC<RecentUsersTableProps> = ({
  data,
  isLoading,
}) => {
  const columns: Column<User>[] = [
    {
      key: "index",
      label: "#",
      width: "48px",
      render: (_, index) => (
        <span style={{ color: "#000" }} className="text-xs font-medium">
          {index + 1}
        </span>
      ),
    },
    {
      key: "user",
      label: "User",
      width: "220px",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} src={row.avatar} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-black truncate">
              {row.name}
            </p>
            <p className="text-[11px] truncate" style={{ color: "#000" }}>
              {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      label: "Phone Number",
      render: (row) => (
        <span className="text-sm" style={{ color: "#000" }}>
          {row.phone}
        </span>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (row) => (
        <span className="text-sm" style={{ color: "#000" }}>
          {row.location}
        </span>
      ),
    },
    {
      key: "joined",
      label: "Joined",
      render: (row) => (
        <span className="text-sm" style={{ color: "#000" }}>
          {row.joined}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <DataTable<User>
      title="Recent Users"
      subtitle="Latest registered accounts"
      columns={columns}
      data={data}
      keyExtractor={(row) => row.id}
      isLoading={isLoading}
      emptyMessage="No users found."
    />
  );
};

export default RecentUsersTable;
