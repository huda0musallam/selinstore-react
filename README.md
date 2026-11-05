# Selin Baby Store (React)

React + TypeScript rebuild of the `selin-course-store` training project.

## Getting started

```bash
npm install
npm run dev     # local development
npm run build   # type-check and production build
npm run lint    # oxlint
```

## Pages

| Route      | Page                                                    |
| ---------- | ------------------------------------------------------- |
| `/`        | Hero, categories, product list, search, filter and sort |
| `/cart`    | Cart with quantities, summary and free-shipping meter   |
| `/contact` | Contact form (demo only, nothing is sent)               |

## Product data

The list combines two sources (`src/context/CatalogProvider.tsx`):

- `src/data/products.ts`: the 28 baby products and their photos. Always shown.
- ShopBoard API (`src/services/`): 12 live products. They have no photos, so they use a branded
  placeholder. The request drives the catalog states:
  - **Loading:** skeleton cards and a "loading more" count.
  - **Error:** a message with **Try again**, plus an error toast.
  - **Empty:** a notice that ShopBoard has nothing to add.
  - **Success:** the products join the list.

To preview a state, copy `.env.example` to `.env.local` and point `VITE_API_BASE_URL` at one of
ShopBoard's test routes.

## Structure

```
src/
  components/  layout, home, products, cart, contact and shared ui
  context/     toast, catalog, cart and favorites state
  data/        products, categories and page content
  hooks/       useCarousel, useDocumentTitle
  pages/       one component per route
  services/    API client and ShopBoard mapping
  styles/      design tokens and one stylesheet per area
  types/       shared TypeScript types
  utils/       formatting, filtering and safe localStorage
```

## Deployment

Routes are handled in the browser, so a static host must serve `index.html` for unknown paths.
