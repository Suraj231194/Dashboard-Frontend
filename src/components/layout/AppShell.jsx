import { ChevronRight, Home } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../common/Button'
import { ThemeToggle } from '../common/ThemeToggle'
import { MobileSidebarToggle, Sidebar } from './Sidebar'

function Breadcrumb({ items }) {
  const [first, second, third] = items
  return (
    <div className="flex max-w-[180px] items-center gap-2 text-[13px] font-medium md:max-w-none">
      <span className="font-semibold text-[var(--text-main)]">{first}</span>
      <span className="truncate text-accent md:hidden">{third}</span>
      <span className="hidden items-center gap-2 md:inline-flex">
        <Home size={11} className="text-[var(--text-dim)]" />
        <ChevronRight size={12} className="text-[var(--text-dim)]" />
        <span className="text-[var(--text-dim)]">{second}</span>
        <ChevronRight size={12} className="text-[var(--text-dim)]" />
        <span className="text-accent">{third}</span>
      </span>
    </div>
  )
}

export function AppShell({
  children,
  activeSection,
  breadcrumb = ['Scan', 'Private Assets', 'New Scan'],
  onExportReport,
  onStopScan,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <Sidebar activeSection={activeSection} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="md:ml-[180px]">
        <header className="sticky top-0 z-20 border-b border-[var(--border-muted)]/50 bg-[var(--sidebar-bg)]/80 backdrop-blur-[12px] shadow-[0_8px_30px_-10px_rgba(0,0,0,0.05)] px-4 py-3 md:px-5 transition-all">
          <div className="flex min-h-10 items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MobileSidebarToggle onClick={() => setSidebarOpen(true)} />
              <Breadcrumb items={breadcrumb} />
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />
              <Button variant="secondary" size="sm" onClick={onExportReport}>
                Export Report
              </Button>
              <Button variant="danger" size="sm" onClick={onStopScan}>
                Stop Scan
              </Button>
            </div>
          </div>
        </header>

        <main className="px-2.5 pb-4 pt-2 md:px-3 md:pb-5">{children}</main>
      </div>
    </div>
  )
}
