import { useState } from "react";
import RecipeSearchBar from "@/components/recipemanagement/RecipeSearchBar";
import RecipeCategoryTabs from "@/components/recipemanagement/RecipeCategoryTabs";
import RecipeTable from "@/components/recipemanagement/RecipeTable";
import RecipePagination from "@/components/shared/UserPagination";
import RecipeManagementSkeleton from "@/components/Skeletons/UserManagementSkeleton";
import { useGetRecipeManagement } from "@/services/hooks/useGetRecipeManagement";
import RecipeModal from "@/components/recipemanagement/RecipeModal";
import type { Recipe } from "@/services/api/recipeApi";
import { Plus } from "lucide-react";

export default function RecipeManagementPage() {
  const {
    isLoading,
    isFetching,
    search,
    category,
    currentPage,
    totalPages,
    totalResults,
    recipes,
    onSearchChange,
    onCategoryChange,
    onPageChange,
  } = useGetRecipeManagement();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleEdit = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedRecipe(null);
    setIsModalOpen(true);
  };

  if (isLoading) return <RecipeManagementSkeleton />;

  return (
    <div className="min-h-screen p-6 space-y-5" style={{ background: "#fff" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black tracking-tight text-black">
            Recipe Management
          </h1>
          <p
            className="text-[11px] mt-0.5 font-medium uppercase tracking-[0.15em]"
            style={{ color: "#000" }}
          >
            {totalResults.toLocaleString()} recipes found
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: "#89957F",
            boxShadow: "0 4px 12px rgba(137,149,127,0.3)",
          }}
        >
          <Plus size={16} />
          Add New Recipe
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <RecipeSearchBar value={search} onChange={onSearchChange} />
        <RecipeCategoryTabs active={category} onChange={onCategoryChange} />
      </div>

      {/* Table */}
      <div
        className={`transition-opacity duration-200 ${
          isFetching ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <RecipeTable
          data={recipes}
          currentPage={currentPage}
          onEdit={handleEdit}
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

      {isModalOpen && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
