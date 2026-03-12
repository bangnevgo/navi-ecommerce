// ── Format Utilities — NAVI Pro ──

export function formatRupiah(value: number): string {
  if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(1)} M`;
  if (value >= 1_000_000)     return `Rp ${(value / 1_000_000).toFixed(1)} jt`;
  if (value >= 1_000)         return `Rp ${(value / 1_000).toFixed(0)} rb`;
  return `Rp ${value}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit', minute: '2-digit',
  }).format(date);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

export function generateChartData(days: number): number[] {
  let val = 8 + Math.random() * 5;
  return Array.from({ length: days }, () => {
    val += (Math.random() - 0.44) * 3;
    val = Math.max(3, Math.min(28, val));
    return parseFloat(val.toFixed(2));
  });
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
