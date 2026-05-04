import React, { useState, useEffect, useRef } from "react";
import { X, Upload, Plus, Minus, ChevronDown, Check } from "lucide-react";
import type { Recipe } from "@/services/api/recipeApi";
import { useAddRecipeMutation, useUpdateRecipeMutation } from "@/services/api/recipeApi";
import { toast } from "react-hot-toast";

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const [addRecipe, { isLoading: isAdding }] = useAddRecipeMutation();
  const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation();

  const CATEGORY_OPTIONS = ["Ontbijt", "Lunch", "Diner", "Snack", "Dranken", "Uncategorised"];

  const [formData, setFormData] = useState<Partial<Recipe>>({
    name: "",
    category: ["Ontbijt"],
    recipeDetails: [""],
    ingredients: [""],
    cookingTip: "",
    personsServing: 1,
    nutrition: { kcal: 0, khd: 0, vetten: 0, eiwitten: 0, vezels: 0 },
    book: 1,
    number: 1,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (recipe) {
      const normalizedCategory = Array.isArray(recipe.category)
        ? recipe.category
        : recipe.category ? [recipe.category] : ["Ontbijt"];
      setFormData({ ...recipe, category: normalizedCategory });
      if (recipe.recipeImage) {
        setImagePreview(
          recipe.recipeImage.startsWith("http")
            ? recipe.recipeImage
            : `http://localhost:5000${recipe.recipeImage}`
        );
      }
    }
  }, [recipe]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCategory = (cat: string) => {
    setFormData((prev) => {
      const current = Array.isArray(prev.category) ? prev.category : [prev.category || "Ontbijt"];
      const exists = current.includes(cat);
      const updated = exists ? current.filter((c) => c !== cat) : [...current, cat];
      return { ...prev, category: updated.length > 0 ? updated : current };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNutritionChange = (field: string, value: string) => {
    const num = value === "" ? null : parseFloat(value);
    setFormData((prev) => ({
      ...prev,
      nutrition: { ...prev.nutrition!, [field]: isNaN(num as number) ? null : num },
    }));
  };

  const handleArrayChange = (index: number, value: string, field: "recipeDetails" | "ingredients") => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: "recipeDetails" | "ingredients") => {
    setFormData((prev) => ({ ...prev, [field]: [...(prev[field] || []), ""] }));
  };

  const removeArrayItem = (index: number, field: "recipeDetails" | "ingredients") => {
    const newArray = [...(formData[field] || [])];
    newArray.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("data", JSON.stringify(formData));
    if (imageFile) {
      data.append("recipe_image", imageFile);
    }

    try {
      if (recipe?._id) {
        await updateRecipe({ id: recipe._id, formData: data }).unwrap();
        toast.success("Recipe updated successfully");
      } else {
        await addRecipe(data).unwrap();
        toast.success("Recipe added successfully");
      }
      onClose();
    } catch (err) {
      toast.error("Failed to save recipe");
    }
  };

  const macroFields = [
    { key: "kcal", label: "KCAL" },
    { key: "khd", label: "KHD" },
    { key: "vetten", label: "VETTEN" },
    { key: "eiwitten", label: "EIWITTEN" },
    { key: "vezels", label: "VEZELS" },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-bottom flex items-center justify-between" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <h2 className="text-xl font-black text-black">{recipe ? "Edit Recipe" : "Add New Recipe"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Recipe Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-[#89957F]/20 outline-none text-sm font-medium"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div ref={categoryDropdownRef} className="relative">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Category</label>
                  <button
                    type="button"
                    onClick={() => setCategoryDropdownOpen((v) => !v)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-[#89957F]/20 outline-none text-sm font-medium text-left flex items-center justify-between"
                  >
                    <span className="truncate">
                      {Array.isArray(formData.category) && formData.category.length > 0
                        ? `${formData.category.length} Selected`
                        : "Select categories"}
                    </span>
                    <ChevronDown size={16} className={`transition-transform ${categoryDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {categoryDropdownOpen && (
                    <div className="absolute z-50 mt-1 w-full bg-white rounded-xl border border-gray-100 shadow-lg py-1 max-h-48 overflow-y-auto">
                      {CATEGORY_OPTIONS.map((cat) => {
                        const selected = Array.isArray(formData.category) && formData.category.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => toggleCategory(cat)}
                            className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${selected ? "bg-[#89957F] border-[#89957F]" : "border-gray-300"}`}>
                              {selected && <Check size={12} className="text-white" />}
                            </div>
                            <span className="text-sm font-medium">{cat}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Book Number</label>
                  <input
                    type="number"
                    name="book"
                    value={formData.book}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-[#89957F]/20 outline-none text-sm font-medium"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Recipe Number</label>
                  <input
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-[#89957F]/20 outline-none text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Persons Serving</label>
                  <input
                    type="number"
                    name="personsServing"
                    value={formData.personsServing ?? ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-[#89957F]/20 outline-none text-sm font-medium"
                  />
                </div>
              </div>

              {/* Cooking Tip */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Cooking Tip</label>
                <textarea
                  name="cookingTip"
                  value={formData.cookingTip ?? ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-[#89957F]/20 outline-none text-sm font-medium resize-none"
                  rows={2}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Recipe Image</label>
                <div className="relative group">
                  <div
                    className="w-full h-40 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-colors group-hover:border-[#89957F]"
                    style={{ background: "#F9F9F9" }}
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <Upload size={24} />
                        <span className="text-xs mt-2 font-medium">Click to upload image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Macros, Ingredients & Steps */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Macros</label>
                <div className="grid grid-cols-5 gap-2">
                  {macroFields.map(({ key, label }) => (
                    <div key={key}>
                      <label className="text-[8px] font-bold text-gray-400 block text-center mb-1">{label}</label>
                      <input
                        value={formData.nutrition?.[key as keyof typeof formData.nutrition] ?? ""}
                        onChange={(e) => handleNutritionChange(key, e.target.value)}
                        className="w-full px-2 py-2 rounded-lg border border-gray-100 bg-gray-50 text-center text-xs font-bold"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Ingredients</label>
                  <button type="button" onClick={() => addArrayItem("ingredients")} className="text-[#89957F] hover:scale-110 transition-transform">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                  {formData.ingredients?.map((ing, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        value={ing}
                        onChange={(e) => handleArrayChange(idx, e.target.value, "ingredients")}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-100 bg-gray-50 text-xs"
                      />
                      <button type="button" onClick={() => removeArrayItem(idx, "ingredients")} className="text-red-400">
                        <Minus size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Recipe Steps</label>
                  <button type="button" onClick={() => addArrayItem("recipeDetails")} className="text-[#89957F] hover:scale-110 transition-transform">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                  {formData.recipeDetails?.map((step, idx) => (
                    <div key={idx} className="flex gap-2">
                      <textarea
                        value={step}
                        onChange={(e) => handleArrayChange(idx, e.target.value, "recipeDetails")}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-100 bg-gray-50 text-xs resize-none"
                        rows={2}
                      />
                      <button type="button" onClick={() => removeArrayItem(idx, "recipeDetails")} className="text-red-400">
                        <Minus size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-top flex justify-end gap-3" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isAdding || isUpdating}
            className="px-8 py-2.5 rounded-xl bg-[#89957F] text-white text-sm font-bold shadow-lg shadow-[#89957F]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isAdding || isUpdating ? "Saving..." : "Save Recipe"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
