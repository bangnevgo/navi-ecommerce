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
      { id: 'tokopedia', label: 'Tokopedia',  icon: GlobeIcon },
      { id: 'shopee',    label: 'Shopee',      icon: ShopIcon  },
      { id: 'tiktok',    label: 'TikTok Shop', icon: PlayIcon  },
      { id: 'lazada',    label: 'Lazada',       icon: BagIcon   },
    ],
  },
  {
    label: 'Manajemen',
    items: [
      { id: 'produk',    label: 'Produk & SKU',   icon: BoxIcon,       badge: null },
      { id: 'inventori', label: 'Inventori',       icon: LayersIcon,    badge: { text: '2',  color: 'red'  as const } },
      { id: 'pelanggan', label: 'Pelanggan',       icon: UsersIcon },
      { id: 'pesanan',   label: 'Pesanan & Retur', icon: ClipboardIcon, badge: { text: '74', color: 'blue' as const } },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { id: 'laporan',       label: 'Laporan',       icon: ChartIcon },
      { id: 'agent-manager', label: 'Agent Manager', icon: BotIcon   },
    ],
  },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, activePage, setActivePage } = useUIStore();
  const w = sidebarCollapsed ? 56 : 240;

  return (
    <aside
      style={{ width: w, minWidth: w }}
      className="flex flex-col bg-[#0d1117] border-r border-[rgba(255,255,255,0.07)] relative z-10 overflow-hidden transition-all duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)]"
    >
      {/* Brand */}
      <div className="h-[52px] px-4 flex items-center gap-2.5 border-b border-[rgba(255,255,255,0.07)] flex-shrink-0 overflow-hidden whitespace-nowrap">
        <div className="w-[26px] h-[26px] min-w-[26px] rounded-[7px] bg-[#161b22] border border-[rgba(255,255,255,0.1)] flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#818cf8" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M2 17l10 5 10-5" stroke="#818cf8" strokeWidth="2" strokeLinejoin="round" strokeOpacity="0.5"/>
            <path d="M2 12l10 5 10-5" stroke="#818cf8" strokeWidth="2" strokeLinejoin="round" strokeOpacity="0.75"/>
          </svg>
        </div>
        {!sidebarCollapsed && (
          <div className="min-w-0">
            <div className="text-[13px] font-[700] tracking-[-0.3px] text-[#e6edf3]">NAVI Pro</div>
          </div>
        )}
      </div>

      {/* Client Selector */}
      {!sidebarCollapsed && (
        <div className="px-3 py-2.5 border-b border-[rgba(255,255,255,0.07)]">
          <div className="flex items-center gap-2 px-2.5 py-2 rounded-[8px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] cursor-pointer hover:bg-[rgba(255,255,255,0.055)] transition-colors">
            <div className="w-6 h-6 rounded-[6px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
              TF
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11.5px] font-[600] text-[#c9d1d9] truncate leading-tight">Toko Fashion Indo</div>
              <div className="text-[10px] text-[#484f58] mt-px">E-Commerce</div>
            </div>
            <ChevronDownIcon className="text-[#484f58] flex-shrink-0" />
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2">
        {navSections.map((section) => (
          <div key={section.label} className="mb-1">
            {!sidebarCollapsed && (
              <div className="px-2 pt-3 pb-1 text-[10px] font-[600] uppercase tracking-[0.8px] text-[#30363d]">
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
      <div className="p-3 border-t border-[rgba(255,255,255,0.07)]">
        <button
          onClick={toggleSidebar}
          className="w-full h-8 rounded-[7px] flex items-center justify-center text-[#484f58] hover:text-[#7d8590] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer"
        >
          <ChevronLeftIcon style={{ transform: sidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }} />
        </button>
      </div>
    </aside>
  );
}

// ── Inline SVG Icons ────────────────────────────────────────────────────────

function GridIcon() {
  return <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
}
function GlobeIcon() {
  return <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}
function ShopIcon() {
  return <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
}
function PlayIcon() {
  return <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
}
function BagIcon() {
  return <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
}
function BoxIcon() {
  return <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5 8v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 12h4"/></svg>;
}
function LayersIcon() {
  return <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
}
function UsersIcon() {
  return <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function ClipboardIcon() {
  return <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>;
}
function ChartIcon() {
  return <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
}
function BotIcon() {
  return <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>;
}
function ChevronDownIcon({ className }: { className?: string }) {
  return <svg className={`w-3 h-3 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
}
function ChevronLeftIcon({ style }: { style?: React.CSSProperties }) {
  return <svg className="w-[14px] h-[14px]" style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
}
