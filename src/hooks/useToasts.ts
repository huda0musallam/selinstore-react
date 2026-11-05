import { useCallback, useRef, useState } from 'react';
import type { ToastMessage, ToastTone } from '../types/catalog';

export function useToasts() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const nextId = useRef(0);

  const showToast = useCallback((message: string, tone: ToastTone = 'success') => {
    nextId.current += 1;
    const id = nextId.current;
    setToasts((current) => [...current, { id, message, tone }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  return { toasts, showToast, dismissToast };
}
