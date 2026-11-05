import { useCart } from '../../context/cartContext'
import { useFavorites } from '../../context/favoritesContext'
import { useToast } from '../../context/toastContext'
import type { Product } from '../../types/product'
import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from './ProductCardSkeleton'

interface ProductGridProps {
  products: Product[]
  skeletonCount?: number
}

export function ProductGrid({ products, skeletonCount = 0 }: ProductGridProps) {
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const showToast = useToast()

  function handleAddToCart(product: Product) {
    addItem(product)
    showToast(`${product.name} added to your cart`)
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={isFavorite(product.id)}
          onAddToCart={handleAddToCart}
          onToggleFavorite={toggleFavorite}
        />
      ))}
      {Array.from({ length: skeletonCount }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}
