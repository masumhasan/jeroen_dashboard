import React from "react";
import { Search } from "lucide-react";

interface RecipeSearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

const RecipeSearchBar: React.FC<RecipeSearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder="Search by recipe name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-[#89957F]/20"
        style={{
          background: "#F9F9F9",
          border: "1px solid rgba(0,0,0,0.05)",
          color: "#000",
        }}
      />
    </div>
  );
};

export default RecipeSearchBar;
