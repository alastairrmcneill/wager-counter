import { Mixpanel } from "mixpanel-react-native";
import { BaseAnalyticsClient } from "./BaseAnalyticsClient";
import { AnalyticsClientConfig, AnalyticsEventPayload } from "./types";

/**
 * Configuration specific to Mixpanel analytics client
 */
export interface MixpanelAnalyticsClientConfig extends AnalyticsClientConfig {
  projectToken: string;
  trackAutomaticEvents?: boolean;
}

/**
 * Mixpanel analytics client implementation
 * Extends BaseAnalyticsClient to provide Mixpanel-specific functionality
 */
export class MixpanelAnalyticsClient extends BaseAnalyticsClient {
  private mixpanel: Mixpanel | null = null;
  protected config: MixpanelAnalyticsClientConfig;

  constructor(config: MixpanelAnalyticsClientConfig) {
    super(config);
    this.config = config;
  }

  /**
   * Initialize the Mixpanel client
   */
  async initialize(): Promise<void> {
    try {
      if (!this.config.projectToken) {
        throw new Error("Mixpanel project token is required");
      }

      this.debug("Initializing Mixpanel with project token", this.config.projectToken.substring(0, 8) + "...");

      this.mixpanel = new Mixpanel(this.config.projectToken, this.config.trackAutomaticEvents ?? true);

      await this.mixpanel.init();
      this.initialized = true;

      this.debug("Mixpanel initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Mixpanel:", error);
      throw error;
    }
  }

  /**
   * Track an event with Mixpanel
   */
  async trackEvent(eventName: string, payload?: AnalyticsEventPayload): Promise<void> {
    if (!this.isReady() || !this.mixpanel) {
      this.debug("Mixpanel not ready, skipping event", { eventName, payload });
      return;
    }

    try {
      this.debug("Tracking event", { eventName, payload });

      if (payload) {
        this.mixpanel.track(eventName, payload);
      } else {
        this.mixpanel.track(eventName);
      }
    } catch (error) {
      console.error(`Failed to track event ${eventName}:`, error);
    }
  }

  /**
   * Identify a user with Mixpanel
   */
  async identify(userId: string, properties?: AnalyticsEventPayload): Promise<void> {
    if (!this.isReady() || !this.mixpanel) {
      this.debug("Mixpanel not ready, skipping identify", { userId, properties });
      return;
    }

    try {
      this.debug("Identifying user", { userId, properties });

      this.mixpanel.identify(userId);

      if (properties) {
        this.mixpanel.getPeople().set(properties);
      }
    } catch (error) {
      console.error(`Failed to identify user ${userId}:`, error);
    }
  }

  /**
   * Set user properties with Mixpanel
   */
  async setUserProperties(properties: AnalyticsEventPayload): Promise<void> {
    if (!this.isReady() || !this.mixpanel) {
      this.debug("Mixpanel not ready, skipping setUserProperties", properties);
      return;
    }

    try {
      this.debug("Setting user properties", properties);
      this.mixpanel.getPeople().set(properties);
    } catch (error) {
      console.error("Failed to set user properties:", error);
    }
  }

  /**
   * Reset the user identity and clear all properties
   */
  async reset(): Promise<void> {
    if (!this.isReady() || !this.mixpanel) {
      this.debug("Mixpanel not ready, skipping reset");
      return;
    }

    try {
      this.debug("Resetting user identity");
      this.mixpanel.reset();
    } catch (error) {
      console.error("Failed to reset user identity:", error);
    }
  }

  /**
   * Flush any pending events (useful before app backgrounding)
   */
  async flush(): Promise<void> {
    if (!this.isReady() || !this.mixpanel) {
      this.debug("Mixpanel not ready, skipping flush");
      return;
    }

    try {
      this.debug("Flushing pending events");
      this.mixpanel.flush();
    } catch (error) {
      console.error("Failed to flush events:", error);
    }
  }
}
