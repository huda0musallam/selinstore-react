import { isCategory } from '../data/categories';
import type { Product } from '../products/products.types';
import { readStorage } from '../utils/storage';
import { addToCart, cart } from './cart';

// cart.ts saves the full cart under this key on every change.
const CART_STORAGE_KEY = 'selin-cart';

interface SavedLine {
  product: Product;
  quantity: number;
}

function toSavedLine(value: unknown): SavedLine | null {
  if (typeof value !== 'object' || value === null) return null;
  if (
    !('id' in value) ||
    !('name' in value) ||
    !('categoryId' in value) ||
    !('price' in value) ||
    !('image' in value) ||
    !('imageAlt' in value) ||
    !('quantity' in value)
  ) {
    return null;
  }

  const { id, name, categoryId, price, image, imageAlt, quantity } = value;
  if (
    typeof id !== 'string' ||
    typeof name !== 'string' ||
    !isCategory(categoryId) ||
    typeof price !== 'number' ||
    typeof image !== 'string' ||
    typeof imageAlt !== 'string' ||
    typeof quantity !== 'number' ||
    !Number.isInteger(quantity) ||
    quantity < 1
  ) {
    return null;
  }

  return { product: { id, name, categoryId, price, image, imageAlt }, quantity };
}

/**
 * Rebuilds the cart from storage before the first render.
 *
 * The Day 3 loadCart() keeps only products from the local list, so ShopBoard products would
 * vanish on refresh. Replaying the saved lines through addToCart() keeps every product
 * and leaves cart.ts unchanged.
 */
export function restoreCart(): void {
  if (cart.length > 0) return;

  const saved = readStorage(CART_STORAGE_KEY);
  if (!Array.isArray(saved)) return;

  for (const value of saved) {
    const line = toSavedLine(value);
    if (!line) continue;
    for (let added = 0; added < line.quantity; added++) {
      addToCart(line.product);
    }
  }
}
