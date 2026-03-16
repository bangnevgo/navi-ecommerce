'use client';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Topbar } from '@/components/topbar/Topbar';
import { ToastContainer } from '@/components/ui/Toast';
import { AIInsightPanel } from '@/components/ai/AIInsightPanel';
import { AgentChatOverlay } from '@/components/ai/AgentChatOverlay';
import { CommandPalette } from '@/components/ui/CommandPalette';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#080b12]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-5 bg-[#080b12]">
          {children}
        </main>
      </div>
      <AIInsightPanel />
      <AgentChatOverlay />
      <CommandPalette />
      <ToastContainer />
    </div>
  );
}
