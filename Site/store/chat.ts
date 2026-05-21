import { create } from "zustand";

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatStore {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  open: () => void;
  close: () => void;
  addMessage: (msg: Message) => void;
  setLoading: (v: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isOpen: false,
  messages: [],
  isLoading: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
  setLoading: (v) => set({ isLoading: v }),
  clearMessages: () => set({ messages: [] }),
}));
