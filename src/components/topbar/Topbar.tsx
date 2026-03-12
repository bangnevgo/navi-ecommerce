// ── Topbar — NAVI Pro ──
'use client';

import { useDashboardStore } from '@/store/useDashboardStore';
import { useUIStore } from '@/store/useUIStore';
import { useToast } from '@/store/useToastStore';
import { Button } from '@/components/ui/Badge';
import { PeriodTabs } from './PeriodTabs';
import type { Period } from '@/data/periodData';

const pageLabels: Record<string, string> = {
  dashboard:     'E-Commerce',
  tokopedia:     'Tokopedia',
  shopee:        'Shopee',
  tiktok:        'TikTok Shop',
  lazada:        'Lazada',
  produk:        'Produk & SKU',
  inventori:     'Inventori',
  pelanggan:     'Pelanggan',
  pesanan:       'Pesanan & Retur',
  laporan:       'Laporan',
  'agent-manager': 'Agent Manager',
};

export function Topbar() {
  const { currentPeriod, setPeriod } = useDashboardStore();
  const { activePage, openAgent, toggleNotif, openModal } = useUIStore();
  const toast = useToast();

  const pageLabel = pageLabels[activePage] || activePage;
  const showPeriodTabs = ['dashboard', 'tokopedia', 'shopee', 'tiktok', 'lazada'].includes(activePage);

  return (
    <header className="h-14 bg-[rgba(12,15,24,0.92)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.055)] flex items-center justify-between px-6 flex-shrink-0 relative z-[5] shadow-[0_1px_0_rgba(255,255,255,0.025),0_4px_20px_rgba(0,0,0,0.3)]">

      {/* Left: breadcrumb */}
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-[#7e8a9f] font-[500]">NAVI Pro</span>
        <span className="text-[#272f3e] text-[11px] opacity-40">/</span>
        <span className="text-[14px] text-[#eef0f8] font-[700] tracking-[-0.3px]">{pageLabel}</span>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-3">
        {showPeriodTabs && (
          <PeriodTabs
            current={currentPeriod}
            onChange={(p: Period) => setPeriod(p)}
          />
        )}

        {/* ⌘K hint */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toast('Tekan ⌘K untuk Command Palette', 'info')}
          className="gap-1.5"
        >
          <SearchIcon />
          <span className="text-[11px] opacity-70">⌘K</span>
        </Button>

        {/* AI Agent */}
        <Button variant="primary" size="sm" onClick={openAgent} icon={<ChatIcon />}>
          Tanya NAVI
        </Button>

        {/* Export */}
        <Button
          variant="ghost"
          size="sm"
          icon={<DownloadIcon />}
          onClick={() => toast('📥 Export CSV dimulai...', 'info')}
        >
          Export
        </Button>

        {/* Notif bell */}
        <button
          onClick={toggleNotif}
          className="relative w-8 h-8 rounded-[7px] bg-transparent border border-[rgba(255,255,255,0.065)] flex items-center justify-center hover:bg-[#161b28] transition-colors cursor-pointer"
        >
          <BellIcon />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#f43f5e] rounded-full" />
        </button>
      </div>
    </header>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────

function SearchIcon() {
  return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
}
function ChatIcon() {
  return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}
function DownloadIcon() {
  return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}
function BellIcon() {
  return <svg className="w-4 h-4 stroke-[#7e8a9f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
}
