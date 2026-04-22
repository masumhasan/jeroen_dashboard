import { useMemo } from "react";
import type { User } from "@/components/shared/RecentUsersTable";

export interface OverviewStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  premiumUsers: number;
}

export interface ChartDataPoint {
  name: string;
  count: number;
}

const DUMMY_STATS = {
  totalUsers: 24521,
  activeUsers: 18340,
  inactiveUsers: 6181,
  premiumUsers: 7210,
};

const DUMMY_RECENT_USERS = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 555-0101",
    location: "New York, US",
    joined: "2024-01-15",
    status: "active" as const,
    avatar: "",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+1 555-0102",
    location: "Los Angeles, US",
    joined: "2024-02-20",
    status: "suspended" as const,
    avatar: "",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    phone: "+44 7700-900100",
    location: "London, UK",
    joined: "2024-03-05",
    status: "active" as const,
    avatar: "",
  },
  {
    id: 4,
    name: "David Lee",
    email: "david@example.com",
    phone: "+81 90-1234-5678",
    location: "Tokyo, JP",
    joined: "2024-03-18",
    status: "active" as const,
    avatar: "",
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva@example.com",
    phone: "+34 612-345-678",
    location: "Madrid, ES",
    joined: "2024-04-02",
    status: "suspended" as const,
    avatar: "",
  },
];

const DUMMY_TOTAL_GROWTH: ChartDataPoint[] = [
  { name: "Jan", count: 1200 },
  { name: "Feb", count: 1800 },
  { name: "Mar", count: 2400 },
  { name: "Apr", count: 2100 },
  { name: "May", count: 2900 },
  { name: "Jun", count: 3400 },
  { name: "Jul", count: 3100 },
  { name: "Aug", count: 3800 },
  { name: "Sep", count: 4200 },
  { name: "Oct", count: 3900 },
  { name: "Nov", count: 4600 },
  { name: "Dec", count: 5100 },
];

const DUMMY_PREMIUM_GROWTH: ChartDataPoint[] = [
  { name: "Jan", count: 300 },
  { name: "Feb", count: 450 },
  { name: "Mar", count: 600 },
  { name: "Apr", count: 520 },
  { name: "May", count: 710 },
  { name: "Jun", count: 830 },
  { name: "Jul", count: 760 },
  { name: "Aug", count: 940 },
  { name: "Sep", count: 1050 },
  { name: "Oct", count: 970 },
  { name: "Nov", count: 1150 },
  { name: "Dec", count: 1280 },
];

export function useGetOverview(_totalYear: number, _premiumYear: number) {
  const stats = useMemo<OverviewStats>(() => DUMMY_STATS, []);

  const recentUsers = useMemo<User[]>(() => DUMMY_RECENT_USERS, []);

  const totalUserChartData = useMemo<ChartDataPoint[]>(
    () => DUMMY_TOTAL_GROWTH,
    [],
  );

  const premiumUserChartData = useMemo<ChartDataPoint[]>(
    () => DUMMY_PREMIUM_GROWTH,
    [],
  );

  return {
    isLoading: false,
    isChartFetching: false,
    stats,
    totalUserChartData,
    premiumUserChartData,
    recentUsers,
  };
}
