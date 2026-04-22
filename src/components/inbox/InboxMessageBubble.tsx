import React from "react";
import type { InboxMessage } from "@/services/hooks/useInbox";

interface InboxMessageBubbleProps {
  message: InboxMessage;
}

const InboxMessageBubble: React.FC<InboxMessageBubbleProps> = ({ message }) => {
  const isAdmin = message.isAdmin;

  return (
    <div className={`flex ${isAdmin ? "justify-end" : "justify-start"} mb-3`}>
      <div className="max-w-[70%] flex flex-col gap-1">
        <div
          className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
          style={
            isAdmin
              ? {
                  background: "#89957F",
                  color: "#fff",
                  borderBottomRightRadius: "4px",
                  boxShadow: "0 2px 8px rgba(137,149,127,0.3)",
                }
              : {
                  background: "#f3f4f6",
                  color: "#1a1a1a",
                  borderBottomLeftRadius: "4px",
                  border: "1px solid rgba(0,0,0,0.06)",
                }
          }
        >
          {message.text}
        </div>
        <p
          className={`text-[10px] px-1 ${isAdmin ? "text-right" : "text-left"}`}
          style={{ color: "#bbb" }}
        >
          {message.time}
        </p>
      </div>
    </div>
  );
};

export default InboxMessageBubble;
