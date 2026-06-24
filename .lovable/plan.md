# Phase 2 Upgrade — Marketplace, Wallet & Logistics

Major upgrade keeping the existing EDUCA visual identity (navy/gold/teal, rounded cards, soft shadows). Mock data only — no real M-Pesa, no real logistics APIs.

## 1. Data layer (`src/data/educa.ts`)

Extend with:
- `bundles[]` — id, name, school, class, items count, price, gradient
- `categoriesFeatured[]` — uniforms/books/stationery/shoes/bags/sportswear/tech/special-needs
- `schoolsShoppable[]` — for "Shop By School" (reuse existing schools data)
- `deals[]` — back-to-school offers
- `walletBalances` — keyed by role (parent/student/school/supplier/logistics) with available, pending, recent fields
- `walletTransactions[]` — id, date, type, description, amount, status
- `logisticsPartners[]` — name, distance, eta, fee, vehicle, rating, coverage, gradient
- `deliveries[]` — id, orderRef, supplier, customer, pickup, dropoff, status, fee, items, timeline
- `deliveryRequests[]` — pending requests for logistics dashboard

## 2. Shared components (`src/components/educa/`)

New:
- `WalletCard.tsx` — top-of-dashboard balance card with role variants (parent/student/school/supplier/logistics), deposit/payout buttons
- `AccountTopBar.tsx` — slim header row: name + role + balance + deposit + notifications
- `TransactionRow.tsx` + `TxStatusBadge.tsx`
- `BundleCard.tsx`
- `CategoryTile.tsx`
- `SupplierCard.tsx`
- `DealCard.tsx`
- `LogisticsPartnerCard.tsx` — selectable at checkout
- `DeliveryRequestCard.tsx`
- `LogisticsShell.tsx` — dashboard layout (mirrors SupplierShell styling)
- `DepositStepper.tsx` — reuses existing `Stepper`
- Enhance `ProductCard.tsx` — add wishlist icon, quick view, delivery badge, old-price strike-through, best-seller/low-stock badges

## 3. Marketplace upgrades

- `marketplace.index.tsx` — full hero with image bg + dark overlay, gold CTAs (Start Shopping / Shop By School / Become A Supplier), integrated search, horizontal-scroll category chips. Below: Shop By School, Bundles, Featured Categories, Recommended For Your Child, Approved Suppliers, Deals, "Deliver With EDUCA" CTA block
- `marketplace.bundles.tsx` — bundle grid + detail-style cards
- `marketplace.categories.$category.tsx` — category listing
- `marketplace.products.$id.tsx` — gallery, variants, qty, tabs (Description, School Compatibility, Supplier Details, Delivery Options, Reviews), wishlist
- `marketplace.checkout.tsx` — rebuild as 6-step stepper: Cart Review → Customer/Student → Delivery Option → Logistics Partner → Payment → Review. Logistics partner selection only for Home/Scheduled delivery. Payment shows EDUCA Wallet balance + insufficient state with "Deposit Money" CTA. Footer line about verified partners
- Generate one marketplace hero image via `imagegen` (premium school shopping scene)

## 4. EDUCA Wallet (all roles)

Wallet pages (each with balance card, deposit/payout buttons, 4-step deposit flow, transactions list):
- `parent.wallet.tsx`, `parent.wallet.deposit.tsx`
- `student.wallet.tsx`, `student.wallet.deposit.tsx`
- `school.wallet.tsx`, `school.wallet.deposit.tsx`
- `supplier.wallet.tsx`, `supplier.wallet.deposit.tsx`
- `logistics.wallet.tsx`, `logistics.wallet.deposit.tsx`

Deposit stepper: Amount → Method (M-Pesa/Bank/Card) → Phone → Confirmation (with Simulate Success/Failed mock buttons).

Inject `WalletCard` at top of each dashboard index (`parent.index.tsx`, `student.index.tsx`, `school.index.tsx`, `supplier.index.tsx`, new `logistics.index.tsx`).

## 5. Logistics partner system (new role)

New shell + routes:
- `logistics.tsx` (layout w/ `LogisticsShell`)
- `logistics.index.tsx` — wallet card, stat cards, available requests, active deliveries, earnings summary
- `logistics.register.tsx` — full registration form with benefit cards
- `logistics.deliveries.tsx` — list (available/active/completed tabs)
- `logistics.deliveries.$id.tsx` — pickup/dropoff details, status actions (Accept/Picked Up/In Transit/Delivered/Issue), timeline, POD upload placeholder
- `logistics.routes.tsx` — coverage areas
- `logistics.earnings.tsx` — stat cards + transaction list
- `logistics.settings.tsx`

Add to `get-started.tsx` and `login.tsx`: Logistics Partner role tile.
Add `register.tsx` logistics search variant.

Supplier:
- `supplier.logistics.tsx` — nearby partners, active partners, performance, recent pickups
- Update supplier order detail to show selected partner + pickup status

## 6. Order tracking with logistics

Update `parent.orders.$id.tsx` and `student.orders.$id.tsx`:
- Add logistics partner card (name/vehicle/rating/contact placeholder)
- Extend `OrderTimeline` stages to include "Logistics partner assigned", "Package picked up", "In transit"

## 7. Navigation updates

- `PortalShell.tsx` — add Wallet link for parent/student
- `DashboardShell.tsx` — add Wallet link for school
- `SupplierShell.tsx` — add Wallet + Logistics links
- New `LogisticsShell.tsx` — Dashboard, Deliveries, Routes, Earnings, Wallet, Settings
- `Navbar.tsx` — add Logistics partner link in role switcher area
- `index.tsx` (homepage) — add "Become A Logistics Partner" CTA in ecosystem area

## 8. Reports

Extend existing `school.reports.tsx`; add lightweight stats panels on each wallet page (no chart libs — stat pills + simple tables).

## Out of scope (label "Coming Soon" if referenced)
AI, learning hub, exams, teacher dashboard, jobs, accommodation, research, gov, insurance, TV, forums, heavy analytics, real M-Pesa, real GPS tracking, real backend.

## Technical notes
- TanStack Router file-based dot-separated routes only
- No new npm packages
- All steppers reuse existing `Stepper.tsx`
- All status badges follow existing badge pattern
- Wallet balance reads from mock object in `educa.ts`; deposit flow updates UI-only via `useState`
- Mobile-first: wallet cards stack, transactions become cards, hero search stacks under headline, category chips horizontal-scroll
