'use client';
import { useDashboardStore } from '@/store/useDashboardStore';

interface KpiCardProps {
  label: string;
  value: string;
  sub: string;
  growth: string;
  icon: string;
  positive?: boolean;
  stagger?: number;
}

export function KpiCard({ label, value, sub, growth, icon, positive = true, stagger = 0 }: KpiCardProps) {
  const isPos = positive;
  return (
    <div
      className="relative flex-1 min-w-0 rounded-[14px] border border-[rgba(255,255,255,0.065)] p-[18px] overflow-hidden cursor-default
        bg-gradient-to-br from-[#0f1320] to-[#0b0e18]
        shadow-[0_2px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]
        hover:border-[rgba(99,102,241,0.25)] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(99,102,241,0.12)]
        transition-all duration-200 animate-fadeUp"
      style={{ animationDelay: `${stagger * 0.04}s` }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold text-[#7e8a9f] tracking-[0.1px]">{label}</span>
        <span className="text-lg">{icon}</span>
      </div>

      {/* Value */}
      <div className="font-['Sora',sans-serif] text-[26px] font-[800] tracking-[-1px] text-[#eef0f8] leading-none mb-1.5">
        {value}
      </div>

      {/* Sub + growth */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-[10.5px] text-[#424e62] truncate max-w-[60%]">{sub}</span>
        <span className={`text-[11px] font-bold px-[7px] py-[2px] rounded-[5px]
          ${isPos
            ? 'bg-[rgba(16,217,160,0.09)] text-[#10d9a0]'
            : 'bg-[rgba(244,63,94,0.09)] text-[#f43f5e]'
          }`}>
          {growth}
        </span>
      </div>
    </div>
  );
}

export function KpiRow() {
  const { data } = useDashboardStore();

  const cards = [
    { label: 'Total GMV', value: `Rp ${data.gmv}`, sub: data.gmvSub, growth: data.gmvGrowth, icon: '💰', positive: true },
    { label: 'Total Pesanan', value: data.pesanan, sub: `${data.days} hari terakhir`, growth: data.pesananGrowth, icon: '🛒', positive: true },
    { label: 'Net Profit', value: `Rp ${data.netProfit}`, sub: data.profitSub, growth: data.netGrowth, icon: '📈', positive: true },
    { label: 'Return Rate', value: `${data.returnRate}%`, sub: 'Dari total pesanan', growth: data.returnChange, icon: '↩️', positive: false },
  ];

  return (
    <div className="flex gap-4">
      {cards.map((c, i) => (
        <KpiCard key={c.label} {...c} stagger={i + 1} />
      ))}
    </div>
  );
}
