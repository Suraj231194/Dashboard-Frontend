import {
  Activity,
  Beaker,
  CheckSquare,
  ChevronDown,
  CircleDashed,
  Dot,
  FileSearch,
  FileText,
  FolderGit2,
  Globe,
  Network,
  PlayCircle,
  SearchCode,
  ShieldCheck,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { Card } from '../components/common/Card'
import { SeverityBadge } from '../components/common/SeverityBadge'
import { AppShell } from '../components/layout/AppShell'
import { scanDetail } from '../data/mockData'
import { cn } from '../lib/cn'

const stepIcons = {
  Spidering: SearchCode,
  Mapping: Network,
  Testing: Beaker,
  Validating: CheckSquare,
  Reporting: FileText,
}

const metaIcons = {
  'Scan Type': ShieldCheck,
  Targets: Globe,
  'Started At': PlayCircle,
  Credentials: FolderGit2,
  Files: FileSearch,
  Checklists: Activity,
}

function CircularProgress({ value, label }) {
  return (
    <div className="flex items-center justify-center rounded-full bg-[#0a1322] p-3 sm:p-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-[#0b2a3b] text-center sm:h-24 sm:w-24 sm:border-[7px]">
        <div>
          <p className="text-[34px] font-semibold leading-none text-accent sm:text-[44px]">{value}%</p>
          <p className="mt-1 text-xs text-white/70">{label}</p>
        </div>
      </div>
    </div>
  )
}

function StepTracker({ steps, activeStep }) {
  return (
    <div className="w-full overflow-x-auto pb-1">
      <div className="flex min-w-max items-center gap-3 md:grid md:min-w-0 md:grid-cols-5 md:gap-1">
        {steps.map((step, index) => {
          const Icon = stepIcons[step]
          const isActive = step === activeStep
          const isDone = steps.indexOf(activeStep) > index
          return (
            <div key={step} className="relative flex min-w-[98px] flex-col items-center gap-2 text-center md:min-w-0">
              <span
                className={cn(
                  'relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300',
                  isActive
                    ? 'border-transparent bg-accent text-white shadow-[0_0_0_8px_rgba(12,200,168,0.18)]'
                    : isDone
                      ? 'border-[#0cc8a866] bg-[#0cc8a826] text-accent'
                      : 'border-[var(--border-muted)] bg-[var(--surface-2)] text-[var(--text-dim)]',
                )}
              >
                <Icon size={16} />
              </span>
              <span
                className={cn(
                  'text-[13px] font-medium',
                  isActive ? 'text-[var(--text-main)]' : 'text-[var(--text-dim)]',
                )}
              >
                {step}
              </span>
              {index < steps.length - 1 ? (
                <span className="absolute left-[60%] top-[24px] hidden h-px w-[84%] bg-[var(--border-muted)] md:block lg:left-[58%]" />
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function colorizeToken(token) {
  const cleaned = token.toLowerCase()
  if (
    cleaned.includes('helpdesk.democorp.com') ||
    cleaned.startsWith('/api') ||
    cleaned.includes('/password/test') ||
    cleaned.includes('test:test')
  ) {
    return 'text-accent dark:text-accent'
  }
  if (cleaned.includes('x-userid') || cleaned.includes('todo')) {
    return 'text-[#2563eb] dark:text-[#60a5fa]'
  }
  if (cleaned.includes('idor') || cleaned.includes('not')) {
    return 'text-[#ef4444]'
  }
  if (cleaned.includes('great!') || cleaned.includes('good!') || cleaned.includes('excellent')) {
    return 'text-[#22c55e]'
  }
  return 'text-[#333f52] dark:text-[#d3def0]'
}

function ConsoleLine({ line }) {
  const tokens = line.split(/(\s+)/)
  return (
    <p className="font-mono text-[13px] leading-[1.55] text-[#2f3847] dark:text-[#dbe8ff]">
      {tokens.map((token, index) => (
        <span key={`${token}-${index}`} className={/\s+/.test(token) ? undefined : colorizeToken(token)}>
          {token}
        </span>
      ))}
    </p>
  )
}

function metadataClass(item) {
  return item.accent ? 'text-accent' : 'text-[var(--text-main)]'
}

export function ScanDetailPage() {
  const { scanId } = useParams()
  const [activeTab, setActiveTab] = useState('activity')
  const [isRunning, setRunning] = useState(true)
  const [mobilePane, setMobilePane] = useState('console')

  const detail = useMemo(() => ({ ...scanDetail, id: scanId ?? scanDetail.id }), [scanId])

  const activeLogs = activeTab === 'activity' ? detail.activityLog : detail.verificationLog

  return (
    <AppShell
      activeSection="scans"
      breadcrumb={detail.breadcrumb}
      onExportReport={() => toast.success('Exporting scan evidence package')}
      onStopScan={() => {
        setRunning(false)
        toast.error('Scan stopped by user')
      }}
    >
      <Card className="mb-3 rounded-[10px] p-3 shadow-none sm:p-4 md:p-5 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
        <div className="grid gap-4 lg:grid-cols-[250px_minmax(0,1fr)] lg:items-center lg:gap-5">
          <div className="flex justify-center lg:border-r lg:border-[var(--border-muted)] lg:pr-5">
            <CircularProgress value={detail.progress} label={isRunning ? detail.progressLabel : 'Stopped'} />
          </div>

          <div className="min-w-0 space-y-5 md:space-y-6">
            <StepTracker steps={detail.steps} activeStep={detail.activeStep} />
            <div className="grid grid-cols-2 gap-3 border-t border-[var(--border-muted)] pt-4 sm:grid-cols-3 lg:grid-cols-6">
              {detail.metadata.map((item) => {
                const Icon = metaIcons[item.label]
                return (
                  <div key={item.label} className="space-y-1">
                    <p className="flex items-center gap-1 text-[12px] text-[var(--text-dim)]">
                      <Icon size={12} />
                      {item.label}
                    </p>
                    <p className={cn('text-[15px] font-semibold leading-none', metadataClass(item))}>{item.value}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden rounded-[10px] shadow-none animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between border-b border-[var(--border-muted)] px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-main)]">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Live Scan Console
            </div>
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
                isRunning
                  ? 'bg-[#f5f5f51a] text-[var(--text-dim)]'
                  : 'bg-[#ef444424] text-[#ef4444]',
              )}
            >
              <CircleDashed size={12} />
              {isRunning ? 'Running...' : 'Stopped'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[var(--text-dim)]">
            <button className="transition hover:text-[var(--text-main)]">
              <ChevronDown size={15} />
            </button>
            <button className="transition hover:text-[var(--text-main)]">
              <X size={15} />
            </button>
          </div>
        </div>

        <div className="flex gap-2 border-b border-[var(--border-muted)] px-3 py-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobilePane('console')}
            className={cn(
              'h-8 flex-1 rounded-md text-xs font-semibold transition-colors',
              mobilePane === 'console'
                ? 'bg-accent/15 text-accent'
                : 'bg-[var(--surface-2)] text-[var(--text-dim)]',
            )}
          >
            Console
          </button>
          <button
            type="button"
            onClick={() => setMobilePane('findings')}
            className={cn(
              'h-8 flex-1 rounded-md text-xs font-semibold transition-colors',
              mobilePane === 'findings'
                ? 'bg-accent/15 text-accent'
                : 'bg-[var(--surface-2)] text-[var(--text-dim)]',
            )}
          >
            Findings
          </button>
        </div>

        <div className="grid gap-0 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <div
            className={cn(
              'border-b border-[var(--border-muted)] md:border-b-0 md:border-r',
              mobilePane === 'console' ? 'block' : 'hidden md:block',
            )}
          >
            <div className="flex border-b border-[var(--border-muted)] px-4">
              <button
                type="button"
                onClick={() => setActiveTab('activity')}
                className={cn(
                  'border-b-2 px-4 py-3 text-sm font-semibold transition-colors',
                  activeTab === 'activity'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-[var(--text-dim)] hover:text-[var(--text-main)]',
                )}
              >
                Activity Log
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('verification')}
                className={cn(
                  'border-b-2 px-4 py-3 text-sm font-semibold transition-colors',
                  activeTab === 'verification'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-[var(--text-dim)] hover:text-[var(--text-main)]',
                )}
              >
                Verification Loops
              </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto bg-[#f8fafc] p-3 dark:bg-[#06101b] sm:max-h-[360px] sm:p-4 md:max-h-[420px] md:p-5">
              <div className="space-y-3">
                {activeLogs.map((line, index) => (
                  <ConsoleLine key={`${index}-${line.slice(0, 20)}`} line={line} />
                ))}
              </div>
            </div>
          </div>

          <div className={cn('bg-[var(--surface-1)]', mobilePane === 'findings' ? 'block' : 'hidden md:block')}>
            <div className="border-b border-[var(--border-muted)] px-4 py-3">
              <p className="text-sm font-semibold text-[var(--text-main)]">Finding Log</p>
            </div>
            <div className="max-h-[300px] space-y-3 overflow-y-auto p-3 sm:max-h-[360px] sm:p-4 md:max-h-[420px]">
              {detail.findings.map((finding) => (
                <div
                  key={finding.id}
                  className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-2)] p-3 transition-all duration-300 hover:border-accent hover:-translate-y-0.5 hover:shadow-sm opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]"
                  style={{ animationDelay: '0.4s' }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <SeverityBadge severity={finding.severity} filled>
                      {finding.severity}
                    </SeverityBadge>
                    <span className="text-xs text-[var(--text-dim)]">{finding.time}</span>
                  </div>
                  <h3 className="text-[14px] font-semibold leading-tight text-[var(--text-main)]">{finding.title}</h3>
                  <p className="mt-1 text-[13px] font-semibold text-accent">{finding.path}</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-[var(--text-subtle)]">{finding.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 border-t border-[var(--border-muted)] bg-[var(--surface-2)] px-3 py-2 text-[11px] font-medium text-[var(--text-dim)] sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:px-4">
          <p className="flex items-center gap-0.5 whitespace-nowrap">
            <Dot size={14} />
            Sub-Agents: {detail.liveMetrics.subAgents}
          </p>
          <p className="flex items-center gap-0.5 whitespace-nowrap">
            <Dot size={14} />
            Parallel Executions: {detail.liveMetrics.parallelExecutions}
          </p>
          <p className="flex items-center gap-0.5 whitespace-nowrap">
            <Dot size={14} />
            Operations: {detail.liveMetrics.operations}
          </p>
          <div className="col-span-2 flex items-center justify-start gap-3 sm:ml-auto sm:justify-end sm:gap-4">
            <span className="text-[#ef4444]">Critical: {detail.liveMetrics.critical}</span>
            <span className="text-[#f97316]">High: {detail.liveMetrics.high}</span>
            <span className="text-[#f59e0b]">Medium: {detail.liveMetrics.medium}</span>
            <span className="text-[#22c55e]">Low: {detail.liveMetrics.low}</span>
          </div>
        </div>
      </Card>
    </AppShell>
  )
}
