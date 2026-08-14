/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#FFFBEB",
      "foreground": "#1C1917",
      "border": "#E7E5E4",
      "card": "#FFFFFF",
      "cardForeground": "#1C1917",
      "popover": "#FFFFFF",
      "popoverForeground": "#1C1917",
      "primary": "#D97706",
      "primaryForeground": "#FFFFFF",
      "secondary": "#F5F5F4",
      "secondaryForeground": "#1C1917",
      "muted": "#F5F5F4",
      "mutedForeground": "#78716C",
      "accent": "#FEF3C7",
      "accentForeground": "#92400E",
      "destructive": "#DC2626",
      "destructiveForeground": "#FFFFFF",
      "input": "#E7E5E4",
      "ring": "#D97706",
      "chart1": "#F59E0B",
      "chart2": "#10B981",
      "chart3": "#3B82F6",
      "chart4": "#8B5CF6",
      "chart5": "#EF4444",
      "sidebar": "#1C1917",
      "sidebarForeground": "#F5F5F4",
      "sidebarBorder": "#292524",
      "sidebarPrimary": "#F59E0B",
      "sidebarPrimaryForeground": "#1C1917",
      "sidebarAccent": "#292524",
      "sidebarAccentForeground": "#F5F5F4",
      "sidebarRing": "#F59E0B"
    },
    "dark": {
      "background": "#1C1917",
      "foreground": "#F5F5F4",
      "border": "#44403C",
      "card": "#292524",
      "cardForeground": "#F5F5F4",
      "popover": "#292524",
      "popoverForeground": "#F5F5F4",
      "primary": "#F59E0B",
      "primaryForeground": "#1C1917",
      "secondary": "#292524",
      "secondaryForeground": "#F5F5F4",
      "muted": "#292524",
      "mutedForeground": "#A8A29E",
      "accent": "#44403C",
      "accentForeground": "#FCD34D",
      "destructive": "#EF4444",
      "destructiveForeground": "#FFFFFF",
      "input": "#44403C",
      "ring": "#F59E0B",
      "chart1": "#FCD34D",
      "chart2": "#34D399",
      "chart3": "#60A5FA",
      "chart4": "#A78BFA",
      "chart5": "#F87171",
      "sidebar": "#0C0A09",
      "sidebarForeground": "#F5F5F4",
      "sidebarBorder": "#292524",
      "sidebarPrimary": "#F59E0B",
      "sidebarPrimaryForeground": "#1C1917",
      "sidebarAccent": "#292524",
      "sidebarAccentForeground": "#FCD34D",
      "sidebarRing": "#F59E0B"
    }
  },
  "fontFamily": {
    "sans": [
      "Inter",
      "sans-serif"
    ],
    "serif": [
      "Georgia",
      "serif"
    ],
    "mono": [
      "Menlo",
      "monospace"
    ]
  },
  "radius": "0.375rem",
  "spacing": "0.25rem"
} as const;

export type Tokens = typeof tokens;
export default tokens;
