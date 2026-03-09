import "./globals.css"
import type { ReactNode } from "react"
import AmplitudeProvider from "@/components/AmplitudeProvider"
import MetaPixel from "@/components/MetaPixel"
import MetaPixelPageViewTracker from "@/components/MetaPixelPageViewTracker"

export const metadata = {
  title: "Hairloss AI",
  description:
    "The first mobile app designed for professional-grade alopecia tracking. Scan your hair, discover effective treatments, and witness real progress through data.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="font-sfProDisplay" lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <MetaPixel />
        <script
          type="module"
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/lineSpinner.js"
        ></script>
        <AmplitudeProvider />
        <MetaPixelPageViewTracker />
        <main>{children}</main>
      </body>
    </html>
  )
}
