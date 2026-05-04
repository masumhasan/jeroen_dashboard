import React from "react";
import { X, Check, XCircle, Trash2 } from "lucide-react";
import type { UserRecipe } from "@/services/api/userRecipeApi";
import {
  useApproveUserRecipeMutation,
  useDeclineUserRecipeMutation,
  useDeleteUserRecipeMutation,
} from "@/services/api/userRecipeApi";
import { toast } from "react-hot-toast";

interface Props {
  recipe: UserRecipe;
  onClose: () => void;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: "rgba(234,179,8,0.12)", text: "#b45309" },
  approved: { bg: "rgba(34,197,94,0.12)", text: "#15803d" },
  declined: { bg: "rgba(239,68,68,0.12)", text: "#b91c1c" },
};

const UserRecipeDetailModal: React.FC<Props> = ({ recipe, onClose }) => {
  const [approveRecipe, { isLoading: isApproving }] = useApproveUserRecipeMutation();
  const [declineRecipe, { isLoading: isDeclining }] = useDeclineUserRecipeMutation();
  const [deleteRecipe, { isLoading: isDeleting }] = useDeleteUserRecipeMutation();

  const handleApprove = async () => {
    if (!recipe._id) return;
    try {
      await approveRecipe(recipe._id).unwrap();
      toast.success("Recipe approved");
      onClose();
    } catch {
      toast.error("Failed to approve recipe");
    }
  };

  const handleDecline = async () => {
    if (!recipe._id) return;
    try {
      await declineRecipe(recipe._id).unwrap();
      toast.success("Recipe declined");
      onClose();
    } catch {
      toast.error("Failed to decline recipe");
    }
  };

  const handleDelete = async () => {
    if (!recipe._id) return;
    if (!window.confirm("Are you sure you want to delete this user recipe?")) return;
    try {
      await deleteRecipe(recipe._id).unwrap();
      toast.success("Recipe deleted");
      onClose();
    } catch {
      toast.error("Failed to delete recipe");
    }
  };

  const macroFields = [
    { key: "kcal", label: "KCAL" },
    { key: "khd", label: "KHD" },
    { key: "vetten", label: "VETTEN" },
    { key: "eiwitten", label: "EIWITTEN" },
    { key: "vezels", label: "VEZELS" },
  ];

  const imageUrl = recipe.recipeImage
    ? recipe.recipeImage.startsWith("http")
      ? recipe.recipeImage
      : `http://localhost:5000${recipe.recipeImage}`
    : null;

  const colors = statusColors[recipe.status] || statusColors.pending;
  const categories = Array.isArray(recipe.category) ? recipe.category : [recipe.category];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-black">Recipe Details</h2>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-bold capitalize"
              style={{ background: colors.bg, color: colors.text }}
            >
              {recipe.status}
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Recipe Name</label>
                <div className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-sm font-medium">
                  {recipe.name}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Category</label>
                  <div className="flex flex-wrap gap-1.5 px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50">
                    {categories.map((cat) => (
                      <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-[#89957F]/10 text-[#89957F] font-bold">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Persons Serving</label>
                  <div className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-sm font-medium">
                    {recipe.personsServing ?? "–"}
                  </div>
                </div>
              </div>

              {recipe.submittedBy && (
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Submitted By</label>
                  <div className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-sm font-medium">
                    {recipe.submittedBy.firstName} {recipe.submittedBy.lastName}
                    <span className="text-gray-400 ml-2 text-xs">({recipe.submittedBy.email})</span>
                  </div>
                </div>
              )}

              {/* Cooking Tip */}
              {recipe.cookingTip && (
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Cooking Tip</label>
                  <div className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-sm font-medium whitespace-pre-wrap">
                    {recipe.cookingTip}
                  </div>
                </div>
              )}

              {/* Image */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Recipe Image</label>
                <div className="w-full h-40 rounded-2xl border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center">
                  {imageUrl ? (
                    <img src={imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-gray-400">No image uploaded</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Macros</label>
                <div className="grid grid-cols-5 gap-2">
                  {macroFields.map(({ key, label }) => (
                    <div key={key}>
                      <label className="text-[8px] font-bold text-gray-400 block text-center mb-1">{label}</label>
                      <div className="w-full px-2 py-2 rounded-lg border border-gray-100 bg-gray-50 text-center text-xs font-bold">
                        {recipe.nutrition?.[key as keyof typeof recipe.nutrition] ?? "–"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Ingredients</label>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                  {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ing, idx) => (
                      <div key={idx} className="px-3 py-1.5 rounded-lg border border-gray-100 bg-gray-50 text-xs">
                        {ing}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400">No ingredients listed.</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Recipe Steps</label>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                  {recipe.recipeDetails && recipe.recipeDetails.length > 0 ? (
                    recipe.recipeDetails.map((step, idx) => (
                      <div key={idx} className="px-3 py-1.5 rounded-lg border border-gray-100 bg-gray-50 text-xs whitespace-pre-wrap">
                        {step}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400">No steps listed.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Action Buttons */}
        <div className="p-6 flex justify-end gap-3" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          {recipe.status === "pending" && (
            <>
              <button
                onClick={handleDecline}
                disabled={isDeclining}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <XCircle size={16} />
                {isDeclining ? "Declining..." : "Decline"}
              </button>
              <button
                onClick={handleApprove}
                disabled={isApproving}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-green-50 text-green-600 hover:bg-green-100 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Check size={16} />
                {isApproving ? "Approving..." : "Approve"}
              </button>
            </>
          )}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Trash2 size={16} />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRecipeDetailModal;
