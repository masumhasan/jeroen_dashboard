import { baseApi } from "./baseApi";

export interface RecentUser {
  fullName: string;
  email: string;
  mobileNumber: string;
  profilePicture?: string;
  Joined: string;
  location: string;
  status: "Active" | "Inactive";
}

export interface DashboardOverviewData {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  subscribedUsers: number;
  recentUsers: RecentUser[];
}

export interface DashboardOverviewResponse {
  success: boolean;
  message: string;
  data: DashboardOverviewData;
}

// --------------------
// Monthly User Growth
// --------------------
export interface MonthlyGrowthEntry {
  month: string;
  count: number;
}

export interface MonthlyUserGrowthResponse {
  success: boolean;
  message: string;
  data: MonthlyGrowthEntry[];
}

// --------------------
// API Slice
// --------------------
export const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<DashboardOverviewResponse, void>({
      query: () => "/admin/dashboard-overview",
    }),

    getMonthlyUserGrowth: builder.query<
      MonthlyUserGrowthResponse,
      { year: number }
    >({
      // ❌ query: ({ year }) => `/admin/monthly-users-growth?year=${year}`,
      query: ({ year }) => `/admin/monthly-user-growth?year=${year}`, // ✅
    }),

    getMonthlyPremiumUserGrowth: builder.query<
      MonthlyUserGrowthResponse,
      { year: number }
    >({
      query: ({ year }) => `/admin/monthly-premium-users-growth?year=${year}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDashboardOverviewQuery,
  useGetMonthlyUserGrowthQuery,
  useGetMonthlyPremiumUserGrowthQuery,
} = overviewApi;
