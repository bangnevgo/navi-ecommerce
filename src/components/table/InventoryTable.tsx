'use client';
import {
  Table, TableHead, TableHeaderCell,
  TableBody, TableRow, TableCell,
  Badge, ProgressBar,
} from '@tremor/react';
import { mockInventory, type StockStatus } from '@/data/mockProducts';

const statusConfig: Record<StockStatus, { label: string; color: 'emerald' | 'yellow' | 'rose' }> = {
  ready:    { label: 'Aman',        color: 'emerald' },
  low:      { label: 'Hampir Habis',color: 'yellow'  },
  critical: { label: 'Kritis',      color: 'rose'    },
};

const barColor: Record<StockStatus, 'emerald' | 'yellow' | 'rose'> = {
  ready:    'emerald',
  low:      'yellow',
  critical: 'rose',
};

export function InventoryTable() {
  const criticalCount = mockInventory.filter(i => i.status === 'critical').length;
  const lowCount      = mockInventory.filter(i => i.status === 'low').length;

  return (
    <div className="rounded-[12px] border border-[rgba(255,255,255,0.07)] bg-[#0d1117] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.07)] flex items-center justify-between">
        <div>
          <h3 className="text-[12.5px] font-[650] text-[#c9d1d9]">Status Inventori</h3>
          <p className="text-[11px] text-[#484f58] mt-0.5">Estimasi hari berdasarkan rata-rata penjualan</p>
        </div>
        <div className="flex gap-2">
          {criticalCount > 0 && (
            <Badge color="rose" size="xs">{criticalCount} Kritis</Badge>
          )}
          {lowCount > 0 && (
            <Badge color="yellow" size="xs">{lowCount} Hampir Habis</Badge>
          )}
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow className="border-b border-[rgba(255,255,255,0.05)]">
            {['SKU', 'Produk', 'Stok', 'Reorder Point', 'Sisa Hari', 'Status'].map((h) => (
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
          {mockInventory.map((item) => {
            const st  = statusConfig[item.status];
            const bc  = barColor[item.status];
            const pct = Math.round((item.currentStock / item.maxStock) * 100);
            return (
              <TableRow
                key={item.sku}
                className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
              >
                <TableCell className="font-mono text-[11px] text-[#484f58] py-3">{item.sku}</TableCell>
                <TableCell className="text-[12px] font-[550] text-[#c9d1d9] py-3">{item.name}</TableCell>
                <TableCell className="py-3 min-w-[100px]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[12px] text-[#7d8590] w-6 tabular-nums">{item.currentStock}</span>
                    <ProgressBar value={Math.min(pct, 100)} color={bc} className="w-20 h-1" showAnimation={false} />
                  </div>
                </TableCell>
                <TableCell className="font-mono text-[11px] text-[#484f58] py-3 tabular-nums">{item.reorderPoint}</TableCell>
                <TableCell className="py-3">
                  <span className={`font-mono text-[12px] font-[600] tabular-nums ${
                    item.status === 'critical' ? 'text-rose-400'
                    : item.status === 'low' ? 'text-yellow-400'
                    : 'text-emerald-400'
                  }`}>
                    {item.daysRemaining}h
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  <Badge color={st.color} size="xs">{st.label}</Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
