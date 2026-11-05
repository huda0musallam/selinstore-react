import { createContext, useContext } from 'react'
import type { CartItem } from '../types/cart'
import type { Product } from '../types/product'

export interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  addItem: (product: Product) => void
  increase: (productId: string) => void
  decrease: (productId: string) => void
  remove: (productId: string) => void
  clear: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart(): CartContextValue {
  const cart = useContext(CartContext)
  if (!cart) throw new Error('useCart must be used inside CartProvider')
  return cart
}
