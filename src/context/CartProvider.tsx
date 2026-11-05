import { useEffect, useMemo, useReducer, type ReactNode } from 'react'
import type { Product } from '../types/product'
import { writeStorage } from '../utils/storage'
import { CartContext } from './cartContext'
import { CART_STORAGE_KEY, cartReducer, loadCart } from './cartState'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart)

  useEffect(() => {
    writeStorage(CART_STORAGE_KEY, items)
  }, [items])

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      addItem: (product: Product) => dispatch({ type: 'add', product }),
      increase: (productId: string) => dispatch({ type: 'increase', productId }),
      decrease: (productId: string) => dispatch({ type: 'decrease', productId }),
      remove: (productId: string) => dispatch({ type: 'remove', productId }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [items],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
