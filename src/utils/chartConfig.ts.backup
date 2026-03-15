// ── Chart.js Default Config — NAVI Pro ──
import type { ChartOptions } from 'chart.js';

export const PLATFORM_COLORS = {
  tokopedia: { line: '#10d9a0', fill: 'rgba(16,217,160,0.82)' },
  shopee:    { line: '#f43f5e', fill: 'rgba(244,63,94,0.82)'  },
  tiktok:    { line: '#6366f1', fill: 'rgba(99,102,241,0.82)' },
  lazada:    { line: '#fbbf24', fill: 'rgba(251,191,36,0.82)' },
};

export const defaultTooltip = {
  backgroundColor: 'rgba(10,13,22,0.95)',
  titleColor: '#eef0f8',
  bodyColor: '#7e8a9f',
  borderColor: 'rgba(255,255,255,0.08)',
  borderWidth: 1,
  padding: 14,
  cornerRadius: 10,
  displayColors: true,
  boxWidth: 10,
  boxHeight: 10,
};

export const defaultScales = {
  x: {
    grid: { color: 'rgba(255,255,255,0.035)', drawBorder: false },
    ticks: {
      color: '#424e62',
      font: { size: 10, family: "'Plus Jakarta Sans', sans-serif" },
      maxTicksLimit: 12,
    },
  },
  y: {
    grid: { color: 'rgba(255,255,255,0.035)', drawBorder: false },
    ticks: {
      color: '#424e62',
      font: { size: 10, family: "'Plus Jakarta Sans', sans-serif" },
    },
  },
};

export const defaultLegend = {
  display: true,
  position: 'top' as const,
  labels: {
    color: '#7e8a9f',
    font: { size: 11, family: "'Plus Jakarta Sans', sans-serif" },
    padding: 18,
    usePointStyle: true,
    pointStyle: 'circle' as const,
    boxWidth: 8,
  },
};

export const revenueChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 600, easing: 'easeOutQuart' },
  plugins: {
    legend: defaultLegend,
    tooltip: {
      ...defaultTooltip,
      callbacks: {
        label: (ctx) => ` ${ctx.dataset.label}: Rp ${ctx.parsed.y.toFixed(1)} jt`,
      },
    },
  },
  scales: {
    x: { ...defaultScales.x, stacked: true },
    y: {
      ...defaultScales.y,
      stacked: true,
      ticks: {
        ...defaultScales.y.ticks,
        callback: (v) => `Rp ${v} jt`,
      },
    },
  },
};

export const sparklineOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: { x: { display: false }, y: { display: false } },
  animation: { duration: 800, easing: 'easeOutCubic' },
};
