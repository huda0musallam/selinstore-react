export type CategoryId =
  | 'clothing'
  | 'newborn'
  | 'feeding'
  | 'bath-care'
  | 'sleep'
  | 'toys'
  | 'accessories'

export type CategoryFilter = CategoryId | 'all'

export type SortOrder = 'default' | 'price-asc' | 'price-desc'

export interface Product {
  id: string
  name: string
  categoryId: CategoryId
  price: number
  /** Empty when the source has no photo (ShopBoard products). */
  image: string
  imageAlt: string
  inStock: boolean
}

export interface Category {
  id: CategoryId
  name: string
  navLabel: string
  icon: string
  image: string
  imageAlt: string
}
