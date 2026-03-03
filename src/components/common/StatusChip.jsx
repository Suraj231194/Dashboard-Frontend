import { cn } from '../../lib/cn'

const styles = {
  completed: 'bg-[#22c55e1a] text-[#22c55e] border border-[#22c55e38]',
  scheduled: 'bg-[#eef2f7] text-[#7f8da2] border border-[#d7dee8] dark:bg-[var(--surface-2)] dark:text-[var(--text-dim)] dark:border-[var(--border-muted)]',
  failed: 'bg-[#ef44441a] text-[#ef4444] border border-[#ef444436]',
}

export function StatusChip({ status, className }) {
  const token = styles[status.toLowerCase()]
  return (
    <span
      className={cn(
        'inline-flex rounded-[5px] px-2.5 py-1 text-[11px] font-semibold leading-none',
        token,
        className,
      )}
    >
      {status}
    </span>
  )
}
