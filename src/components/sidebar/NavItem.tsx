// ── NavItem — NAVI Pro ──
'use client';

import React from 'react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  badge?: { text: string; color: 'red' | 'blue' } | null | undefined;
  onClick?: () => void;
}

const badgeColors = {
  red:  'bg-[rgba(244,63,94,0.09)]  text-[#f43f5e]',
  blue: 'bg-[rgba(99,102,241,0.1)]  text-[#818cf8]',
};

export function NavItem({ icon, label, active, collapsed, badge, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`
        relative w-full h-[34px] rounded-[8px] flex items-center gap-[9px] px-2
        mb-[1px] cursor-pointer border transition-all duration-150 active:scale-[0.98]
        font-[inherit] text-left
        ${active
          ? 'bg-gradient-to-br from-[rgba(99,102,241,0.18)] to-[rgba(99,102,241,0.08)] border-[rgba(99,102,241,0.2)] text-[#a5b4fc] shadow-[0_2px_8px_rgba(99,102,241,0.15)]'
          : 'bg-transparent border-transparent text-[#424e62] hover:bg-[#161b28] hover:text-[#7e8a9f]'
        }
      `}
    >
      {/* Active indicator */}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[18px] rounded-r-[3px] bg-gradient-to-b from-[#818cf8] to-[#6366f1]" />
      )}

      {/* Icon */}
      <span className={`flex-shrink-0 ${active ? 'opacity-100' : 'opacity-80'}`}>
        {icon}
      </span>

      {/* Label */}
      {!collapsed && (
        <span className={`text-[12px] whitespace-nowrap tracking-0 ${active ? 'font-[700]' : 'font-[500]'}`}>
          {label}
        </span>
      )}

      {/* Badge */}
      {!collapsed && badge && (
        <span className={`ml-auto px-[5px] py-[1px] rounded-[4px] text-[10px] font-[700] ${badgeColors[badge.color]}`}>
          {badge.text}
        </span>
      )}
    </button>
  );
}
