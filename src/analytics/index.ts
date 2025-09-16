// Main analytics service and singleton
export { analytics, AnalyticsService } from "./AnalyticsService";

// Base classes and interfaces
export { BaseAnalyticsClient } from "./BaseAnalyticsClient";
export type { AnalyticsClient, AnalyticsClientConfig, AnalyticsEventPayload, AnalyticsProvider } from "./types";

// Console client for development/testing
export { ConsoleAnalyticsClient } from "./ConsoleAnalyticsClient";

// Mixpanel client for production analytics
export { MixpanelAnalyticsClient } from "./MixpanelAnalyticsClient";
export type { MixpanelAnalyticsClientConfig } from "./MixpanelAnalyticsClient";

// Event definitions and types
export { AnalyticsEvents } from "./events";
export type {
  AnalyticsEventName,
  BaseAnalyticsProperties,
  CounterCreateEventPayload,
  CounterInteractionEventPayload,
  EventPayload,
  ExportEventPayload,
  OnboardingEventPayload,
  PurchaseEventPayload,
  StakeChangeEventPayload,
} from "./events";

// Configuration and environment helpers
export {
  getAnalyticsConfig,
  getMixpanelProjectToken,
  isAnalyticsDebugEnabled,
  isAnalyticsEnabled,
  isMixpanelConfigured,
} from "./config";

// Convenience functions
export { identifyUser, resetUser, setUserProperties, trackEvent } from "./utils";
