import { cn } from '../../lib/cn'

export function Logo({ className, tone = 'accent' }) {
  const textTone = tone === 'light' ? 'text-white/90' : 'text-accent'
  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent">
        <span className="h-2.5 w-2.5 rounded-full bg-white/95" />
      </span>
      <span className={cn('text-lg font-semibold tracking-tight sm:text-xl', textTone)}>aps</span>
    </div>
  )
}
