import { useState, useRef, useEffect } from "react";

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
}

const DUMMY_CONTACTS: InboxContact[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "",
    lastMessage: "Hi Admin",
    lastTime: "2025-01-15 02:12am",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Dov Johnson",
    avatar: "",
    lastMessage: "Hello there!",
    lastTime: "2025-01-14 10:30am",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Alice Martinez",
    avatar: "",
    lastMessage: "Can you help me?",
    lastTime: "2025-01-14 09:15am",
    unread: 1,
    online: true,
  },
  {
    id: 4,
    name: "Bob Williams",
    avatar: "",
    lastMessage: "Thank you!",
    lastTime: "2025-01-13 04:45pm",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Carol Smith",
    avatar: "",
    lastMessage: "Got it, thanks.",
    lastTime: "2025-01-12 11:20am",
    unread: 0,
    online: false,
  },
];

const DUMMY_MESSAGES: Record<string | number, InboxMessage[]> = {
  1: [
    {
      id: 1,
      senderId: 1,
      text: "Hi Admin",
      time: "2025-01-15 02:10am",
      isAdmin: false,
    },
    {
      id: 2,
      senderId: "admin",
      text: "How Can I Help You.",
      time: "2025-01-15 02:12am",
      isAdmin: true,
    },
  ],
  2: [
    {
      id: 1,
      senderId: 2,
      text: "Hello there!",
      time: "2025-01-14 10:30am",
      isAdmin: false,
    },
  ],
  3: [
    {
      id: 1,
      senderId: 3,
      text: "Can you help me?",
      time: "2025-01-14 09:15am",
      isAdmin: false,
    },
  ],
  4: [
    {
      id: 1,
      senderId: 4,
      text: "Thank you!",
      time: "2025-01-13 04:45pm",
      isAdmin: false,
    },
  ],
  5: [
    {
      id: 1,
      senderId: 5,
      text: "Got it, thanks.",
      time: "2025-01-12 11:20am",
      isAdmin: false,
    },
  ],
};

export function useInbox() {
  const [contacts, setContacts] = useState<InboxContact[]>(DUMMY_CONTACTS);
  const [selectedId, setSelectedId] = useState<string | number | null>(1);
  const [messages, setMessages] =
    useState<Record<string | number, InboxMessage[]>>(DUMMY_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedContact = contacts.find((c) => c.id === selectedId) ?? null;
  const currentMessages = selectedId ? (messages[selectedId] ?? []) : [];

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const selectContact = (id: string | number) => {
    setSelectedId(id);
    // Mark as read
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    );
  };

  const sendMessage = () => {
    const text = inputText.trim();
    if (!text || !selectedId) return;

    const now = new Date();
    const timeStr = now.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newMsg: InboxMessage = {
      id: Date.now(),
      senderId: "admin",
      text,
      time: timeStr,
      isAdmin: true,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] ?? []), newMsg],
    }));

    setContacts((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, lastMessage: text, lastTime: timeStr }
          : c,
      ),
    );

    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  return {
    contacts: filteredContacts,
    selectedId,
    selectedContact,
    currentMessages,
    inputText,
    search,
    messagesEndRef,
    setInputText,
    setSearch,
    selectContact,
    sendMessage,
    handleKeyDown,
  };
}
