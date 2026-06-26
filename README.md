# Nexus Pulse — AI-Native Data Automation Platform

A premium, responsive SaaS landing page built with **Next.js 16 (App Router)**,
**TypeScript**, and **Tailwind CSS v4**, built from scratch against the Phase 1
brief (matrix-driven pricing, bento-to-accordion with state transfer, strict
render isolation, motion timing, SEO hygiene) and structured around SOLID
principles throughout.

## Stack

- Next.js 16 App Router, TypeScript, Tailwind CSS v4
- Zero UI/animation component libraries (no Radix, Shadcn, Headless UI,
  Framer Motion) — all motion is native CSS transitions/animations
- `clsx` + `tailwind-merge` only (pure classname utilities, not UI primitives)

## Project structure

```
app/
  layout.tsx          Root layout — fonts, full SEO/OG/Twitter metadata
  page.tsx             Composition root (Server Component)
  globals.css          Design tokens, motion durations, signature element

domain/                Framework-agnostic business logic (no React, no DOM)
  pricing/
    types.ts           Narrow, purpose-built interfaces (ISP)
    matrix.ts           Currency × tier × discount matrix — the single
                         source of truth for every price on the page
    calculator.ts        Pure PriceCalculator implementation (DIP target)
  features/
    matrix.ts            Bento/accordion content matrix

hooks/
  usePricingDisplay.ts   Currency/cycle state in refs; writes prices
                         directly into registered DOM nodes — never
                         triggers a parent re-render
  useBentoAccordion.ts   Tracks hovered bento index in a ref; on crossing
                         the mobile breakpoint (matchMedia), commits that
                         index into accordion state exactly once

components/
  layout/                Navbar, Footer, PageLoader (client islands)
  sections/               Hero, LogoTicker, Features (Bento+Accordion),
                          Pricing (Controls+Card), Testimonials, CTA
  ui/                     Button, SectionDivider (shared primitives)
  icons/                  Hand-authored SVG icon set — zero icon library

lib/utils.ts             cn() classname helper
```

## How the two scored features actually work

### Feature 1 — Matrix-driven pricing & render isolation

`domain/pricing/matrix.ts` holds the only hardcoded numbers on the page:
a USD base rate per tier, a tariff per currency, and one flat annual
discount multiplier (0.8). `MatrixPriceCalculator` (a pure class with zero
React/DOM imports) turns `(tier, currency, cycle)` into a `ComputedPrice` —
nothing in the UI layer computes or hardcodes a price string itself.

Render isolation is achieved by **never putting price/currency state in
`useState`**. `usePricingDisplay` keeps `currency` and `cycle` in `useRef`,
and exposes `registerPriceNode(tierId)` / `registerSubNode(tierId)` ref
callbacks that `PricingCard` attaches to its price `<span>`s. Calling
`setCurrency` / `setCycle` mutates the ref and writes `el.textContent`
directly — it does not call `setState` anywhere in the tree. `PricingCard`
is wrapped in `memo()` with stable props, so it never re-renders on toggle.
`PricingControls` (the buttons themselves) owns its own local "which button
looks active" state, which is intentionally isolated from `PricingSection`.

The initial price shown is computed **server-side** (default USD/monthly)
and rendered as real text content — not blank, so crawlers and no-JS
clients see actual prices; the ref-based DOM write only takes over once a
user changes currency or cycle client-side.

To verify: open Chrome DevTools → Rendering → "Highlight updates on
rendering", toggle Annual/Monthly or switch currency. Only the two price
text nodes per card flash — the cards, controls, and rest of the page do
not.

### Feature 2 — Bento ↔ Accordion with context transfer

`domain/features/matrix.ts` is the single content source for both
representations. On desktop (`md:` and up), `FeaturesSection` renders a
CSS Grid bento layout (`BentoCard`); below that breakpoint it renders an
accordion (`AccordionItem`) — both exist in the DOM simultaneously,
visibility toggled purely by Tailwind's `hidden` / `md:grid` / `md:hidden`,
so there's no mount/unmount flash at the breakpoint.

`useBentoAccordion` tracks the currently-hovered/focused bento index in a
`ref` (hover never triggers a re-render). It subscribes to
`window.matchMedia("(max-width: 767px)")`; the moment that query starts
matching, the last-known hover index is committed into `activeIndex`
(a real `useState`, since this is a one-time, meaningful state change) —
which opens the corresponding accordion panel already-expanded. The
accordion panel itself animates with a pure CSS `grid-template-rows: 0fr
→ 1fr` transition (no JS height measurement, no layout thrashing).

## SOLID, concretely

| Principle | Where |
|---|---|
| **SRP** | `MatrixPriceCalculator` only computes; `usePricingDisplay` only manages DOM-isolated state; `PricingCard` only renders |
| **OCP** | Add a currency to `CURRENCIES` or a tier to `PRICING_TIERS` — zero UI changes required |
| **LSP** | `Button` renders as `<a>` or `<button>` behind one identical prop contract; any `PriceCalculator` implementation can replace `MatrixPriceCalculator` |
| **ISP** | `CurrencyFormat`, `PricingTier`, `ComputedPrice` are narrow and single-purpose, not one bloated config type |
| **DIP** | `PricingSection`/`FeaturesSection` depend on hook abstractions (`usePricingDisplay`, `useBentoAccordion`), never directly on `matchMedia` or a hardcoded formula |

## Motion

- Micro-interactions (hover/toggle): `175ms`, ease-out — `--dur-micro` / `--ease-micro`
- Structural reflows (accordion, layout): `350ms`, ease-in-out — `--dur-layout` / `--ease-layout`
- Entry orchestration (`PageLoader`) completes within 450ms and unmounts by 500ms, never blocking hydration or TTI
- `@media (prefers-reduced-motion: reduce)` collapses all animation/transition durations globally

## Assets note

The brief references an Assets Drive (SVG pack, font list, color palette,
`demo.mp4`, `reference_showcase.mp4`) that wasn't available in this build
environment. In its place:

- **Fonts**: Geist (display), Geist Mono (data/price values), Inter (body) — loaded via `next/font/google`, self-hosted, zero layout shift
- **Color palette**: an original dark, sage-accented system (`app/globals.css`), deliberately evolved from a lighter reference palette rather than a generic AI-purple/acid-green default
- **SVGs**: hand-authored in `components/icons/Icons.tsx` — no icon library
- **Motion reference**: implemented to the written spec (durations/easings/orchestration cap) since no video was available to match frame-for-frame

If the real assets are available, drop fonts into `public/fonts` and swap
the `next/font/google` calls for `next/font/local`, and replace the hex
values in `app/globals.css`'s `:root` block — no component changes needed.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # ESLint
```

## Deploy

Push to GitHub → import on Vercel. Zero configuration required.
