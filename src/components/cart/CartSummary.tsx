import { Link } from 'react-router'
import { formatPrice } from '../../utils/format'

const FREE_SHIPPING_THRESHOLD = 50

export function CartSummary({ total }: { total: number }) {
  const amountLeft = Math.max(FREE_SHIPPING_THRESHOLD - total, 0)
  const progress = Math.min(total / FREE_SHIPPING_THRESHOLD, 1) * 100

  return (
    <aside className="cart-summary" aria-labelledby="summary-heading">
      <h2 id="summary-heading" className="cart-summary__title">
        Order summary
      </h2>
      <dl className="cart-summary__rows">
        <div className="cart-summary__row">
          <dt>Subtotal</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
        <div className="cart-summary__row">
          <dt>Shipping</dt>
          <dd>{amountLeft === 0 ? 'Free' : 'Calculated at checkout'}</dd>
        </div>
        <div className="cart-summary__row cart-summary__row--total">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      <div className="shipping-meter">
        <p className="shipping-meter__text" aria-live="polite">
          {amountLeft === 0
            ? "You've unlocked free shipping!"
            : `Add ${formatPrice(amountLeft)} more for free shipping.`}
        </p>
        <div className="shipping-meter__track" aria-hidden="true">
          <div className="shipping-meter__bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <Link className="button button--secondary cart-summary__continue" to="/#catalog">
        Continue shopping
      </Link>
    </aside>
  )
}
