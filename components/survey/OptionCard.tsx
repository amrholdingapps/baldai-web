import { surveyColors } from "@/constants/survey"

interface OptionCardProps {
  label: string
  isSelected: boolean
  mode: "single" | "multiple"
  onSelect: () => void
}

export default function OptionCard({ label, isSelected, mode, onSelect }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full flex items-center justify-between px-[16px] py-[16px] rounded-[20px] border-[1px] transition-all duration-200 text-left"
      style={{
        borderColor: isSelected ? surveyColors.primary : surveyColors.borderPrimary,
        backgroundColor: isSelected ? surveyColors.bgSecondary : "transparent",
      }}
    >
      <span className="text-[16px] font-normal text-white flex-1">{label}</span>
      {mode === "multiple" ? (
        <div
          className="w-[24px] h-[24px] rounded-[5px] flex items-center justify-center flex-shrink-0 ml-3 transition-all duration-200"
          style={{
            border: `1.5px solid ${isSelected ? surveyColors.primary : surveyColors.strokeSecondary}`,
            backgroundColor: isSelected ? surveyColors.primary : "transparent",
          }}
        >
          {isSelected && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7L6 10L11 4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      ) : (
        <div
          className="w-[20px] h-[20px] rounded-full flex items-center justify-center flex-shrink-0 ml-3 transition-all duration-200"
          style={{
            border: `1.5px solid ${isSelected ? surveyColors.primary : surveyColors.strokeSecondary}`,
            backgroundColor: isSelected ? surveyColors.primary : "transparent",
          }}
        >
          {isSelected && <div className="w-[8px] h-[8px] rounded-full bg-white" />}
        </div>
      )}
    </button>
  )
}
