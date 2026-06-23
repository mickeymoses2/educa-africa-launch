
# EDUCA Africa — Phase 2 Build Plan

Phase 2 layers commercial features on top of MVP 1 without redesigning anything. All new screens reuse the existing design tokens (navy hero, gold CTAs, teal accents, rounded cards, soft shadows) and the existing `PortalShell` / `DashboardShell` patterns. Mock data only — no real M-Pesa, no backend.

## 1. Data & shared components

Extend `src/data/educa.ts` with mock data:
- `payments`, `transactions`, `receipts`
- `scholarships`
- `products`, `categories`, `suppliers`, `orders`, `cartItems`
- `uniformRequirements`, `feeStructures`
- Types for each + helper getters

New shared components in `src/components/educa/`:
- `PaymentCard.tsx` — amount, due date, status badge, Pay CTA
- `ReceiptCard.tsx` + `ReceiptDocument.tsx` (printable receipt layout)
- `ScholarshipCard.tsx`
- `ProductCard.tsx`
- `OrderCard.tsx` + `OrderTimeline.tsx`
- `MpesaStepper.tsx` (reuses existing `Stepper`)
- `StatCard.tsx` (small KPI card — if not already covered by `SummaryCard`)

## 2. Navigation updates

Update `PortalShell.tsx`:
- **Parent nav additions:** Payments, Receipts, Scholarships, Marketplace, Uniforms, Orders
- **Student nav additions:** Scholarships, Marketplace, Orders
- Keep mobile bottom-nav at 5 tabs — swap "Docs" item for "Pay" (parent) / keep core, surface new sections via dashboard quick actions and sidebar.

Update `DashboardShell.tsx` (school):
- Add Payments, Fee Structures (already partially), Uniform Requirements, Approved Suppliers, Reports (enhance existing).

New `SupplierShell.tsx` in `src/components/educa/`:
- Mirrors `DashboardShell` styling. Sidebar items: Dashboard, Products, Orders, Inventory, Sales, Settings. User badge "Supplier".

## 3. New routes (file-based, dot-separated)

**Parent (`/parent/*`)**
- `parent.payments.tsx` — KPIs + recent transactions + payment cards
- `parent.payments.pay.tsx` — 5-step M-Pesa flow with `?step=` search param
- `parent.receipts.tsx` + `parent.receipts.$id.tsx`
- `parent.scholarships.tsx`, `parent.scholarships.$id.tsx`, `parent.scholarships.saved.tsx`
- `parent.uniforms.tsx` — 7-step stepper
- `parent.orders.tsx` + `parent.orders.$id.tsx`

**Student (`/student/*`)**
- `student.payments.tsx` (read-only summary)
- `student.receipts.tsx`
- `student.scholarships.tsx`, `student.scholarships.$id.tsx`, `student.scholarships.saved.tsx`
- `student.uniforms.tsx`
- `student.orders.tsx` + `student.orders.$id.tsx`

**Marketplace (public, `/marketplace/*`)**
- `marketplace.tsx` (layout `<Outlet />`)
- `marketplace.index.tsx` (hero, categories, featured, recommended)
- `marketplace.products.$id.tsx` (gallery, variants, add to cart)
- `marketplace.cart.tsx`
- `marketplace.checkout.tsx` + success state

**School (`/school/*`)**
- Extend existing `school.fees.tsx` with add/edit fee structures + application fee setup
- `school.uniforms.tsx` — uniform requirements table
- `school.suppliers.tsx` — approved suppliers
- `school.payments.tsx` — incoming payments summary
- Enhance existing `school.reports.tsx`

**Supplier portal (`/supplier/*`)** — new
- `supplier.tsx` (layout using `SupplierShell`)
- `supplier.index.tsx` (KPIs + low stock)
- `supplier.products.tsx`, `supplier.products.new.tsx`
- `supplier.orders.tsx`, `supplier.orders.$id.tsx`
- `supplier.inventory.tsx`
- `supplier.sales.tsx`
- `supplier.settings.tsx`

## 4. M-Pesa flow detail

Single route `parent.payments.pay.tsx` driven by `validateSearch` (`step: 1-5`, `type`, `amount`, `ref`). Uses `Stepper`. Mock buttons "Simulate Success / Failed" advance to step 4 or 5. Success links to receipt detail. Trustworthy financial visual: dark navy summary card, green success state, gold CTAs, M-Pesa green accent line.

## 5. Cart state

Lightweight in-memory store via a small `useCart` hook backed by `localStorage` for session continuity in the prototype. No backend.

## 6. Reports enhancements

Use simple stat cards + tables (no chart libs). Parent dashboard gets a "Phase 2 quick actions" row (Pay Fees, Order Uniform, Browse Marketplace, Find Scholarship).

## 7. Empty & success states

Reuse `EmptyState` everywhere; add gold-CTA success cards on payment success, order placed, scholarship saved, etc.

## 8. Out of scope (explicitly skipped)

AI matching, learning hub, exams, teacher dashboard, jobs, transport, accommodation, research, gov dashboard, real M-Pesa API, real backend, heavy analytics, EDUCA TV, forums, insurance.

## Technical notes

- TanStack Router file-based routes only; update `routeTree.gen.ts` to register new routes.
- Tailwind v4 tokens already configured — no `styles.css` changes needed.
- All new routes mobile-first; supplier portal optimized for desktop but usable on mobile.
- No new npm packages required.
