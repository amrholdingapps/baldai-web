import { surveyColors } from "@/constants/survey"

export default function PageIndicator({ count, activeIndex }: { count: number; activeIndex: number }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-[12px] h-[12px] flex items-center justify-center">
          <div
            className="rounded-full transition-all duration-300"
            style={{
              width: 6,
              height: 6,
              backgroundColor:
                i === activeIndex ? surveyColors.primary : "rgba(188, 160, 236, 0.24)",
              transform: i === activeIndex ? "scale(1.4)" : "scale(1)",
            }}
          />
        </div>
      ))}
    </div>
  )
}
