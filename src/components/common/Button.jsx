import { cn } from '../../lib/cn'

const variants = {
  primary:
    'bg-accent text-white hover:bg-[#0aa68b] border-transparent shadow-[0_4px_14px_rgba(12,200,168,0.25)] hover:shadow-[0_6px_20px_rgba(12,200,168,0.35)]',
  secondary:
    'border border-[var(--border-muted)] bg-[var(--surface-1)] text-[var(--text-subtle)] hover:bg-[var(--surface-2)] shadow-sm hover:shadow-md hover:text-[var(--text-main)] transition-colors',
  ghost:
    'border border-transparent bg-transparent text-[var(--text-main)] hover:bg-[var(--surface-2)]',
  danger:
    'border border-[#ef444444] bg-[#fff5f5] text-[#ef4444] hover:bg-[#ffecec] shadow-sm hover:shadow-md dark:bg-[#ef44441a] dark:hover:bg-[#ef444426]',
}

const sizes = {
  sm: 'h-9 px-4 text-sm font-medium',
  md: 'h-10 px-5 text-sm font-medium',
  lg: 'h-12 px-6 text-base font-semibold',
}

export function Button({
  className,
  children,
  variant = 'secondary',
  size = 'md',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
