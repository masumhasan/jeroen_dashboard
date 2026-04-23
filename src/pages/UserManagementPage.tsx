import { useEffect } from "react";
import UserSearchBar from "@/components/usermanagement/UserSearchBar";
import UserManagementTable from "@/components/usermanagement/UserManagementTable";
import UserPagination from "@/components/shared/UserPagination";
import UserManagementSkeleton from "@/components/Skeletons/UserManagementSkeleton";
import UserSearchOverlay from "@/components/shared/UserSearchOverlay";
import { useGetUserManagement } from "@/services/hooks/useGetUserManagement";
import { useUserSearch } from "@/services/hooks/useUserSearch";
import useUserActions from "@/services/hooks/useUserAction";
export default function UserManagementPage() {
  const {
    isLoading,
    isFetching,
    isError,
    error,
    search,
    currentPage,
    totalPages,
    totalResults,
    users,
    onSearchChange,
    onPageChange,
    updateUserStatus,
  } = useGetUserManagement();

  const { confirmTarget, openConfirm, closeConfirm, handleConfirm, isActing } =
    useUserActions({ updateUserStatus });

  const {
    search: overlaySearch,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
    users: searchUsers,
    totalResults: searchTotal,
    onSearchChange: onOverlaySearchChange,
  } = useUserSearch();

  const isOverlayOpen = overlaySearch.trim().length > 0;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOverlaySearchChange("");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (isLoading) return <UserManagementSkeleton />;

  return (
    <div className="min-h-screen p-6 space-y-5" style={{ background: "#fff" }}>
      {isOverlayOpen && (
        <UserSearchOverlay
          search={overlaySearch}
          users={searchUsers}
          totalResults={searchTotal}
          isLoading={isSearchLoading || isSearchFetching}
          onClose={() => onOverlaySearchChange("")}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black tracking-tight text-black">
            User Management
          </h1>
          <p
            className="text-[11px] mt-0.5 font-medium uppercase tracking-[0.15em]"
            style={{ color: "#000" }}
          >
            {totalResults.toLocaleString()} users found
          </p>
        </div>
      </div>

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Failed to load users from API. Check dashboard API URL and backend server.
          <span className="block mt-1 text-xs opacity-80">
            {JSON.stringify(error)}
          </span>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <UserSearchBar value={search} onChange={onSearchChange} />
      </div>

      {/* Table */}
      <div
        className={`transition-opacity duration-200 ${
          isFetching ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <UserManagementTable
          data={users}
          currentPage={currentPage}
          confirmTarget={confirmTarget}
          isActing={isActing}
          onAction={openConfirm}
          onConfirm={handleConfirm}
          onClose={closeConfirm}
        />
      </div>

      {/* Pagination */}
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
