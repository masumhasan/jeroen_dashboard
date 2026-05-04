import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/config/apiConfig";

const TOKEN_KEY = "access_token_recall_pro_dashboard";

export interface RecipeNutrition {
  kcal: number | null;
  khd: number | null;
  vetten: number | null;
  eiwitten: number | null;
  vezels: number | null;
}

export interface Recipe {
  _id?: string;
  number: number;
  name: string;
  category: string[];
  recipeDetails: string[];
  ingredients: string[];
  cookingTip: string | null;
  personsServing: number | null;
  nutrition: RecipeNutrition;
  book: number;
  recipeImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetRecipesResponse {
  recipes: Recipe[];
  totalPages: number;
  currentPage: number;
  totalResults: number;
}

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Recipe"],
  endpoints: (builder) => ({
    getRecipes: builder.query<
      GetRecipesResponse,
      { search?: string; category?: string; book?: number; page?: number }
    >({
      query: ({ search, category, book, page = 1 }) => {
        let url = `/recipes?page=${page}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (category && category !== "All") url += `&category=${encodeURIComponent(category)}`;
        if (book) url += `&book=${book}`;
        return url;
      },
      providesTags: ["Recipe"],
    }),
    addRecipe: builder.mutation<Recipe, FormData>({
      query: (formData) => ({
        url: "/recipes",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Recipe"],
    }),
    updateRecipe: builder.mutation<Recipe, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/recipes/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Recipe"],
    }),
    deleteRecipe: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipeApi;
