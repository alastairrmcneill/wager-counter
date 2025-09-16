import { AnalyticsClient, AnalyticsClientConfig, AnalyticsEventPayload } from "./types";

/**
 * Abstract base class for analytics clients
 * Provides common functionality and structure for all analytics providers
 */
export abstract class BaseAnalyticsClient implements AnalyticsClient {
  protected config: AnalyticsClientConfig;
  protected initialized: boolean = false;

  constructor(config: AnalyticsClientConfig) {
    this.config = config;
  }

  abstract initialize(): Promise<void>;
  abstract trackEvent(eventName: string, payload?: AnalyticsEventPayload): Promise<void>;

  /**
   * Check if the client is enabled and initialized
   */
  protected isReady(): boolean {
    return this.config.enabled && this.initialized;
  }

  /**
   * Log debug information if debug mode is enabled
   */
  protected debug(message: string, data?: any): void {
    if (this.config.debug) {
      console.log(`[Analytics Debug] ${message}`, data || "");
    }
  }

  /**
   * Default implementation for identify (can be overridden)
   */
  async identify(userId: string, properties?: AnalyticsEventPayload): Promise<void> {
    this.debug("identify called but not implemented", { userId, properties });
  }

  /**
   * Default implementation for setUserProperties (can be overridden)
   */
  async setUserProperties(properties: AnalyticsEventPayload): Promise<void> {
    this.debug("setUserProperties called but not implemented", properties);
  }

  /**
   * Default implementation for reset (can be overridden)
   */
  async reset(): Promise<void> {
    this.debug("reset called but not implemented");
  }
}
