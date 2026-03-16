'use client';
import {
  Table, TableHead, TableHeaderCell,
  TableBody, TableRow, TableCell,
  Badge,
} from '@tremor/react';
import { mockProducts, type StockStatus } from '@/data/mockProducts';

const statusConfig: Record<StockStatus, { label: string; color: 'emerald' | 'yellow' | 'rose' }> = {
  ready:    { label: 'Ready',     color: 'emerald' },
  low:      { label: 'Low Stock', color: 'yellow'  },
  critical: { label: 'Kritis',    color: 'rose'    },
};

const platformColor: Record<string, string> = {
  Tokopedia:    '#10d9a0',
  Shopee:       '#f43f5e',
  'TikTok Shop':'#818cf8',
  Lazada:       '#fbbf24',
};

export function ProductsTable() {
  return (
    <div className="rounded-[12px] border border-[rgba(255,255,255,0.07)] bg-[#0d1117] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.07)] flex items-center justify-between">
        <div>
          <h3 className="text-[12.5px] font-[650] text-[#c9d1d9]">Produk Terlaris</h3>
          <p className="text-[11px] text-[#484f58] mt-0.5">7 produk teratas berdasarkan revenue</p>
        </div>
        <button className="text-[11px] text-[#484f58] hover:text-[#7d8590] transition-colors cursor-pointer">
          Lihat semua →
        </button>
      </div>

      {/* Tremor Table */}
      <Table className="tremor-table-navi">
        <TableHead>
          <TableRow className="border-b border-[rgba(255,255,255,0.05)]">
            {['Produk', 'SKU', 'Platform', 'Terjual', 'Revenue', 'Stok', 'Status'].map((h) => (
              <TableHeaderCell
                key={h}
                className="text-[10px] font-[600] uppercase tracking-[0.6px] text-[#30363d] bg-transparent py-2.5"
              >
                {h}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {mockProducts.map((p) => {
            const st = statusConfig[p.status];
            return (
              <TableRow
                key={p.id}
                className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
              >
                <TableCell className="text-[12px] font-[550] text-[#c9d1d9] max-w-[180px] truncate py-3">
                  {p.name}
                </TableCell>
                <TableCell className="font-mono text-[11px] text-[#484f58] py-3">
                  {p.sku}
                </TableCell>
                <TableCell className="py-3">
                  <span className="text-[11.5px] font-[600]" style={{ color: platformColor[p.platform] ?? '#7d8590' }}>
                    {p.platform}
                  </span>
                </TableCell>
                <TableCell className="font-mono text-[12px] text-[#7d8590] py-3 tabular-nums">
                  {p.sold}
                </TableCell>
                <TableCell className="font-mono text-[12px] font-[600] text-[#c9d1d9] py-3 tabular-nums">
                  {p.revenue}
                </TableCell>
                <TableCell className="font-mono text-[12px] text-[#7d8590] py-3 tabular-nums">
                  {p.stock}
                </TableCell>
                <TableCell className="py-3">
                  <Badge color={st.color} size="xs">
                    {st.label}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
