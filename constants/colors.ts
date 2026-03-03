/**
 * Design color tokens from Figma (Hairloss-AI-main, node 1:2634).
 * Single theme — no light/dark mode. Use these as the source of truth.
 */

export const designColors = {
  // --- Text ---
  /** Txt/Primary: primary text */
  textPrimary: "#ffffff",
  /** Txt/Secondary: secondary text (~64% opacity) */
  textSecondary: "#ffffffa3",
  /** Txt/Accent: accent text (violet) */
  textAccent: "#bca0ec",
  /** Txt/Accent-secondary: muted accent */
  textAccentSecondary: "#bca0eca3",
  /** Txt/Primary-on-color: text on colored backgrounds (buttons, banners) */
  textPrimaryOnColor: "#ffffff",
  /** Txt/Primary-inverse: text on light background (when needed) */
  textPrimaryInverse: "#2a2633",
  /** Txt/Disable: disabled text */
  textDisable: "#ffffff66",

  // --- Background ---
  /** Bg/Secondary: main screen background */
  bgSecondary: "#1c1824",
  /** Bg/Tertiary: tertiary background (cards, panels) */
  bgTertiary: "#edf0fa0f",

  // --- Border ---
  /** Border/Primary */
  borderPrimary: "#ffffff24",
  /** Border/Secondary */
  borderSecondary: "#edf0fa0f",

  // --- Brand / Shape / Icon ---
  /** Shape/Violet Glow, icon/Primary: accent violet */
  violetGlow: "#9c91de",
  /** Alias for buttons and large accent blocks (same as violet / Txt/Accent) */
  brand: "#bca0ec",
} as const

/** Hex values for use in JS (e.g. charts, canvas). */
export type DesignColorKey = keyof typeof designColors
