// ── Agent Store — NAVI Pro ──
import { create } from 'zustand';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

interface AgentState {
  // NAVI main agent
  history: ChatMessage[];
  thinking: boolean;
  // Specialized agents
  chatHistory: Record<string, ChatMessage[]>;
  chatThinking: boolean;

  addMessage: (msg: ChatMessage) => void;
  setThinking: (v: boolean) => void;
  clearHistory: () => void;
  addChatMessage: (type: string, msg: ChatMessage) => void;
  setChatThinking: (v: boolean) => void;
  clearChatHistory: (type: string) => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  history: [],
  thinking: false,
  chatHistory: {},
  chatThinking: false,

  addMessage: (msg) =>
    set((s) => ({ history: [...s.history, msg] })),

  setThinking: (v) => set({ thinking: v }),

  clearHistory: () => set({ history: [] }),

  addChatMessage: (type, msg) =>
    set((s) => ({
      chatHistory: {
        ...s.chatHistory,
        [type]: [...(s.chatHistory[type] || []), msg],
      },
    })),

  setChatThinking: (v) => set({ chatThinking: v }),

  clearChatHistory: (type) =>
    set((s) => ({
      chatHistory: { ...s.chatHistory, [type]: [] },
    })),
}));
