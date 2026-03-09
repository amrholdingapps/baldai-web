type FbqFunction = (
  method: string,
  event: string,
  params?: Record<string, unknown>,
) => void

interface TrackOptions {
  dedupeWindowMs?: number
}

declare global {
  interface Window {
    fbq?: FbqFunction
  }
}

const recentEvents = new Map<string, number>()

function getEventFingerprint(event: string, params?: Record<string, unknown>) {
  return JSON.stringify([event, params ?? null])
}

function track(event: string, params?: Record<string, unknown>, options?: TrackOptions) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return

  const dedupeWindowMs = options?.dedupeWindowMs ?? 0
  if (dedupeWindowMs > 0) {
    const fingerprint = getEventFingerprint(event, params)
    const now = Date.now()
    const lastTrackedAt = recentEvents.get(fingerprint)

    if (lastTrackedAt !== undefined && now - lastTrackedAt < dedupeWindowMs) {
      return
    }

    recentEvents.set(fingerprint, now)
  }

  if (params) {
    window.fbq("track", event, params)
  } else {
    window.fbq("track", event)
  }
}

export function trackPageView() {
  track("PageView")
}

export function trackSurveyCompleted() {
  track("Lead")
}

export function trackPaywallViewed() {
  track("ViewContent", {
    content_name: "Subscription Plans",
    content_category: "Paywall",
  }, {
    dedupeWindowMs: 1500,
  })
}

export function trackCheckoutStarted(packageId: string, currency: string, value: number) {
  track("InitiateCheckout", {
    content_ids: [packageId],
    currency,
    value,
    num_items: 1,
  })
}

export function trackPurchaseCompleted(packageId: string, currency: string, value: number) {
  track("Purchase", {
    content_ids: [packageId],
    currency,
    value,
  })
  track("Subscribe", {
    currency,
    value,
  })
}
