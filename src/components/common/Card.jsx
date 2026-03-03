import { cn } from '../../lib/cn'

export function Card({ className, children }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-1)] shadow-soft',
        className,
      )}
    >
      {children}
    </div>
  )
}
