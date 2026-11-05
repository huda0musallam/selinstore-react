import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  children: ReactNode
  action: ReactNode
}

export function EmptyState({ title, children, action }: EmptyStateProps) {
  return (
    <section className="cart-empty">
      <h2 className="cart-empty__title">{title}</h2>
      <p>{children}</p>
      {action}
    </section>
  )
}
