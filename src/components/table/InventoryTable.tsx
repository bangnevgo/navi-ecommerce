'use client';
import { mockInventory, type StockStatus } from '@/data/mockProducts';
import { Badge } from '@/components/ui/Badge';

const statusMap: Record<StockStatus, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
  ready:    { label: 'Aman',    variant: 'success' },
  low:      { label: 'Hampir Habis', variant: 'warning' },
  critical: { label: 'Kritis!', variant: 'danger'  },
};

export function InventoryTable() {
  return (
    <div className="bg-gradient-to-br from-[#0f1320] to-[#0b0e18] rounded-[14px] border border-[rgba(255,255,255,0.065)] overflow-hidden">
      <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.055)] flex items-center justify-between">
        <div>
          <h3 className="text-[13px] font-bold text-[#eef0f8]">Status Inventori</h3>
          <p className="text-[11px] text-[#424e62] mt-0.5">Estimasi hari berdasarkan rata-rata penjualan</p>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] px-2 py-1 rounded-[5px] bg-[rgba(244,63,94,0.09)] text-[#f43f5e] border border-[rgba(244,63,94,0.22)] font-bold">
            🔴 2 Kritis
          </span>
          <span className="text-[10px] px-2 py-1 rounded-[5px] bg-[rgba(251,191,36,0.09)] text-[#fbbf24] border border-[rgba(251,191,36,0.22)] font-bold">
            🟡 1 Hampir Habis
          </span>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.015)]">
            {['SKU', 'Produk', 'Stok', 'Reorder Point', 'Sisa Hari', 'Status'].map((h) => (
              <th key={h} className="px-4 py-2.5 text-left text-[10px] font-[700] uppercase tracking-[0.8px] text-[#424e62]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockInventory.map((item) => {
            const st = statusMap[item.status];
            const pct = Math.round((item.currentStock / item.maxStock) * 100);
            const barColor = item.status === 'critical' ? '#f43f5e' : item.status === 'low' ? '#fbbf24' : '#10d9a0';
            return (
              <tr
                key={item.sku}
                className="border-b border-[rgba(255,255,255,0.035)] hover:bg-[rgba(255,255,255,0.022)] transition-colors"
              >
                <td className="px-4 py-3 font-['JetBrains_Mono',monospace] text-[11px] text-[#424e62]">{item.sku}</td>
                <td className="px-4 py-3 text-[12.5px] font-semibold text-[#eef0f8]">{item.name}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-['JetBrains_Mono',monospace] text-[12px] text-[#7e8a9f] w-6">{item.currentStock}</span>
                    <div className="flex-1 h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden w-20">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: barColor }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-['JetBrains_Mono',monospace] text-[11px] text-[#424e62]">{item.reorderPoint}</td>
                <td className="px-4 py-3 font-['JetBrains_Mono',monospace] text-[12px]" style={{ color: barColor }}>{item.daysRemaining}</td>
                <td className="px-4 py-3"><Badge variant={st.variant}>{st.label}</Badge></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
