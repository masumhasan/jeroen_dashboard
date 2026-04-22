import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Recipe {
  _id?: string;
  Number: number;
  Name: string;
  Category: string;
  Recipe_Details: string[];
  Ingredients: string[];
  Cooking_TIP: string | null;
  Persons_Serving: string;
  KCAL: string;
  KHD: string;
  VETTEN: string;
  EIWITTEN: string;
  VEZELS: string | null;
  book_number: number;
  recipe_image?: string;
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
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["Recipe"],
  endpoints: (builder) => ({
    getRecipes: builder.query<
      GetRecipesResponse,
      { search?: string; category?: string; page?: number }
    >({
      query: ({ search, category, page = 1 }) => {
        let url = `/recipes?page=${page}`;
        if (search) url += `&search=${search}`;
        if (category && category !== "All") url += `&category=${category}`;
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
