import { baseApi } from "./baseApi";

export interface PremiumUserRaw {
  fullName: string;
  email: string;
  mobileNumber: string;
  profilePicture?: string;
  billingDate: string;
  location: string;
  plan: "Monthly" | "Yearly";
}

export interface PremiumUsersMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface PremiumUsersResponse {
  success: boolean;
  message: string;
  data: {
    meta: PremiumUsersMeta;
    data: PremiumUserRaw[];
  };
}

export interface GetPremiumUsersParams {
  page?: number;
  limit?: number;
  plan?: "yearly" | "monthly" | "all";
}

export const premiumUsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPremiumUsers: builder.query<PremiumUsersResponse, GetPremiumUsersParams>(
      {
        query: ({ page = 1, limit = 10, plan }) => {
          const params = new URLSearchParams();
          params.set("page", String(page));
          params.set("limit", String(limit));
          if (plan && plan !== "all") params.set("plan", plan);
          return `/admin/premium-users?${params.toString()}`;
        },
      },
    ),
  }),
  overrideExisting: false,
});

export const { useGetPremiumUsersQuery } = premiumUsersApi;
