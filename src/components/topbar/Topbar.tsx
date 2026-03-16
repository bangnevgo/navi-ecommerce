// ── Topbar — NAVI Pro ──
'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { useDashboardStore } from '@/store/useDashboardStore';
import { useUIStore } from '@/store/useUIStore';
import { useToast } from '@/store/useToastStore';
import { PeriodTabs } from './PeriodTabs';
import type { Period } from '@/data/periodData';

const pageLabels: Record<string, string> = {
  dashboard:       'E-Commerce',
  tokopedia:       'Tokopedia',
  shopee:          'Shopee',
  tiktok:          'TikTok Shop',
  lazada:          'Lazada',
  produk:          'Produk & SKU',
  inventori:       'Inventori',
  pelanggan:       'Pelanggan',
  pesanan:         'Pesanan & Retur',
  laporan:         'Laporan',
  'agent-manager': 'Agent Manager',
};

function TopbarTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip.Provider delayDuration={500}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children as React.ReactElement}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            sideOffset={6}
            className="z-[100] px-2 py-1 rounded-[6px] text-[11px] font-[500] text-[#c9d1d9] bg-[#161b22] border border-[rgba(255,255,255,0.1)] shadow-[0_4px_12px_rgba(0,0,0,0.5)] select-none animate-fadeIn"
          >
            {label}
            <Tooltip.Arrow className="fill-[#161b22]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export function Topbar() {
  const { currentPeriod, setPeriod } = useDashboardStore();
  const { activePage, openAgent, toggleNotif } = useUIStore();
  const toast = useToast();

  const showPeriodTabs = ['dashboard', 'tokopedia', 'shopee', 'tiktok', 'lazada'].includes(activePage);

  return (
    <header className="h-[52px] bg-[#0d1117] border-b border-[rgba(255,255,255,0.07)] flex items-center justify-between px-5 flex-shrink-0 relative z-[5]">

      {/* Left — breadcrumb */}
      <div className="flex items-center gap-2">
        <span className="text-[12px] text-[#484f58] font-[450]">NAVI Pro</span>
        <span className="text-[#21262d]">/</span>
        <span className="text-[13px] text-[#c9d1d9] font-[600]">{pageLabels[activePage] || activePage}</span>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-1.5">
        {showPeriodTabs && (
          <>
            <PeriodTabs current={currentPeriod} onChange={(p: Period) => setPeriod(p)} />
            <div className="w-px h-4 bg-[rgba(255,255,255,0.07)] mx-1" />
          </>
        )}

        {/* ⌘K search */}
        <TopbarTooltip label="Command palette (⌘K)">
          <button
            onClick={() => toast('Tekan ⌘K untuk Command Palette', 'info')}
            className="h-7 px-2.5 flex items-center gap-1.5 rounded-[6px] text-[#484f58] hover:text-[#7d8590] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer"
          >
            <SearchIcon />
            <kbd className="text-[10px] font-[500] text-[#30363d] font-mono">⌘K</kbd>
          </button>
        </TopbarTooltip>

        {/* Tanya NAVI */}
        <button
          onClick={openAgent}
          className="h-7 px-3 flex items-center gap-1.5 rounded-[6px]
            bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.22)]
            text-[#818cf8] hover:bg-[rgba(99,102,241,0.16)] hover:border-[rgba(99,102,241,0.35)]
            transition-all text-[11.5px] font-[600] cursor-pointer"
        >
          <SparkleIcon />
          Tanya NAVI
        </button>

        <div className="w-px h-4 bg-[rgba(255,255,255,0.07)] mx-0.5" />

        {/* Export */}
        <TopbarTooltip label="Export CSV">
          <button
            onClick={() => toast('📥 Export CSV dimulai...', 'info')}
            className="w-7 h-7 flex items-center justify-center rounded-[6px] text-[#484f58] hover:text-[#7d8590] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer"
          >
            <DownloadIcon />
          </button>
        </TopbarTooltip>

        {/* Notifications */}
        <TopbarTooltip label="Notifikasi">
          <button
            onClick={toggleNotif}
            className="relative w-7 h-7 flex items-center justify-center rounded-[6px] text-[#484f58] hover:text-[#7d8590] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer"
          >
            <BellIcon />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#f85149] rounded-full ring-1 ring-[#0d1117]" />
          </button>
        </TopbarTooltip>

        {/* Avatar */}
        <TopbarTooltip label="Toko Fashion Indo">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[10px] font-[700] cursor-pointer ml-0.5 ring-1 ring-[rgba(99,102,241,0.3)]">
            TF
          </div>
        </TopbarTooltip>
      </div>
    </header>
  );
}

function SearchIcon() {
  return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
}
function SparkleIcon() {
  return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;
}
function DownloadIcon() {
  return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}
function BellIcon() {
  return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
}
