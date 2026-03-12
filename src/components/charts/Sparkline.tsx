'use client';
import { useEffect, useRef, useState } from 'react';
import { generateChartData } from '@/utils/format';
import { sparklineOptions } from '@/utils/chartConfig';

interface SparklineProps {
  color?: string;
  days?: number;
}

export function Sparkline({ color = '#6366f1', days = 14 }: SparklineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    import('chart.js/auto').then((ChartModule) => {
      const Chart = ChartModule.default;
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;
      if (chartRef.current) chartRef.current.destroy();

      const gradient = ctx.createLinearGradient(0, 0, 0, 40);
      gradient.addColorStop(0, color + '50');
      gradient.addColorStop(1, color + '05');

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array(days).fill(''),
          datasets: [{
            data: generateChartData(days),
            borderColor: color,
            borderWidth: 1.5,
            fill: true,
            backgroundColor: gradient,
            tension: 0.4,
            pointRadius: 0,
          }],
        },
        options: sparklineOptions as any,
      });
    });
    return () => { chartRef.current?.destroy(); };
  }, [mounted, color, days]);

  if (!mounted) return <div style={{ height: 44 }} />;
  return <canvas ref={canvasRef} style={{ width: '100%', height: 44 }} />;
}
