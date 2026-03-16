// ── NavItem — NAVI Pro ──
'use client';

import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  badge?: { text: string; color: 'red' | 'blue' } | null;
  onClick?: () => void;
}

export function NavItem({ icon, label, active, collapsed, badge, onClick }: NavItemProps) {
  const button = (
    <button
      onClick={onClick}
      className={`
        relative w-full h-[32px] rounded-[7px] flex items-center gap-[8px]
        ${collapsed ? 'justify-center px-0' : 'px-2.5'}
        mb-px cursor-pointer transition-all duration-100 active:scale-[0.98]
        font-[inherit] text-left border
        ${active
          ? 'bg-[rgba(255,255,255,0.06)] border-[rgba(255,255,255,0.08)] text-[#e6edf3]'
          : 'bg-transparent border-transparent text-[#7d8590] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#c9d1d9]'
        }
      `}
    >
      <span className={`flex-shrink-0 ${active ? 'text-[#e6edf3]' : 'text-[#484f58]'}`}>
        {icon}
      </span>

      {!collapsed && (
        <span className={`text-[12.5px] whitespace-nowrap leading-none ${active ? 'font-[600] text-[#e6edf3]' : 'font-[450]'}`}>
          {label}
        </span>
      )}

      {!collapsed && badge && (
        <span className={`ml-auto min-w-[18px] h-[16px] px-1 rounded-[4px] text-[10px] font-[700] flex items-center justify-center leading-none tabular-nums
          ${badge.color === 'red'
            ? 'bg-[rgba(248,81,73,0.12)] text-[#f85149]'
            : 'bg-[rgba(121,192,255,0.1)] text-[#79c0ff]'
          }`}>
          {badge.text}
        </span>
      )}
    </button>
  );

  if (!collapsed) return button;

  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="right"
            sideOffset={8}
            className="z-[100] px-2.5 py-1.5 rounded-[7px] text-[11.5px] font-[500] text-[#c9d1d9] bg-[#161b22] border border-[rgba(255,255,255,0.1)] shadow-[0_4px_16px_rgba(0,0,0,0.5)] select-none animate-fadeIn"
          >
            {label}
            {badge && (
              <span className={`ml-1.5 text-[10px] font-bold ${badge.color === 'red' ? 'text-[#f85149]' : 'text-[#79c0ff]'}`}>
                {badge.text}
              </span>
            )}
            <Tooltip.Arrow className="fill-[#161b22]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
