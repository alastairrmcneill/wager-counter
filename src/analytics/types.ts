/**
 * Analytics event payload that can contain any key-value pairs
 */
export interface AnalyticsEventPayload {
  [key: string]: any;
}

/**
 * Core analytics client interface that all providers must implement
 */
export interface AnalyticsClient {
  /**
   * Track an event with optional payload
   * @param eventName - The name of the event to track
   * @param payload - Optional event properties/payload
   */
  trackEvent(eventName: string, payload?: AnalyticsEventPayload): Promise<void>;

  /**
   * Initialize the analytics client
   */
  initialize(): Promise<void>;

  /**
   * Identify a user with properties
   * @param userId - Unique user identifier
   * @param properties - User properties to set
   */
  identify?(userId: string, properties?: AnalyticsEventPayload): Promise<void>;

  /**
   * Set user properties
   * @param properties - User properties to set
   */
  setUserProperties?(properties: AnalyticsEventPayload): Promise<void>;

  /**
   * Reset the user identity (useful for logout)
   */
  reset?(): Promise<void>;
}

/**
 * Analytics client configuration
 */
export interface AnalyticsClientConfig {
  enabled: boolean;
  debug?: boolean;
  [key: string]: any;
}

/**
 * Analytics provider type for identifying different backends
 */
export type AnalyticsProvider = "console" | "mixpanel" | "amplitude" | "custom";
