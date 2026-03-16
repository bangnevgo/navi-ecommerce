'use client';
import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useDashboardStore } from '@/store/useDashboardStore';
import { generateChartData } from '@/utils/format';

const SERIES = [
  { key: 'Tokopedia', color: '#10d9a0' },
  { key: 'Shopee',    color: '#f43f5e' },
  { key: 'TikTok',    color: '#818cf8' },
  { key: 'Lazada',    color: '#fbbf24' },
];

function buildData(days: number) {
  const series = SERIES.map(() => generateChartData(days));
  return Array.from({ length: days }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - i - 1));
    const label =
      days <= 14 ? d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
      : days <= 30 && i % 5 === 0 ? d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
      : days > 30 && i % 30 === 0 ? d.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })
      : '';
    return {
      date: label || '',
      Tokopedia: series[0][i] * 1_000_000,
      Shopee:    series[1][i] * 1_000_000,
      TikTok:    series[2][i] * 1_000_000,
      Lazada:    series[3][i] * 1_000_000,
    };
  });
}

// ── Custom Tooltip ────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length || !label) return null;

  const total = payload.reduce((sum: number, p: any) => sum + (p.value || 0), 0);

  return (
    <div className="rounded-[10px] border border-[rgba(255,255,255,0.1)] bg-[#111620] shadow-[0_16px_40px_rgba(0,0,0,0.7)] p-3 min-w-[180px]">
      <p className="text-[10px] font-[600] text-[#6e7681] uppercase tracking-[0.5px] mb-2.5">{label}</p>
      <div className="space-y-1.5 mb-2.5">
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
              <span className="text-[11px] text-[#8b949e]">{p.dataKey}</span>
            </div>
            <span className="text-[11.5px] font-[650] tabular-nums" style={{ color: p.color }}>
              Rp {(p.value / 1_000_000).toFixed(1)}jt
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-[rgba(255,255,255,0.07)] pt-2 flex justify-between items-center">
        <span className="text-[10px] text-[#6e7681]">Total</span>
        <span className="text-[12px] font-[700] text-[#e6edf3] tabular-nums">
          Rp {(total / 1_000_000).toFixed(1)}jt
        </span>
      </div>
    </div>
  );
}

// ── Custom Legend ─────────────────────────────────────────────────────────

function CustomLegend({ active, onToggle }: { active: string[]; onToggle: (k: string) => void }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {SERIES.map(s => {
        const isActive = active.includes(s.key);
        return (
          <button
            key={s.key}
            onClick={() => onToggle(s.key)}
            className="flex items-center gap-1.5 cursor-pointer transition-opacity"
            style={{ opacity: isActive ? 1 : 0.3 }}
          >
            <div className="w-3 h-0.5 rounded-full" style={{ background: s.color }} />
            <span className="text-[11px] text-[#8b949e] font-[500]">{s.key}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Main Chart ────────────────────────────────────────────────────────────

export function RevenueChart() {
  const { currentPeriod, data } = useDashboardStore();
  const [activeSeries, setActiveSeries] = useState(SERIES.map(s => s.key));
  const chartData = buildData(data.days);

  const toggleSeries = (key: string) => {
    setActiveSeries(prev =>
      prev.includes(key)
        ? prev.length > 1 ? prev.filter(k => k !== key) : prev
        : [...prev, key]
    );
  };

  return (
    <div className="rounded-[12px] border border-[rgba(255,255,255,0.07)] bg-[#0d1117] p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-[13px] font-[650] text-[#c9d1d9]">Revenue per Platform</h3>
          <p className="text-[11px] text-[#3d444d] mt-0.5">{currentPeriod} terakhir · 4 platform</p>
        </div>
        <CustomLegend active={activeSeries} onToggle={toggleSeries} />
      </div>

      {/* Recharts AreaChart */}
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <defs>
            {SERIES.map(s => (
              <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={s.color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0.01} />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid
            strokeDasharray="0"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{ fill: '#3d444d', fontSize: 10, fontFamily: 'Geist Variable, system-ui' }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}jt`}
            tick={{ fill: '#3d444d', fontSize: 10, fontFamily: 'Geist Variable, system-ui' }}
            axisLine={false}
            tickLine={false}
            width={42}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: 'rgba(255,255,255,0.07)', strokeWidth: 1 }}
          />

          {SERIES.map(s => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={s.color}
              strokeWidth={activeSeries.includes(s.key) ? 1.75 : 0}
              fill={`url(#grad-${s.key})`}
              fillOpacity={activeSeries.includes(s.key) ? 1 : 0}
              dot={false}
              activeDot={{ r: 3.5, fill: s.color, strokeWidth: 0 }}
              isAnimationActive={true}
              animationDuration={600}
              animationEasing="ease-out"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
