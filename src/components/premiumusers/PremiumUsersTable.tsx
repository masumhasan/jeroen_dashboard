import React from "react";
import type { PremiumUser } from "@/services/hooks/useGetPremiumUsers";

interface PremiumUsersTableProps {
  data: PremiumUser[];
  currentPage: number;
  pageSize?: number;
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
        className="w-9 h-9 rounded-full object-cover shrink-0"
        style={{ border: "1px solid rgba(137, 149, 127, 0.2)" }}
      />
    );

  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
      style={{
        background: "linear-gradient(135deg, rgba(137, 149, 127, 0.2), rgba(137, 149, 127, 0.08))",
        border: "1px solid rgba(137, 149, 127, 0.25)",
        color: "#000",
      }}
    >
      {initials}
    </div>
  );
};

const PlanBadge = ({ plan }: { plan: "yearly" | "monthly" }) => {
  const isYearly = plan === "yearly";
  return (
    <span
      className="text-xs font-bold capitalize px-2.5 py-1 rounded-full"
      style={{
        background: isYearly ? "rgba(137,149,127,0.12)" : "rgba(139,92,246,0.1)",
        color: isYearly ? "#89957F" : "rgba(109,40,217,0.9)",
      }}
    >
      {plan}
    </span>
  );
};

const Th = ({ children, width }: { children: React.ReactNode; width?: string }) => (
  <th
    className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-[0.15em] whitespace-nowrap"
    style={{ color: "#000", width }}
  >
    {children}
  </th>
);

const PremiumUsersTable: React.FC<PremiumUsersTableProps> = ({ data, currentPage, pageSize = 10 }) => {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "#fff", border: "1px solid rgba(137, 149, 127, 0.1)" }}
    >
      <div
        className="h-[1.5px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(137, 149, 127, 0.5), transparent)" }}
      />

      {/* ── Mobile card list ── */}
      <div className="sm:hidden divide-y" style={{ borderColor: "rgba(137,149,127,0.08)" }}>
        {data.length === 0 ? (
          <p className="py-16 text-center text-sm text-gray-400">No premium users found.</p>
        ) : (
          data.map((user, index) => {
            const globalIndex = (currentPage - 1) * pageSize + index;
            return (
              <div key={user.id} className="p-4 space-y-3">
                {/* Row 1: avatar + name/email + plan */}
                <div className="flex items-center gap-3">
                  <Avatar name={user.name} src={user.avatar} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-black truncate">
                      <span className="text-gray-400 text-xs mr-1">#{globalIndex + 1}</span>
                      {user.name}
                    </p>
                    <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                  </div>
                  <PlanBadge plan={user.plan} />
                </div>

                {/* Row 2: phone + location */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Phone</p>
                    <p className="text-black font-medium mt-0.5">{user.phone || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Location</p>
                    <p className="text-black font-medium mt-0.5">{user.location || "—"}</p>
                  </div>
                </div>

                {/* Row 3: billing date */}
                <div className="text-xs">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Billing Date</p>
                  <p className="text-black font-medium mt-0.5">{user.billingDate}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Desktop table ── */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(137, 149, 127, 0.08)" }}>
              <Th width="48px">#</Th>
              <Th width="220px">User</Th>
              <Th>Phone Number</Th>
              <Th>Location</Th>
              <Th>Billing Date</Th>
              <Th>Plan</Th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center text-sm" style={{ color: "rgba(137, 149, 127, 0.4)" }}>
                  No premium users found.
                </td>
              </tr>
            ) : (
              data.map((user, index) => {
                const globalIndex = (currentPage - 1) * pageSize + index;
                return (
                  <tr
                    key={user.id}
                    className="transition-colors duration-150"
                    style={{ borderBottom: "1px solid rgba(137, 149, 127, 0.08)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "rgba(137, 149, 127, 0.05)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                  >
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-medium" style={{ color: "#000" }}>{globalIndex + 1}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name} src={user.avatar} />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-black truncate">{user.name}</p>
                          <p className="text-[11px] truncate" style={{ color: "#000" }}>{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm" style={{ color: "#000" }}>{user.phone}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm" style={{ color: "#000" }}>{user.location}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm" style={{ color: "#000" }}>{user.billingDate}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <PlanBadge plan={user.plan} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PremiumUsersTable;
