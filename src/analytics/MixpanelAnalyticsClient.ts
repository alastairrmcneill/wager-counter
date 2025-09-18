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

      console.log("🔧 Initializing Mixpanel...");
      console.log("Project token:", this.config.projectToken.substring(0, 8) + "...");
      console.log("Track automatic events:", this.config.trackAutomaticEvents ?? true);
      console.log("Debug mode:", this.config.debug);
      console.log("Analytics enabled:", this.config.enabled);

      this.debug("Initializing Mixpanel with project token", this.config.projectToken.substring(0, 8) + "...");

      this.mixpanel = new Mixpanel(this.config.projectToken, this.config.trackAutomaticEvents ?? true);

      console.log("📡 Calling mixpanel.init()...");
      await this.mixpanel.init();
      this.initialized = true;

      console.log("✅ Mixpanel initialized successfully");
      this.debug("Mixpanel initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize Mixpanel:", error);
      console.error("Error details:", {
        projectToken: this.config.projectToken ? "PROVIDED" : "MISSING",
        trackAutomaticEvents: this.config.trackAutomaticEvents,
        debug: this.config.debug,
        enabled: this.config.enabled,
        errorMessage: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  /**
   * Track an event with Mixpanel
   */
  async trackEvent(eventName: string, payload?: AnalyticsEventPayload): Promise<void> {
    console.log("📊 Tracking event:", eventName, payload);

    if (!this.isReady() || !this.mixpanel) {
      console.warn("❌ Mixpanel not ready, skipping event", {
        eventName,
        payload,
        isReady: this.isReady(),
        hasMixpanel: !!this.mixpanel,
      });
      this.debug("Mixpanel not ready, skipping event", { eventName, payload });
      return;
    }

    try {
      this.debug("Tracking event", { eventName, payload });
      console.log("📤 Sending event to Mixpanel:", eventName);

      if (payload) {
        this.mixpanel.track(eventName, payload);
      } else {
        this.mixpanel.track(eventName);
      }

      // In debug mode, flush immediately to ensure events are sent
      if (this.config.debug) {
        console.log("🔄 Flushing events in debug mode...");
        this.mixpanel.flush();

        // Additional debugging - check if we can access mixpanel methods
        console.log("🔍 Mixpanel instance debug:", {
          hasTrackMethod: typeof this.mixpanel.track === "function",
          hasFlushMethod: typeof this.mixpanel.flush === "function",
          hasInitMethod: typeof this.mixpanel.init === "function",
          mixpanelConstructor: this.mixpanel.constructor.name,
          projectToken: this.config.projectToken.substring(0, 8) + "...",
        });
      }

      console.log("✅ Event sent to Mixpanel successfully:", eventName);
    } catch (error) {
      console.error(`❌ Failed to track event ${eventName}:`, error);
      console.error("Error details:", {
        eventName,
        payload,
        mixpanelInstance: !!this.mixpanel,
        isReady: this.isReady(),
        error: error instanceof Error ? error.message : String(error),
      });
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
      console.log("🔄 Manually flushing Mixpanel events...");
      this.mixpanel.flush();
      console.log("✅ Flush completed");
    } catch (error) {
      console.error("Failed to flush events:", error);
    }
  }

  /**
   * Test method to verify Mixpanel SDK is working
   */
  async testConnection(): Promise<void> {
    if (!this.isReady() || !this.mixpanel) {
      console.error("❌ Mixpanel not ready for connection test");
      return;
    }

    try {
      console.log("🧪 Testing Mixpanel SDK connection...");

      // Test a simple event
      this.mixpanel.track("mixpanel_connection_test", {
        testTimestamp: Date.now(),
        sdkVersion: "react-native",
        platform: "test",
      });

      // Force flush
      this.mixpanel.flush();

      console.log("✅ Mixpanel SDK connection test completed");
    } catch (error) {
      console.error("❌ Mixpanel SDK connection test failed:", error);
    }
  }
}
