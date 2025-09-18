import { getAnalyticsConfig, isMixpanelConfigured } from "./config";
import { ConsoleAnalyticsClient } from "./ConsoleAnalyticsClient";
import { MixpanelAnalyticsClient } from "./MixpanelAnalyticsClient";
import { AnalyticsClient, AnalyticsEventPayload, AnalyticsProvider } from "./types";

/**
 * Main analytics service that provides a unified interface
 * Manages the current analytics client and provides swappable backends
 */
export class AnalyticsService {
  private static instance: AnalyticsService;
  private client: AnalyticsClient | null = null;
  private currentProvider: AnalyticsProvider | null = null;

  private constructor() {}

  /**
   * Get the singleton instance of the analytics service
   */
  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  /**
   * Initialize the analytics service with a specific client
   * @param client - The analytics client to use
   * @param provider - The provider type for identification
   */
  async initialize(client: AnalyticsClient, provider: AnalyticsProvider): Promise<void> {
    try {
      await client.initialize();
      this.client = client;
      this.currentProvider = provider;
      console.log(`📊 Analytics initialized with ${provider} provider`);
    } catch (error) {
      console.error("Failed to initialize analytics:", error);
      // Fallback to console client in case of failure
      await this.initializeConsoleClient();
    }
  }

  /**
   * Initialize with console client (fallback or development)
   */
  async initializeConsoleClient(): Promise<void> {
    const consoleClient = new ConsoleAnalyticsClient();
    await this.initialize(consoleClient, "console");
  }

  /**
   * Smart initialization that chooses the best analytics client based on environment
   * This should be called during app startup
   */
  async initializeFromEnvironment(): Promise<void> {
    try {
      const config = getAnalyticsConfig();

      // If Mixpanel is configured and analytics is enabled, use Mixpanel
      if (isMixpanelConfigured()) {
        console.log("📊 Initializing analytics with Mixpanel");

        const mixpanelClient = new MixpanelAnalyticsClient({
          projectToken: config.mixpanelProjectToken!,
          enabled: config.analyticsEnabled,
          debug: config.analyticsDebug,
        });

        await this.initialize(mixpanelClient, "mixpanel");
        return;
      }

      // Fall back to console client for development or when Mixpanel is not configured
      console.log("📊 Initializing analytics with Console client (development/fallback)");
      await this.initializeConsoleClient();
    } catch (error) {
      console.error("Failed to initialize analytics from environment:", error);
      // Always fall back to console client if anything goes wrong
      await this.initializeConsoleClient();
    }
  }

  /**
   * Track an event using the current analytics client
   * @param eventName - The name of the event to track
   * @param payload - Optional event properties/payload
   */
  async trackEvent(eventName: string, payload?: AnalyticsEventPayload): Promise<void> {
    if (!this.client) {
      console.warn("Analytics not initialized, skipping event:", eventName);
      return;
    }

    try {
      await this.client.trackEvent(eventName, payload);
    } catch (error) {
      console.error("Failed to track event:", eventName, error);
    }
  }
  /**
   * Identify a user with properties
   * @param userId - Unique user identifier
   * @param properties - User properties to set
   */
  async identify(userId: string, properties?: AnalyticsEventPayload): Promise<void> {
    if (!this.client) {
      console.warn("Analytics not initialized, skipping identify");
      return;
    }

    try {
      if (this.client.identify) {
        await this.client.identify(userId, properties);
      }
    } catch (error) {
      console.error("Failed to identify user:", error);
    }
  }

  /**
   * Set user properties
   * @param properties - User properties to set
   */
  async setUserProperties(properties: AnalyticsEventPayload): Promise<void> {
    if (!this.client) {
      console.warn("Analytics not initialized, skipping setUserProperties");
      return;
    }

    try {
      if (this.client.setUserProperties) {
        await this.client.setUserProperties(properties);
      }
    } catch (error) {
      console.error("Failed to set user properties:", error);
    }
  }

  /**
   * Reset the user identity
   */
  async reset(): Promise<void> {
    if (!this.client) {
      console.warn("Analytics not initialized, skipping reset");
      return;
    }

    try {
      if (this.client.reset) {
        await this.client.reset();
      }
    } catch (error) {
      console.error("Failed to reset analytics:", error);
    }
  }

  /**
   * Get the current provider type
   */
  getCurrentProvider(): AnalyticsProvider | null {
    return this.currentProvider;
  }

  /**
   * Check if analytics is initialized
   */
  isInitialized(): boolean {
    return this.client !== null;
  }
}

// Export a singleton instance for easy access throughout the app
export const analytics = AnalyticsService.getInstance();
