'use client';
import { useEffect, useRef, useState } from 'react';
import { SparkAreaChart, BadgeDelta } from '@tremor/react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { generateChartData } from '@/utils/format';

// ── Animated counter ─────────────────────────────────────────────────────

function useCountUp(target: string, duration = 600) {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);

  useEffect(() => {
    if (prevRef.current === target) return;
    prevRef.current = target;
    // Trigger re-key for CSS animation
    setDisplay(target);
  }, [target]);

  return display;
}

// ── KPI Card ─────────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: string;
  sub: string;
  growth: string;
  positive?: boolean;
  stagger?: number;
  color: 'emerald' | 'indigo' | 'amber' | 'rose';
  icon: React.ReactNode;
}

const colorMap = {
  emerald: { text: '#3fb950', muted: 'rgba(63,185,80,0.08)',   border: 'rgba(63,185,80,0.15)'   },
  indigo:  { text: '#818cf8', muted: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.15)'  },
  amber:   { text: '#d29922', muted: 'rgba(210,153,34,0.08)',  border: 'rgba(210,153,34,0.15)'  },
  rose:    { text: '#f85149', muted: 'rgba(248,81,73,0.08)',   border: 'rgba(248,81,73,0.15)'   },
};

function KpiCard({ label, value, sub, growth, positive = true, stagger = 0, color, icon }: KpiCardProps) {
  const [key, setKey] = useState(0);
  const prevValue = useRef(value);
  const c = colorMap[color];

  useEffect(() => {
    if (prevValue.current !== value) {
      prevValue.current = value;
      setKey(k => k + 1);
    }
  }, [value]);

  const sparkData = generateChartData(14).map((v, i) => ({
    i: String(i),
    v: positive ? v + i * 1.2 : v - i * 0.8,
  }));

  const deltaType = positive ? 'moderateIncrease' : 'moderateDecrease';

  return (
    <div
      className={`relative flex-1 min-w-0 rounded-[12px] p-5 cursor-default overflow-hidden
        border border-[rgba(255,255,255,0.07)] bg-[#0d1117] group
        hover:border-[rgba(255,255,255,0.13)]
        transition-all duration-200 animate-fadeUp stagger-${stagger + 1}`}
    >
      {/* Top edge accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${c.text}60 50%, transparent 100%)` }}
      />

      {/* Icon + label row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0"
            style={{ background: c.muted, border: `1px solid ${c.border}` }}
          >
            <span style={{ color: c.text }}>{icon}</span>
          </div>
          <span className="text-[11px] font-[500] text-[#6e7681] uppercase tracking-[0.5px]">
            {label}
          </span>
        </div>
        <BadgeDelta deltaType={deltaType} size="xs">{growth}</BadgeDelta>
      </div>

      {/* Value — animated on change */}
      <div
        key={key}
        className="animate-countUp text-[28px] font-[760] tracking-[-1px] leading-none mb-1.5"
        style={{
          color: '#e6edf3',
          fontFeatureSettings: '"tnum" 1, "ss01" 1',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </div>

      {/* Sub text */}
      <p className="text-[11px] text-[#3d444d] mb-4 truncate">{sub}</p>

      {/* Sparkline — always visible, dims at rest */}
      <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-300 -mx-1">
        <SparkAreaChart
          data={sparkData}
          index="i"
          categories={['v']}
          colors={[color]}
          className="h-9 w-full"
          curveType="natural"
          showGradient={true}
        />
      </div>
    </div>
  );
}

// ── KPI Row ───────────────────────────────────────────────────────────────

const GMVIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const OrderIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
const ProfitIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const ReturnIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v6h6"/><path d="M3 13a9 9 0 1 0 3-7.7L3 8"/></svg>;

export function KpiRow() {
  const { data } = useDashboardStore();

  const cards = [
    { label: 'Gross Merch. Value', value: `Rp ${data.gmv}`,      sub: data.gmvSub,                  growth: data.gmvGrowth,     positive: true,  color: 'emerald' as const, icon: <GMVIcon />    },
    { label: 'Total Pesanan',      value: data.pesanan,           sub: `${data.days} hari terakhir`, growth: data.pesananGrowth, positive: true,  color: 'indigo'  as const, icon: <OrderIcon />  },
    { label: 'Net Profit',         value: `Rp ${data.netProfit}`, sub: data.profitSub,               growth: data.netGrowth,     positive: true,  color: 'amber'   as const, icon: <ProfitIcon /> },
    { label: 'Return Rate',        value: `${data.returnRate}%`,  sub: 'Dari total pesanan',         growth: data.returnChange,  positive: false, color: 'rose'    as const, icon: <ReturnIcon /> },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {cards.map((c, i) => <KpiCard key={c.label} {...c} stagger={i} />)}
    </div>
  );
}
