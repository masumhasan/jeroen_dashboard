import { useEffect } from "react";
import UserSearchBar from "@/components/usermanagement/UserSearchBar";
import UserPagination from "@/components/shared/UserPagination";
import PremiumFilterTabs from "@/components/premiumusers/PremiumFilterTabs";
import PremiumUsersTable from "@/components/premiumusers/PremiumUsersTable";
import PremiumUsersSkeleton from "@/components/Skeletons/PremiumUsersSkeleton";
import PremiumSearchOverlay from "@/components/shared/PremiumSearchOverlay";
import { useGetPremiumUsers } from "@/services/hooks/useGetPremiumUsers";
import { useUserSearch } from "@/services/hooks/useUserSearch";

export default function PremiumUsersPage() {
  const {
    isLoading,
    isFetching,
    filter,
    currentPage,
    totalPages,
    totalResults,
    users,
    onFilterChange,
    onPageChange,
  } = useGetPremiumUsers();

  const {
    search,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
    users: searchUsers,
    totalResults: searchTotal,
    onSearchChange,
  } = useUserSearch();

  const isOverlayOpen = search.trim().length > 0;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSearchChange("");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (isLoading) return <PremiumUsersSkeleton />;

  return (
    <div
      className="min-h-screen p-6 space-y-5"
      style={{ background: "#fff" }}
    >
      {/* ─── Search Overlay ───────────────────────────────────── */}
      {isOverlayOpen && (
        <PremiumSearchOverlay
          search={search}
          users={searchUsers}
          totalResults={searchTotal}
          isLoading={isSearchLoading || isSearchFetching}
          onClose={() => onSearchChange("")}
        />
      )}

      {/* ─── Header ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black tracking-tight text-black">
            Premium Users
          </h1>
          <p
            className="text-[11px] mt-0.5 font-medium uppercase tracking-[0.15em]"
            style={{ color: "#000" }}
          >
            {totalResults.toLocaleString()} users found
          </p>
        </div>
      </div>

      {/* ─── Toolbar ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <UserSearchBar value={search} onChange={onSearchChange} />
        <PremiumFilterTabs active={filter} onChange={onFilterChange} />
      </div>

      {/* ─── Table ───────────────────────────────────────────── */}
      <div
        className={`transition-opacity duration-200 ${isFetching ? "opacity-50 pointer-events-none" : "opacity-100"}`}
      >
        <PremiumUsersTable data={users} currentPage={currentPage} />
      </div>

      {/* ─── Pagination ──────────────────────────────────────── */}
      <div className="pt-2 pb-4">
        <UserPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
