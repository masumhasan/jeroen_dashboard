import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/config/apiConfig";

const TOKEN_KEY = "access_token_recall_pro_dashboard";

export interface Allergy {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export const allergyApi = createApi({
  reducerPath: "allergyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Allergy"],
  endpoints: (builder) => ({
    getAllergies: builder.query<Allergy[], { search?: string } | void>({
      query: (params) => ({
        url: "/admin/allergies",
        params: params?.search ? { search: params.search } : {},
      }),
      transformResponse: (response: any) => response?.data || [],
      providesTags: ["Allergy"],
    }),
    createAllergy: builder.mutation<Allergy, { name: string; description?: string }>({
      query: (body) => ({
        url: "/admin/allergies",
        method: "POST",
        body,
      }),
      transformResponse: (response: any) => response?.data,
      invalidatesTags: ["Allergy"],
    }),
    updateAllergy: builder.mutation<Allergy, { id: string; name?: string; description?: string }>({
      query: ({ id, ...body }) => ({
        url: `/admin/allergies/${id}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response: any) => response?.data,
      invalidatesTags: ["Allergy"],
    }),
    deleteAllergy: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/admin/allergies/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => ({
        message: response?.message || "Deleted",
      }),
      invalidatesTags: ["Allergy"],
    }),
  }),
});

export const {
  useGetAllergiesQuery,
  useCreateAllergyMutation,
  useUpdateAllergyMutation,
  useDeleteAllergyMutation,
} = allergyApi;
