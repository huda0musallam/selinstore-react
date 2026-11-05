import { fetchJson } from '../shared/api/client';

import type { Category, Product } from './products.types';

export interface ApiProduct {
  id: number;
  title: string;
  category_name: string;
  price_cents: number;
  in_stock: boolean;
}

interface ProductsResponse {
  items: ApiProduct[];
}

function isApiProduct(value: unknown): value is ApiProduct {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'number' &&
    'title' in value &&
    typeof value.title === 'string' &&
    'category_name' in value &&
    typeof value.category_name === 'string' &&
    'price_cents' in value &&
    typeof value.price_cents === 'number' &&
    'in_stock' in value &&
    typeof value.in_stock === 'boolean'
  );
}

function isProductsResponse(data: unknown): data is ProductsResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'items' in data &&
    Array.isArray(data.items) &&
    data.items.every(isApiProduct)
  );
}

function toProduct(apiProduct: ApiProduct): Product {
  const categoryMap: Record<string, Category> = {
    Bags: 'accessories',
    Shoes: 'accessories',
    Accessories: 'accessories',
  };

  return {
    id: String(apiProduct.id),
    name: apiProduct.title,
    categoryId: categoryMap[apiProduct.category_name] ?? 'accessories',
    price: apiProduct.price_cents / 100,
    image: '',
    imageAlt: apiProduct.title,
  };
}
export async function getProducts(): Promise<Product[]> {
  const response = await fetchJson('/api/products', isProductsResponse);

  return response.items.map(toProduct);
}
