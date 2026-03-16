'use client';
import { KpiRow } from '@/components/kpi/KpiCard';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { PlatformGrid } from '@/components/platform/PlatformGrid';
import { ProductsTable } from '@/components/table/ProductsTable';
import { AgentGrid } from '@/components/ai/AIInsightPanel';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
      {/* KPI Row */}
      <KpiRow />

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Platform Grid */}
      <PlatformGrid />

      {/* Bottom row: table + agents */}
      <div className="grid grid-cols-[1fr_340px] gap-6">
        <ProductsTable />
        <AgentGrid />
      </div>
    </div>
  );
}
