import * as amplitude from "@amplitude/unified"

export enum AnalyticsEvents {
  SURVEY_OPENED = "survey.opened",

  SURVEY_GOALS_SHOWN = "survey.goals.shown",
  SURVEY_GOALS_SENT = "survey.goals.sent",

  SURVEY_MEDICATION_SHOWN = "survey.medication.shown",
  SURVEY_MEDICATION_SENT = "survey.medication.sent",

  SURVEY_STEP_CHANGED = "survey.step.changed",

  PAYWALL_SHOWN = "paywall.shown",
  PAYWALL_PLAN_CHANGED = "paywall.plan.changed",
  PAYWALL_PURCHASE_STARTED = "paywall.purchase_started",
  PAYWALL_PURCHASE_COMPLETED = "paywall.purchase_completed",
  PAYWALL_PURCHASE_FAILED = "paywall.purchase_failed",
}

export function trackEvent(
  event: AnalyticsEvents,
  properties?: Record<string, unknown>
) {
  try {
    amplitude.track(event, properties)
  } catch (error) {
    console.error(`Failed to track event ${event}:`, error)
  }
}
