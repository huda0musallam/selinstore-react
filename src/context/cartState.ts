import { localProducts } from '../data/products'
import type { CartItem } from '../types/cart'
import type { Product } from '../types/product'
import { readStorage } from '../utils/storage'

export const CART_STORAGE_KEY = 'selin-cart'

export type CartAction =
  | { type: 'add'; product: Product }
  | { type: 'increase'; productId: string }
  | { type: 'decrease'; productId: string }
  | { type: 'remove'; productId: string }
  | { type: 'clear' }

export function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'add':
      return items.some((item) => item.id === action.product.id)
        ? items.map((item) =>
            item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...items, { ...action.product, quantity: 1 }]
    case 'increase':
      return items.map((item) =>
        item.id === action.productId ? { ...item, quantity: item.quantity + 1 } : item,
      )
    case 'decrease':
      return items
        .map((item) =>
          item.id === action.productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0)
    case 'remove':
      return items.filter((item) => item.id !== action.productId)
    case 'clear':
      return []
  }
}

function isSavedCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Record<string, unknown>
  return (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.price === 'number' &&
    typeof item.image === 'string' &&
    typeof item.categoryId === 'string' &&
    typeof item.quantity === 'number' &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  )
}

/**
 * Baby products take their latest details from the catalogue. ShopBoard products aren't
 * known until the API answers, so they are restored from the saved copy.
 */
export function loadCart(): CartItem[] {
  const saved = readStorage(CART_STORAGE_KEY)
  if (!Array.isArray(saved)) return []

  return saved.filter(isSavedCartItem).map((item) => {
    const product = localProducts.find((local) => local.id === item.id)
    return product ? { ...product, quantity: item.quantity } : item
  })
}
