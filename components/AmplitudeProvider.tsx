"use client"

import { useEffect } from "react"
import * as amplitude from "@amplitude/unified"

let initialized = false

export default function AmplitudeProvider() {
  useEffect(() => {
    if (!initialized) {
      amplitude.initAll("43dc14deb6a507bdaea9ed9445b6aee4", {
        analytics: { autocapture: true },
      })
      initialized = true
    }
  }, [])

  return null
}
