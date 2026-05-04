import React from "react";
import { Check, X, Trash2 } from "lucide-react";
import type { UserRecipe } from "@/services/api/userRecipeApi";
import {
  useApproveUserRecipeMutation,
  useDeclineUserRecipeMutation,
  useDeleteUserRecipeMutation,
} from "@/services/api/userRecipeApi";
import { toast } from "react-hot-toast";

interface Props {
  data: UserRecipe[];
  currentPage: number;
  pageSize?: number;
}

const Th = ({ children, width }: { children: React.ReactNode; width?: string }) => (
  <th
    className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-[0.15em] whitespace-nowrap"
    style={{ color: "#000", width }}
  >
    {children}
  </th>
);

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: "rgba(234,179,8,0.12)", text: "#b45309" },
  approved: { bg: "rgba(34,197,94,0.12)", text: "#15803d" },
  declined: { bg: "rgba(239,68,68,0.12)", text: "#b91c1c" },
};

const UserRecipeTable: React.FC<Props> = ({ data, currentPage, pageSize = 10 }) => {
  const [approveRecipe] = useApproveUserRecipeMutation();
  const [declineRecipe] = useDeclineUserRecipeMutation();
  const [deleteRecipe] = useDeleteUserRecipeMutation();

  const handleApprove = async (id: string) => {
    try {
      await approveRecipe(id).unwrap();
      toast.success("Recipe approved");
    } catch {
      toast.error("Failed to approve recipe");
    }
  };

  const handleDecline = async (id: string) => {
    try {
      await declineRecipe(id).unwrap();
      toast.success("Recipe declined");
    } catch {
      toast.error("Failed to decline recipe");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user recipe?")) {
      try {
        await deleteRecipe(id).unwrap();
        toast.success("Recipe deleted");
      } catch {
        toast.error("Failed to delete recipe");
      }
    }
  };

  const formatMacro = (val: number | null | undefined) => val ?? "–";

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid rgba(137, 149, 127, 0.1)",
      }}
    >
      <div
        className="h-[1.5px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(137, 149, 127, 0.5), transparent)",
        }}
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(137, 149, 127, 0.08)" }}>
              <Th width="48px">#</Th>
              <Th width="250px">Recipe</Th>
              <Th>Submitted By</Th>
              <Th>Category</Th>
              <Th>Status</Th>
              <Th>Macros (KCAL/KHD/V/E)</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center text-sm" style={{ color: "#000" }}>
                  No user recipes found.
                </td>
              </tr>
            ) : (
              data.map((recipe, index) => {
                const globalIndex = (currentPage - 1) * pageSize + index + 1;
                const colors = statusColors[recipe.status] || statusColors.pending;
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
                        {globalIndex}
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
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-black truncate">
                          {recipe.submittedBy
                            ? `${recipe.submittedBy.firstName} ${recipe.submittedBy.lastName}`
                            : "Unknown"}
                        </p>
                        <p className="text-[10px] text-gray-400 truncate">
                          {recipe.submittedBy?.email}
                        </p>
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
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-bold capitalize"
                        style={{ background: colors.bg, color: colors.text }}
                      >
                        {recipe.status}
                      </span>
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
                        {recipe.status === "pending" && (
                          <>
                            <button
                              onClick={() => recipe._id && handleApprove(recipe._id)}
                              title="Approve"
                              className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => recipe._id && handleDecline(recipe._id)}
                              title="Decline"
                              className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => recipe._id && handleDelete(recipe._id)}
                          title="Delete"
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

export default UserRecipeTable;
