import { useInbox } from "@/services/hooks/useInbox";
import InboxContactList from "@/components/inbox/InboxContactList";
import InboxChatWindow from "@/components/inbox/InboxChatWindow";
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
  } = useInbox();

  return (
    <div className="min-h-screen p-6" style={{ background: "#fff" }}>
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-black tracking-tight text-black">Support Inbox</h1>
        <p
          className="text-[11px] mt-0.5 font-medium uppercase tracking-[0.15em]"
          style={{ color: "#888" }}
        >
          {totalConversationCount} conversations
        </p>
        {loadError ? (
          <p className="text-sm text-red-600 mt-2">{loadError}</p>
        ) : null}
      </div>

      {/* Chat card */}
      <div
        className="rounded-2xl overflow-hidden flex"
        style={{
          background: "#fff",
          border: "1px solid rgba(137,149,127,0.12)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          height: "calc(100vh - 160px)",
          minHeight: "480px",
        }}
      >
        {/* Top accent */}
        <div
          className="absolute left-0 right-0 h-[1.5px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(137,149,127,0.4), transparent)",
          }}
        />

        {/* Left — contact list */}
        <div className="w-72 shrink-0 flex flex-col h-full relative">
          {loadingList ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
              <span className="text-sm text-gray-500">Loading…</span>
            </div>
          ) : null}
          <InboxContactList
            contacts={contacts}
            selectedId={selectedId}
            search={search}
            onSearchChange={setSearch}
            onSelect={selectContact}
          />
        </div>

        {/* Right — chat window */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0 relative">
          {loadingMessages && selectedContact ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 pointer-events-none">
              <span className="text-sm text-gray-500">Updating messages…</span>
            </div>
          ) : null}
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
  );
}
