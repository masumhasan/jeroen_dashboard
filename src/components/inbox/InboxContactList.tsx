import React from "react";
import { Search } from "lucide-react";
import type { InboxContact } from "@/services/hooks/useInbox";
import InboxContactItem from "./InboxContentItem";
interface InboxContactListProps {
  contacts: InboxContact[];
  selectedId: string | number | null;
  search: string;
  onSearchChange: (val: string) => void;
  onSelect: (id: string | number) => void;
}

const InboxContactList: React.FC<InboxContactListProps> = ({
  contacts,
  selectedId,
  search,
  onSearchChange,
  onSelect,
}) => {
  return (
    <div
      className="flex flex-col h-full"
      style={{ borderRight: "1px solid rgba(0,0,0,0.07)" }}
    >
      {/* Header */}
      <div
        className="px-4 py-4"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
      >
        <h3 className="text-sm font-black tracking-tight text-black mb-3">
          Messages
        </h3>
        {/* Search */}
        <div className="relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "rgba(137,149,127,0.5)" }}
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl outline-none transition-all duration-200"
            style={{
              background: "rgba(137,149,127,0.06)",
              border: "1px solid rgba(137,149,127,0.15)",
              color: "#1a1a1a",
              caretColor: "#89957F",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(137,149,127,0.4)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(137,149,127,0.15)";
            }}
          />
        </div>
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {contacts.length === 0 ? (
          <p className="text-xs text-center py-8" style={{ color: "#bbb" }}>
            No conversations found
          </p>
        ) : (
          contacts.map((contact) => (
            <InboxContactItem
              key={contact.id}
              contact={contact}
              isSelected={selectedId === contact.id}
              onClick={() => onSelect(contact.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default InboxContactList;
