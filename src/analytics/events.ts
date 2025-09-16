/**
 * Predefined analytics event names used throughout the app
 * These correspond to the events mentioned in Epic 9, Story 9.3
 */
export const AnalyticsEvents = {
  // Onboarding events
  ONBOARDING_START: "onboarding_start",
  ONBOARDING_PAGE1: "onboarding_page1",
  ONBOARDING_PAGE2: "onboarding_page2",
  ONBOARDING_PAGE3: "onboarding_page3",
  ONBOARDING_COMPLETE: "onboarding_complete",

  // Counter events
  COUNTER_CREATE: "counter_create",

  // Paywall and purchase events
  PAYWALL_VIEW: "paywall_view",
  PURCHASE_START: "purchase_start",
  PURCHASE_SUCCESS: "purchase_success",
  PURCHASE_FAIL: "purchase_fail",

  // Counter interaction events
  INCREMENT_TAP: "increment_tap",
  UNDO_TAP: "undo_tap",
  STAKE_CHANGE: "stake_change",

  // Export events
  EXPORT_CSV: "export_csv",
  EXPORT_PDF: "export_pdf",
} as const;

/**
 * Type for analytics event names (ensures type safety)
 */
export type AnalyticsEventName = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

/**
 * Common properties that should be included in analytics events
 * Based on Epic 9, Story 9.4 requirements
 */
export interface BaseAnalyticsProperties {
  platform?: "ios" | "android" | "web";
  appVersion?: string;
  isPro?: boolean;
  counterId?: string;
  stakePence?: number;
  targetPence?: number;
  timeSinceStart?: number;
}

/**
 * Specific event payload types for type safety
 */
export interface OnboardingEventPayload extends BaseAnalyticsProperties {
  step?: number;
  counterName?: string;
}

export interface CounterCreateEventPayload extends BaseAnalyticsProperties {
  counterName: string;
  targetPence: number;
  stakePence: number;
  spinsNeeded: number;
}

export interface CounterInteractionEventPayload extends BaseAnalyticsProperties {
  counterId: string;
  stakePence: number;
  wageredPence: number;
  targetPence: number;
  progressPercent: number;
}

export interface StakeChangeEventPayload extends BaseAnalyticsProperties {
  counterId: string;
  previousStakePence: number;
  newStakePence: number;
}

export interface ExportEventPayload extends BaseAnalyticsProperties {
  counterId: string;
  exportType: "csv" | "pdf";
  totalSpins: number;
  wageredPence: number;
}

export interface PurchaseEventPayload extends BaseAnalyticsProperties {
  productId?: string;
  price?: number;
  currency?: string;
  errorCode?: string;
  errorMessage?: string;
}

/**
 * Union type of all possible event payloads
 */
export type EventPayload =
  | OnboardingEventPayload
  | CounterCreateEventPayload
  | CounterInteractionEventPayload
  | StakeChangeEventPayload
  | ExportEventPayload
  | PurchaseEventPayload
  | BaseAnalyticsProperties;
