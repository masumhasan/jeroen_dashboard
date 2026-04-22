import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputboxProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Inputbox = ({ label, type, value, onChange }: InputboxProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block text-[10px] font-bold tracking-[0.18em] uppercase mb-2"
        style={{ color: "#000" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          id={label}
          name={label}
          autoComplete="current-password"
          value={value}
          onChange={onChange}
          placeholder={type === "password" ? "••••••••" : `Enter your ${label}`}
          className="w-full px-4 py-3 rounded-xl text-black text-sm
            placeholder:text-zinc-600 transition-all duration-200 outline-none"
          style={{
            background: "#fff",
            border: "1px solid #000",
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = "1px solid #89957F";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,163,103,0.1)";
            e.currentTarget.style.background = "#fff";
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = "1px solid #fff)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.background = "#fff";
          }}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: "#89957F" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#89957F")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#89957F")}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Inputbox;
