import { createContext, useContext } from 'react'
import type { CategoryFilter, Product, SortOrder } from '../types/product'

/** State of the ShopBoard request. The local baby catalogue is always available. */
export type ApiStatus = 'loading' | 'success' | 'empty' | 'error'

export interface CatalogContextValue {
  products: Product[]
  visibleProducts: Product[]
  apiStatus: ApiStatus
  apiError: string | null
  retry: () => void
  searchTerm: string
  category: CategoryFilter
  sortOrder: SortOrder
  setSearchTerm: (searchTerm: string) => void
  setCategory: (category: CategoryFilter) => void
  setSortOrder: (sortOrder: SortOrder) => void
  clearFilters: () => void
}

export const CatalogContext = createContext<CatalogContextValue | null>(null)

export function useCatalog(): CatalogContextValue {
  const catalog = useContext(CatalogContext)
  if (!catalog) throw new Error('useCatalog must be used inside CatalogProvider')
  return catalog
}
