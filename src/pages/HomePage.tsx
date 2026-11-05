import { Benefits } from '../components/home/Benefits';
import { CatalogControls } from '../components/home/CatalogControls';
import { CatalogResults } from '../components/home/CatalogResults';
import { CatalogSection } from '../components/home/CatalogSection';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { Hero } from '../components/home/Hero';
import { PromoSection } from '../components/home/PromoSection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { Product } from '../products/products.types';
import type { CategoryFilter, ProductsState, SortOrder } from '../types/catalog';

interface HomePageProps {
  productsState: ProductsState;
  /** The API products once loaded, otherwise null. */
  loadedProducts: Product[] | null;
  visibleProducts: Product[];
  favoriteIds: string[];
  category: CategoryFilter;
  sortOrder: SortOrder;
  onCategoryChange: (category: CategoryFilter) => void;
  onSortChange: (sortOrder: SortOrder) => void;
  onClearFilters: () => void;
  onRetry: () => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
}

export function HomePage({
  productsState,
  loadedProducts,
  visibleProducts,
  favoriteIds,
  category,
  sortOrder,
  onCategoryChange,
  onSortChange,
  onClearFilters,
  onRetry,
  onAddToCart,
  onToggleFavorite,
}: HomePageProps) {
  useDocumentTitle('Selin Baby Store');

  return (
    <main id="main-content">
      <Hero />
      <Benefits />
      <CategoryGrid products={loadedProducts} onSelectCategory={onCategoryChange} />
      <CatalogSection
        isLoading={productsState.status === 'loading'}
        controls={
          <CatalogControls
            category={category}
            sortOrder={sortOrder}
            onCategoryChange={onCategoryChange}
            onSortChange={onSortChange}
          />
        }
      >
        <CatalogResults
          productsState={productsState}
          visibleProducts={visibleProducts}
          favoriteIds={favoriteIds}
          onRetry={onRetry}
          onClearFilters={onClearFilters}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
        />
      </CatalogSection>
      <PromoSection onSelectCategory={onCategoryChange} />
    </main>
  );
}
