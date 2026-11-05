# Debug lab log

The 5 bugs from https://shopboard-api.vercel.app/debug-lab.

These bugs were found by reading the lab's source code (`debug-lab-src.zip`) with help from AI.
Each one was then checked on the live page by following the "Try this" steps. The fixes below are
the code I would write. The lab code itself was not changed.

## Bug 1

- **What I saw:** A red warning in the Console when the page loads: "Each child in a list should
  have a unique "key" prop. Check the render method of `CategoryChips`."
- **Component:** `CategoryChips`
- **How I found it:** Console warning. It names the component directly.
- **Cause:** In `CategoryChips.tsx`, `categories.map(...)` returns `<span className="chip">` with
  no `key`. React needs a key on every item in a list to know which item is which.
- **Fix:** Use the category name as the key, because it is unique:
  `<span key={category} className="chip">{category}</span>`

## Bug 2

- **What I saw:** The sold-out cards (Mini Crossbody Bag and Wool Scarf) show "0" instead of
  nothing. The empty cart also shows "0" under the "Cart" title.
- **Component:** `StockNote` and `CartPanel`
- **How I found it:** It is visible on the page. In the Components tab, `StockNote` has the prop
  `stock: 0` on those cards. The code is in `StockNote.tsx` and `CartPanel.tsx` (Sources tab).
- **Cause:** Both put a number on the left of `&&`: `{stock && <span>...}` in `StockNote.tsx` and
  `{cart.length && <ul>...}` in `CartPanel.tsx`. When the number is 0, React does not skip it. It
  shows the 0 on the page.
- **Fix:** Use a real boolean on the left: `{stock > 0 && <span>...}` and
  `{cart.length > 0 && <ul>...}`

## Bug 3

- **What I saw:** After saving (♡) the Leather Tote Bag and sorting by "Price: low to high", the
  heart moves to the Wool Scarf, which is now first. The Leather Tote Bag loses its heart.
- **Component:** `ProductList` (the heart state is inside `ProductCard`)
- **How I found it:** In the Components tab, the `ProductCard` keys are `key="0"`, `key="1"`, and
  so on. They stay the same after sorting, even though the products change places.
- **Cause:** `ProductList.tsx` uses `key={index}`. The `saved` state belongs to the card in
  position 0, not to the Leather Tote Bag. After sorting, a different product is in position 0, so
  it gets the heart.
- **Fix:** Use the product id as the key: `<ProductCard key={product.id} ... />`

## Bug 4

- **What I saw:** After sorting by price and going back to "Featured", the original order does not
  come back. The list stays sorted by price.
- **Component:** `ProductList`
- **How I found it:** By comparing the order before and after sorting, then reading
  `ProductList.tsx` in the Sources tab.
- **Cause:** `products.sort(...)` sorts the original `PRODUCTS` array in place, so it changes the
  prop. After that, the "featured" order no longer exists.
- **Fix:** Sort a copy, not the prop: `[...products].sort((a, b) => a.price - b.price)`

## Bug 5

- **What I saw:** After adding the Canvas Backpack and clicking + twice, nothing changes: still
  "× 1", total $49, header "Cart (1)". After adding another product, the backpack jumps to "× 3".
- **Component:** `CartRow` (and the `onChange` it gets from `App`)
- **How I found it:** With "Highlight updates" turned on in the Components tab, the cart does not
  re-render when + is clicked. The code is in `CartRow.tsx` and `App.tsx`.
- **Cause:** `CartRow.tsx` changes the state object directly: `item.qty = item.qty + 1`. Then
  `App.tsx` calls `setCart(cart)` with the same array. React sees the same array, so it does not
  re-render. The changed number only shows up later, when adding a product creates a new array.
- **Fix:** Do not change `item`. Pass the id up and make a new array in `App`:
  `setCart(cart.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)))`
