# Selin Baby Store (React)

`selinstore-react` is the React + TypeScript version of `selin-course-store`.
It is a separate repository. `selin-course-store` is not changed by this project. Its type,
API, filter and cart files are copied in, and the user interface is rebuilt with React
components.

## Technologies

- React 19 and React Router
- TypeScript (strict)
- Vite
- oxlint for linting, Prettier for formatting
- Husky and lint-staged, to check staged files before each commit
- ShopBoard API (`https://shopboard-api.vercel.app`) for the products

## Getting started

You need Node.js 20.19 or newer.

```bash
npm install            # install dependencies (also sets up the Husky hook)
npm run dev            # start the dev server
npm run build          # type-check and build for production
npm run preview        # preview the production build
npm run lint           # oxlint, fails on any warning
npm run format         # format every file with Prettier
npm run format:check   # check formatting without changing files
```

## Features

- **Product listing:** products load from the ShopBoard API and show as "New arrivals" and "Best
  sellers".
- **Search:** the header search box filters products by name. Upper or lower case does not
  matter. Typing on another page takes you to the results.
- **Category filter:** the category select, the category bar, the category cards and the footer
  links all set the same filter.
- **Sorting:** by price, low to high or high to low. "Default" brings back the API order.
- **Cart:** add products, change quantities, remove a product or clear the cart. The cart page
  shows the count, the total and a free-shipping meter. Adding a product shows a toast message.
- **Favorites:** the heart button on each product card.
- **Persistence:** the cart and the favorites are saved in `localStorage` (`selin-cart` and
  `selin-favorites`), so they survive a page refresh.
- **Contact page:** a demo form. Nothing is sent anywhere.

## Pages

| Route      | Page                                                       |
| ---------- | ---------------------------------------------------------- |
| `/`        | Hero, categories, product list, search, filter and sort    |
| `/cart`    | Cart with quantities, summary and free-shipping meter      |
| `/contact` | Contact form (demo only, nothing is sent)                  |
| any other  | "We couldn't find that page" with a link back to the store |

## Product data

Products come only from the ShopBoard API, loaded by `App` through
`src/products/products.api.ts`. There is no local fallback: if the request fails, the store
shows the error and **Try again**. The API sends no photos, so every product card shows a
branded placeholder.

The store keeps its own seven categories (Baby Clothing, Newborn Essentials, Feeding, Bath and
Care, Sleep, Toys, Accessories). The mapping in `products.api.ts` puts every API product in
**Accessories**, so the other six categories show the "No products match" message.

Once the products load, any saved cart line or favorite whose product the API no longer
returns is removed.

The catalog shows exactly one of these views:

- **Loading:** a "Loading products…" message and placeholder cards.
- **Error:** the error message with **Try again**, plus an error toast.
- **Empty:** "There are no products in the shop right now" when the API returns no products.
- **No results:** "No products match your search" with **Clear filters** when the search and
  filters find nothing.
- **Products:** the matching products, as "New arrivals" and "Best sellers".

## Files copied from selin-course-store

These files are copied from `selin-course-store` without changes:

- `src/products/`: `products.types.ts`, `filters.ts`, `products.ts`
- `src/cart/`: `cart.types.ts`, `cart.ts`
- `src/utils/format.ts`

Two copied files were changed to remove a type assertion (`as T`):

- `src/shared/api/client.ts`: `fetchJson()` now takes a type guard and checks the response with
  it, instead of trusting the JSON.
- `src/products/products.api.ts`: adds the guard for the products response
  (`isProductsResponse`) and passes it to `fetchJson()`. A response with the wrong shape now
  shows the error message instead of breaking the page.

`products.ts` is the local product list from `selin-course-store`. It is never used as a product
source here. It stays only because `cart.ts` imports it, and that file must not change.

`cart.ts` keeps the cart in its own array and changes it in place. `App` calls its functions
and then stores a fresh copy in React state, so React redraws.

On refresh, `src/cart/restore-cart.ts` rebuilds the cart from storage with `addToCart()`. The
`loadCart()` function from `selin-course-store` keeps only products from the local list, so
ShopBoard products would disappear from the cart on every refresh.

## Component tree

`App` owns all shared state. Data goes down as props, and changes come back up through `on…`
callbacks. The pages are rendered inside `Layout` through React Router's `<Outlet />`.

```
App                     state: cartItems, favoriteIds, productsState, loadAttempt,
│                              searchTerm, category, sortOrder, toasts
├── Layout              cartCount, favoriteCount, searchTerm, onSearchChange, onSelectCategory
│   ├── ScrollManager   (no props)
│   ├── Announcement    (no props)
│   ├── Header          cartCount, favoriteCount, searchTerm, onSearchChange
│   │   ├── HeaderSearch    value, onChange
│   │   │   └── Icon        name, className?
│   │   └── Icon            name
│   ├── CategoryNav     placement, onSelectCategory
│   │   └── CategoryLink    category, onSelect, className?, children
│   ├── <Outlet />      the page for the current route:
│   │   ├── HomePage    productsState, loadedProducts, visibleProducts, favoriteIds,
│   │   │   │           category, sortOrder, onCategoryChange, onSortChange,
│   │   │   │           onClearFilters, onRetry, onAddToCart, onToggleFavorite
│   │   │   ├── Hero            (no props)          state: activeIndex, isPaused
│   │   │   ├── Benefits        (no props)
│   │   │   ├── CategoryGrid    products, onSelectCategory
│   │   │   │   ├── SectionHeading  id?, title, lead, className?
│   │   │   │   └── CategoryLink    category, onSelect, className?, children
│   │   │   ├── CatalogSection  isLoading, controls, children
│   │   │   │   ├── SectionHeading  id?, title, lead
│   │   │   │   ├── CatalogControls category, sortOrder, onCategoryChange, onSortChange
│   │   │   │   └── CatalogResults  productsState, visibleProducts, favoriteIds, onRetry,
│   │   │   │       │               onClearFilters, onAddToCart, onToggleFavorite
│   │   │   │       ├── StatusMessage        tone, children, action?
│   │   │   │       ├── ProductGridSkeleton  (no props)
│   │   │   │       │   └── ProductCardSkeleton  (no props)
│   │   │   │       ├── SectionHeading       title, lead, className?
│   │   │   │       └── ProductGrid          products, favoriteIds, onAddToCart, onToggleFavorite
│   │   │   │           └── ProductCard      product, isFavorite, onAddToCart, onToggleFavorite
│   │   │   │               ├── ProductImage  src, alt, className, width, height   state: failedSrc
│   │   │   │               └── Icon          name
│   │   │   └── PromoSection    onSelectCategory
│   │   │       └── CategoryLink    category, onSelect, className?, children
│   │   ├── CartPage    items, count, total, amountUntilFreeShipping,
│   │   │   │           onIncrease, onDecrease, onRemove, onClear
│   │   │   ├── EmptyState      title, children, action
│   │   │   ├── CartItemRow     item, onIncrease, onDecrease, onRemove
│   │   │   │   └── ProductImage    src, alt, className, width, height   state: failedSrc
│   │   │   └── CartSummary     total, amountUntilFreeShipping
│   │   ├── ContactPage onMessageSent
│   │   │   └── ContactForm     onSubmitted                         state: isSubmitted
│   │   └── NotFoundPage    (no props)
│   │       └── EmptyState      title, children, action
│   └── Footer          onSelectCategory
│       ├── CategoryLink    category, onSelect, children
│       └── FooterLinks     title, links
└── ToastContainer      toasts, onDismiss
    └── Toast           toast, onDismiss                            state: isVisible
```

`CatalogResults` shows exactly one of `StatusMessage` (loading, error or empty), the no-match
message, or the `ProductGrid` lists. On the cart page, `CartPage` shows `EmptyState` when the
cart is empty, otherwise the `CartItemRow` list and `CartSummary`.

### Who owns each piece of state

| State                     | Owner                            | Used by                                                 |
| ------------------------- | -------------------------------- | ------------------------------------------------------- |
| `cartItems`               | `App` (`cart.ts` does the logic) | `CartPage`, and as `cartCount` in `Header`              |
| `favoriteIds`             | `App`                            | `ProductGrid` → `ProductCard`, and `favoriteCount`      |
| `productsState`           | `App`                            | `HomePage` → `CatalogSection`, `CatalogResults`         |
| `loadAttempt`             | `App`                            | Re-runs the product request when it changes             |
| `searchTerm`              | `App`                            | `Header` → `HeaderSearch`, and the visible product list |
| `category`                | `App`                            | `CatalogControls`, and every `CategoryLink`             |
| `sortOrder`               | `App`                            | `CatalogControls`, and the visible product list         |
| `toasts`                  | `App` (via `useToasts`)          | `ToastContainer` → `Toast`                              |
| `activeIndex`, `isPaused` | `Hero` (via `useCarousel`)       | The hero carousel only                                  |
| `isSubmitted`             | `ContactForm`                    | Switches between the form and the thank-you message     |
| `failedSrc`               | `ProductImage`                   | Shows a placeholder when a photo is missing or fails    |
| `isVisible`               | `Toast`                          | The toast's enter and exit animation                    |

`loadedProducts`, `visibleProducts`, `cartCount`, `total` and `amountUntilFreeShipping` are not
state. `App` works them out from the state on every render.

### How changes flow back up

| User action                    | Callback chain                                                                      | `App` updates                         |
| ------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------- |
| Types in the search box        | `HeaderSearch.onChange` → `Header` → `Layout.onSearchChange`                        | `searchTerm`                          |
| Picks a category in the select | `CatalogControls.onCategoryChange` → `HomePage`                                     | `category`                            |
| Clicks a category link         | `CategoryLink.onSelect` → `CategoryNav`, `CategoryGrid`, `PromoSection` or `Footer` | `category`                            |
| Changes the sort order         | `CatalogControls.onSortChange` → `HomePage`                                         | `sortOrder`                           |
| Clicks Clear filters           | `CatalogResults.onClearFilters` → `HomePage`                                        | `searchTerm`, `category`, `sortOrder` |
| Clicks Try again               | `CatalogResults.onRetry` → `HomePage`                                               | `productsState`, `loadAttempt`        |
| Adds a product to the cart     | `ProductCard.onAddToCart` → `ProductGrid` → `CatalogResults` → `HomePage`           | `cartItems`, `toasts`                 |
| Toggles a favorite             | `ProductCard.onToggleFavorite` → `ProductGrid` → `CatalogResults` → `HomePage`      | `favoriteIds`                         |
| Changes a quantity or removes  | `CartItemRow` → `CartPage.onIncrease` / `onDecrease` / `onRemove`                   | `cartItems`                           |
| Clears the cart                | `CartPage.onClear`                                                                  | `cartItems`                           |
| Sends the contact form         | `ContactForm.onSubmitted` → `ContactPage.onMessageSent`                             | `toasts`                              |
| A toast times out              | `Toast.onDismiss` → `ToastContainer`                                                | `toasts`                              |

## Structure

```
src/
  cart/        cart module from selin-course-store, and the cart restore on startup
  components/  layout, home, products, cart, contact and shared ui
  data/        categories and page content
  favorites/   saving and loading favorite product ids
  hooks/       useCarousel, useDocumentTitle, useToasts
  pages/       one component per route
  products/    product types, API, filters and local product list from selin-course-store
  shared/      API client from selin-course-store
  styles/      design tokens and one stylesheet per area
  types/       types used by the React UI
  utils/       price formatting, plurals and safe localStorage
```

## Deployment

Routes are handled in the browser, so a static host must serve `index.html` for unknown paths.
