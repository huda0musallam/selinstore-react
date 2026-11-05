import type { Category, Product } from '../products/products.types';

export type CategoryFilter = Category | 'all';

export type SortOrder = 'default' | 'price-asc' | 'price-desc';

export interface CategoryInfo {
  id: Category;
  name: string;
  navLabel: string;
  icon: string;
  image: string;
  imageAlt: string;
}

/** The ShopBoard request, from first render to its answer. */
export type ProductsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty' }
  | { status: 'success'; products: Product[] };

export type ToastTone = 'success' | 'error';

export interface ToastMessage {
  id: number;
  message: string;
  tone: ToastTone;
}
