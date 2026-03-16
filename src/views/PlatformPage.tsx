'use client';
import { useDashboardStore } from '@/store/useDashboardStore';
import { Sparkline } from '@/components/charts/Sparkline';
import { ProductsTable } from '@/components/table/ProductsTable';

const PLATFORM_CONFIG: Record<string, { color: string; emoji: string }> = {
  tokopedia: { color: '#10d9a0', emoji: '🟢' },
  shopee:    { color: '#f43f5e', emoji: '🔴' },
  tiktok:    { color: '#6366f1', emoji: '🟣' },
  lazada:    { color: '#fbbf24', emoji: '🟡' },
};

interface PlatformPageProps {
  platformId: string;
  platformName: string;
}

export function PlatformPage({ platformId, platformName }: PlatformPageProps) {
  const { data } = useDashboardStore();
  const cfg = PLATFORM_CONFIG[platformId];
  const platformData = data.platforms.find(
    (p) => p.name.toLowerCase().includes(platformId === 'tiktok' ? 'tiktok' : platformId)
  );

  if (!platformData) return <div className="text-[#424e62]">Data tidak ditemukan</div>;

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
      {/* Header card */}
      <div
        className="rounded-[16px] p-6 border"
        style={{ background: `${cfg.color}08`, borderColor: `${cfg.color}25` }}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{cfg.emoji}</span>
          <div>
            <h1 className="text-[22px] font-[800] tracking-[-0.5px] text-[#eef0f8]">{platformName}</h1>
            <p className="text-[12px] mt-0.5" style={{ color: cfg.color }}>
              {platformData.share} dari total revenue · Growth {platformData.growth}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Revenue', value: `Rp ${platformData.rev}` },
            { label: 'Pesanan', value: String(platformData.orders) },
            { label: 'Market Share', value: platformData.share },
          ].map((s) => (
            <div key={s.label} className="bg-[rgba(255,255,255,0.03)] rounded-[12px] p-4 border border-[rgba(255,255,255,0.06)]">
              <div className="text-[11px] text-[#424e62] mb-1">{s.label}</div>
              <div className="font-['Sora',sans-serif] text-[20px] font-[800] tracking-[-0.5px]" style={{ color: cfg.color }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Sparkline */}
        <div className="mt-4">
          <Sparkline color={cfg.color} days={30} />
        </div>
      </div>

      {/* Products filtered to this platform */}
      <ProductsTable />
    </div>
  );
}
