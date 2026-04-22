import { useState, useMemo } from "react";

export type PlanType = "yearly" | "monthly";
export type PremiumFilterTab = "all" | "yearly" | "monthly";

export interface PremiumUser {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  phone: string;
  location: string;
  billingDate: string;
  plan: PlanType;
}

const PAGE_SIZE = 5;

const DUMMY_PREMIUM_USERS: PremiumUser[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 555-0101",
    location: "New York, US",
    billingDate: "2025-02-15",
    plan: "yearly",
    avatar: "",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+1 555-0102",
    location: "Los Angeles, US",
    billingDate: "2025-03-20",
    plan: "monthly",
    avatar: "",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    phone: "+44 7700-900100",
    location: "London, UK",
    billingDate: "2025-01-05",
    plan: "yearly",
    avatar: "",
  },
  {
    id: 4,
    name: "David Lee",
    email: "david@example.com",
    phone: "+81 90-1234-5678",
    location: "Tokyo, JP",
    billingDate: "2025-04-18",
    plan: "monthly",
    avatar: "",
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva@example.com",
    phone: "+34 612-345-678",
    location: "Madrid, ES",
    billingDate: "2025-02-02",
    plan: "yearly",
    avatar: "",
  },
  {
    id: 6,
    name: "Frank Brown",
    email: "frank@example.com",
    phone: "+1 555-0106",
    location: "Chicago, US",
    billingDate: "2025-05-10",
    plan: "monthly",
    avatar: "",
  },
  {
    id: 7,
    name: "Grace Kim",
    email: "grace@example.com",
    phone: "+82 10-1234-5678",
    location: "Seoul, KR",
    billingDate: "2025-03-22",
    plan: "yearly",
    avatar: "",
  },
  {
    id: 8,
    name: "Henry Davis",
    email: "henry@example.com",
    phone: "+1 555-0108",
    location: "Houston, US",
    billingDate: "2025-06-01",
    plan: "monthly",
    avatar: "",
  },
];

export function useGetPremiumUsers() {
  const [filter, setFilter] = useState<PremiumFilterTab>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return DUMMY_PREMIUM_USERS.filter((u) =>
      filter === "all" ? true : u.plan === filter,
    );
  }, [filter]);

  const totalResults = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));

  const users = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const handleFilterChange = (val: PremiumFilterTab) => {
    setFilter(val);
    setCurrentPage(1);
  };

  return {
    isLoading: false,
    isFetching: false,
    filter,
    currentPage,
    totalPages,
    totalResults,
    users,
    onFilterChange: handleFilterChange,
    onPageChange: setCurrentPage,
  };
}
