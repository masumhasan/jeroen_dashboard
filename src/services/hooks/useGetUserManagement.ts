import { useState, useMemo } from "react";

export type UserStatus = "active" | "suspended";
export type FilterTab = "all" | "active" | "suspended";

export interface ManagedUser {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  phone: string;
  location: string;
  joined: string;
  status: UserStatus;
}

const PAGE_SIZE = 5;

const DUMMY_USERS: ManagedUser[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 555-0101",
    location: "New York, US",
    joined: "2024-01-15",
    status: "active",
    avatar: "",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+1 555-0102",
    location: "Los Angeles, US",
    joined: "2024-02-20",
    status: "suspended",
    avatar: "",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    phone: "+44 7700-900100",
    location: "London, UK",
    joined: "2024-03-05",
    status: "active",
    avatar: "",
  },
  {
    id: 4,
    name: "David Lee",
    email: "david@example.com",
    phone: "+81 90-1234-5678",
    location: "Tokyo, JP",
    joined: "2024-03-18",
    status: "active",
    avatar: "",
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva@example.com",
    phone: "+34 612-345-678",
    location: "Madrid, ES",
    joined: "2024-04-02",
    status: "suspended",
    avatar: "",
  },
  {
    id: 6,
    name: "Frank Brown",
    email: "frank@example.com",
    phone: "+1 555-0106",
    location: "Chicago, US",
    joined: "2024-04-10",
    status: "active",
    avatar: "",
  },
  {
    id: 7,
    name: "Grace Kim",
    email: "grace@example.com",
    phone: "+82 10-1234-5678",
    location: "Seoul, KR",
    joined: "2024-04-22",
    status: "active",
    avatar: "",
  },
  {
    id: 8,
    name: "Henry Davis",
    email: "henry@example.com",
    phone: "+1 555-0108",
    location: "Houston, US",
    joined: "2024-05-01",
    status: "suspended",
    avatar: "",
  },
  {
    id: 9,
    name: "Isla Thompson",
    email: "isla@example.com",
    phone: "+61 412-345-678",
    location: "Sydney, AU",
    joined: "2024-05-14",
    status: "active",
    avatar: "",
  },
  {
    id: 10,
    name: "James Wilson",
    email: "james@example.com",
    phone: "+1 555-0110",
    location: "Phoenix, US",
    joined: "2024-05-28",
    status: "suspended",
    avatar: "",
  },
  {
    id: 11,
    name: "Karen Moore",
    email: "karen@example.com",
    phone: "+1 555-0111",
    location: "Philadelphia, US",
    joined: "2024-06-03",
    status: "active",
    avatar: "",
  },
  {
    id: 12,
    name: "Liam Taylor",
    email: "liam@example.com",
    phone: "+353 87-123-4567",
    location: "Dublin, IE",
    joined: "2024-06-15",
    status: "active",
    avatar: "",
  },
];

export function useGetUserManagement() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterTab>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusOverrides, setStatusOverrides] = useState<
    Record<string | number, UserStatus>
  >({});

  const filtered = useMemo(() => {
    return DUMMY_USERS.map((u) => ({
      ...u,
      status: (statusOverrides[u.id] ?? u.status) as UserStatus,
    })).filter((u) => {
      const matchesFilter = filter === "all" || u.status === filter;
      const matchesSearch =
        !search ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [search, filter, statusOverrides]);

  const totalResults = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));

  const users = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleFilterChange = (val: FilterTab) => {
    setFilter(val);
    setCurrentPage(1);
  };

  const updateUserStatus = (id: string | number, status: UserStatus) => {
    setStatusOverrides((prev: Record<string | number, UserStatus>) => ({
      ...prev,
      [id]: status,
    }));
  };

  return {
    isLoading: false,
    isFetching: false,
    search,
    filter,
    currentPage,
    totalPages,
    totalResults,
    users,
    onSearchChange: handleSearchChange,
    onFilterChange: handleFilterChange,
    onPageChange: setCurrentPage,
    updateUserStatus,
  };
}
