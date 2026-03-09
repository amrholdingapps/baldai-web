import { surveyColors } from "@/constants/survey"

interface ContinueButtonProps {
  title: string
  subtitle?: string
  disabled?: boolean
  onClick: () => void
}

export default function ContinueButton({ title, subtitle, disabled, onClick }: ContinueButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="w-full h-[64px] rounded-[32px] flex items-center justify-center transition-opacity duration-200"
      style={{
        backgroundColor: surveyColors.primaryLight,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <div className="flex flex-col items-center">
        <span className="text-[16px] font-semibold" style={{ color: surveyColors.bgPrimary }}>
          {title}
        </span>
        {subtitle && (
          <span
            className="text-[12px] mt-[2px]"
            style={{ color: surveyColors.bgPrimary, opacity: 0.8 }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </button>
  )
}
