import { ProductCardSkeleton } from './ProductCardSkeleton';

// Placeholders have no data of their own, so they get fixed ids instead of the array index.
const PLACEHOLDER_IDS = ['first', 'second', 'third', 'fourth'];

export function ProductGridSkeleton() {
  return (
    <div className="product-grid" aria-hidden="true">
      {PLACEHOLDER_IDS.map((id) => (
        <ProductCardSkeleton key={id} />
      ))}
    </div>
  );
}
