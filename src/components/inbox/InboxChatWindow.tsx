import React from "react";
import { Send } from "lucide-react";
import type { InboxContact, InboxMessage } from "@/services/hooks/useInbox";
import InboxMessageBubble from "./InboxMessageBubble";

interface InboxChatWindowProps {
  contact: InboxContact | null;
  messages: InboxMessage[];
  inputText: string;
  messagesEndRef: React.RefObject<HTMLDivElement | null>; // ← fix here
  onInputChange: (val: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
const ChatAvatar = ({
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
          className="w-9 h-9 rounded-full object-cover"
        />
      ) : (
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
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

const InboxChatWindow: React.FC<InboxChatWindowProps> = ({
  contact,
  messages,
  inputText,
  messagesEndRef,
  onInputChange,
  onSend,
  onKeyDown,
}) => {
  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center flex-col gap-3">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: "rgba(137,149,127,0.08)",
            border: "1px solid rgba(137,149,127,0.15)",
          }}
        >
          <Send size={22} style={{ color: "rgba(137,149,127,0.4)" }} />
        </div>
        <p className="text-sm font-semibold" style={{ color: "#bbb" }}>
          Select a conversation
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Chat header */}
      <div
        className="flex items-center gap-3 px-5 py-3.5 shrink-0"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
      >
        <ChatAvatar
          name={contact.name}
          src={contact.avatar}
          online={contact.online}
        />
        <div>
          <p className="text-sm font-bold text-black">{contact.name}</p>
          <p
            className="text-[11px]"
            style={{ color: contact.online ? "#10b981" : "#bbb" }}
          >
            {contact.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 no-scrollbar">
        {messages.length === 0 ? (
          <p className="text-xs text-center" style={{ color: "#ddd" }}>
            No messages yet
          </p>
        ) : (
          messages.map((msg) => (
            <InboxMessageBubble key={msg.id} message={msg} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className="px-4 py-3 shrink-0 flex items-center gap-3"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
      >
        <input
          type="text"
          placeholder="Type here..."
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 px-4 py-2.5 text-sm rounded-xl outline-none transition-all duration-200"
          style={{
            background: "rgba(137,149,127,0.05)",
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
        <button
          onClick={onSend}
          disabled={!inputText.trim()}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
          style={{
            background: "#89957F",
            boxShadow: "0 2px 8px rgba(137,149,127,0.35)",
          }}
        >
          <Send size={15} style={{ color: "#fff" }} />
        </button>
      </div>
    </div>
  );
};

export default InboxChatWindow;
