import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/config/apiConfig";

const TOKEN_KEY = "access_token_recall_pro_dashboard";

export interface DietaryPreference {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export const dietaryPreferenceApi = createApi({
  reducerPath: "dietaryPreferenceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["DietaryPreference"],
  endpoints: (builder) => ({
    getDietaryPreferences: builder.query<DietaryPreference[], { search?: string } | void>({
      query: (params) => ({
        url: "/admin/dietary-preferences",
        params: params?.search ? { search: params.search } : {},
      }),
      transformResponse: (response: any) => response?.data || [],
      providesTags: ["DietaryPreference"],
    }),
    createDietaryPreference: builder.mutation<DietaryPreference, { name: string; description?: string }>({
      query: (body) => ({
        url: "/admin/dietary-preferences",
        method: "POST",
        body,
      }),
      transformResponse: (response: any) => response?.data,
      invalidatesTags: ["DietaryPreference"],
    }),
    updateDietaryPreference: builder.mutation<DietaryPreference, { id: string; name?: string; description?: string }>({
      query: ({ id, ...body }) => ({
        url: `/admin/dietary-preferences/${id}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response: any) => response?.data,
      invalidatesTags: ["DietaryPreference"],
    }),
    deleteDietaryPreference: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/admin/dietary-preferences/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => ({
        message: response?.message || "Deleted",
      }),
      invalidatesTags: ["DietaryPreference"],
    }),
  }),
});

export const {
  useGetDietaryPreferencesQuery,
  useCreateDietaryPreferenceMutation,
  useUpdateDietaryPreferenceMutation,
  useDeleteDietaryPreferenceMutation,
} = dietaryPreferenceApi;
