import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react'
import { useEffect } from 'react'

export type AlertLevel = 'error' | 'warning' | 'info' | 'success'

export interface AlertMessage {
  id: string
  level: AlertLevel
  title: string
  message: string
  duration?: number
}

interface AlertProps {
  alerts: AlertMessage[]
  onDismiss: (id: string) => void
}

const alertConfig = {
  error: {
    bg: 'bg-red-50',
    bgDark: 'bg-red-900/20',
    border: 'border-red-200',
    borderDark: 'border-red-700',
    text: 'text-red-800',
    textDark: 'text-red-200',
    icon: AlertTriangle
  },
  warning: {
    bg: 'bg-yellow-50',
    bgDark: 'bg-yellow-900/20',
    border: 'border-yellow-200',
    borderDark: 'border-yellow-700',
    text: 'text-yellow-800',
    textDark: 'text-yellow-200',
    icon: AlertCircle
  },
  info: {
    bg: 'bg-blue-50',
    bgDark: 'bg-blue-900/20',
    border: 'border-blue-200',
    borderDark: 'border-blue-700',
    text: 'text-blue-800',
    textDark: 'text-blue-200',
    icon: Info
  },
  success: {
    bg: 'bg-green-50',
    bgDark: 'bg-green-900/20',
    border: 'border-green-200',
    borderDark: 'border-green-700',
    text: 'text-green-800',
    textDark: 'text-green-200',
    icon: CheckCircle
  }
}

export default function AlertContainer({ alerts, onDismiss }: AlertProps) {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-md">
      {alerts.map(alert => {
        const config = alertConfig[alert.level]
        const Icon = config.icon
        
        return (
          <AlertMessage
            key={alert.id}
            alert={alert}
            Icon={Icon}
            onDismiss={onDismiss}
          />
        )
      })}
    </div>
  )
}

interface AlertMessageProps {
  alert: AlertMessage
  Icon: any
  onDismiss: (id: string) => void
}

function AlertMessage({ alert, Icon, onDismiss }: AlertMessageProps) {
  useEffect(() => {
    if (alert.duration) {
      const timer = setTimeout(() => onDismiss(alert.id), alert.duration)
      return () => clearTimeout(timer)
    }
  }, [alert, onDismiss])

  return (
    <div
      className={`rounded-lg border p-4 shadow-lg animate-in slide-in-from-right-4`}
      style={{
        backgroundColor: `var(--color-bg-secondary)`,
        borderColor: `var(--color-border)`
      }}
    >
      <div className="flex gap-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: `var(--color-${alert.level === 'error' ? 'danger' : alert.level === 'warning' ? 'warning' : alert.level === 'success' ? 'success' : 'info'})` }} />
        <div className="flex-1">
          <h4 className="font-semibold text-sm" style={{ color: `var(--color-text)` }}>
            {alert.title}
          </h4>
          <p className="text-xs mt-1" style={{ color: `var(--color-text-secondary)` }}>
            {alert.message}
          </p>
        </div>
        <button
          onClick={() => onDismiss(alert.id)}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
