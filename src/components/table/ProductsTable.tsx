'use client';
import { mockProducts, type StockStatus } from '@/data/mockProducts';
import { Badge } from '@/components/ui/Badge';

const statusMap: Record<StockStatus, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
  ready:    { label: 'Ready',    variant: 'success' },
  low:      { label: 'Low Stock', variant: 'warning' },
  critical: { label: 'Kritis',   variant: 'danger'  },
};

const platformColor: Record<string, string> = {
  Tokopedia: '#10d9a0',
  Shopee:    '#f43f5e',
  'TikTok Shop': '#6366f1',
  Lazada:    '#fbbf24',
};

export function ProductsTable() {
  return (
    <div className="bg-gradient-to-br from-[#0f1320] to-[#0b0e18] rounded-[14px] border border-[rgba(255,255,255,0.065)] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.055)] flex items-center justify-between">
        <div>
          <h3 className="text-[13px] font-bold text-[#eef0f8]">Produk Terlaris</h3>
          <p className="text-[11px] text-[#424e62] mt-0.5">7 produk teratas berdasarkan revenue</p>
        </div>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.015)]">
            {['Produk', 'SKU', 'Platform', 'Terjual', 'Revenue', 'Stok', 'Status'].map((h) => (
              <th key={h} className="px-4 py-2.5 text-left text-[10px] font-[700] uppercase tracking-[0.8px] text-[#424e62]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockProducts.map((p, i) => {
            const st = statusMap[p.status];
            return (
              <tr
                key={p.id}
                className="border-b border-[rgba(255,255,255,0.035)] hover:bg-[rgba(255,255,255,0.022)] transition-colors"
              >
                <td className="px-4 py-3 text-[12.5px] font-semibold text-[#eef0f8] max-w-[200px] truncate">{p.name}</td>
                <td className="px-4 py-3 font-['JetBrains_Mono',monospace] text-[11px] text-[#424e62]">{p.sku}</td>
                <td className="px-4 py-3">
                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: platformColor[p.platform] || '#7e8a9f' }}
                  >
                    {p.platform}
                  </span>
                </td>
                <td className="px-4 py-3 font-['JetBrains_Mono',monospace] text-[12px] text-[#7e8a9f]">{p.sold}</td>
                <td className="px-4 py-3 font-['JetBrains_Mono',monospace] text-[12px] font-semibold text-[#eef0f8]">{p.revenue}</td>
                <td className="px-4 py-3 font-['JetBrains_Mono',monospace] text-[12px] text-[#7e8a9f]">{p.stock}</td>
                <td className="px-4 py-3">
                  <Badge variant={st.variant}>{st.label}</Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
