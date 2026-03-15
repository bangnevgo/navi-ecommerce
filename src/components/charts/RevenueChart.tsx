'use client';
import { useEffect, useRef, useState } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { generateChartData } from '@/utils/format';

const PLATFORMS = [
  { label: 'Tokopedia', color: '#00AA5B' },
  { label: 'Shopee',    color: '#EE4D2D' },
  { label: 'TikTok',   color: '#69C9D0' },
  { label: 'Lazada',   color: '#F57224' },
];

export function RevenueChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  const { currentPeriod, data } = useDashboardStore();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    import('chart.js/auto').then((ChartModule) => {
      const Chart = ChartModule.default;
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;
      if (chartRef.current) chartRef.current.destroy();

      const days = data.days;
      const labels = Array.from({ length: days }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (days - i - 1));
        if (days <= 14) return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
        if (days <= 30) return i % 5 === 0 ? d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '';
        return i % 30 === 0 ? d.toLocaleDateString('id-ID', { month: 'short' }) : '';
      });

      const makeGradient = (hex: string) => {
        const g = ctx.createLinearGradient(0, 0, 0, 220);
        g.addColorStop(0, hex + '30');
        g.addColorStop(1, hex + '00');
        return g;
      };

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: PLATFORMS.map(p => ({
            label: p.label,
            data: generateChartData(days),
            borderColor: p.color,
            backgroundColor: makeGradient(p.color),
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: p.color,
            tension: 0.4,
            fill: true,
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'end',
              labels: {
                color: '#7d8590',
                font: { size: 11, family: 'Geist, system-ui' },
                boxWidth: 12,
                boxHeight: 2,
                padding: 16,
                usePointStyle: true,
                pointStyle: 'line',
              },
            },
            tooltip: {
              backgroundColor: '#161b22',
              borderColor: '#30363d',
              borderWidth: 1,
              titleColor: '#e6edf3',
              bodyColor: '#7d8590',
              padding: 10,
              callbacks: {
                label: (ctx) => ' ' + ctx.dataset.label + ': Rp ' + (ctx.raw as number / 1000000).toFixed(1) + 'jt',
              },
            },
          },
          scales: {
            x: {
              grid: { color: '#21262d', drawTicks: false },
              border: { display: false },
              ticks: { color: '#484f58', font: { size: 10 }, maxRotation: 0 },
            },
            y: {
              grid: { color: '#21262d', drawTicks: false },
              border: { display: false },
              ticks: {
                color: '#484f58',
                font: { size: 10 },
                callback: (v) => 'Rp ' + (Number(v) / 1000000).toFixed(0) + 'jt',
              },
            },
          },
        },
      });
    });
    return () => { chartRef.current?.destroy(); };
  }, [mounted, currentPeriod, data]);

  if (!mounted) return <div style={{ height: 280, background: '#161b22', borderRadius: 14 }} />;

  return (
    <div style={{ background: '#161b22', border: '1px solid #21262d', borderRadius: 14, padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3' }}>Revenue per Platform</div>
          <div style={{ fontSize: 11, color: '#484f58', marginTop: 2 }}>{currentPeriod} terakhir · 4 platform</div>
        </div>
      </div>
      <div style={{ height: 220 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
