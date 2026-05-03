import { useState, useEffect } from "react";
import { useGetRecipesQuery } from "../api/recipeApi";

export const useGetRecipeManagement = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isFetching, isError, refetch } = useGetRecipesQuery({
    search: debouncedSearch,
    category,
    page: currentPage,
  });

  const onSearchChange = (val: string) => {
    setSearch(val);
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
    isError,
    search,
    category,
    currentPage,
    totalPages: data?.totalPages || 1,
    totalResults: data?.totalResults || 0,
    recipes: data?.recipes || [],
    onSearchChange,
    onCategoryChange,
    onPageChange,
    refetch,
  };
};
