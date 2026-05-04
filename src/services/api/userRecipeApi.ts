import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/config/apiConfig";

const TOKEN_KEY = "access_token_recall_pro_dashboard";

export interface UserRecipeNutrition {
  kcal: number | null;
  khd: number | null;
  vetten: number | null;
  eiwitten: number | null;
  vezels: number | null;
}

export interface UserRecipe {
  _id?: string;
  name: string;
  category: string[];
  recipeDetails: string[];
  ingredients: string[];
  cookingTip: string | null;
  personsServing: number | null;
  nutrition: UserRecipeNutrition;
  recipeImage?: string;
  submittedBy?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  status: "pending" | "approved" | "declined";
  createdAt?: string;
  updatedAt?: string;
}

export interface GetUserRecipesResponse {
  recipes: UserRecipe[];
  totalPages: number;
  currentPage: number;
  totalResults: number;
}

export const userRecipeApi = createApi({
  reducerPath: "userRecipeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["UserRecipe"],
  endpoints: (builder) => ({
    getUserRecipes: builder.query<
      GetUserRecipesResponse,
      { search?: string; category?: string; status?: string; page?: number }
    >({
      query: ({ search, category, status, page = 1 }) => {
        let url = `/user-recipes?page=${page}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (category && category !== "All") url += `&category=${encodeURIComponent(category)}`;
        if (status && status !== "All") url += `&status=${encodeURIComponent(status)}`;
        return url;
      },
      providesTags: ["UserRecipe"],
    }),
    approveUserRecipe: builder.mutation<UserRecipe, string>({
      query: (id) => ({
        url: `/user-recipes/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["UserRecipe"],
    }),
    declineUserRecipe: builder.mutation<UserRecipe, string>({
      query: (id) => ({
        url: `/user-recipes/${id}/decline`,
        method: "PATCH",
      }),
      invalidatesTags: ["UserRecipe"],
    }),
    deleteUserRecipe: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/user-recipes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserRecipe"],
    }),
  }),
});

export const {
  useGetUserRecipesQuery,
  useApproveUserRecipeMutation,
  useDeclineUserRecipeMutation,
  useDeleteUserRecipeMutation,
} = userRecipeApi;
