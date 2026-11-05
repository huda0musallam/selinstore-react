import { useRef } from 'react'
import { Link } from 'react-router'
import { CartItemRow } from '../components/cart/CartItemRow'
import { CartSummary } from '../components/cart/CartSummary'
import { EmptyState } from '../components/ui/EmptyState'
import { useCart } from '../context/cartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import type { CartItem } from '../types/cart'
import { pluralize } from '../utils/format'

export function CartPage() {
  useDocumentTitle('Your Cart — Selin Baby Store')

  const { items, count, total, increase, decrease, remove, clear } = useCart()
  const headingRef = useRef<HTMLHeadingElement>(null)

  // When a row disappears its focused button goes with it, so move focus somewhere sensible.
  const focusHeading = () => headingRef.current?.focus()

  function handleDecrease(item: CartItem) {
    decrease(item.id)
    if (item.quantity === 1) focusHeading()
  }

  function handleRemove(productId: string) {
    remove(productId)
    focusHeading()
  }

  function handleClear() {
    clear()
    focusHeading()
  }

  return (
    <main id="main-content" className="cart-page">
      <div className="container">
        <div className="page-heading">
          <Link className="page-heading__back" to="/#catalog">
            ← Continue shopping
          </Link>
          <h1 ref={headingRef} className="page-heading__title" tabIndex={-1}>
            Your cart
          </h1>
          <p className="page-heading__lead">
            You have <strong>{pluralize(count, 'item')}</strong> in your cart.
          </p>
        </div>

        {items.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            action={
              <Link className="button button--primary" to="/#catalog">
                Start shopping
              </Link>
            }
          >
            Find something soft and lovely for your little one.
          </EmptyState>
        ) : (
          <div className="cart-layout">
            <section className="cart-items" aria-labelledby="cart-items-heading">
              <h2 id="cart-items-heading" className="visually-hidden">
                Items in your cart
              </h2>
              <ul className="cart-list">
                {items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onIncrease={increase}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                  />
                ))}
              </ul>
              <button
                type="button"
                className="button button--text cart-items__clear"
                onClick={handleClear}
              >
                Clear cart
              </button>
            </section>
            <CartSummary total={total} />
          </div>
        )}
      </div>
    </main>
  )
}
