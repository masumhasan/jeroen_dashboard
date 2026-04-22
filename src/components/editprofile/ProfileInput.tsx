import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface ProfileInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: "text" | "password";
  placeholder?: string;
}

const ProfileInput: React.FC<ProfileInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-xs font-bold uppercase tracking-[0.12em]"
        style={{ color: "#000" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-200 placeholder:text-black"
          style={{
            background: "#fff",
            border: `1px solid ${focused ? "#89957F" : "#89957F"}`,
            color: "#000",
            boxShadow: focused ? "0 0 0 3px rgba(201,163,103,0.08)" : "none",
          }}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity duration-200 hover:opacity-100"
            style={{ color: "#89957F" }}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileInput;
