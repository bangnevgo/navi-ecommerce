// ── UI Primitives — Badge, Button, Spinner ──
'use client';

import React from 'react';
import { cn } from '@/utils/format';

// ── Badge ──────────────────────────────────────────────────────────────────

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'muted';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const badgeStyles: Record<BadgeVariant, string> = {
  success: 'bg-[rgba(16,217,160,0.09)] text-[#10d9a0] border border-[rgba(16,217,160,0.22)]',
  warning: 'bg-[rgba(251,191,36,0.09)] text-[#fbbf24] border border-[rgba(251,191,36,0.22)]',
  danger:  'bg-[rgba(244,63,94,0.09)]  text-[#f43f5e] border border-[rgba(244,63,94,0.22)]',
  info:    'bg-[rgba(167,139,250,0.09)] text-[#a78bfa] border border-[rgba(167,139,250,0.22)]',
  primary: 'bg-[rgba(99,102,241,0.1)]  text-[#818cf8] border border-[rgba(99,102,241,0.28)]',
  muted:   'bg-[rgba(255,255,255,0.05)] text-[#424e62] border border-[rgba(255,255,255,0.07)]',
};

export function Badge({ children, variant = 'muted', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-[7px] py-[2px] rounded-[5px] text-[10px] font-bold tracking-[0.2px] whitespace-nowrap',
      badgeStyles[variant],
      className
    )}>
      {children}
    </span>
  );
}

// ── Button ─────────────────────────────────────────────────────────────────

type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'icon';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const btnBase = 'inline-flex items-center justify-center gap-2 font-semibold rounded-[8px] transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';

const btnVariants: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-white border-0 shadow-[0_2px_12px_rgba(99,102,241,0.4)] hover:from-[#818cf8] hover:to-[#6366f1] hover:shadow-[0_4px_20px_rgba(99,102,241,0.5)] hover:-translate-y-px',
  ghost:   'bg-transparent text-[#7e8a9f] border border-[rgba(255,255,255,0.07)] hover:bg-[#161b28] hover:text-[#eef0f8] hover:border-[rgba(255,255,255,0.115)]',
  danger:  'bg-[rgba(244,63,94,0.09)] text-[#f43f5e] border border-[rgba(244,63,94,0.22)] hover:bg-[rgba(244,63,94,0.15)]',
  icon:    'bg-[#0a0d16] text-[#7e8a9f] border border-[rgba(255,255,255,0.07)] hover:bg-[#161b28] hover:text-[#eef0f8] w-8 h-8 p-0 rounded-[7px]',
};

const btnSizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-[11px] h-7',
  md: 'px-[14px] py-0 text-[11.5px] h-8',
};

export function Button({
  variant = 'ghost', size = 'md', loading, icon, children, className, ...props
}: ButtonProps) {
  return (
    <button
      className={cn(btnBase, btnVariants[variant], variant !== 'icon' ? btnSizes[size] : '', className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Spinner size={12} /> : icon}
      {children}
    </button>
  );
}

// ── Spinner ────────────────────────────────────────────────────────────────

interface SpinnerProps { size?: number; color?: string; }

export function Spinner({ size = 16, color = '#6366f1' }: SpinnerProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      style={{ animation: 'spin 0.8s linear infinite' }}
      className="animate-spin"
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeOpacity=".2" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
