"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Package } from "@revenuecat/purchases-js"
import { ErrorCode, PurchasesError } from "@revenuecat/purchases-js"
import { surveyColors, SLIDE_TITLES, SLIDE_IMAGES } from "@/constants/survey"
import PageIndicator from "@/components/survey/PageIndicator"
import SubscriptionPlanCard from "@/components/survey/SubscriptionPlanCard"
import ContinueButton from "@/components/survey/ContinueButton"
import { getPurchases } from "@/lib/revenuecat-web"

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
  const slideInterval = useRef<NodeJS.Timeout | null>(null)

  // When packages arrive from parent, select first by default
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

  const handlePurchase = useCallback(async () => {
    if (!selectedPackage) return
    setPurchasing(true)
    try {
      const purchases = getPurchases()
      await purchases.purchase({ rcPackage: selectedPackage })
      // Success: optionally redirect or close paywall
    } catch (e) {
      if (e instanceof PurchasesError && e.errorCode === ErrorCode.UserCancelledError) {
        // User closed/cancelled — do nothing
      } else {
        console.error("Purchase failed", e)
      }
    } finally {
      setPurchasing(false)
    }
  }, [selectedPackage])

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
                  onSelect={() => setSelectedPackage(pkg)}
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
