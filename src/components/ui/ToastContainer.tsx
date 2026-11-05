import type { ToastMessage } from '../../types/catalog';
import { Toast } from './Toast';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
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
  );
}
