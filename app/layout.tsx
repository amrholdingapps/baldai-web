import "./globals.css"
import type { ReactNode } from "react"

export const metadata = {
  title: "Bald.AI",
  description: "Revolutionizing the future of hair treatment with personalized precision. AI-powered hair restoration for men and women.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="font-sfProDisplay" lang="en">
      <body className="min-h-screen bg-background text-foreground overflow-y-auto">
        <script
          type="module"
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/lineSpinner.js"
        ></script>
        <main>{children}</main>
      </body>
    </html>
  )
}
