import { useCatalog } from '../../context/catalogContext'
import { pluralize } from '../../utils/format'
import { ProductGrid } from '../products/ProductGrid'
import { SectionHeading } from '../ui/SectionHeading'
import { StatusNotice } from '../ui/StatusNotice'
import { CatalogControls } from './CatalogControls'

const NEW_ARRIVALS_COUNT = 4
const SKELETON_COUNT = 4

export function CatalogSection() {
  const { visibleProducts, apiStatus, apiError, retry, clearFilters } = useCatalog()

  const isLoading = apiStatus === 'loading'
  const newArrivals = visibleProducts.slice(0, NEW_ARRIVALS_COUNT)
  const bestSellers = visibleProducts.slice(NEW_ARRIVALS_COUNT)
  const count = pluralize(visibleProducts.length, 'product')

  return (
    <section
      id="catalog"
      className="catalog"
      aria-labelledby="catalog-heading"
      aria-busy={isLoading}
    >
      <div className="container catalog__inner">
        <SectionHeading
          id="catalog-heading"
          title="New arrivals"
          lead="Fresh styles and essentials, just landed."
        />
        <CatalogControls />
        <p className="catalog__count" aria-live="polite">
          {isLoading ? `Showing ${count} · loading more…` : `Showing ${count}`}
        </p>

        {apiStatus === 'error' && (
          <StatusNotice
            variant="error"
            action={
              <button type="button" className="button button--secondary" onClick={retry}>
                Try again
              </button>
            }
          >
            {apiError}. Showing our own catalogue for now.
          </StatusNotice>
        )}
        {apiStatus === 'empty' && (
          <StatusNotice variant="info">
            ShopBoard has no extra products to show right now.
          </StatusNotice>
        )}

        {newArrivals.length > 0 && <ProductGrid products={newArrivals} />}

        {(bestSellers.length > 0 || isLoading) && (
          <>
            <SectionHeading
              className="best-sellers-heading"
              title="Best sellers"
              lead="The pieces parents come back for again and again."
            />
            <ProductGrid products={bestSellers} skeletonCount={isLoading ? SKELETON_COUNT : 0} />
          </>
        )}

        {visibleProducts.length === 0 && !isLoading && (
          <div className="empty-message">
            <p>No products match your search. Try another word or category.</p>
            <button type="button" className="button button--ghost" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
