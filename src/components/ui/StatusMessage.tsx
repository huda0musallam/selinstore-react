import type { ReactNode } from 'react';

interface StatusMessageProps {
  tone: 'info' | 'error';
  children: ReactNode;
  action?: ReactNode;
}

export function StatusMessage({ tone, children, action }: StatusMessageProps) {
  return (
    <div
      className={`status-message status-message--${tone}`}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      <p>{children}</p>
      {action}
    </div>
  );
}
