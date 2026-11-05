import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import {
  addToCart,
  cart,
  clearCart,
  decreaseQuantity,
  getAmountUntilFreeShipping,
  getCartCount,
  getCartTotal,
  increaseQuantity,
  removeFromCart,
} from './cart/cart';
import type { Cart } from './cart/cart.types';
import { Layout } from './components/layout/Layout';
import { ToastContainer } from './components/ui/ToastContainer';
import { loadFavorites, saveFavorites } from './favorites/favorites';
import { useToasts } from './hooks/useToasts';
import { CartPage } from './pages/CartPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { filterByCategory, searchProducts, sortByPrice } from './products/filters';
import { getProducts } from './products/products.api';
import type { Product } from './products/products.types';
import type { CategoryFilter, ProductsState, SortOrder } from './types/catalog';

/** cart.ts changes its own array in place, so React gets a fresh copy after every change. */
function snapshotCart(): Cart {
  return cart.map((item) => ({ ...item }));
}

export default function App() {
  const { toasts, showToast, dismissToast } = useToasts();

  const [cartItems, setCartItems] = useState<Cart>(snapshotCart);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(loadFavorites);
  const [productsState, setProductsState] = useState<ProductsState>({ status: 'loading' });
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('default');

  useEffect(() => {
    let ignore = false;

    getProducts()
      .then((apiProducts) => {
        if (ignore) return;
        if (apiProducts.length === 0) {
          setProductsState({ status: 'empty' });
          return;
        }

        // A saved cart or favorite can point to a product the API no longer has. Drop those,
        // so the cart and favorites only ever hold products from the API.
        const apiIds = new Set(apiProducts.map((product) => product.id));
        cart.filter((item) => !apiIds.has(item.id)).forEach((item) => removeFromCart(item.id));
        setCartItems(snapshotCart());
        setFavoriteIds((current) => current.filter((id) => apiIds.has(id)));
        setProductsState({ status: 'success', products: apiProducts });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        const reason = error instanceof Error ? error.message : 'Unknown error';
        const message = `Could not load products: ${reason}`;
        setProductsState({ status: 'error', message });
        showToast(message, 'error');
      });

    return () => {
      ignore = true;
    };
  }, [loadAttempt, showToast]);

  useEffect(() => {
    saveFavorites(favoriteIds);
  }, [favoriteIds]);

  // Products come only from the API. Until it answers successfully there are none to show.
  const loadedProducts = productsState.status === 'success' ? productsState.products : null;
  const visibleProducts = sortByPrice(
    filterByCategory(searchProducts(loadedProducts ?? [], searchTerm.trim()), category),
    sortOrder,
  );

  function updateCart(change: () => void) {
    change();
    setCartItems(snapshotCart());
  }

  function handleAddToCart(product: Product) {
    updateCart(() => addToCart(product));
    showToast(`${product.name} added to your cart`);
  }

  function handleToggleFavorite(productId: string) {
    setFavoriteIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }

  function handleRetry() {
    setProductsState({ status: 'loading' });
    setLoadAttempt((current) => current + 1);
  }

  function handleClearFilters() {
    setSearchTerm('');
    setCategory('all');
    setSortOrder('default');
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              cartCount={getCartCount()}
              favoriteCount={favoriteIds.length}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSelectCategory={setCategory}
            />
          }
        >
          <Route
            index
            element={
              <HomePage
                productsState={productsState}
                loadedProducts={loadedProducts}
                visibleProducts={visibleProducts}
                favoriteIds={favoriteIds}
                category={category}
                sortOrder={sortOrder}
                onCategoryChange={setCategory}
                onSortChange={setSortOrder}
                onClearFilters={handleClearFilters}
                onRetry={handleRetry}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="cart"
            element={
              <CartPage
                items={cartItems}
                count={getCartCount()}
                total={getCartTotal()}
                amountUntilFreeShipping={getAmountUntilFreeShipping()}
                onIncrease={(productId) => updateCart(() => increaseQuantity(productId))}
                onDecrease={(productId) => updateCart(() => decreaseQuantity(productId))}
                onRemove={(productId) => updateCart(() => removeFromCart(productId))}
                onClear={() => updateCart(clearCart)}
              />
            }
          />
          <Route
            path="contact"
            element={<ContactPage onMessageSent={() => showToast('Thanks for your message!')} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </BrowserRouter>
  );
}
