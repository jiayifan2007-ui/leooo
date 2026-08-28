---
name: Leo Software site structure
description: How leo-site maps the three approved mockups plus target domain and frontend-only constraint.
---

The approved Leo Software marketing design spread across three mockups is blueprinted into the
real `artifacts/leo-site` react-vite app (preview path `/`, static spa).

- Homepage `/` = **Bold** design (`mockups/Bold.tsx`): amber gradient hero "Command Your Business.",
  huge stat strip, serial-number feature showcase, three industry bands, demo section.
- Product `"/product"` = **Focused** design, reworked around the real Leo suite: five product
  lines (restaurant POS, store POS, warehouse POS, custom ERP, loyalty app), with the restaurant
  cashier-to-kitchen-to-server-to-customer workflow as the lead section.
- Pricing `"/pricing"` = **Grounded** pricing treatment (`mockups/Grounded.tsx`): dark charcoal
  section, neutral charcoal cards, Pro card with amber border + glow + amber "Most popular" badge,
  amber fill CTA on highlighted plan, outlined/ghost buttons elsewhere.

**Why:** The user explicitly assigned each design a role. Keep sampling these exact three mockups as
the source of truth for any future page/Section edits — do not re-invent copy or visuals.

**How to apply:** When editing a page in leo-site, open the matching mockup first. Site is
frontend-only by user preference (no backend, forms, auth, DB). Domain target is leooo.pt (user owns
it; publish then add custom domain in publishing settings). Consumes `@workspace/leo-software`
design system; no local copies of package components.

**Product-page interaction:** Keep the five businesses separated in a horizontal selector directly
below the main navigation. Selecting one must replace the intro content in place with a smooth
transition; hover/focus must visibly lift and highlight the business option. On mobile, keep the
selector horizontally scrollable without creating page-level overflow. **Why:** The user rejected a
single combined product-suite narrative and explicitly asked to explore each business independently.

**i18n:** site is localized via react-i18next + i18next-browser-languagedetector. Supported langs are
`en`, `pt` (European Portuguese, pt-PT), `zh` (Mainland Mandarin, zh-CN). Resources live in
`src/i18n/locales/<code>.json`; init in `src/i18n/index.ts` (imported in main.tsx). Language chooser
is `src/components/LanguageSwitcher.tsx` in the navbar. ALL user-facing strings must go through
`t()` keys — never hardcode; when adding copy, add the key to all three JSON files (EN is source of
truth). Selection persists to localStorage `leo-site-language`. **Why:** user requested
Portuguese (Portugal) and Chinese (Mainland) languages; per-page array content (features/FAQ) is
fetched with `returnObjects: true`, and data-driven plans avoid literal `'Custom'` string checks
(use an `isCustom` flag instead so translated plan names don't break styling).

**Design-system caveat:** Leo Site can safely consume the system's token stylesheet, but its
Radix-based UI components may resolve a duplicate React instance in the Vite preview. Avoid adding
those component imports until that workspace resolution is fixed; use semantic token utility classes
for app-specific compositions instead. **Why:** importing the system tooltip provider produced an
invalid-hook-call runtime error even though the page and production build succeeded.
