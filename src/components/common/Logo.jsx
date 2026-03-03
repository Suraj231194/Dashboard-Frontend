import { ShieldCheck } from 'lucide-react'
import { cn } from '../../lib/cn'

export function Logo({ className, tone = 'accent' }) {
  const textTone = tone === 'light' ? 'text-white' : 'text-accent'
  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-[#018074] text-white shadow-sm">
        <ShieldCheck size={18} />
      </span>
      <span className={cn('text-xl font-bold tracking-tight', textTone)}>
        CyberScan
      </span>
    </div>
  )
}
