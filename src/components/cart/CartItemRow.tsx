import { getCategoryName } from '../../data/categories'
import type { CartItem } from '../../types/cart'
import { formatPrice } from '../../utils/format'
import { ProductImage } from '../products/ProductImage'

interface CartItemRowProps {
  item: CartItem
  onIncrease: (productId: string) => void
  onDecrease: (item: CartItem) => void
  onRemove: (productId: string) => void
}

export function CartItemRow({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) {
  return (
    <li className="cart-item">
      <ProductImage
        className="cart-item__image"
        src={item.image}
        alt={item.imageAlt}
        width={120}
        height={120}
      />
      <div className="cart-item__info">
        <p className="cart-item__category">{getCategoryName(item.categoryId)}</p>
        <h3 className="cart-item__name">{item.name}</h3>
        <p className="cart-item__price">{formatPrice(item.price)} each</p>
      </div>
      <div className="cart-item__actions">
        <div className="cart-item__quantity" role="group" aria-label={`Quantity of ${item.name}`}>
          <button
            type="button"
            className="cart-item__button"
            aria-label={`Decrease quantity of ${item.name}`}
            onClick={() => onDecrease(item)}
          >
            −
          </button>
          <span className="cart-item__amount">{item.quantity}</span>
          <button
            type="button"
            className="cart-item__button"
            aria-label={`Increase quantity of ${item.name}`}
            onClick={() => onIncrease(item.id)}
          >
            +
          </button>
        </div>
        <p className="cart-item__line-total">{formatPrice(item.price * item.quantity)}</p>
        <button
          type="button"
          className="cart-item__remove"
          aria-label={`Remove ${item.name} from cart`}
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </li>
  )
}
