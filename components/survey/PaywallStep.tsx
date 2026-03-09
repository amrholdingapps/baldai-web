"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Package, PurchaseResult } from "@revenuecat/purchases-js"
import { ErrorCode, PurchasesError } from "@revenuecat/purchases-js"
import { surveyColors, SLIDE_TITLES, SLIDE_IMAGES } from "@/constants/survey"
import PageIndicator from "@/components/survey/PageIndicator"
import SubscriptionPlanCard from "@/components/survey/SubscriptionPlanCard"
import ContinueButton from "@/components/survey/ContinueButton"
import { getPurchases } from "@/lib/revenuecat-web"
import { trackEvent, AnalyticsEvents } from "@/lib/analytics"
import { trackPaywallViewed, trackCheckoutStarted, trackPurchaseCompleted } from "@/lib/meta-pixel"

interface PaywallStepProps {
  packages: Package[]
  loading: boolean
  error: string | null
}

function getPackageLabel(pkg: Package): string {
  const title = pkg.webBillingProduct?.title
  if (title) return title
  switch (pkg.packageType) {
    case "$rc_annual":
      return "Annual"
    case "$rc_weekly":
      return "Weekly"
    case "$rc_monthly":
      return "Monthly"
    case "$rc_lifetime":
      return "Lifetime"
    default:
      return pkg.identifier
  }
}

function getBilledLabel(pkg: Package): string | undefined {
  switch (pkg.packageType) {
    case "$rc_annual":
      return "annually"
    case "$rc_weekly":
      return "per week"
    case "$rc_monthly":
      return "per month"
    default:
      return undefined
  }
}

export default function PaywallStep({ packages, loading, error }: PaywallStepProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [purchasing, setPurchasing] = useState(false)
  const [purchaseResult, setPurchaseResult] = useState<PurchaseResult | null>(null)
  const slideInterval = useRef<NodeJS.Timeout | null>(null)

  const paywallTracked = useRef(false)
  useEffect(() => {
    if (paywallTracked.current) return
    paywallTracked.current = true
    trackEvent(AnalyticsEvents.PAYWALL_SHOWN)
    trackPaywallViewed()
  }, [])

  useEffect(() => {
    if (packages.length > 0) {
      setSelectedPackage((prev) =>
        prev && packages.some((p) => p.identifier === prev.identifier) ? prev : packages[0]
      )
    }
  }, [packages])

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_TITLES.length)
    }, 3000)
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current)
    }
  }, [])

  const handleSelectPackage = useCallback(
    (pkg: Package) => {
      if (pkg.identifier !== selectedPackage?.identifier) {
        trackEvent(AnalyticsEvents.PAYWALL_PLAN_CHANGED, {
          plan: pkg.identifier,
        })
      }
      setSelectedPackage(pkg)
    },
    [selectedPackage]
  )

  const handlePurchase = useCallback(async () => {
    if (!selectedPackage) return
    setPurchasing(true)

    const price = selectedPackage.webBillingProduct?.price
    const currency = price?.currency ?? "USD"
    const value = price ? price.amountMicros / 1_000_000 : 0

    trackEvent(AnalyticsEvents.PAYWALL_PURCHASE_STARTED, {
      plan: selectedPackage.identifier,
    })
    trackCheckoutStarted(selectedPackage.identifier, currency, value)

    try {
      const purchases = getPurchases()
      const result = await purchases.purchase({
        rcPackage: selectedPackage,
      })
      trackEvent(AnalyticsEvents.PAYWALL_PURCHASE_COMPLETED, {
        plan: selectedPackage.identifier,
      })
      trackPurchaseCompleted(selectedPackage.identifier, currency, value)
      setPurchaseResult(result)
    } catch (e) {
      if (e instanceof PurchasesError && e.errorCode === ErrorCode.UserCancelledError) {
        // User closed/cancelled — do nothing
      } else {
        trackEvent(AnalyticsEvents.PAYWALL_PURCHASE_FAILED, {
          plan: selectedPackage.identifier,
          error: e instanceof Error ? e.message : String(e),
        })
        console.error("Purchase failed", e)
      }
    } finally {
      setPurchasing(false)
    }
  }, [selectedPackage])

  if (purchaseResult) {
    const redeemUrl = purchaseResult.redemptionInfo?.redeemUrl
    return (
      <div className="flex-1 flex flex-col px-[24px] py-[40px] overflow-y-auto">
        <div className="flex flex-col items-center">
          {/* Checkmark */}
          <div
            className="w-[56px] h-[56px] rounded-full flex items-center justify-center mb-[24px]"
            style={{ backgroundColor: surveyColors.primary }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0E0C12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h2 className="text-[22px] font-bold text-white mb-[8px] text-center">
            Welcome to HairLoss AI!
          </h2>
          <p
            className="text-[15px] text-center mb-[36px] max-w-[340px]"
            style={{ color: surveyColors.fgSecondary }}
          >
            We&apos;ve successfully charged your payment method for your new subscription.
            Redeem it now by following the instructions below.
          </p>

          {/* Step 1 — Install */}
          <div className="w-full mb-[32px]">
            <p className="text-[13px] mb-[4px]" style={{ color: surveyColors.fgTertiary }}>
              Step 1
            </p>
            <h3 className="text-[17px] font-semibold text-white mb-[14px]">
              Install latest app
            </h3>
            <div className="flex gap-[10px]">
              <a href="https://apps.apple.com/us/app/hairloss-ai-scan-hair-health/id6563141135">
                <Image
                  src="/images/redesign/appstore.png"
                  alt="Download on the App Store"
                  width={140}
                  height={46}
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.sampil.baldai">
                <Image
                  src="/images/redesign/googleplay.png"
                  alt="Get it on Google Play"
                  width={140}
                  height={46}
                />
              </a>
            </div>
          </div>

          {/* Step 2 — Redeem */}
          {redeemUrl && (
            <div className="w-full mb-[32px]">
              <p className="text-[13px] mb-[4px]" style={{ color: surveyColors.fgTertiary }}>
                Step 2
              </p>
              <h3 className="text-[17px] font-semibold text-white mb-[8px]">
                Redeem subscription in-app
              </h3>
              <p
                className="text-[14px] mb-[16px]"
                style={{ color: surveyColors.fgSecondary }}
              >
                On your mobile device, tap the button below to open the app and redeem your subscription.
              </p>
              <a
                href={redeemUrl}
                className="inline-block font-semibold text-[15px] py-[14px] px-[32px] rounded-full"
                style={{ backgroundColor: surveyColors.primary, color: "#0E0C12" }}
              >
                Open app and redeem
              </a>
            </div>
          )}

          <p className="text-[12px] text-center" style={{ color: surveyColors.fgTertiary }}>
            The redemption link expires in 60 minutes. A copy was also sent to your email.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Slides area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden relative">
        {SLIDE_IMAGES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={SLIDE_TITLES[i]}
              fill
              className="object-cover"
              sizes="480px"
              priority={i === 0}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 40%, ${surveyColors.bgPrimary} 100%)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Content section */}
      <div className="px-[16px] pb-[8px] flex flex-col relative z-10 mt-[-24px]">
        <div className="text-center pb-[20px]">
          <h2 className="text-[22px] font-semibold text-white tracking-[-0.44px] transition-all duration-300">
            {SLIDE_TITLES[currentSlide]}
          </h2>
        </div>

        <div className="flex justify-center pb-[20px]">
          <PageIndicator count={SLIDE_TITLES.length} activeIndex={currentSlide} />
        </div>

        <div className="flex flex-col gap-[6px] pb-[20px]">
          {loading && (
            <div
              className="w-full h-[72px] rounded-[20px] flex items-center justify-center"
              style={{ backgroundColor: surveyColors.bgSecondary }}
            >
              <span style={{ color: surveyColors.fgSecondary }}>Loading plans…</span>
            </div>
          )}
          {error && (
            <div
              className="w-full rounded-[20px] px-[16px] py-[12px]"
              style={{ backgroundColor: surveyColors.bgSecondary, color: surveyColors.fgSecondary }}
            >
              {error}
            </div>
          )}
          {!loading &&
            !error &&
            packages.length > 0 &&
            packages.map((pkg) => {
              const product = pkg.webBillingProduct
              const price = product?.price
              const formattedPrice = price?.formattedPrice ?? "—"
              const billedLabel = getBilledLabel(pkg)
              return (
                <SubscriptionPlanCard
                  key={pkg.identifier}
                  duration={getPackageLabel(pkg)}
                  formattedPrice={formattedPrice}
                  priceSuffix={billedLabel}
                  isActive={selectedPackage?.identifier === pkg.identifier}
                  onSelect={() => handleSelectPackage(pkg)}
                />
              )
            })}
        </div>

        <div className="pb-[16px]">
          <ContinueButton
            title={purchasing ? "Processing…" : "Continue"}
            onClick={handlePurchase}
            disabled={!selectedPackage || purchasing}
          />
        </div>

        <div className="flex items-center justify-around pb-[8px]">
          <Link href="/terms" className="text-[12px]" style={{ color: surveyColors.fgSecondary }}>
            Terms
          </Link>
          <Link href="/privacy" className="text-[12px]" style={{ color: surveyColors.fgSecondary }}>
            Privacy
          </Link>
        </div>
      </div>
    </>
  )
}
