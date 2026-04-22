import { useState } from "react";
import { useGetRecipesQuery } from "../api/recipeApi";

export const useGetRecipeManagement = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching } = useGetRecipesQuery({
    search,
    category,
    page: currentPage,
  });

  const onSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const onCategoryChange = (val: string) => {
    setCategory(val);
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    isLoading,
    isFetching,
    search,
    category,
    currentPage,
    totalPages: data?.totalPages || 1,
    totalResults: data?.totalResults || 0,
    recipes: data?.recipes || [],
    onSearchChange,
    onCategoryChange,
    onPageChange,
  };
};
