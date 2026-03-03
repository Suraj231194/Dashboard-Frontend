import { Moon, SunMedium } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/cn'

export function ThemeToggle({ className }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-muted)] bg-[var(--surface-1)] text-[var(--text-main)] shadow-sm transition-all duration-200 hover:bg-[var(--surface-2)]',
        className,
      )}
      aria-label="Toggle theme"
    >
      {isDark ? <SunMedium size={17} /> : <Moon size={17} />}
    </button>
  )
}
