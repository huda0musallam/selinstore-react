import type { ReactNode } from 'react'

interface StatusNoticeProps {
  variant: 'error' | 'info'
  children: ReactNode
  action?: ReactNode
}

export function StatusNotice({ variant, children, action }: StatusNoticeProps) {
  return (
    <div
      className={`status-notice status-notice--${variant}`}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      <p>{children}</p>
      {action}
    </div>
  )
}
