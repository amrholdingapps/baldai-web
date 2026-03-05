"use client"

import { useState, useCallback } from "react"
import { surveyColors, TOTAL_STEPS, TRANSITION_MS } from "@/constants/survey"
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

  const goToStep = useCallback(
    (next: number) => {
      if (next === step) return
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
    if (step < TOTAL_STEPS - 1) goToStep(step + 1)
  }, [step, goToStep])

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

  const fadeStyle: React.CSSProperties = {
    transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
    opacity: fadeState === "in" ? 1 : 0,
    transform: fadeState === "in" ? "translateY(0)" : "translateY(12px)",
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: surveyColors.bgPrimary }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `body { background-color: ${surveyColors.bgPrimary} !important; }`,
        }}
      />

      {displayedStep < 2 && (
        <div
          className="flex-1 flex flex-col max-w-[480px] w-full mx-auto px-[16px]"
          style={fadeStyle}
        >
          <div className="pt-[20px] pb-[16px] flex items-center justify-center">
            <StepIndicator current={displayedStep} total={TOTAL_STEPS} />
          </div>

          <div className="flex-1 pt-[40px]">
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

          <div className="pb-[32px] pt-[16px]">
            <ContinueButton title="Continue" disabled={!canContinue} onClick={handleContinue} />
          </div>
        </div>
      )}

      {displayedStep === 2 && (
        <div className="flex-1 flex flex-col max-w-[480px] w-full mx-auto" style={fadeStyle}>
          <PaywallStep />
        </div>
      )}
    </div>
  )
}
