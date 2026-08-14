---
name: Leo Software site structure
description: How leo-site maps the three approved mockups plus target domain and frontend-only constraint.
---

The approved Leo Software marketing design spread across three mockups is blueprinted into the
real `artifacts/leo-site` react-vite app (preview path `/`, static spa).

- Homepage `/` = **Bold** design (`mockups/Bold.tsx`): amber gradient hero "Command Your Business.",
  huge stat strip, serial-number feature showcase, three industry bands, demo section.
- Product `"/product"` = **Focused** design (`mockups/Focused.tsx`): cream split-hero with a coded
  POS terminal mockup, alternating feature blocks, interactive industry tabs, testimonial.
- Pricing `"/pricing"` = **Grounded** pricing treatment (`mockups/Grounded.tsx`): dark charcoal
  section, neutral charcoal cards, Pro card with amber border + glow + amber "Most popular" badge,
  amber fill CTA on highlighted plan, outlined/ghost buttons elsewhere.

**Why:** The user explicitly assigned each design a role. Keep sampling these exact three mockups as
the source of truth for any future page/Section edits — do not re-invent copy or visuals.

**How to apply:** When editing a page in leo-site, open the matching mockup first. Site is
frontend-only by user preference (no backend, forms, auth, DB). Domain target is leooo.pt (user owns
it; publish then add custom domain in publishing settings). Consumes `@workspace/leo-software`
design system; no local copies of package components.
