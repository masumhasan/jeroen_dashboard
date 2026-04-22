import React, { useState } from "react";
import { Search } from "lucide-react";

interface UserSearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <style>{`
        .search-input {
          caret-color: #89957F;
        }

        .search-input::selection {
          background: rgba(137, 149, 127, 0.3);
        }

        @keyframes cursorBounce {
          0%, 100% { transform: scaleY(1) translateY(0); }
          25% { transform: scaleY(1.3) translateY(-1px); }
          50% { transform: scaleY(0.8) translateY(1px); }
          75% { transform: scaleY(1.15) translateY(-0.5px); }
        }

        @keyframes cursorWiggle {
          0%, 100% { transform: rotate(0deg) scaleY(1); }
          20% { transform: rotate(-8deg) scaleY(1.2); }
          40% { transform: rotate(8deg) scaleY(0.9); }
          60% { transform: rotate(-5deg) scaleY(1.1); }
          80% { transform: rotate(3deg) scaleY(1); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.7; filter: blur(0px); }
          50% { opacity: 1; filter: blur(1px); }
        }

        .cursor-bar {
          width: 2.5px;
          height: 18px;
          background: #89957F;
          border-radius: 2px;
          animation: cursorBounce 0.6s ease-in-out 0s 1,
                     cursorWiggle 0.4s ease-in-out 0.6s 1,
                     glowPulse 1s ease-in-out 1s infinite;
          box-shadow: 0 0 6px rgba(137, 149, 127, 0.8), 0 0 12px rgba(137, 149, 127, 0.4);
        }

        @keyframes fakeCursorFadeIn {
          from { opacity: 0; transform: scaleY(0.3); }
          to   { opacity: 1; transform: scaleY(1); }
        }

        .fake-cursor-wrapper {
          animation: fakeCursorFadeIn 0.15s ease-out forwards;
        }
      `}</style>

      <div className="relative flex-1 max-w-sm">
        {/* Glow behind input */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: "0 0 0 2px rgba(137, 149, 127, 0.25)" }}
        />

        <Search
          size={14}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10"
          style={{
            color: isFocused ? "#89957F" : "rgba(137, 149, 127, 0.5)",
            transition: "color 0.2s",
          }}
        />

        {/* Animated cursor overlay when empty & focused */}
        {isFocused && value === "" && (
          <div className="fake-cursor-wrapper absolute left-9 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <div className="cursor-bar" />
          </div>
        )}

        <input
          type="text"
          placeholder={isFocused ? "" : "Search by user"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={(e) => {
            setIsFocused(true);
            e.currentTarget.style.borderColor = "rgba(137, 149, 127, 0.4)";
          }}
          onBlur={(e) => {
            setIsFocused(false);
            e.currentTarget.style.borderColor = "rgba(137, 149, 127, 0.15)";
          }}
          className="search-input w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none transition-all duration-200 placeholder:text-gray-500"
          style={{
            background: "#fff",
            border: "1px solid rgba(137, 149, 127, 0.15)",
            color: "#1a1a1a",
            caretColor: "#89957F",
          }}
        />
      </div>
    </>
  );
};

export default UserSearchBar;
