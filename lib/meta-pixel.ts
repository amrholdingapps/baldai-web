type FbqFunction = (
  method: string,
  event: string,
  params?: Record<string, unknown>,
) => void

declare global {
  interface Window {
    fbq?: FbqFunction
  }
}

function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return
  if (params) {
    window.fbq("track", event, params)
  } else {
    window.fbq("track", event)
  }
}

export function trackSurveyCompleted() {
  track("Lead")
}

export function trackPaywallViewed() {
  track("ViewContent", {
    content_name: "Subscription Plans",
    content_category: "Paywall",
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
