import { baseApi } from "./baseApi";

export interface ManagedUserRaw {
  fullName: string;
  email: string;
  mobileNumber: string;
  profilePicture?: string;
  Joined: string;
  location: string;
  status: "Active" | "Inactive";
}

export interface UserManagementMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface UserManagementResponse {
  success: boolean;
  message: string;
  data: {
    meta: UserManagementMeta;
    data: ManagedUserRaw[];
  };
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  status?: "active" | "inactive" | "all";
  search?: string;
}

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserManagementResponse, GetUsersParams>({
      query: ({ page = 2, limit = 10, status, search }) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (status && status !== "all") params.set("status", status);
        if (search) params.set("search", search);
        return `/admin/users?${params.toString()}`;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery } = userManagementApi;
