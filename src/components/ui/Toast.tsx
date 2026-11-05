import { useEffect, useState } from 'react'
import type { ToastType } from '../../context/toastContext'

const TOAST_DURATION_MS = 3000
const TOAST_EXIT_DURATION_MS = 250

export interface ToastMessage {
  id: number
  message: string
  type: ToastType
}

interface ToastProps {
  toast: ToastMessage
  onDismiss: (id: number) => void
}

function Toast({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsVisible(true))
    const hideTimer = window.setTimeout(() => setIsVisible(false), TOAST_DURATION_MS)
    const removeTimer = window.setTimeout(
      () => onDismiss(toast.id),
      TOAST_DURATION_MS + TOAST_EXIT_DURATION_MS,
    )

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(hideTimer)
      window.clearTimeout(removeTimer)
    }
  }, [toast.id, onDismiss])

  return (
    <div
      className={`toast toast--${toast.type}${isVisible ? ' is-visible' : ''}`}
      role={toast.type === 'error' ? 'alert' : 'status'}
    >
      {toast.message}
    </div>
  )
}

interface ToastContainerProps {
  toasts: ToastMessage[]
  onDismiss: (id: number) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      className="toast-container"
      aria-live="polite"
      aria-relevant="additions text"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
