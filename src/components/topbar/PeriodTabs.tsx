'use client';
import type { Period } from '@/data/periodData';

const PERIODS: Period[] = ['7 Hari', 'Minggu', 'Bulan', 'Tahun'];

interface PeriodTabsProps {
  current: Period;
  onChange: (p: Period) => void;
}

export function PeriodTabs({ current, onChange }: PeriodTabsProps) {
  return (
    <div className="flex items-center gap-[2px] bg-[#0a0d16] border border-[rgba(255,255,255,0.065)] rounded-[9px] p-[3px]">
      {PERIODS.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 h-[26px] rounded-[7px] text-[11px] font-semibold transition-all duration-150 cursor-pointer border
            ${current === p
              ? 'bg-[rgba(99,102,241,0.15)] text-[#a5b4fc] border-[rgba(99,102,241,0.3)] shadow-[0_1px_6px_rgba(99,102,241,0.2)]'
              : 'bg-transparent text-[#424e62] border-transparent hover:text-[#7e8a9f] hover:bg-[rgba(255,255,255,0.04)]'
            }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
