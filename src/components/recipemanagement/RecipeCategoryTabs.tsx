import React from "react";

interface RecipeCategoryTabsProps {
  active: string;
  onChange: (val: string) => void;
}

const categories = ["All", "Ontbijt", "Lunch", "Diner", "Snack", "Dranken", "Uncategorised"];

const RecipeCategoryTabs: React.FC<RecipeCategoryTabsProps> = ({ active, onChange }) => {
  return (
    <div className="flex bg-[#F3F4F6] p-1 rounded-xl">
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
              isActive ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default RecipeCategoryTabs;
