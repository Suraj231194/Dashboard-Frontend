import {
  Ban,
  ChevronLeft,
  ChevronRight,
  Columns3,
  Filter,
  Plus,
  RefreshCcw,
  Search,
  SearchCheck,
  ShieldAlert,
  TriangleAlert,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'
import { SeverityBadge } from '../components/common/SeverityBadge'
import { StatusChip } from '../components/common/StatusChip'
import { AppShell } from '../components/layout/AppShell'
import { orgMeta, scans, severityOverview } from '../data/mockData'
import { cn } from '../lib/cn'

const severityIcon = {
  critical: Ban,
  high: TriangleAlert,
  medium: ShieldAlert,
  low: SearchCheck,
}

const severityIconStyle = {
  critical: 'text-[#ec4899] bg-[#fef1f7]',
  high: 'text-[#f97316] bg-[#fff6ed]',
  medium: 'text-[#d4a406] bg-[#fffbe6]',
  low: 'text-[#3b82f6] bg-[#eff6ff]',
}

const statusFilters = ['All', 'Completed', 'Scheduled', 'Failed']

function SeverityOverviewCard({ item }) {
  const Icon = severityIcon[item.id]
  return (
    <div className="space-y-0.5">
      <div className="mb-1 flex items-center justify-between">
        <p className="text-[17px] font-medium text-[var(--text-subtle)]">{item.label}</p>
        <span className={cn('inline-flex h-7 w-7 items-center justify-center rounded-md', severityIconStyle[item.id])}>
          <Icon size={13} />
        </span>
      </div>
      <p className="text-[36px] font-semibold leading-none tracking-[-0.02em] text-[var(--text-main)]">{item.count}</p>
      <p
        className={cn(
          'text-[12px] font-semibold',
          item.delta.includes('decrease') ? 'text-[#22c55e]' : 'text-[#f43f86]',
        )}
      >
        {item.delta}
      </p>
    </div>
  )
}

function ProgressCell({ progress, status }) {
  return (
    <div className="flex min-w-[140px] items-center gap-2">
      <div className="h-[6px] flex-1 rounded-full bg-[#e7ebf0] dark:bg-[#2a3343] overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000 ease-out',
            status === 'Failed' ? 'bg-[#ef4444]' : 'bg-accent shadow-[0_0_10px_rgba(12,200,168,0.5)]',
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-[13px] font-semibold text-[var(--text-main)]">{progress}%</span>
    </div>
  )
}

function VulnerabilityCell({ vulnerabilities, hideMediumLow }) {
  return (
    <div className="flex items-center gap-2">
      <SeverityBadge severity="critical" filled className="min-w-[26px] rounded-[4px] px-1.5 py-0.5 text-[11px]">
        {vulnerabilities.critical}
      </SeverityBadge>
      <SeverityBadge severity="high" filled className="min-w-[26px] rounded-[4px] px-1.5 py-0.5 text-[11px]">
        {vulnerabilities.high}
      </SeverityBadge>
      {!hideMediumLow ? (
        <>
          <SeverityBadge severity="medium" filled className="min-w-[26px] rounded-[4px] px-1.5 py-0.5 text-[11px]">
            {vulnerabilities.medium}
          </SeverityBadge>
          <SeverityBadge severity="low" filled className="min-w-[26px] rounded-[4px] px-1.5 py-0.5 text-[11px]">
            {vulnerabilities.low}
          </SeverityBadge>
        </>
      ) : null}
    </div>
  )
}

function MobileScanCard({ row, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full border-b border-[var(--border-muted)] px-3 py-3 text-left transition-all hover:bg-[var(--surface-2)] active:scale-[0.99] hover:shadow-sm"
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--text-main)]">{row.scanName}</p>
          <p className="mt-0.5 text-xs text-[var(--text-dim)]">
            {row.type} • {row.lastScan}
          </p>
        </div>
        <StatusChip status={row.status} />
      </div>

      <div className="mb-2">
        <ProgressCell progress={row.progress} status={row.status} />
      </div>

      <VulnerabilityCell vulnerabilities={row.vulnerabilities} hideMediumLow={false} />
    </button>
  )
}

export function DashboardPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [hideMediumLow, setHideMediumLow] = useState(false)

  const filteredRows = useMemo(
    () =>
      scans.filter((row) => {
        const matchesQuery =
          row.scanName.toLowerCase().includes(query.toLowerCase()) ||
          row.type.toLowerCase().includes(query.toLowerCase())
        const matchesStatus = statusFilter === 'All' || row.status === statusFilter
        return matchesQuery && matchesStatus
      }),
    [query, statusFilter],
  )

  const handleFilterClick = () => {
    const currentIndex = statusFilters.indexOf(statusFilter)
    const next = statusFilters[(currentIndex + 1) % statusFilters.length]
    setStatusFilter(next)
    toast.success(`Filter: ${next}`)
  }

  return (
    <AppShell
      activeSection="dashboard"
      onExportReport={() => toast.success('Export started for organization report')}
      onStopScan={() => toast.error('No active organization scan to stop')}
    >
      <Card className="mb-3 overflow-hidden rounded-[10px] shadow-none">
        <div className="hidden flex-wrap divide-x divide-[var(--border-muted)] border-b border-[var(--border-muted)] px-4 py-4 text-[13px] md:flex md:px-5">
          <p className="pr-6 lg:pr-8">
            <span className="text-[var(--text-dim)]">Org:</span>{' '}
            <span className="pl-1 font-semibold text-[var(--text-main)]">{orgMeta.org}</span>
          </p>
          <p className="px-6 lg:px-8">
            <span className="text-[var(--text-dim)]">Owner:</span>{' '}
            <span className="pl-1 font-semibold text-[var(--text-main)]">{orgMeta.owner}</span>
          </p>
          <p className="px-6 lg:px-8">
            <span className="text-[var(--text-dim)]">Total Scans:</span>{' '}
            <span className="pl-1 font-semibold text-[var(--text-main)]">{orgMeta.totalScans}</span>
          </p>
          <p className="px-6 lg:px-8">
            <span className="text-[var(--text-dim)]">Scheduled:</span>{' '}
            <span className="pl-1 font-semibold text-[var(--text-main)]">{orgMeta.scheduled}</span>
          </p>
          <p className="px-6 lg:px-8">
            <span className="text-[var(--text-dim)]">Rescans:</span>{' '}
            <span className="pl-1 font-semibold text-[var(--text-main)]">{orgMeta.rescans}</span>
          </p>
          <p className="px-6 lg:px-8">
            <span className="text-[var(--text-dim)]">Failed Scans:</span>{' '}
            <span className="pl-1 font-semibold text-[var(--text-main)]">{orgMeta.failedScans}</span>
          </p>
          <p className="ml-auto flex items-center gap-1 pl-6 text-[var(--text-subtle)] lg:pl-8">
            <RefreshCcw size={13} className="text-accent" />
            {orgMeta.lastUpdated}
          </p>
        </div>

        <div className="grid gap-3 px-4 py-4 sm:grid-cols-2 xl:grid-cols-4 md:px-5">
          {severityOverview.map((item, index) => (
            <div key={item.id} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${index * 0.1}s` }}>
              <SeverityOverviewCard item={item} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden rounded-[10px] shadow-none">
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border-muted)] p-3 md:p-4">
          <div className="relative min-w-[220px] flex-1 md:max-w-[320px]">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search scans by name or type..."
              className="h-10 w-full rounded-md border border-[var(--border-muted)] bg-[var(--surface-1)] pl-9 pr-3 text-sm text-[var(--text-main)] placeholder:text-[var(--text-dim)] outline-none ring-accent/25 transition focus:border-accent focus:ring-2"
            />
          </div>

          <Button variant="secondary" size="sm" onClick={handleFilterClick}>
            <Filter size={14} />
            Filter
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setHideMediumLow((prev) => !prev)
              toast.success(hideMediumLow ? 'All vulnerability columns visible' : 'Compact vulnerability columns enabled')
            }}
          >
            <Columns3 size={14} />
            Column
          </Button>

          <Button
            variant="primary"
            size="sm"
            className="ml-auto md:ml-0"
            onClick={() => {
              toast.success('New scan created in queue')
              navigate('/scans/scan-001')
            }}
          >
            <Plus size={14} />
            New scan
          </Button>
        </div>

        <div className="md:hidden">
          {filteredRows.map((row) => (
            <MobileScanCard key={row.id} row={row} onOpen={() => navigate(`/scans/${row.id}`)} />
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[980px] table-fixed">
            <thead>
              <tr className="border-b border-[var(--border-muted)] text-left text-[12px] text-[var(--text-dim)]">
                <th className="w-[180px] px-4 py-3 font-semibold">Scan Name</th>
                <th className="w-[110px] px-4 py-3 font-semibold">Type</th>
                <th className="w-[130px] px-4 py-3 font-semibold">Status</th>
                <th className="w-[180px] px-4 py-3 font-semibold">Progress</th>
                <th className="w-[200px] px-4 py-3 font-semibold">Vulnerability</th>
                <th className="w-[95px] px-4 py-3 font-semibold">Last Scan</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => navigate(`/scans/${row.id}`)}
                  className="cursor-pointer border-b border-[var(--border-muted)]/70 text-[13px] transition-all duration-200 hover:bg-[var(--surface-2)] hover:shadow-sm hover:scale-[1.002] active:scale-[0.998] relative z-0 hover:z-10"
                >
                  <td className="px-4 py-4 font-semibold text-[var(--text-main)]">{row.scanName}</td>
                  <td className="px-4 font-semibold text-[var(--text-main)]">{row.type}</td>
                  <td className="px-4 py-3">
                    <StatusChip status={row.status} />
                  </td>
                  <td className="px-4 py-3">
                    <ProgressCell progress={row.progress} status={row.status} />
                  </td>
                  <td className="px-4 py-3">
                    <VulnerabilityCell vulnerabilities={row.vulnerabilities} hideMediumLow={hideMediumLow} />
                  </td>
                  <td className="px-4 py-3 font-semibold text-[var(--text-main)]">{row.lastScan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border-muted)] px-4 py-3 text-sm text-[var(--text-dim)]">
          <p>
            Showing <span className="font-semibold text-[var(--text-main)]">{filteredRows.length}</span> of{' '}
            <span className="font-semibold text-[var(--text-main)]">{scans.length}</span> scans
          </p>
          <div className="hidden items-center gap-2 md:flex">
            <p className="font-medium text-[var(--text-subtle)]">Status: {statusFilter}</p>
            <button className="inline-flex h-5 w-5 items-center justify-center rounded border border-[var(--border-muted)] text-[var(--text-dim)]">
              <ChevronLeft size={12} />
            </button>
            <button className="inline-flex h-5 w-5 items-center justify-center rounded border border-[var(--border-muted)] text-[var(--text-dim)]">
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </Card>
    </AppShell>
  )
}
