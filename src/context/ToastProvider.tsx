import { useCallback, useRef, useState, type ReactNode } from 'react'
import { ToastContainer, type ToastMessage } from '../components/ui/Toast'
import { ToastContext, type ShowToast } from './toastContext'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const nextId = useRef(0)

  const showToast = useCallback<ShowToast>((message, type = 'success') => {
    nextId.current += 1
    const id = nextId.current
    setToasts((current) => [...current, { id, message, type }])
  }, [])

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}
