'use client';
import type { Period } from '@/data/periodData';

const PERIODS: Period[] = ['7 Hari', 'Minggu', 'Bulan', 'Tahun'];

interface PeriodTabsProps {
  current: Period;
  onChange: (p: Period) => void;
}

export function PeriodTabs({ current, onChange }: PeriodTabsProps) {
  return (
    <div className="flex items-center gap-px bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] rounded-[7px] p-[3px]">
      {PERIODS.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 h-[22px] rounded-[5px] text-[11px] font-[500] transition-all duration-100 cursor-pointer whitespace-nowrap
            ${current === p
              ? 'bg-[rgba(255,255,255,0.08)] text-[#c9d1d9] shadow-[0_1px_3px_rgba(0,0,0,0.4)]'
              : 'text-[#484f58] hover:text-[#7d8590]'
            }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
