import { getCategoryName } from '../../data/categories'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/format'
import { BagIcon, HeartIcon } from '../ui/Icons'
import { ProductImage } from './ProductImage'

interface ProductCardProps {
  product: Product
  isFavorite: boolean
  onAddToCart: (product: Product) => void
  onToggleFavorite: (productId: string) => void
}

export function ProductCard({
  product,
  isFavorite,
  onAddToCart,
  onToggleFavorite,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__media">
        <ProductImage
          className="product-card__image"
          src={product.image}
          alt={product.imageAlt}
          width={600}
          height={450}
        />
        {!product.inStock && <span className="product-card__stock">Out of stock</span>}
        <span className="product-card__actions">
          <button
            type="button"
            className="product-icon-button"
            aria-label={
              product.inStock ? `Add ${product.name} to cart` : `${product.name} is out of stock`
            }
            disabled={!product.inStock}
            onClick={() => onAddToCart(product)}
          >
            <BagIcon />
          </button>
          <button
            type="button"
            className={`product-icon-button favorite-button${isFavorite ? ' is-favorite' : ''}`}
            aria-label={`${isFavorite ? 'Remove' : 'Add'} ${product.name} ${isFavorite ? 'from' : 'to'} wishlist`}
            aria-pressed={isFavorite}
            onClick={() => onToggleFavorite(product.id)}
          >
            <HeartIcon />
          </button>
        </span>
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{getCategoryName(product.categoryId)}</p>
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__price">{formatPrice(product.price)}</p>
      </div>
    </article>
  )
}
