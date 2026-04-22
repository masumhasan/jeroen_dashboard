import { baseApi } from "./baseApi";
import type { ManagedUserRaw } from "./usermanagementApi";

export interface UserSearchResponse {
  success: boolean;
  message: string;
  data: ManagedUserRaw[];
}

export const userSearchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUsers: builder.query<UserSearchResponse, string>({
      query: (name) => `/admin/users/search?name=${encodeURIComponent(name)}`,
    }),
  }),
  overrideExisting: false,
});

export const { useSearchUsersQuery } = userSearchApi;
