import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground",
        secondary:   "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive/10 text-destructive",
        outline:     "border-border text-foreground",
        ghost:       "hover:bg-muted hover:text-muted-foreground",
        link:        "text-primary underline-offset-4 hover:underline",
        success: "border-[rgba(16,217,160,0.25)] bg-[rgba(16,217,160,0.1)] text-[#10d9a0]",
        warning: "border-[rgba(251,191,36,0.25)]  bg-[rgba(251,191,36,0.1)]  text-[#fbbf24]",
        danger:  "border-[rgba(244,63,94,0.25)]   bg-[rgba(244,63,94,0.1)]   text-[#f43f5e]",
        info:    "border-[rgba(99,102,241,0.25)]  bg-[rgba(99,102,241,0.1)]  text-[#6366f1]",
        primary: "border-[rgba(56,139,253,0.25)]  bg-[rgba(56,139,253,0.1)]  text-[#388bfd]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

// ── Spinner ───────────────────────────────────────────────────────────────

interface SpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

function Spinner({ size = 16, color = "currentColor", className }: SpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      className={cn("animate-spin", className)}
      aria-label="loading"
    >
      <path d="M12 2a10 10 0 0 1 0 20" opacity={0.25} />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  )
}

export { Badge, badgeVariants, Spinner }
