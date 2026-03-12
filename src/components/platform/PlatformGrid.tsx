'use client';
import { useDashboardStore } from '@/store/useDashboardStore';
import { Sparkline } from '@/components/charts/Sparkline';

const PLATFORM_CONFIG = [
  { key: 'Tokopedia', emoji: '🟢', color: '#10d9a0', bg: 'rgba(16,217,160,0.08)', bd: 'rgba(16,217,160,0.2)' },
  { key: 'Shopee',    emoji: '🔴', color: '#f43f5e', bg: 'rgba(244,63,94,0.08)',   bd: 'rgba(244,63,94,0.2)'  },
  { key: 'TikTok',   emoji: '🟣', color: '#6366f1', bg: 'rgba(99,102,241,0.08)',  bd: 'rgba(99,102,241,0.2)' },
  { key: 'Lazada',   emoji: '🟡', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)',  bd: 'rgba(251,191,36,0.2)' },
];

export function PlatformGrid() {
  const { data } = useDashboardStore();

  return (
    <div className="grid grid-cols-4 gap-4">
      {data.platforms.map((p) => {
        const cfg = PLATFORM_CONFIG.find((c) => c.key === p.name)!;
        return (
          <div
            key={p.name}
            className="rounded-[13px] border p-4 bg-gradient-to-br from-[#0f1320] to-[#0b0e18] hover:-translate-y-[2px] transition-all duration-200 cursor-default"
            style={{ borderColor: cfg.bd, boxShadow: `0 2px 12px ${cfg.bg}` }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">{cfg.emoji}</span>
              <span className="text-[12px] font-bold text-[#eef0f8]">{p.name}</span>
              <span
                className="ml-auto text-[10px] font-bold px-[6px] py-[1px] rounded-[4px]"
                style={{ color: cfg.color, background: cfg.bg }}
              >
                {p.growth}
              </span>
            </div>

            {/* Sparkline */}
            <div className="mb-3">
              <Sparkline color={cfg.color} days={14} />
            </div>

            {/* Stats */}
            <div className="flex justify-between text-[10.5px]">
              <div>
                <div className="text-[#424e62] mb-0.5">Revenue</div>
                <div className="font-['JetBrains_Mono',monospace] font-semibold text-[#eef0f8]">Rp {p.rev}</div>
              </div>
              <div className="text-right">
                <div className="text-[#424e62] mb-0.5">Pesanan</div>
                <div className="font-['JetBrains_Mono',monospace] font-semibold text-[#eef0f8]">{p.orders}</div>
              </div>
              <div className="text-right">
                <div className="text-[#424e62] mb-0.5">Share</div>
                <div className="font-['JetBrains_Mono',monospace] font-semibold" style={{ color: cfg.color }}>{p.share}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
