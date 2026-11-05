import type { CategoryId, Product } from '../types/product'
import { fetchJson } from './apiClient'

interface ApiProduct {
  id: number
  title: string
  category_name: string
  price_cents: number
  in_stock: boolean
}

// ShopBoard only sells these three groups, all of which belong under Accessories.
const categoryMap: Record<string, CategoryId> = {
  Bags: 'accessories',
  Shoes: 'accessories',
  Accessories: 'accessories',
}

function isApiProduct(value: unknown): value is ApiProduct {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Record<string, unknown>
  return (
    typeof item.id === 'number' &&
    typeof item.title === 'string' &&
    typeof item.category_name === 'string' &&
    typeof item.price_cents === 'number' &&
    typeof item.in_stock === 'boolean'
  )
}

function toProduct(apiProduct: ApiProduct): Product {
  return {
    id: String(apiProduct.id),
    name: apiProduct.title,
    categoryId: categoryMap[apiProduct.category_name] ?? 'accessories',
    price: apiProduct.price_cents / 100,
    image: '',
    imageAlt: apiProduct.title,
    inStock: apiProduct.in_stock,
  }
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const body = await fetchJson('/api/products', signal)
  const items = (body as { items?: unknown } | null)?.items

  if (!Array.isArray(items) || !items.every(isApiProduct)) {
    throw new Error('Unexpected response from the products API')
  }

  return items.map(toProduct)
}
