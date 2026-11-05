import { createContext, useContext } from 'react'

export interface FavoritesContextValue {
  count: number
  isFavorite: (productId: string) => boolean
  toggleFavorite: (productId: string) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function useFavorites(): FavoritesContextValue {
  const favorites = useContext(FavoritesContext)
  if (!favorites) throw new Error('useFavorites must be used inside FavoritesProvider')
  return favorites
}
