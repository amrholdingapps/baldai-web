import { surveyColors, MEDICATION_OPTIONS } from "@/constants/survey"
import OptionCard from "./OptionCard"

interface MedicationStepProps {
  selectedMedication: string | null
  onSelect: (option: string) => void
}

export default function MedicationStep({ selectedMedication, onSelect }: MedicationStepProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-[12px] mb-[32px]">
        <h1 className="text-[28px] font-semibold text-white leading-tight">
          Do you have a hair loss{" "}
          <span style={{ color: surveyColors.primary }}>treatment routine</span>?
        </h1>
        <p className="text-[16px] leading-[1.5]" style={{ color: surveyColors.fgSecondary }}>
          Such as: taking medication (i.e. Finasteride, Minoxidil) or supplemental treatments
          (i.e. derma roller, RLT, supplements)
        </p>
      </div>
      <div className="flex flex-col gap-[10px]">
        {MEDICATION_OPTIONS.map((option) => (
          <OptionCard
            key={option}
            label={option}
            isSelected={selectedMedication === option}
            mode="single"
            onSelect={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  )
}
