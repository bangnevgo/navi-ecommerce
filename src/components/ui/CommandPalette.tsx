'use client';
import { useEffect, useState, useCallback } from 'react';
import { Command } from 'cmdk';
import * as Dialog from '@radix-ui/react-dialog';
import { useUIStore } from '@/store/useUIStore';
import { useToast } from '@/store/useToastStore';

interface CommandItem {
  id: string;
  label: string;
  sub?: string;
  icon: React.ReactNode;
  group: string;
  action: () => void;
  keywords?: string[];
}

function SearchIcon() {
  return <svg className="w-4 h-4 text-[#6e7681]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
}
function NavIcon() {
  return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
}
function BotIcon() {
  return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>;
}
function ExportIcon() {
  return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}
function ChartIcon() {
  return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { setActivePage, openAgent, openAgentChat } = useUIStore();
  const toast = useToast();

  // ⌘K toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const go = useCallback((page: string) => {
    setActivePage(page);
    setOpen(false);
  }, [setActivePage]);

  const commands: CommandItem[] = [
    // Navigation
    { id: 'nav-dashboard',  label: 'Dashboard',        sub: 'Ringkasan semua platform',       icon: <ChartIcon />, group: 'Navigasi', action: () => go('dashboard'),      keywords: ['home', 'utama'] },
    { id: 'nav-tokopedia',  label: 'Tokopedia',         sub: 'Analytics Tokopedia',            icon: <NavIcon />,   group: 'Navigasi', action: () => go('tokopedia') },
    { id: 'nav-shopee',     label: 'Shopee',            sub: 'Analytics Shopee',               icon: <NavIcon />,   group: 'Navigasi', action: () => go('shopee') },
    { id: 'nav-tiktok',     label: 'TikTok Shop',       sub: 'Analytics TikTok Shop',          icon: <NavIcon />,   group: 'Navigasi', action: () => go('tiktok') },
    { id: 'nav-lazada',     label: 'Lazada',            sub: 'Analytics Lazada',               icon: <NavIcon />,   group: 'Navigasi', action: () => go('lazada') },
    { id: 'nav-produk',     label: 'Produk & SKU',      sub: 'Manajemen produk',               icon: <NavIcon />,   group: 'Navigasi', action: () => go('produk') },
    { id: 'nav-inventori',  label: 'Inventori',         sub: 'Status stok',                    icon: <NavIcon />,   group: 'Navigasi', action: () => go('inventori'),      keywords: ['stok', 'stock'] },
    { id: 'nav-laporan',    label: 'Laporan',           sub: 'Laporan & analytics',            icon: <ChartIcon />, group: 'Navigasi', action: () => go('laporan') },
    // AI Agents
    { id: 'ai-navi',        label: 'Tanya NAVI',        sub: 'Chat dengan NAVI AI Agent',      icon: <BotIcon />,   group: 'AI Agents', action: () => { openAgent(); setOpen(false); },         keywords: ['chat', 'ai', 'claude'] },
    { id: 'ai-inventory',   label: 'Inventory Manager', sub: 'Analisis stok & restock',        icon: <BotIcon />,   group: 'AI Agents', action: () => { openAgentChat('inventory'); setOpen(false); } },
    { id: 'ai-price',       label: 'Price Optimizer',   sub: 'Optimasi harga per platform',   icon: <BotIcon />,   group: 'AI Agents', action: () => { openAgentChat('price'); setOpen(false); } },
    { id: 'ai-forecast',    label: 'Sales Forecaster',  sub: 'Proyeksi revenue & demand',     icon: <BotIcon />,   group: 'AI Agents', action: () => { openAgentChat('forecast'); setOpen(false); } },
    { id: 'ai-marketing',   label: 'Marketing Strategist', sub: 'Strategi kampanye & promo',  icon: <BotIcon />,   group: 'AI Agents', action: () => { openAgentChat('marketing'); setOpen(false); } },
    // Actions
    { id: 'act-export',     label: 'Export CSV',        sub: 'Download data ke CSV',           icon: <ExportIcon />, group: 'Aksi', action: () => { toast('📥 Export CSV dimulai...', 'info'); setOpen(false); } },
  ];

  const groups = [...new Set(commands.map(c => c.group))];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-[3px] animate-fadeIn" />
        <Dialog.Content
          className="fixed z-[201] left-1/2 top-[20%] -translate-x-1/2 w-[560px] max-h-[480px]
            bg-[#111620] rounded-[16px] border border-[rgba(255,255,255,0.1)]
            shadow-[0_32px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)]
            overflow-hidden animate-cmdIn focus:outline-none flex flex-col"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Command Palette</Dialog.Title>

          <Command className="flex flex-col flex-1 min-h-0" loop>
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[rgba(255,255,255,0.07)] flex-shrink-0">
              <SearchIcon />
              <Command.Input
                placeholder="Cari halaman, aksi, atau AI agent..."
                className="flex-1 bg-transparent text-[13px] text-[#c9d1d9] placeholder:text-[#3d444d] outline-none"
                autoFocus
              />
              <kbd className="text-[10px] text-[#3d444d] font-mono bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[5px] px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <Command.List className="flex-1 overflow-y-auto p-2">
              <Command.Empty className="py-12 text-center text-[12px] text-[#3d444d]">
                Tidak ada hasil untuk pencarian ini
              </Command.Empty>

              {groups.map(group => (
                <Command.Group
                  key={group}
                  heading={group}
                  className="[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-[600] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.6px] [&_[cmdk-group-heading]]:text-[#3d444d] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:select-none mb-1"
                >
                  {commands.filter(c => c.group === group).map(cmd => (
                    <Command.Item
                      key={cmd.id}
                      value={`${cmd.label} ${cmd.sub ?? ''} ${cmd.keywords?.join(' ') ?? ''}`}
                      onSelect={cmd.action}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-[8px] cursor-pointer
                        text-[#8b949e] transition-colors
                        data-[selected=true]:bg-[rgba(99,102,241,0.1)] data-[selected=true]:text-[#c9d1d9]
                        data-[selected=true]:border-[rgba(99,102,241,0.2)]"
                    >
                      <span className="flex-shrink-0 text-[#6e7681] data-[selected=true]:text-[#818cf8]">
                        {cmd.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-[500] leading-tight">{cmd.label}</div>
                        {cmd.sub && <div className="text-[10.5px] text-[#6e7681] mt-0.5 truncate">{cmd.sub}</div>}
                      </div>
                      <kbd className="hidden data-[selected=true]:flex text-[9px] text-[#6e7681] font-mono bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.07)] rounded-[4px] px-1.5 py-0.5 items-center gap-0.5">
                        <span className="text-[10px]">↵</span>
                      </kbd>
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-[rgba(255,255,255,0.06)] flex-shrink-0">
              <div className="flex items-center gap-3 text-[10px] text-[#3d444d]">
                <span className="flex items-center gap-1"><kbd className="font-mono bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] rounded px-1 text-[9px]">↑↓</kbd> navigasi</span>
                <span className="flex items-center gap-1"><kbd className="font-mono bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] rounded px-1 text-[9px]">↵</kbd> pilih</span>
                <span className="flex items-center gap-1"><kbd className="font-mono bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] rounded px-1 text-[9px]">esc</kbd> tutup</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#3d444d]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-livePulse" />
                NAVI Pro
              </div>
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
