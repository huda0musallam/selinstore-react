import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { localProducts } from '../data/products'
import { getProducts } from '../services/productsApi'
import type { CategoryFilter, Product, SortOrder } from '../types/product'
import { filterByCategory, searchProducts, sortByPrice } from '../utils/filters'
import { CatalogContext, type ApiStatus } from './catalogContext'
import { useToast } from './toastContext'

export function CatalogProvider({ children }: { children: ReactNode }) {
  const showToast = useToast()

  const [apiProducts, setApiProducts] = useState<Product[]>([])
  const [apiStatus, setApiStatus] = useState<ApiStatus>('loading')
  const [apiError, setApiError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('default')

  useEffect(() => {
    const controller = new AbortController()

    getProducts(controller.signal)
      .then((items) => {
        setApiProducts(items)
        setApiStatus(items.length > 0 ? 'success' : 'empty')
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        const reason = error instanceof Error ? error.message : 'Failed to load products'
        const message = `Could not load products: ${reason}`
        setApiError(message)
        setApiStatus('error')
        showToast(message, 'error')
      })

    return () => controller.abort()
  }, [attempt, showToast])

  const retry = useCallback(() => {
    setApiStatus('loading')
    setApiError(null)
    setAttempt((current) => current + 1)
  }, [])

  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setCategory('all')
    setSortOrder('default')
  }, [])

  const products = useMemo(() => [...localProducts, ...apiProducts], [apiProducts])

  const visibleProducts = useMemo(
    () => sortByPrice(filterByCategory(searchProducts(products, searchTerm), category), sortOrder),
    [products, searchTerm, category, sortOrder],
  )

  const value = useMemo(
    () => ({
      products,
      visibleProducts,
      apiStatus,
      apiError,
      retry,
      searchTerm,
      category,
      sortOrder,
      setSearchTerm,
      setCategory,
      setSortOrder,
      clearFilters,
    }),
    [
      products,
      visibleProducts,
      apiStatus,
      apiError,
      retry,
      searchTerm,
      category,
      sortOrder,
      clearFilters,
    ],
  )

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}
