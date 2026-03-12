'use client';
import { useEffect, useRef, useState } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { generateChartData } from '@/utils/format';
import { PLATFORM_COLORS, revenueChartOptions } from '@/utils/chartConfig';

export function RevenueChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  const { currentPeriod, data } = useDashboardStore();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    import('chart.js/auto').then((ChartModule) => {
      const Chart = ChartModule.default;
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      if (chartRef.current) { chartRef.current.destroy(); }

      const days = data.days;
      const labels = Array.from({ length: days }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (days - i - 1));
        if (days <= 14) return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
        if (days <= 30) return i % 5 === 0 ? d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '';
        return i % 30 === 0 ? d.toLocaleDateString('id-ID', { month: 'short' }) : '';
      });

      const makeGradient = (hex: string) => {
        const g = ctx.createLinearGradient(0, 0, 0, 280);
        g.addColorStop(0, hex + '80');
        g.addColorStop(1, hex + '05');
        return g;
      };

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            { label: 'Tokopedia', data: generateChartData(days), backgroundColor: makeGradient('#10d9a0'), borderColor: PLATFORM_COLORS.tokopedia.line, borderWidth: 0, borderRadius: 3, borderSkipped: false },
            { label: 'Shopee',    data: generateChartData(days), backgroundColor: makeGradient('#f43f5e'), borderColor: PLATFORM_COLORS.shopee.line,    borderWidth: 0, borderRadius: 3, borderSkipped: false },
            { label: 'TikTok',   data: generateChartData(days), backgroundColor: makeGradient('#6366f1'), borderColor: PLATFORM_COLORS.tiktok.line,    borderWidth: 0, borderRadius: 3, borderSkipped: false },
            { label: 'Lazada',   data: generateChartData(days), backgroundColor: makeGradient('#fbbf24'), borderColor: PLATFORM_COLORS.lazada.line,    borderWidth: 0, borderRadius: 3, borderSkipped: false },
          ],
        },
        options: revenueChartOptions as any,
      });
    });

    return () => { chartRef.current?.destroy(); };
  }, [mounted, currentPeriod, data]);

  if (!mounted) return <div style={{ height: 240 }} className="animate-pulse bg-[rgba(255,255,255,0.03)] rounded-lg" />;

  return (
    <div className="bg-gradient-to-br from-[#0f1320] to-[#0b0e18] rounded-[14px] border border-[rgba(255,255,255,0.065)] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[13px] font-bold text-[#eef0f8]">Revenue per Platform</h3>
          <p className="text-[11px] text-[#424e62] mt-0.5">{currentPeriod} terakhir · 4 platform</p>
        </div>
      </div>
      <div style={{ height: 240 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
