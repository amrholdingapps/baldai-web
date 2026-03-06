/**
 * RevenueCat Web SDK — Anonymous Customers setup for survey/paywall.
 * @see https://www.revenuecat.com/docs/web/web-billing/web-sdk#anonymous-customers
 *
 * Configure once per app load; uses Purchases.generateRevenueCatAnonymousAppUserId().
 * Enable Redemption Links in RevenueCat dashboard to redeem web purchases on mobile.
 */

import { Purchases } from "@revenuecat/purchases-js"

let purchasesInstance: Purchases | null = null

const REVENUECAT_WEB_API_KEY =
  process.env.NEXT_PUBLIC_REVENUECAT_WEB_API_KEY ??
  "pk_test_51T7Z2ACktPGCtrNFYfdozSFCGUZT7Ocm45JC7qCH0q30rbjSCRVb5jOHGHSa73hxhGAH8Fd0slamjCpKThgjEDJs00FIKLzstN"

/**
 * Returns the configured Purchases instance (Anonymous Customer).
 * Configures the SDK on first call; subsequent calls return the same instance.
 * Call from client only (e.g. inside useEffect or client components).
 */
export function getPurchases(): Purchases {
  if (purchasesInstance) return purchasesInstance

  const apiKey = REVENUECAT_WEB_API_KEY
  if (!apiKey) {
    throw new Error(
      "RevenueCat Web API key is missing. Set NEXT_PUBLIC_REVENUECAT_WEB_API_KEY in .env.local"
    )
  }

  const appUserId = Purchases.generateRevenueCatAnonymousAppUserId()
  purchasesInstance = Purchases.configure({
    apiKey,
    appUserId,
  })

  return purchasesInstance
}

/**
 * Use this to check if RevenueCat is configured (e.g. before calling getOfferings or presentPaywall).
 */
export function isPurchasesConfigured(): boolean {
  try {
    return Purchases.isConfigured()
  } catch {
    return false
  }
}
