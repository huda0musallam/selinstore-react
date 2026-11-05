# Selin Baby Store — Project Instructions

## Project

- Use React, TypeScript, and Vite.
- Keep the project frontend-only.
- Preserve existing design, products, images, and features.
- Read `design.md` before design changes, if available.

## Code Rules

- Use clean, modular, reusable components.
- Follow React best practices and strict TypeScript. Avoid `any`.
- Use semantic HTML and accessible labels.
- Keep search, filtering, sorting, and cart functionality working.
- Maintain responsive design and consistent UI/UX.
- Avoid unnecessary dependencies and unrelated changes.

## React Rules (from the debug lab)

- Every item in a list needs a `key` from the data, like `product.id`. Never use the array index as a key.
- The left side of `&&` must be a real boolean. Write `stock > 0 && ...`, not `stock && ...`, or React shows `0` on the page.
- Never change props or state directly. Copy first: `[...products].sort(...)`, not `products.sort(...)`.
- To update state, give React a new array or object (for example with `map` or `...`). Setting the same array again does not re-render.
- `tsc` with 0 errors is not enough. Run the app, check the Console, and test each feature by hand.

## Workflow

- Inspect the project before making changes.
- Combine related tasks and work efficiently.
- Explain major changes briefly and simply.
- Run build and lint checks; fix errors before reporting.
- Do not delete important files without approval.
- Never commit or push without permission.

## Avoid

- Outdated file paths.
- Unrequested features.
- Technology changes without approval.
- Broken imports or incomplete implementations.

## Communication

- Explain technical concepts simply.
- Keep explanations concise.
- Report changed files and actual test results.
- Prioritize a complete, correct, submission-ready project.
