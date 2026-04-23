import { useState } from "react";
import { useSearchUsersQuery } from "../api/usersearchApi";
import type { ManagedUserRaw } from "../api/usermanagementApi";
import type { ManagedUser } from "./useGetUserManagement";

const mapUser = (u: ManagedUserRaw, index: number): ManagedUser => ({
  id: (u as any).id ?? index + 1,
  name: u.fullName,
  email: u.email,
  phone: u.mobileNumber,
  avatar: u.profilePicture,
  joined: u.Joined,
  status: u.status === "Active" ? "active" : "suspended",
});

export function useUserSearch() {
  const [search, setSearch] = useState("");

  const isSearching = search.trim().length > 0;

  const { data, isLoading, isFetching } = useSearchUsersQuery(search.trim(), {
    skip: !isSearching,
  });

  const users: ManagedUser[] = (data?.data ?? []).map(mapUser);

  return {
    search,
    isLoading,
    isFetching,
    users,
    totalResults: users.length,
    onSearchChange: (val: string) => setSearch(val),
  };
}
