import { surveyColors, GOALS_OPTIONS } from "@/constants/survey"
import OptionCard from "./OptionCard"

interface GoalsStepProps {
  selectedGoals: string[]
  onToggle: (option: string) => void
}

export default function GoalsStep({ selectedGoals, onToggle }: GoalsStepProps) {
  return (
    <div className="flex flex-col gap-[32px]">
      <h1 className="text-[28px] font-semibold text-white leading-tight">
        What would you like to{" "}
        <span style={{ color: surveyColors.primary }}>achieve</span>?
      </h1>
      <div className="flex flex-col gap-[10px]">
        {GOALS_OPTIONS.map((option) => (
          <OptionCard
            key={option}
            label={option}
            isSelected={selectedGoals.includes(option)}
            mode="multiple"
            onSelect={() => onToggle(option)}
          />
        ))}
      </div>
    </div>
  )
}
