import type { ReactNode } from "react"
import MetaPixel from "@/components/MetaPixel"

export default function SurveyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MetaPixel />
      {children}
    </>
  )
}
