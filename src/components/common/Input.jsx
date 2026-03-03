import { cn } from '../../lib/cn'

export function Input({ className, icon: Icon, ...props }) {
  return (
    <label className={cn('relative block', className)}>
      <input
        className={cn(
          'h-11 w-full rounded-lg border border-[var(--border-muted)] bg-[var(--surface-1)] px-3.5 text-sm text-[var(--text-main)] placeholder:text-[var(--text-dim)] outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20',
          Icon ? 'pr-10' : '',
        )}
        {...props}
      />
      {Icon ? (
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[var(--text-dim)]">
          <Icon size={16} />
        </span>
      ) : null}
    </label>
  )
}
