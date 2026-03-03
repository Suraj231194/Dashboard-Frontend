import {
  ChevronRight,
  Bell,
  CalendarDays,
  ClipboardCheck,
  FileScan,
  Info,
  LayoutGrid,
  LogOut,
  Menu,
  Settings,
  X,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { sidebarItems } from '../../data/mockData'
import { cn } from '../../lib/cn'
import { Logo } from '../common/Logo'

const iconMap = {
  dashboard: LayoutGrid,
  projects: ClipboardCheck,
  scans: FileScan,
  schedule: CalendarDays,
  notifications: Bell,
  settings: Settings,
  support: Info,
}

function SidebarContent({ activeSection, onItemClick, onLogout }) {
  const primaryItems = sidebarItems.slice(0, 4)
  const secondaryItems = sidebarItems.slice(4)

  const renderItem = (item) => {
    const Icon = iconMap[item.id]
    const isActive = item.id === activeSection
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => onItemClick(item)}
        className={cn(
          'flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-[14px] font-semibold transition-all duration-300',
          isActive
            ? 'bg-accent/10 text-[#008f8c] dark:text-accent shadow-[inset_3px_0_0_0_#0CC8A8]'
            : 'text-[var(--text-subtle)] hover:bg-[var(--surface-2)] hover:text-[var(--text-main)] hover:translate-x-1',
        )}
      >
        <span className="relative inline-flex">
          <Icon size={15} strokeWidth={1.9} />
          {item.id === 'scans' || item.id === 'notifications' ? (
            <span className="absolute -bottom-0.5 -left-0.5 h-1.5 w-1.5 rounded-full bg-[#f97316]" />
          ) : null}
        </span>
        <span>{item.label}</span>
      </button>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="h-[62px] border-b border-[var(--border-muted)] px-5 py-4">
        <Link to="/dashboard" className="inline-flex">
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 px-4 py-3">
        <div className="space-y-2">{primaryItems.map(renderItem)}</div>
        <div className="my-4 border-t border-[var(--border-muted)]" />
        <div className="space-y-2">{secondaryItems.map(renderItem)}</div>
      </nav>

      <div className="mt-auto border-t border-[var(--border-muted)] px-3 py-3">
        <div className="flex items-center gap-2 rounded-lg px-1.5 py-1.5">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#facc15] text-black">
            <span className="text-sm font-bold">SP</span>
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-xs text-[var(--text-dim)]">admin@edu.com</p>
            <p className="truncate text-sm font-semibold text-[var(--text-main)]">Security Lead</p>
          </div>
          <ChevronRight size={15} className="text-[var(--text-dim)]" />
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="mt-2 inline-flex h-9 w-full items-center gap-2 rounded-full px-3 text-left text-[13px] font-semibold text-[#ef4444] transition-colors hover:bg-[#ef444412]"
        >
          <LogOut size={15} />
          Log out
        </button>
      </div>
    </div>
  )
}

export function MobileSidebarToggle({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-muted)] bg-[var(--surface-1)] text-[var(--text-main)] md:hidden"
      aria-label="Toggle menu"
    >
      <Menu size={18} />
    </button>
  )
}

export function Sidebar({ activeSection, open, onClose }) {
  const navigate = useNavigate()

  const handleItemClick = (item) => {
    if (item.id === 'dashboard') {
      navigate('/dashboard')
      onClose?.()
      return
    }
    if (item.id === 'scans') {
      navigate('/scans/scan-001')
      onClose?.()
      return
    }
    toast(item.label + ' module coming soon')
    onClose?.()
  }

  const handleLogout = () => {
    navigate('/login')
    toast.success('Logged out successfully')
    onClose?.()
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[180px] border-r border-[var(--border-muted)] bg-[var(--sidebar-bg)] md:block">
        <SidebarContent activeSection={activeSection} onItemClick={handleItemClick} onLogout={handleLogout} />
      </aside>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/45 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 border-r border-[var(--border-muted)] bg-[var(--sidebar-bg)] shadow-2xl transition-transform duration-300 md:hidden',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="absolute right-3 top-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-dim)] hover:bg-[var(--surface-2)]"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <SidebarContent activeSection={activeSection} onItemClick={handleItemClick} onLogout={handleLogout} />
      </aside>
    </>
  )
}
