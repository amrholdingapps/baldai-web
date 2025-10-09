import "./globals.css"

export const metadata = {
  title: "Hairloss AI",
  description: "Find out if you're losing hair with Hairloss AI",
}

export default function RootLayout({ children }) {
  return (
    <html className="dark font-sfProDisplay" lang="en">
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
