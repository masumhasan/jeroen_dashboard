import React from "react";
import { API_BASE_URL } from "@/config/apiConfig";
import type { InboxMessage } from "@/services/hooks/useInbox";

function resolveUploadUrl(path: string | null | undefined) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const origin = API_BASE_URL.replace(/\/api\/?$/, "");
  return `${origin}${path.startsWith("/") ? "" : "/"}${path}`;
}

interface InboxMessageBubbleProps {
  message: InboxMessage;
}

const InboxMessageBubble: React.FC<InboxMessageBubbleProps> = ({ message }) => {
  const isAdmin = message.isAdmin;

  return (
    <div className={`flex ${isAdmin ? "justify-end" : "justify-start"} mb-3`}>
      <div className="max-w-[70%] flex flex-col gap-1">
        <div
          className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed overflow-hidden"
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
          {message.imageUrl ? (
            <img
              src={resolveUploadUrl(message.imageUrl)}
              alt=""
              className="max-w-[220px] max-h-[180px] rounded-lg object-cover mb-1"
            />
          ) : null}
          {message.text && message.text !== "[Image]" ? (
            <span className={message.imageUrl ? "block mt-1" : undefined}>
              {message.text}
            </span>
          ) : null}
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
