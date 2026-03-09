"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import type { Package } from "@revenuecat/purchases-js"
import { surveyColors, TOTAL_STEPS, TRANSITION_MS } from "@/constants/survey"
import { getPurchases } from "@/lib/revenuecat-web"
import { trackEvent, AnalyticsEvents } from "@/lib/analytics"
import StepIndicator from "@/components/survey/StepIndicator"
import ContinueButton from "@/components/survey/ContinueButton"
import GoalsStep from "@/components/survey/GoalsStep"
import MedicationStep from "@/components/survey/MedicationStep"
import PaywallStep from "@/components/survey/PaywallStep"

export default function SurveyPage() {
  const [step, setStep] = useState(0)
  const [displayedStep, setDisplayedStep] = useState(0)
  const [fadeState, setFadeState] = useState<"in" | "out">("in")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null)

  const [packages, setPackages] = useState<Package[]>([])
  const [packagesLoading, setPackagesLoading] = useState(true)
  const [packagesError, setPackagesError] = useState<string | null>(null)
  const trackedSteps = useRef<Set<number>>(new Set())

  useEffect(() => {
    trackEvent(AnalyticsEvents.SURVEY_OPENED)
  }, [])

  useEffect(() => {
    if (trackedSteps.current.has(displayedStep)) return
    trackedSteps.current.add(displayedStep)

    const stepEvents: Record<number, AnalyticsEvents> = {
      0: AnalyticsEvents.SURVEY_GOALS_SHOWN,
      1: AnalyticsEvents.SURVEY_MEDICATION_SHOWN,
    }
    const event = stepEvents[displayedStep]
    if (event) trackEvent(event)
  }, [displayedStep])

  const goToStep = useCallback(
    (next: number) => {
      if (next === step) return
      trackEvent(AnalyticsEvents.SURVEY_STEP_CHANGED, { from: step, to: next })
      setFadeState("out")
      setTimeout(() => {
        setStep(next)
        setDisplayedStep(next)
        window.scrollTo({ top: 0 })
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setFadeState("in"))
        })
      }, TRANSITION_MS)
    },
    [step]
  )

  const handleContinue = useCallback(() => {
    if (step === 0) {
      trackEvent(AnalyticsEvents.SURVEY_GOALS_SENT, { goals: selectedGoals })
    } else if (step === 1) {
      trackEvent(AnalyticsEvents.SURVEY_MEDICATION_SENT, { medication: selectedMedication })
    }
    if (step < TOTAL_STEPS - 1) goToStep(step + 1)
  }, [step, goToStep, selectedGoals, selectedMedication])

  const handleGoalToggle = useCallback((option: string) => {
    setSelectedGoals((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    )
  }, [])

  const handleMedicationSelect = useCallback((option: string) => {
    setSelectedMedication(option)
  }, [])

  const canContinue =
    (step === 0 && selectedGoals.length > 0) || (step === 1 && selectedMedication !== null)

  // Configure RevenueCat and load offerings immediately (so paywall can show plans without waiting)
  useEffect(() => {
    let cancelled = false
    async function init() {
      try {
        const purchases = getPurchases()
        const offerings = await purchases.getOfferings()
        if (cancelled) return
        if (offerings.current !== null && offerings.current.availablePackages.length > 0) {
          setPackages(offerings.current.availablePackages)
        } else {
          setPackagesError("No plans available at the moment.")
        }
      } catch (e) {
        if (cancelled) return
        setPackagesError(e instanceof Error ? e.message : "Failed to load plans.")
      } finally {
        if (!cancelled) setPackagesLoading(false)
      }
    }
    init()
    return () => {
      cancelled = true
    }
  }, [])

  const fadeStyle: React.CSSProperties = {
    transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
    opacity: fadeState === "in" ? 1 : 0,
    transform: fadeState === "in" ? "translateY(0)" : "translateY(12px)",
  }

  return (
    <div
      className="h-[100dvh] flex flex-col overflow-hidden"
      style={{ backgroundColor: surveyColors.bgPrimary }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `body { background-color: ${surveyColors.bgPrimary} !important; margin: 0; }`,
        }}
      />

      {displayedStep < 2 && (
        <div
          className="flex-1 flex flex-col max-w-[480px] w-full mx-auto px-[16px] overflow-hidden"
          style={fadeStyle}
        >
          <div className="shrink-0 pt-[20px] pb-[16px] flex items-center justify-center">
            <StepIndicator current={displayedStep} total={TOTAL_STEPS} />
          </div>

          <div className="flex-1 min-h-0 pt-[40px] overflow-y-auto">
            {displayedStep === 0 && (
              <GoalsStep selectedGoals={selectedGoals} onToggle={handleGoalToggle} />
            )}
            {displayedStep === 1 && (
              <MedicationStep
                selectedMedication={selectedMedication}
                onSelect={handleMedicationSelect}
              />
            )}
          </div>

          <div className="shrink-0 pb-[32px] pt-[16px]">
            <ContinueButton title="Continue" disabled={!canContinue} onClick={handleContinue} />
          </div>
        </div>
      )}

      {displayedStep === 2 && (
        <div
          className="flex-1 flex flex-col max-w-[480px] w-full mx-auto overflow-hidden"
          style={fadeStyle}
        >
          <PaywallStep packages={packages} loading={packagesLoading} error={packagesError} />
        </div>
      )}
    </div>
  )
}
