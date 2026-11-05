import type { Product } from '../../products/products.types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  favoriteIds: string[];
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
}

export function ProductGrid({
  products,
  favoriteIds,
  onAddToCart,
  onToggleFavorite,
}: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favoriteIds.includes(product.id)}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
