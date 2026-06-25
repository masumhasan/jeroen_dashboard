import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import type { Recipe } from "@/services/api/recipeApi";
import { useDeleteRecipeMutation } from "@/services/api/recipeApi";
import { toast } from "react-hot-toast";

interface RecipeTableProps {
  data: Recipe[];
  currentPage: number;
  pageSize?: number;
  onEdit: (recipe: Recipe) => void;
}

const Th = ({ children, width }: { children: React.ReactNode; width?: string }) => (
  <th
    className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-[0.15em] whitespace-nowrap"
    style={{ color: "#000", width }}
  >
    {children}
  </th>
);

const formatMacro = (val: number | null | undefined) => val ?? "–";

const RecipeTable: React.FC<RecipeTableProps> = ({ data, currentPage, pageSize = 10, onEdit }) => {
  const [deleteRecipe] = useDeleteRecipeMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(id).unwrap();
        toast.success("Recipe deleted successfully");
      } catch {
        toast.error("Failed to delete recipe");
      }
    }
  };

  const cardBorder = { border: "1px solid rgba(137, 149, 127, 0.1)" };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", ...cardBorder }}>
      <div
        className="h-[1.5px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(137, 149, 127, 0.5), transparent)" }}
      />

      {/* ── Mobile card list ── */}
      <div className="sm:hidden divide-y" style={{ borderColor: "rgba(137,149,127,0.08)" }}>
        {data.length === 0 ? (
          <p className="py-16 text-center text-sm text-gray-400">No recipes found.</p>
        ) : (
          data.map((recipe, index) => {
            const globalIndex = (currentPage - 1) * pageSize + index;
            const cats = Array.isArray(recipe.category) ? recipe.category : [recipe.category];
            return (
              <div key={recipe._id} className="p-4 space-y-3">
                {/* Row 1: image + title + actions */}
                <div className="flex items-start gap-3">
                  {recipe.recipeImage ? (
                    <img
                      src={recipe.recipeImage.startsWith("http") ? recipe.recipeImage : `http://localhost:5000${recipe.recipeImage}`}
                      alt={recipe.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 shrink-0">
                      No Img
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-black leading-snug">
                          <span className="text-gray-400 text-xs mr-1">#{recipe.number || globalIndex + 1}</span>
                          {recipe.name}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5">Serving: {recipe.personsServing ?? "–"}</p>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => onEdit(recipe)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => recipe._id && handleDelete(recipe._id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 text-red-600"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: category + book */}
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="flex flex-wrap gap-1">
                    {cats.map((cat) => (
                      <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-[#89957F]/10 text-[#89957F] font-bold">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-500">
                    Book {recipe.book}
                    {recipe.bookSku && <span className="ml-1 text-[#89957F] font-bold uppercase tracking-wider">{recipe.bookSku}</span>}
                  </span>
                </div>

                {/* Row 3: macros */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span className="font-semibold text-gray-700 text-[10px] uppercase tracking-wide mr-1">Macros:</span>
                  <span className="font-bold text-black">{formatMacro(recipe.nutrition?.kcal)}</span>
                  <span className="text-gray-300">/</span>
                  <span className="font-bold text-black">{formatMacro(recipe.nutrition?.khd)}</span>
                  <span className="text-gray-300">/</span>
                  <span className="font-bold text-black">{formatMacro(recipe.nutrition?.vetten)}</span>
                  <span className="text-gray-300">/</span>
                  <span className="font-bold text-black">{formatMacro(recipe.nutrition?.eiwitten)}</span>
                  <span className="text-[10px] text-gray-400 ml-1">(kcal/khd/v/e)</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Desktop table ── */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(137, 149, 127, 0.08)" }}>
              <Th width="48px">#</Th>
              <Th width="300px">Recipe</Th>
              <Th>Category</Th>
              <Th>Book</Th>
              <Th>Macros (KCAL/KHD/V/E)</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center text-sm" style={{ color: "#000" }}>
                  No recipes found.
                </td>
              </tr>
            ) : (
              data.map((recipe, index) => {
                const globalIndex = (currentPage - 1) * pageSize + index;
                return (
                  <tr
                    key={recipe._id}
                    className="transition-colors duration-150"
                    style={{ borderBottom: "1px solid rgba(137, 149, 127, 0.06)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(137, 149, 127, 0.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-medium" style={{ color: "#000" }}>
                        {recipe.number || globalIndex + 1}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {recipe.recipeImage ? (
                          <img
                            src={recipe.recipeImage.startsWith("http") ? recipe.recipeImage : `http://localhost:5000${recipe.recipeImage}`}
                            alt={recipe.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">
                            No Img
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-black truncate">{recipe.name}</p>
                          <p className="text-[11px]" style={{ color: "#555" }}>
                            Serving: {recipe.personsServing ?? "–"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {(Array.isArray(recipe.category) ? recipe.category : [recipe.category]).map((cat) => (
                          <span key={cat} className="text-xs px-2 py-1 rounded-full bg-[#89957F]/10 text-[#89957F] font-bold">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Book {recipe.book}</span>
                        {recipe.bookTitle && (
                          <span className="text-[10px] text-gray-500 font-medium">{recipe.bookTitle}</span>
                        )}
                        {recipe.bookSku && (
                          <span className="text-[9px] text-[#89957F] font-bold uppercase tracking-wider">{recipe.bookSku}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-xs space-x-1">
                        <span className="font-bold">{formatMacro(recipe.nutrition?.kcal)}</span>
                        <span className="text-gray-400">/</span>
                        <span className="font-bold">{formatMacro(recipe.nutrition?.khd)}</span>
                        <span className="text-gray-400">/</span>
                        <span className="font-bold">{formatMacro(recipe.nutrition?.vetten)}</span>
                        <span className="text-gray-400">/</span>
                        <span className="font-bold">{formatMacro(recipe.nutrition?.eiwitten)}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEdit(recipe)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => recipe._id && handleDelete(recipe._id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecipeTable;
