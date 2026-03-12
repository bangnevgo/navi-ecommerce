// ── Dashboard Store — NAVI Pro ──
import { create } from 'zustand';
import { periodData, type Period, type PeriodData } from '@/data/periodData';

interface DashboardState {
  currentPeriod: Period;
  data: PeriodData;
  isLiveData: boolean;
  connectionStatus: 'online' | 'offline' | 'loading';
  setPeriod: (period: Period) => void;
  setLiveData: (data: Partial<PeriodData>) => void;
  setConnectionStatus: (status: 'online' | 'offline' | 'loading') => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  currentPeriod: 'Bulan',
  data: periodData['Bulan'],
  isLiveData: false,
  connectionStatus: 'offline',

  setPeriod: (period) =>
    set({ currentPeriod: period, data: periodData[period] }),

  setLiveData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData }, isLiveData: true })),

  setConnectionStatus: (status) =>
    set({ connectionStatus: status }),
}));
