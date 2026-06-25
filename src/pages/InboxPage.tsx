import { useState } from "react";
import { useInbox } from "@/services/hooks/useInbox";
import InboxContactList from "@/components/inbox/InboxContactList";
import InboxChatWindow from "@/components/inbox/InboxChatWindow";
import ServerConnectionError from "@/components/shared/ServerConnectionError";
import { ArrowLeft } from "lucide-react";

export default function InboxPage() {
  const {
    contacts,
    totalConversationCount,
    selectedId,
    selectedContact,
    currentMessages,
    loadingList,
    loadingMessages,
    loadError,
    inputText,
    search,
    messagesEndRef,
    setInputText,
    setSearch,
    selectContact,
    sendMessage,
    handleKeyDown,
    reloadThreads,
  } = useInbox();

  // Mobile: track which panel is visible
  const [mobilePanel, setMobilePanel] = useState<"contacts" | "chat">("contacts");

  const handleSelectContact = (id: string | number) => {
    selectContact(String(id));
    setMobilePanel("chat");
  };

  return (
    <div className="min-h-screen p-3 sm:p-6" style={{ background: "#fff" }}>
      {/* Header */}
      <div className="mb-4 sm:mb-5 flex items-center gap-3">
        {/* Back button — mobile only, shown when in chat view */}
        {mobilePanel === "chat" && (
          <button
            className="flex md:hidden items-center justify-center w-8 h-8 rounded-lg transition-colors"
            style={{ background: "rgba(137,149,127,0.1)", color: "#89957F" }}
            onClick={() => setMobilePanel("contacts")}
          >
            <ArrowLeft size={18} />
          </button>
        )}
        <div>
          <h1 className="text-xl font-black tracking-tight text-black">Support Inbox</h1>
          <p
            className="text-[11px] mt-0.5 font-medium uppercase tracking-[0.15em]"
            style={{ color: "#888" }}
          >
            {totalConversationCount} conversations
          </p>
        </div>
      </div>

      {loadError && <ServerConnectionError onRetry={reloadThreads} />}

      {/* Chat card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#fff",
          border: "1px solid rgba(137,149,127,0.12)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          height: "calc(100vh - 160px)",
          minHeight: "480px",
        }}
      >
        {/* Desktop: side-by-side  |  Mobile: single panel at a time */}
        <div className="flex h-full">
          {/* Left — contact list */}
          <div
            className={`
              h-full flex flex-col relative
              w-full md:w-72 md:shrink-0
              ${mobilePanel === "contacts" ? "flex" : "hidden"} md:flex
            `}
          >
            {loadingList && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
                <span className="text-sm text-gray-500">Loading…</span>
              </div>
            )}
            <InboxContactList
              contacts={contacts}
              selectedId={selectedId}
              search={search}
              onSearchChange={setSearch}
              onSelect={handleSelectContact}
            />
          </div>

          {/* Right — chat window */}
          <div
            className={`
              flex-1 flex flex-col min-h-0 min-w-0 relative
              w-full
              ${mobilePanel === "chat" ? "flex" : "hidden"} md:flex
            `}
          >
            {loadingMessages && selectedContact && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 pointer-events-none">
                <span className="text-sm text-gray-500">Updating messages…</span>
              </div>
            )}
            <InboxChatWindow
              contact={selectedContact}
              messages={currentMessages}
              inputText={inputText}
              messagesEndRef={messagesEndRef}
              onInputChange={setInputText}
              onSend={sendMessage}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
