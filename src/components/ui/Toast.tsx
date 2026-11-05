import { useEffect, useState } from 'react';
import type { ToastMessage } from '../../types/catalog';

const TOAST_DURATION_MS = 3000;
const TOAST_EXIT_DURATION_MS = 250;

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: number) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsVisible(true));
    const hideTimer = window.setTimeout(() => setIsVisible(false), TOAST_DURATION_MS);
    const removeTimer = window.setTimeout(
      () => onDismiss(toast.id),
      TOAST_DURATION_MS + TOAST_EXIT_DURATION_MS,
    );

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
    };
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`toast toast--${toast.tone}${isVisible ? ' is-visible' : ''}`}
      role={toast.tone === 'error' ? 'alert' : 'status'}
    >
      {toast.message}
    </div>
  );
}
