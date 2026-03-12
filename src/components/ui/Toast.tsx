// ── Toast Component — NAVI Pro ──
'use client';

import { useToastStore, type ToastType } from '@/store/useToastStore';

const toastStyles: Record<ToastType, { border: string; icon: string }> = {
  success: { border: 'border-l-[#10d9a0]', icon: '✅' },
  warning: { border: 'border-l-[#fbbf24]', icon: '⚠️' },
  error:   { border: 'border-l-[#f43f5e]', icon: '❌' },
  info:    { border: 'border-l-[#6366f1]',  icon: 'ℹ️' },
};

export function ToastContainer() {
  const { toasts, dismiss } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const style = toastStyles[toast.type];
        return (
          <div
            key={toast.id}
            onClick={() => dismiss(toast.id)}
            className={`
              pointer-events-auto flex items-center gap-3
              bg-[rgba(12,15,24,0.97)] backdrop-blur-2xl
              border border-[rgba(255,255,255,0.08)] border-l-4 ${style.border}
              rounded-[12px] px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]
              cursor-pointer animate-fadeUp
              text-[12.5px] text-[#eef0f8] font-medium
            `}
            style={{ animation: 'toastIn .25s cubic-bezier(.4,0,.2,1) both' }}
          >
            <span className="text-sm flex-shrink-0">{style.icon}</span>
            <span className="flex-1 leading-snug">{toast.message}</span>
            <span className="text-[#424e62] text-xs ml-1 flex-shrink-0">✕</span>
          </div>
        );
      })}
    </div>
  );
}
