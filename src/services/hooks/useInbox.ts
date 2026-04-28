import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { API_BASE_URL } from "@/config/apiConfig";

const TOKEN_KEY = "access_token_recall_pro_dashboard";

function withAuth(init: RequestInit = {}): RequestInit {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = new Headers(init.headers ?? undefined);
  if (init.body && typeof init.body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return { ...init, headers };
}

export interface InboxContact {
  id: string | number;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  online: boolean;
}

export interface InboxMessage {
  id: string | number;
  senderId: string | number;
  text: string;
  time: string;
  isAdmin: boolean;
  imageUrl?: string | null;
}

export function useInbox() {
  const [rawContacts, setRawContacts] = useState<InboxContact[]>([]);
  const [messagesByThread, setMessagesByThread] = useState<
    Record<string, InboxMessage[]>
  >({});
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadThreads = useCallback(async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/support/threads`,
        withAuth()
      );
      if (!res.ok) throw new Error(`Could not load conversations (${res.status})`);
      const json = await res.json();
      const threads: InboxContact[] = json?.data?.threads ?? [];
      setRawContacts(threads);
      setLoadError(null);
    } catch (e) {
      setLoadError((e as Error).message);
    } finally {
      setLoadingList(false);
    }
  }, []);

  const loadMessages = useCallback(async (threadId: string) => {
    setLoadingMessages(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/support/threads/${threadId}`,
        withAuth()
      );
      if (!res.ok) throw new Error("Could not load messages");
      const json = await res.json();
      const msgs: InboxMessage[] = json?.data?.messages ?? [];
      setMessagesByThread((prev) => ({ ...prev, [threadId]: msgs }));
    } catch {
      // leave existing messages
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    void loadThreads();
    const t = setInterval(() => void loadThreads(), 12000);
    return () => clearInterval(t);
  }, [loadThreads]);

  useEffect(() => {
    if (selectedId == null) return;
    const sid = String(selectedId);
    void loadMessages(sid);
    const t = setInterval(() => void loadMessages(sid), 10000);
    return () => clearInterval(t);
  }, [selectedId, loadMessages]);

  useEffect(() => {
    if (rawContacts.length === 0) return;
    setSelectedId((prev) => {
      if (prev == null) return rawContacts[0].id;
      const exists = rawContacts.some((c) => String(c.id) === String(prev));
      return exists ? prev : rawContacts[0].id;
    });
  }, [rawContacts]);

  const markRead = useCallback(async (threadId: string) => {
    try {
      await fetch(
        `${API_BASE_URL}/admin/support/threads/${threadId}/read`,
        withAuth({ method: "PATCH" })
      );
      setRawContacts((prev) =>
        prev.map((c) =>
          String(c.id) === String(threadId) ? { ...c, unread: 0 } : c
        )
      );
    } catch {
      // ignore
    }
  }, []);

  const selectContact = (id: string | number) => {
    setSelectedId(id);
    void markRead(String(id));
  };

  const selectedContact =
    rawContacts.find((c) => String(c.id) === String(selectedId)) ?? null;
  const currentMessages =
    selectedId != null ? messagesByThread[String(selectedId)] ?? [] : [];

  const filteredContacts = rawContacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = async () => {
    const text = inputText.trim();
    if (!text || selectedId == null) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/support/threads/${selectedId}/replies`,
        withAuth({
          method: "POST",
          body: JSON.stringify({ body: text }),
        })
      );
      if (!res.ok) throw new Error("Send failed");
      const json = await res.json();
      const newMsg: InboxMessage | undefined = json?.data?.message;
      if (newMsg) {
        setMessagesByThread((prev) => ({
          ...prev,
          [String(selectedId)]: [...(prev[String(selectedId)] ?? []), newMsg],
        }));
        setRawContacts((prev) =>
          prev.map((c) =>
            String(c.id) === String(selectedId)
              ? { ...c, lastMessage: text, lastTime: newMsg.time }
              : c
          )
        );
      }
      setInputText("");
      void loadThreads();
    } catch {
      // optional: toast
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  return {
    contacts: filteredContacts,
    totalConversationCount: rawContacts.length,
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
    reloadThreads: loadThreads,
  };
}
