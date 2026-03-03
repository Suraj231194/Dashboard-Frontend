import { cn } from '../../lib/cn'

const styles = {
  critical: {
    filled: 'bg-[#ef4444] text-white',
    soft: 'bg-[#ef44441a] text-[#ef4444] border border-[#ef444438]',
  },
  high: {
    filled: 'bg-[#f97316] text-white',
    soft: 'bg-[#f973161a] text-[#f97316] border border-[#f9731640]',
  },
  medium: {
    filled: 'bg-[#f59e0b] text-[#101010]',
    soft: 'bg-[#f59e0b1a] text-[#f59e0b] border border-[#f59e0b40]',
  },
  low: {
    filled: 'bg-[#22c55e] text-white',
    soft: 'bg-[#22c55e1a] text-[#22c55e] border border-[#22c55e3d]',
  },
}

export function SeverityBadge({ severity, children, filled = false, className }) {
  const key = severity.toLowerCase()
  const token = styles[key]

  if (!token) return null

  return (
    <span
      className={cn(
        'inline-flex min-w-6 items-center justify-center rounded-md px-2 py-1 text-xs font-semibold',
        filled ? token.filled : token.soft,
        className,
      )}
    >
      {children ?? severity}
    </span>
  )
}
