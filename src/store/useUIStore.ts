// ── UI Store — NAVI Pro ──
import { create } from 'zustand';

type ModalName = 'license' | 'pricing' | 'aiInsights' | 'filter' | 'compare' | null;

interface UIState {
  sidebarCollapsed: boolean;
  agentOpen: boolean;
  agentChatOpen: boolean;
  agentChatType: string | null;
  notifOpen: boolean;
  activeModal: ModalName;
  activePage: string;
  toggleSidebar: () => void;
  openAgent: () => void;
  closeAgent: () => void;
  openAgentChat: (type: string) => void;
  closeAgentChat: () => void;
  toggleNotif: () => void;
  closeNotif: () => void;
  openModal: (modal: ModalName) => void;
  closeModal: () => void;
  setActivePage: (page: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  agentOpen: false,
  agentChatOpen: false,
  agentChatType: null,
  notifOpen: false,
  activeModal: null,
  activePage: 'dashboard',

  toggleSidebar:    () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  openAgent:        () => set({ agentOpen: true }),
  closeAgent:       () => set({ agentOpen: false }),
  openAgentChat:    (type) => set({ agentChatOpen: true, agentChatType: type }),
  closeAgentChat:   () => set({ agentChatOpen: false, agentChatType: null }),
  toggleNotif:      () => set((s) => ({ notifOpen: !s.notifOpen })),
  closeNotif:       () => set({ notifOpen: false }),
  openModal:        (modal) => set({ activeModal: modal }),
  closeModal:       () => set({ activeModal: null }),
  setActivePage:    (page) => set({ activePage: page }),
}));
