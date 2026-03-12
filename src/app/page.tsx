'use client';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import DashboardPage from '@/pages/Dashboard';
import { PlatformPage } from '@/pages/PlatformPage';
import InventoryPage from '@/pages/InventoryPage';
import { useUIStore } from '@/store/useUIStore';
import { ProductsTable } from '@/components/table/ProductsTable';
import { AgentGrid } from '@/components/ai/AIInsightPanel';

const PLATFORM_NAMES: Record<string, string> = {
  tokopedia: 'Tokopedia',
  shopee:    'Shopee',
  tiktok:    'TikTok Shop',
  lazada:    'Lazada',
};

function PageRouter() {
  const { activePage } = useUIStore();

  if (activePage === 'dashboard')  return <DashboardPage />;
  if (activePage === 'inventori')  return <InventoryPage />;
  if (activePage === 'produk')     return <div className="max-w-[1200px] mx-auto"><ProductsTable /></div>;
  if (activePage === 'agent-manager') return <div className="max-w-[600px] mx-auto"><AgentGrid /></div>;

  if (PLATFORM_NAMES[activePage]) {
    return <PlatformPage platformId={activePage} platformName={PLATFORM_NAMES[activePage]} />;
  }

  // Placeholder for other pages
  return (
    <div className="flex flex-col items-center justify-center h-60 gap-3">
      <span className="text-4xl">🚧</span>
      <p className="text-[14px] font-bold text-[#eef0f8] capitalize">{activePage}</p>
      <p className="text-[12px] text-[#424e62]">Halaman ini sedang dalam pengembangan</p>
    </div>
  );
}

export default function Home() {
  return (
    <DashboardLayout>
      <PageRouter />
    </DashboardLayout>
  );
}
