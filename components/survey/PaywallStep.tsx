// "use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { surveyColors, SLIDE_TITLES, SLIDE_IMAGES } from "@/constants/survey"
import PageIndicator from "@/components/survey/PageIndicator"
import SubscriptionPlanCard from "@/components/survey/SubscriptionPlanCard"
import ContinueButton from "@/components/survey/ContinueButton"

export default function PaywallStep() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState<"annual" | "weekly">("annual")
  const slideInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_TITLES.length)
    }, 3000)

    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current)
    }
  }, [])

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
          <SubscriptionPlanCard
            duration="Annual"
            weeklyPrice="0.96"
            fullPrice="49.99"
            billedLabel="annually"
            discount={80}
            strikedWeeklyPrice="4.99"
            isActive={selectedPlan === "annual"}
            onSelect={() => setSelectedPlan("annual")}
          />
          <SubscriptionPlanCard
            duration="Weekly"
            weeklyPrice="4.99"
            isActive={selectedPlan === "weekly"}
            onSelect={() => setSelectedPlan("weekly")}
          />
        </div>

        <div className="pb-[16px]">
          <ContinueButton title="Continue" onClick={() => {}} />
        </div>

        <div className="flex items-center justify-around pb-[8px]">
          <Link href="/terms" className="text-[12px]" style={{ color: surveyColors.fgSecondary }}>
            Terms
          </Link>
          <button
            type="button"
            className="text-[12px]"
            style={{ color: surveyColors.fgSecondary }}
            onClick={() => {}}
          >
            Restore
          </button>
          <Link href="/privacy" className="text-[12px]" style={{ color: surveyColors.fgSecondary }}>
            Privacy
          </Link>
        </div>
      </div>
    </>
  )
}
