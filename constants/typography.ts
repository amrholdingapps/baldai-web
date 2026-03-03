/**
 * Typography from Figma (Hairloss-AI-main, node 1:2634).
 * Single font family: SF Pro Display (Regular 400, Medium 500).
 */

export const fontFamily = {
  /** Same as Tailwind font-sfProDisplay; load via @font-face from /fonts/ */
  sans: "SFProDisplay",
  /** Figma name for reference */
  figmaName: "SF Pro Display",
} as const

export const fontWeight = {
  regular: 400,
  medium: 500,
} as const

/** Design text styles: [Style]/[Size]. lineHeight 100 = 1, Long Text = 1.6 */
export const designTypography = {
  "Medium/12": { fontSize: 12, fontWeight: 500, lineHeight: 1, letterSpacing: 1 },
  "Medium/14": { fontSize: 14, fontWeight: 500, lineHeight: 1, letterSpacing: 1 },
  "Medium/16": { fontSize: 16, fontWeight: 500, lineHeight: 1, letterSpacing: 1 },
  "Medium/18": { fontSize: 18, fontWeight: 500, lineHeight: 1, letterSpacing: 1 },
  "Regular/12": { fontSize: 12, fontWeight: 400, lineHeight: 1, letterSpacing: 1 },
  "Regular/14": { fontSize: 14, fontWeight: 400, lineHeight: 1, letterSpacing: 1 },
  "Regular/16": { fontSize: 16, fontWeight: 400, lineHeight: 1, letterSpacing: 1 },
  "Regular/18": { fontSize: 18, fontWeight: 400, lineHeight: 1, letterSpacing: 1 },
  "Long Text/LT - Regular/14": { fontSize: 14, fontWeight: 400, lineHeight: 1.6, letterSpacing: 1 },
  "Long Text/LT - Regular/16": { fontSize: 16, fontWeight: 400, lineHeight: 1.6, letterSpacing: 1 },
} as const

/** Font size in px for Tailwind/config. letterSpacing from Figma (1 → 1px). */
export const fontSizePx = [12, 14, 16, 18] as const
