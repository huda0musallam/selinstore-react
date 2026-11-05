import type { CategoryFilter, Product, SortOrder } from '../types/product'

export function searchProducts(products: Product[], searchTerm: string): Product[] {
  const term = searchTerm.trim().toLowerCase()
  return products.filter((product) => product.name.toLowerCase().includes(term))
}

export function filterByCategory(products: Product[], category: CategoryFilter): Product[] {
  if (category === 'all') return products
  return products.filter((product) => product.categoryId === category)
}

export function sortByPrice(products: Product[], sortOrder: SortOrder): Product[] {
  const sorted = [...products]
  if (sortOrder === 'price-asc') return sorted.sort((a, b) => a.price - b.price)
  if (sortOrder === 'price-desc') return sorted.sort((a, b) => b.price - a.price)
  return sorted
}
