import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import { CartProvider } from './context/CartProvider'
import { CatalogProvider } from './context/CatalogProvider'
import { FavoritesProvider } from './context/FavoritesProvider'
import { ToastProvider } from './context/ToastProvider'
import { CartPage } from './pages/CartPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <ToastProvider>
      <CatalogProvider>
        <FavoritesProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </FavoritesProvider>
      </CatalogProvider>
    </ToastProvider>
  )
}
