import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/config/apiConfig";

const TOKEN_KEY = "access_token_recall_pro_dashboard";

export interface Topic {
  _id: string;
  name: string;
  description?: string;
  color?: string;
  followerCount: number;
  createdAt?: string;
}

export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Topic"],
  endpoints: (builder) => ({
    getTopics: builder.query<Topic[], { search?: string } | void>({
      query: (params) => ({
        url: "/admin/topics",
        params: params?.search ? { search: params.search } : {},
      }),
      transformResponse: (response: any) => response?.data || [],
      providesTags: ["Topic"],
    }),
    createTopic: builder.mutation<Topic, { name: string; description?: string; color?: string }>({
      query: (body) => ({
        url: "/admin/topics",
        method: "POST",
        body,
      }),
      transformResponse: (response: any) => response?.data,
      invalidatesTags: ["Topic"],
    }),
    updateTopic: builder.mutation<
      Topic,
      { id: string; name?: string; description?: string; color?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/admin/topics/${id}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response: any) => response?.data,
      invalidatesTags: ["Topic"],
    }),
    deleteTopic: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/admin/topics/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => ({
        message: response?.message || "Topic deleted",
      }),
      invalidatesTags: ["Topic"],
    }),
  }),
});

export const {
  useGetTopicsQuery,
  useCreateTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
} = topicApi;
