import type { Category, CategoryFilter, CategoryId, SortOrder } from '../types/product'

export const categories: Category[] = [
  {
    id: 'clothing',
    name: 'Baby Clothing',
    navLabel: 'Clothing',
    icon: '♧',
    image: '/images/selin-reference-apparel.png',
    imageAlt: 'Floral baby clothes arranged on a soft blanket',
  },
  {
    id: 'newborn',
    name: 'Newborn Essentials',
    navLabel: 'Newborn',
    icon: '☻',
    image: '/images/selin-reference-newborn-set.png',
    imageAlt: 'Newborn clothing and soft essentials',
  },
  {
    id: 'feeding',
    name: 'Feeding',
    navLabel: 'Feeding',
    icon: '♧',
    image: '/images/selin-reference-feeding.png',
    imageAlt: 'Pastel baby feeding bottles',
  },
  {
    id: 'bath-care',
    name: 'Bath and Care',
    navLabel: 'Bath & Care',
    icon: '♧',
    image: '/images/selin-reference-bath.png',
    imageAlt: 'Soft towels and bath care essentials',
  },
  {
    id: 'sleep',
    name: 'Sleep',
    navLabel: 'Sleep',
    icon: '☾',
    image: '/images/selin-reference-sleep.png',
    imageAlt: 'Sleeping baby in a cozy blanket',
  },
  {
    id: 'toys',
    name: 'Toys',
    navLabel: 'Toys',
    icon: '▦',
    image: '/images/selin-reference-toys.png',
    imageAlt: 'Wooden toys and a teddy bear',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    navLabel: 'Accessories',
    icon: '✧',
    image: '/images/selin-reference-accessories.png',
    imageAlt: 'Baby accessories in soft pastel colors',
  },
]

export const sortOptions: { value: SortOrder; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export function getCategoryName(categoryId: CategoryId): string {
  return categories.find((category) => category.id === categoryId)?.name ?? categoryId
}

export function isCategoryFilter(value: string): value is CategoryFilter {
  return value === 'all' || categories.some((category) => category.id === value)
}

export function isSortOrder(value: string): value is SortOrder {
  return sortOptions.some((option) => option.value === value)
}
