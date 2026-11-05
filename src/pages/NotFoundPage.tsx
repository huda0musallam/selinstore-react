import { Link } from 'react-router'
import { EmptyState } from '../components/ui/EmptyState'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found | Selin Baby Store')

  return (
    <main id="main-content" className="cart-page">
      <div className="container">
        <EmptyState
          title="We couldn't find that page"
          action={
            <Link className="button button--primary" to="/">
              Back to the store
            </Link>
          }
        >
          The link may be old, or the page may have moved.
        </EmptyState>
      </div>
    </main>
  )
}
