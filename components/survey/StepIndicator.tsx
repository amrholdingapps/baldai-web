import { surveyColors } from "@/constants/survey"

export default function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-[6px]">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-[4px] rounded-full transition-all duration-300"
          style={{
            width: i === current ? 28 : 8,
            background: i === current ? surveyColors.primary : "rgba(188, 160, 236, 0.24)",
          }}
        />
      ))}
    </div>
  )
}
