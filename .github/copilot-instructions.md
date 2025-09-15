# Copilot Project Instructions

Concise, project-specific guidance for AI coding agents working in this repository.

## Project Snapshot
Static vanilla JS e‑commerce demo focused on a single device PDP (`index.html`) and a prototype checkout (`checkout.html`). Roadmap/docs in `docs/` describe future expansion (filters, full catalog, accounts, admin) but ONLY cart + checkout UI stubs are implemented. Keep additions incremental and consistent with current lightweight, framework‑free approach.

## Key Files & Responsibilities
- `index.html`: Product detail page; expects global cart + gallery logic.
- `checkout.html`: Uses `assets/js/checkout.js` for rendering stored cart + simulated payment.
- `assets/js/script.js`: Primary shared cart, notification, modal, FAQ, header button handlers.
- `assets/js/checkout.js`: Checkout-specific: loads cart, quantity updates, summary + shipping logic.
- `script.js` (root): Legacy / duplicate of `assets/js/script.js` (prefer consolidating to `assets/js/` version when refactoring; avoid creating a third copy).
- `assets/css/styles.css` and `assets/css/checkout.css`: Styling; inline styles are currently heavily used inside dynamic JS-rendered cart modal.
- `docs/*.md`: PRD/backlog & feature spec for future pages (e.g. `view-all-products-prd.md`). Treat as direction, not implemented reality.

## Current Behavioral Patterns
- Cart persistence key: `bluCart` (localStorage). Shape: `{ id, name, quantity, price, total, image }`.
- Cart count derived (never stored independently) -> always recalc via `cart.reduce(...)` after mutations.
- Modal / notification pattern: DOM elements created ad hoc, ephemeral, removed with CSS keyframe animations (`slideIn`, `slideOut`, `slideInRight`, `slideOutRight`). DO NOT introduce external libs.
- Image switching on PDP relies on `.thumbnail` elements + static `imageUrls` array order mapping.
- Shipping calc (checkout): free if total >= £25, else £3.99 (or 'Calculated in checkout' when empty). Keep logic pure & side-effect free except DOM updates.

## Conventions & Constraints
- No build tooling. Serve via simple static server. Avoid bundler-only syntax (e.g. ES modules, imports) unless you also provide a graceful fallback or migrate project structure intentionally.
- All JS executes in global scope; functions are hoisted. If adding new utilities, keep naming flat & descriptive (e.g. `applyFilters`, `renderProductGrid`). Avoid polluting with ambiguous names.
- Inline template literals used for large HTML fragments; keep styling minimal or move repeated inline styles into CSS if reused 3+ times.
- Use existing notification helper (`showNotification`) instead of adding new toast patterns.
- Keep accessibility (buttons not <div>, alt text for images) consistent with existing intent.

## Safe Extension Guidance
When implementing new pages (e.g., "View All Products"):
1. Create an HTML file at root (e.g., `all-products.html`).
2. Add dataset as a JS array (consider `assets/js/products.js`). Shape should align with cart needs (`name`, `price`, `image`, plus filter fields: `brand`, `flavor`, `nicotine`, `deviceType`).
3. Implement filter UI: semantic form controls; on change -> regenerate grid (no framework; simple `innerHTML` rebuild acceptable for small set).
4. Reuse cart functions by ensuring global scope (either include `assets/js/script.js` first or extract cart logic to a dedicated `cart.js`).
5. Maintain pricing format: `£${value.toFixed(2)}`.
6. Always update cart via existing `addToCart()` flow to ensure badge + persistence sync.

## Refactoring Priorities (if touching related code)
- Single source of cart logic (remove root `script.js`).
- Extract inline modal/cart sidebar styles into a class-based CSS block (optional, low risk improvement).
- De-duplicate duplicated logic between PDP and checkout (shared helpers for `updateCartCount`, `saveCart`).

## Scaling to Many Pages (Forthcoming Expansion)
When adding several new feature pages (catalog, account, admin, etc.) keep "key files" concept by introducing clear tiers:
1. Core Runtime (global, always loaded):
	- `assets/js/core/cart.js` (extract from current `script.js`): cart state, persistence, notification, modal rendering hooks.
	- `assets/js/core/ui.js`: generic helpers (notification, modal animations) if they grow.
	- `assets/css/core.css`: shared utility classes, animation keyframes (moves inline styles here).
2. Feature Modules (page-scoped logic):
	- Naming: `assets/js/feature/<feature>.js` (e.g., `feature/products-grid.js`, `feature/filters.js`, `feature/checkout.js`).
	- Each exposes init function: `initProductsGrid()`, `initCheckout()`, called via inline script at bottom of the HTML page after core includes.
3. Data Layer:
	- `assets/data/products.js` exporting `const PRODUCTS = [...]` (stay flat JSON-like arrays; avoid dynamic fetching until backend exists).
	- Future separation: `products.meta.js` if metadata (filters enums) diverges from product list.
4. Page Templates:
	- Keep HTML pages at root for now (`index.html`, `all-products.html`, `checkout.html`, ...). If count exceeds ~12, introduce `pages/` folder & adjust relative asset paths consistently.

Loading Order Pattern (in each HTML):
```
<script src="assets/js/core/cart.js"></script>
<script src="assets/js/core/ui.js"></script>
<script src="assets/data/products.js"></script><!-- only where needed -->
<script src="assets/js/feature/products-grid.js"></script>
<script>initProductsGrid();</script>
```

Key File Designation Going Forward:
- Treat only the Core Runtime + Data Layer as "key"; feature modules are replaceable & isolated.
- Keep cart API stable: `addToCart(item)`, `updateCartItemQuantity(id, qty)`, `removeFromCart(id)`, `clearCart()`, `getCart()` (optional pure getter to reduce direct `cart` mutations outside core).

Dependency Rules:
- Feature modules may call cart API & DOM, but MUST NOT directly mutate `localStorage` or the underlying `cart` array (enforce via moving `cart` inside IIFE and exposing functions if refactored later).
- Core modules never import feature modules; one-way dependency ensures safe pruning.

Progressive Refactor Strategy:
1. Extract cart + notification from current `assets/js/script.js` to `core/cart.js`.
2. Replace global functions with namespaced object if growth requires (`window.Cart = { add(), remove(), ... }`).
3. Migrate duplicated logic in `checkout.js` to reuse core methods, keeping only view rendering in checkout feature file.
4. After stabilizing, delete root `script.js`.

Performance Considerations (static multi-page):
- Avoid bundling; rely on browser caching of core files.
- Keep product dataset under a few hundred items client-side; beyond that, plan backend/API before scaling further.

Documentation Maintenance:
- Update this instructions file when a new core tier file is introduced.
- Add brief header comments in each core file explaining its public API.

## Anti-Goals (Avoid Unless Project Scope Changes)
- Adding frameworks (React/Vue), build steps, transpilers.
- Introducing server-side code or real payment integrations.
- Migrating to modules without updating all script includes.
- Replacing localStorage with external storage.

## Testing / Manual Verification Checklist
After cart-related changes verify:
- Add same item twice increments quantity (no duplicate entry).
- Removing last item hides cart count badge.
- Checkout page reflects updated quantities & shipping thresholds.
- Notification animations still dismiss after 3s.

## Example: Adding a Filtered Product Grid (Pseudo-Structure)
```
<script src="assets/js/script.js"></script>
<script>
const products = [ { name: 'Blu 2.0 Device', price: 9.99, brand:'Blu', flavor:'Neutral', nicotine:'0mg', deviceType:'Device', image:'assets/images/imp2.avif' } ];
function renderGrid(list) { /* build cards + Add to Cart buttons calling addToCart(product) variant */ }
</script>
```
Keep new helpers pure (accept data, return HTML) when feasible.

## When Unsure
Favor smallest diff, mimic existing patterns, and reference PRD/backlog only to guide naming + structure—not to over-engineer.

---
Provide feedback if cart logic is refactored or additional pages are added so these instructions can be updated.
