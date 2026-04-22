import { baseApi } from "./baseApi";

export interface AdminProfile {
  _id: string;
  fullName: string;
  profilePicture: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: AdminProfile;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => "/profile/",
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<ProfileResponse, FormData>({
      query: (formData) => ({
        url: "/profile/",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    changePassword: builder.mutation<
      { success: boolean; message: string },
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: "/profile/change-password",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = profileApi;
