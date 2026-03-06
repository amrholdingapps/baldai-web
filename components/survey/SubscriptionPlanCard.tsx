import { surveyColors } from "@/constants/survey"

interface SubscriptionPlanCardProps {
  duration: string
  /** Legacy: numeric string for $ prefix */
  weeklyPrice?: string
  fullPrice?: string
  billedLabel?: string
  /** RevenueCat: use product.price.formattedPrice (no $ prefix) */
  formattedPrice?: string
  /** Shown after formattedPrice, e.g. "billed annually" or "/ week" */
  priceSuffix?: string
  discount?: number
  strikedWeeklyPrice?: string
  isActive: boolean
  onSelect: () => void
}

export default function SubscriptionPlanCard({
  duration,
  weeklyPrice,
  fullPrice,
  billedLabel,
  formattedPrice,
  priceSuffix,
  discount,
  strikedWeeklyPrice,
  isActive,
  onSelect,
}: SubscriptionPlanCardProps) {
  const useFormatted = formattedPrice != null && formattedPrice !== ""

  return (
    <button
      type="button"
      onClick={onSelect}
      className="relative w-full h-[72px] rounded-[20px] px-[16px] flex items-center transition-all duration-200"
      style={{
        backgroundColor: surveyColors.bgSecondary,
        border: `2px solid ${isActive ? surveyColors.primary : surveyColors.bgSecondary}`,
      }}
    >
      {discount && (
        <div
          className="absolute top-[-10px] left-[16px] h-[28px] px-[10px] py-[6px] rounded-[8px] flex items-center"
          style={{ backgroundColor: surveyColors.primaryDark }}
        >
          <span
            className="text-[14px] font-bold leading-none"
            style={{ color: surveyColors.bgTertiary }}
          >
            {discount}% OFF
          </span>
        </div>
      )}
      <div className="flex items-center justify-between w-full">
        <span className="text-[20px] font-semibold text-white">{duration}</span>
        <div className="flex flex-col items-end">
          {useFormatted ? (
            <span className="text-white">
              <span className="text-[16px] font-semibold">{formattedPrice}</span>
              {priceSuffix && (
                <span
                  className="text-[12px] font-normal"
                  style={{ color: surveyColors.fgSecondary }}
                >
                  {" "}{priceSuffix}
                </span>
              )}
            </span>
          ) : (
            <>
              <div className="flex items-center gap-[8px]">
                {strikedWeeklyPrice && (
                  <span
                    className="text-[14px] line-through"
                    style={{ color: "#F87171", textDecorationColor: "#F87171" }}
                  >
                    ${strikedWeeklyPrice}
                  </span>
                )}
                <span className="text-white">
                  <span className="text-[16px] font-semibold">${weeklyPrice}</span>
                  <span
                    className="text-[12px] font-normal"
                    style={{ color: surveyColors.fgSecondary }}
                  >
                    {" "}/week
                  </span>
                </span>
              </div>
              {fullPrice && billedLabel && (
                <span className="text-[12px]" style={{ color: surveyColors.fgSecondary }}>
                  ${fullPrice} billed {billedLabel}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </button>
  )
}
