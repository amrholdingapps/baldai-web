# Constants catalog

## Colors (`colors.ts`)

**Source:** Figma, file Hairloss-AI-main, node 1:2634 (variables from the design).

- `designColors` — all design colors in hex. Single source of truth for the design system.
- In `globals.css`, `:root` defines CSS variables from these tokens (single theme, no light/dark).
- **Legacy** variables (in `globals.css` and `tailwind.config.ts`) are marked with a comment: used on **terms**, **privacy**, **referrals**, **not-found** pages. Replace with design tokens or remove when migrating those pages.

The home page uses only design tokens (background, foreground, brand, muted, border, card).

## Typography (`typography.ts`)

**Source:** Figma, same file — text styles (Medium/12–18, Regular/12–18, Long Text Regular/14–16).

- **Font:** SF Pro Display. Loaded as `SFProDisplay` via `@font-face` in `globals.css` (Regular 400, Medium 500). Figma uses no other weights.
- **Font files:** Put `SF-Pro-Display-Regular.otf` and `SF-Pro-Display-Medium.otf` in `public/fonts/`. If missing, the browser falls back to system sans-serif.
- `designTypography` — style names and specs (fontSize, fontWeight, lineHeight, letterSpacing). Use for reference or to generate Tailwind/utility classes.
- Layout applies `font-sfProDisplay` (see `app/layout.tsx`), so all pages use this font by default.
