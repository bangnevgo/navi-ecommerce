'use client';
import Image from 'next/image';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { useDashboardStore } from '@/store/useDashboardStore';
import { generateChartData } from '@/utils/format';

const PLATFORM_CONFIG = [
  { key: 'Tokopedia', icon: '/tokopedia.png', color: '#10d9a0' },
  { key: 'Shopee',    icon: '/shopee.png',    color: '#f43f5e' },
  { key: 'TikTok',   icon: '/tiktok.png',    color: '#818cf8' },
  { key: 'Lazada',   icon: '/lazada.png',     color: '#fbbf24' },
];

function PlatformSparkline({ color }: { color: string }) {
  const data = generateChartData(14).map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width="100%" height={36}>
      <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`ps-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25}/>
            <stop offset="100%" stopColor={color} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5}
          fill={`url(#ps-${color.replace('#','')})`} dot={false} isAnimationActive={false}/>
        <Tooltip content={() => null} cursor={false}/>
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PlatformGrid() {
  const { data } = useDashboardStore();

  return (
    <div className="grid grid-cols-4 gap-3">
      {data.platforms.map((p, idx) => {
        const cfg    = PLATFORM_CONFIG.find(c => c.key === p.name)!;
        const isPos  = p.growth.startsWith('+');

        return (
          <div
            key={p.name}
            className={`rounded-[12px] border border-[rgba(255,255,255,0.07)] bg-[#0d1117] p-4
              hover:border-[rgba(255,255,255,0.12)] transition-all duration-200 cursor-default
              group animate-fadeUp stagger-${idx + 1} overflow-hidden relative`}
          >
            {/* Subtle color glow at bottom */}
            <div
              className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 100%, ${cfg.color}08 0%, transparent 70%)` }}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-3 relative">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-[6px] overflow-hidden bg-[rgba(255,255,255,0.05)] flex items-center justify-center flex-shrink-0">
                  <Image src={cfg.icon} alt={p.name} width={24} height={24} className="w-full h-full object-contain" />
                </div>
                <span className="text-[12px] font-[600] text-[#c9d1d9]">{p.name}</span>
              </div>
              <span
                className="text-[10.5px] font-[700] tabular-nums"
                style={{ color: isPos ? '#3fb950' : '#f85149' }}
              >
                {p.growth}
              </span>
            </div>

            {/* Sparkline */}
            <div className="opacity-70 group-hover:opacity-100 transition-opacity mb-3 -mx-1 relative">
              <PlatformSparkline color={cfg.color} />
            </div>

            {/* Stats — 3 col grid */}
            <div className="grid grid-cols-3 gap-0 pt-3 border-t border-[rgba(255,255,255,0.05)] relative">
              {[
                { label: 'Rev',     value: `Rp ${p.rev}`,  colored: false },
                { label: 'Orders',  value: String(p.orders),colored: false },
                { label: 'Share',   value: p.share,         colored: true  },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-[9px] font-[500] uppercase tracking-[0.5px] text-[#3d444d] mb-0.5">{s.label}</div>
                  <div
                    className="text-[11px] font-[650] tabular-nums leading-tight"
                    style={{ color: s.colored ? cfg.color : '#8b949e' }}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
