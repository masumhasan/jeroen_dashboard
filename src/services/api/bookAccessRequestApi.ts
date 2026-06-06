import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/config/apiConfig";

const TOKEN_KEY = "access_token_recall_pro_dashboard";

export interface BookAccessRequest {
  _id: string;
  userId: { _id: string; firstName: string; lastName: string; email: string } | null;
  bookSku: string;
  bookTitle: string;
  requestEmail: string;
  note: string;
  status: "pending" | "approved" | "rejected";
  adminNote: string | null;
  dismissedAt: string | null;
  createdAt: string;
}

export interface GetBookAccessRequestsResponse {
  requests: BookAccessRequest[];
  totalPages: number;
  currentPage: number;
  totalResults: number;
}

export const bookAccessRequestApi = createApi({
  reducerPath: "bookAccessRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["BookAccessRequest"],
  endpoints: (builder) => ({
    getBookAccessRequests: builder.query<
      GetBookAccessRequestsResponse,
      { status?: string; search?: string; page?: number }
    >({
      query: ({ status, search, page = 1 }) => {
        let url = `/book-access-requests?page=${page}`;
        if (status && status !== "All") url += `&status=${encodeURIComponent(status)}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        return url;
      },
      providesTags: ["BookAccessRequest"],
    }),
    approveBookAccessRequest: builder.mutation<{ data: BookAccessRequest }, string>({
      query: (id) => ({ url: `/book-access-requests/${id}/approve`, method: "PATCH" }),
      invalidatesTags: ["BookAccessRequest"],
    }),
    rejectBookAccessRequest: builder.mutation<
      { data: BookAccessRequest },
      { id: string; adminNote: string }
    >({
      query: ({ id, adminNote }) => ({
        url: `/book-access-requests/${id}/reject`,
        method: "PATCH",
        body: { adminNote },
      }),
      invalidatesTags: ["BookAccessRequest"],
    }),
  }),
});

export const {
  useGetBookAccessRequestsQuery,
  useApproveBookAccessRequestMutation,
  useRejectBookAccessRequestMutation,
} = bookAccessRequestApi;
