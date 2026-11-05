import { useRef } from 'react';
import { Link } from 'react-router';
import type { CartItem } from '../cart/cart.types';
import { CartItemRow } from '../components/cart/CartItemRow';
import { CartSummary } from '../components/cart/CartSummary';
import { EmptyState } from '../components/ui/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { pluralize } from '../utils/pluralize';

interface CartPageProps {
  items: CartItem[];
  count: number;
  total: number;
  amountUntilFreeShipping: number;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
}

export function CartPage({
  items,
  count,
  total,
  amountUntilFreeShipping,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}: CartPageProps) {
  useDocumentTitle('Your Cart — Selin Baby Store');

  const headingRef = useRef<HTMLHeadingElement>(null);

  // When a row disappears its focused button goes with it, so move focus somewhere sensible.
  const focusHeading = () => headingRef.current?.focus();

  function handleDecrease(item: CartItem) {
    onDecrease(item.id);
    if (item.quantity === 1) focusHeading();
  }

  function handleRemove(productId: string) {
    onRemove(productId);
    focusHeading();
  }

  function handleClear() {
    onClear();
    focusHeading();
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
                    onIncrease={onIncrease}
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
            <CartSummary total={total} amountUntilFreeShipping={amountUntilFreeShipping} />
          </div>
        )}
      </div>
    </main>
  );
}
