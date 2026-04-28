import { useMemo, useState } from "react";
import { useGetUsersQuery } from "../api/usermanagementApi";
import type { DashboardUserRole } from "../api/usermanagementApi";

export type UserStatus = "active" | "suspended";

export interface ManagedUser {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  phone: string;
  joined: string;
  status: UserStatus;
  role: DashboardUserRole;
}

const PAGE_SIZE = 10;

export function useGetUserManagement() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching, isError, error, refetch } = useGetUsersQuery({
    page: currentPage,
    limit: PAGE_SIZE,
    search: search.trim() || undefined,
  });

  const users: ManagedUser[] = useMemo(
    () =>
      (data?.data?.data ?? []).map((u: any) => ({
        id: u.id ?? u._id ?? u.email,
        name: u.fullName,
        email: u.email,
        phone: u.mobileNumber,
        avatar: u.profilePicture,
        joined: u.Joined,
        status: u.status === "Active" ? "active" : "suspended",
        role: (u.role || "user") as DashboardUserRole,
      })),
    [data],
  );
  const totalResults = data?.data?.meta?.totalCount ?? 0;
  const totalPages = data?.data?.meta?.totalPages ?? 1;

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  return {
    isLoading,
    isFetching,
    isError,
    error,
    search,
    currentPage,
    totalPages,
    totalResults,
    users,
    onSearchChange: handleSearchChange,
    onPageChange: setCurrentPage,
    refetch,
  };
}
