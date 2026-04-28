import { baseApi } from "./baseApi";

export type DashboardUserRole = "user" | "moderator" | "admin" | "superadmin";

export interface ManagedUserRaw {
  id?: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  profilePicture?: string;
  Joined: string;
  location: string;
  status: "Active" | "Inactive";
  role?: DashboardUserRole;
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
  status?: "active" | "suspended" | "all";
  search?: string;
}

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserManagementResponse, GetUsersParams>({
      query: ({ page = 1, limit = 10, status, search }) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (status && status !== "all") params.set("status", status);
        if (search) params.set("search", search);
        return `/admin/users?${params.toString()}`;
      },
      providesTags: ["UserManagement"],
    }),
    deleteUser: builder.mutation<
      { success: boolean; message: string; data: { id: string; fullName: string; email: string } },
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserManagement"],
    }),
    updateUserRole: builder.mutation<
      { success: boolean; message: string; data: { id: string; role: DashboardUserRole } },
      { userId: string; role: DashboardUserRole }
    >({
      query: ({ userId, role }) => ({
        url: `/admin/users/${userId}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["UserManagement"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = userManagementApi;
