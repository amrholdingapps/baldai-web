import "./globals.css"
import type { ReactNode } from "react"

export const metadata = {
  title: "Hairloss AI",
  description:
    "The first mobile app designed for professional-grade alopecia tracking. Scan your hair, discover effective treatments, and witness real progress through data.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="font-sfProDisplay" lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <script
          type="module"
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/lineSpinner.js"
        ></script>
        <main>{children}</main>
      </body>
    </html>
  )
}
