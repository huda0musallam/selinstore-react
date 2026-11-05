import type { Product } from '../../products/products.types';
import type { ProductsState } from '../../types/catalog';
import { pluralize } from '../../utils/pluralize';
import { ProductGrid } from '../products/ProductGrid';
import { ProductGridSkeleton } from '../products/ProductGridSkeleton';
import { SectionHeading } from '../ui/SectionHeading';
import { StatusMessage } from '../ui/StatusMessage';

const NEW_ARRIVALS_COUNT = 4;

interface CatalogResultsProps {
  productsState: ProductsState;
  visibleProducts: Product[];
  favoriteIds: string[];
  onRetry: () => void;
  onClearFilters: () => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
}

/** Shows exactly one of: loading, error, empty, no match, or the product lists. */
export function CatalogResults({
  productsState,
  visibleProducts,
  favoriteIds,
  onRetry,
  onClearFilters,
  onAddToCart,
  onToggleFavorite,
}: CatalogResultsProps) {
  if (productsState.status === 'loading') {
    return (
      <>
        <StatusMessage tone="info">Loading products…</StatusMessage>
        <ProductGridSkeleton />
      </>
    );
  }

  if (productsState.status === 'error') {
    return (
      <StatusMessage
        tone="error"
        action={
          <button type="button" className="button button--secondary" onClick={onRetry}>
            Try again
          </button>
        }
      >
        {productsState.message}
      </StatusMessage>
    );
  }

  if (productsState.status === 'empty') {
    return (
      <StatusMessage tone="info">
        There are no products in the shop right now. Please check back soon.
      </StatusMessage>
    );
  }

  if (visibleProducts.length === 0) {
    return (
      <div className="empty-message">
        <p>No products match your search. Try another word or category.</p>
        <button type="button" className="button button--ghost" onClick={onClearFilters}>
          Clear filters
        </button>
      </div>
    );
  }

  const newArrivals = visibleProducts.slice(0, NEW_ARRIVALS_COUNT);
  const bestSellers = visibleProducts.slice(NEW_ARRIVALS_COUNT);

  return (
    <>
      <p className="catalog__count" aria-live="polite">
        Showing {pluralize(visibleProducts.length, 'product')}
      </p>
      <ProductGrid
        products={newArrivals}
        favoriteIds={favoriteIds}
        onAddToCart={onAddToCart}
        onToggleFavorite={onToggleFavorite}
      />
      {bestSellers.length > 0 && (
        <>
          <SectionHeading
            className="best-sellers-heading"
            title="Best sellers"
            lead="The pieces parents come back for again and again."
          />
          <ProductGrid
            products={bestSellers}
            favoriteIds={favoriteIds}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
          />
        </>
      )}
    </>
  );
}
