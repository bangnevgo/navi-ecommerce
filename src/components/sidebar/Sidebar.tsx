// ── Sidebar — NAVI Pro ──
'use client';

import { useUIStore } from '@/store/useUIStore';
import { NavItem } from './NavItem';

const navSections = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: GridIcon },
    ],
  },
  {
    label: 'Platform',
    items: [
      { id: 'tokopedia', label: 'Tokopedia',   icon: GlobeIcon },
      { id: 'shopee',    label: 'Shopee',       icon: ShopIcon  },
      { id: 'tiktok',    label: 'TikTok Shop',  icon: PlayIcon  },
      { id: 'lazada',    label: 'Lazada',        icon: BagIcon   },
    ],
  },
  {
    label: 'Manajemen',
    items: [
      { id: 'produk',    label: 'Produk & SKU',    icon: BoxIcon,    badge: null },
      { id: 'inventori', label: 'Inventori',        icon: LayersIcon, badge: { text: '2', color: 'red' as const } },
      { id: 'pelanggan', label: 'Pelanggan',        icon: UsersIcon },
      { id: 'pesanan',   label: 'Pesanan & Retur',  icon: ClipboardIcon, badge: { text: '74', color: 'blue' as const } },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { id: 'laporan',       label: 'Laporan',       icon: ChartIcon  },
      { id: 'agent-manager', label: 'Agent Manager', icon: BotIcon    },
    ],
  },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, activePage, setActivePage } = useUIStore();
  const w = sidebarCollapsed ? 64 : 252;

  return (
    <aside
      style={{ width: w, minWidth: w }}
      className="flex flex-col bg-[#080b14] border-r border-[rgba(255,255,255,0.055)] relative z-10 overflow-hidden transition-all duration-[280ms] ease-[cubic-bezier(.4,0,.2,1)] shadow-[2px_0_24px_rgba(0,0,0,0.5)]"
    >
      {/* Brand */}
      <div className="h-14 px-5 flex items-center gap-3 border-b border-[rgba(255,255,255,0.05)] flex-shrink-0 overflow-hidden whitespace-nowrap bg-[rgba(255,255,255,0.018)]">
        <div className="w-8 h-8 min-w-[32px] rounded-[9px] bg-gradient-to-br from-[#818cf8] to-[#6d28d9] flex items-center justify-center text-white font-black text-sm shadow-[0_4px_16px_rgba(99,102,241,0.4)]">
          N
        </div>
        {!sidebarCollapsed && (
          <div>
            <div className="text-[15px] font-[800] tracking-[-0.5px] bg-gradient-to-r from-[#e0e4ff] to-[#a5b4fc] bg-clip-text text-transparent">
              NAVI Pro
            </div>
            <div className="text-[9px] text-[#424e62] tracking-[1.2px] uppercase mt-0.5">
              Analytics Platform
            </div>
          </div>
        )}
      </div>

      {/* Client Selector */}
      {!sidebarCollapsed && (
        <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.05)] overflow-hidden whitespace-nowrap">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] bg-[#0c0f18] border border-[rgba(255,255,255,0.065)] cursor-pointer hover:border-[rgba(255,255,255,0.115)] transition-colors">
            <div className="w-8 h-8 rounded-[8px] bg-gradient-to-br from-[#6366f1] to-[#a78bfa] flex items-center justify-center text-white text-xs font-bold shadow-[0_2px_8px_rgba(99,102,241,0.3)] flex-shrink-0">
              TF
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-semibold text-[#eef0f8] truncate">Toko Fashion Indo</div>
              <div className="text-[10px] text-[#424e62] mt-0.5">E-Commerce · Multi-Platform</div>
            </div>
            <ChevronDownIcon className="ml-auto flex-shrink-0 text-[#424e62]" />
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2">
        {navSections.map((section) => (
          <div key={section.label}>
            {!sidebarCollapsed && (
              <div className="px-2.5 pt-3 pb-1 text-[9px] font-[800] uppercase tracking-[1.5px] text-[#272f3e]">
                {section.label}
              </div>
            )}
            {section.items.map((item) => (
              <NavItem
                key={item.id}
                icon={<item.icon />}
                label={item.label}
                active={activePage === item.id}
                collapsed={sidebarCollapsed}
                badge={'badge' in item ? item.badge : undefined}
                onClick={() => setActivePage(item.id)}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* Footer toggle */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.05)] flex justify-center">
        <button
          onClick={toggleSidebar}
          className="w-9 h-9 rounded-[8px] bg-[#0a0d16] border border-[rgba(255,255,255,0.065)] flex items-center justify-center hover:bg-[#161b28] hover:border-[rgba(255,255,255,0.115)] transition-colors cursor-pointer"
        >
          <ChevronLeftIcon
            className="text-[#7e8a9f] transition-transform duration-250"
            style={{ transform: sidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>
      </div>
    </aside>
  );
}

// ── Inline SVG Icons ────────────────────────────────────────────────────────

function GridIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
}
function GlobeIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}
function ShopIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
}
function PlayIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
}
function BagIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
}
function BoxIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5 8v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 12h4"/></svg>;
}
function LayersIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
}
function UsersIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function ClipboardIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>;
}
function ChartIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
}
function BotIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
}
function ChevronDownIcon({ className }: { className?: string }) {
  return <svg className={`w-3 h-3 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
}
function ChevronLeftIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <svg className={`w-4 h-4 ${className}`} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
}
