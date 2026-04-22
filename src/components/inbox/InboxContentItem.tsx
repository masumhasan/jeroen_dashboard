import React from "react";
import type { InboxContact } from "@/services/hooks/useInbox";

interface InboxContactItemProps {
  contact: InboxContact;
  isSelected: boolean;
  onClick: () => void;
}

const ContactAvatar = ({
  name,
  src,
  online,
}: {
  name: string;
  src?: string;
  online: boolean;
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="relative shrink-0">
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            background:
              "linear-gradient(135deg, rgba(137,149,127,0.25), rgba(137,149,127,0.1))",
            border: "1px solid rgba(137,149,127,0.3)",
            color: "#89957F",
          }}
        >
          {initials}
        </div>
      )}
      {online && (
        <span
          className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
          style={{ background: "#10b981" }}
        />
      )}
    </div>
  );
};

const InboxContactItem: React.FC<InboxContactItemProps> = ({
  contact,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-150 text-left"
      style={{
        background: isSelected ? "rgba(137,149,127,0.1)" : "transparent",
        borderLeft: isSelected
          ? "2.5px solid #89957F"
          : "2.5px solid transparent",
      }}
      onMouseEnter={(e) => {
        if (!isSelected)
          e.currentTarget.style.background = "rgba(137,149,127,0.05)";
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.background = "transparent";
      }}
    >
      <ContactAvatar
        name={contact.name}
        src={contact.avatar}
        online={contact.online}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p
            className="text-sm font-semibold truncate"
            style={{ color: "#1a1a1a" }}
          >
            {contact.name}
          </p>
          {contact.unread > 0 && (
            <span
              className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
              style={{ background: "#89957F", color: "#fff" }}
            >
              {contact.unread}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-[11px] truncate" style={{ color: "#888" }}>
            {contact.lastMessage}
          </p>
          <p className="text-[10px] shrink-0" style={{ color: "#bbb" }}>
            {contact.lastTime.split(" ").slice(-1)[0]}
          </p>
        </div>
      </div>
    </button>
  );
};

export default InboxContactItem;
