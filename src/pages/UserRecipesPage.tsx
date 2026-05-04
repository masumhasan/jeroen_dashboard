import RecipeSearchBar from "@/components/recipemanagement/RecipeSearchBar";
import RecipeCategoryTabs from "@/components/recipemanagement/RecipeCategoryTabs";
import UserRecipeTable from "@/components/userrecipes/UserRecipeTable";
import UserRecipeStatusTabs from "@/components/userrecipes/UserRecipeStatusTabs";
import RecipePagination from "@/components/shared/UserPagination";
import RecipeManagementSkeleton from "@/components/Skeletons/UserManagementSkeleton";
import { useGetUserRecipes } from "@/services/hooks/useGetUserRecipes";
import ServerConnectionError from "@/components/shared/ServerConnectionError";

export default function UserRecipesPage() {
  const {
    isLoading,
    isFetching,
    isError,
    search,
    category,
    status,
    currentPage,
    totalPages,
    totalResults,
    recipes,
    onSearchChange,
    onCategoryChange,
    onStatusChange,
    onPageChange,
    refetch,
  } = useGetUserRecipes();

  if (isLoading) return <RecipeManagementSkeleton />;

  return (
    <div className="min-h-screen p-6 space-y-5" style={{ background: "#fff" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black tracking-tight text-black">
            User Recipes
          </h1>
          <p
            className="text-[11px] mt-0.5 font-medium uppercase tracking-[0.15em]"
            style={{ color: "#000" }}
          >
            {totalResults.toLocaleString()} crowdsourced recipes
          </p>
        </div>
      </div>

      {isError && <ServerConnectionError onRetry={refetch} />}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <RecipeSearchBar value={search} onChange={onSearchChange} />
        <RecipeCategoryTabs active={category} onChange={onCategoryChange} />
      </div>

      {/* Status Filter */}
      <UserRecipeStatusTabs active={status} onChange={onStatusChange} />

      {/* Table */}
      <div
        className={`transition-opacity duration-200 ${
          isFetching ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <UserRecipeTable
          data={recipes}
          currentPage={currentPage}
        />
      </div>

      {/* Pagination */}
      <div className="pt-2 pb-4">
        <RecipePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
