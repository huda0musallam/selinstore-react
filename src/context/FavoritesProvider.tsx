import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { readStorage, writeStorage } from '../utils/storage'
import { useCatalog } from './catalogContext'
import { FavoritesContext } from './favoritesContext'

const FAVORITES_STORAGE_KEY = 'selin-favorites'

function loadFavorites(): string[] {
  const saved = readStorage(FAVORITES_STORAGE_KEY)
  if (!Array.isArray(saved)) return []
  return saved.filter((id: unknown): id is string => typeof id === 'string')
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { products, apiStatus } = useCatalog()
  const [favoriteIds, setFavoriteIds] = useState(loadFavorites)

  useEffect(() => {
    writeStorage(FAVORITES_STORAGE_KEY, favoriteIds)
  }, [favoriteIds])

  const toggleFavorite = useCallback((productId: string) => {
    setFavoriteIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }, [])

  // A saved ShopBoard favorite can only be judged stale once the API has answered.
  const count =
    apiStatus === 'success' || apiStatus === 'empty'
      ? favoriteIds.filter((id) => products.some((product) => product.id === id)).length
      : favoriteIds.length

  const value = useMemo(
    () => ({
      count,
      isFavorite: (productId: string) => favoriteIds.includes(productId),
      toggleFavorite,
    }),
    [count, favoriteIds, toggleFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
