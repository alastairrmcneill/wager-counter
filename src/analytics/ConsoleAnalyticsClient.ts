import { BaseAnalyticsClient } from "./BaseAnalyticsClient";
import { AnalyticsClientConfig, AnalyticsEventPayload } from "./types";

/**
 * Console analytics client for development and testing
 * Logs all analytics events to the console instead of sending to a real provider
 */
export class ConsoleAnalyticsClient extends BaseAnalyticsClient {
  constructor(config: AnalyticsClientConfig = { enabled: true, debug: true }) {
    super(config);
  }

  async initialize(): Promise<void> {
    this.debug("ConsoleAnalyticsClient initialized");
    this.initialized = true;
  }

  async trackEvent(eventName: string, payload?: AnalyticsEventPayload): Promise<void> {
    if (!this.isReady()) {
      this.debug("Analytics not ready, skipping event", { eventName, payload });
      return;
    }

    const timestamp = new Date().toISOString();
    const eventData = {
      event: eventName,
      properties: payload || {},
      timestamp,
    };

    console.log("📊 [Analytics Event]", eventData);
  }

  async identify(userId: string, properties?: AnalyticsEventPayload): Promise<void> {
    if (!this.isReady()) {
      this.debug("Analytics not ready, skipping identify");
      return;
    }

    console.log("👤 [Analytics Identify]", {
      userId,
      properties: properties || {},
      timestamp: new Date().toISOString(),
    });
  }

  async setUserProperties(properties: AnalyticsEventPayload): Promise<void> {
    if (!this.isReady()) {
      this.debug("Analytics not ready, skipping setUserProperties");
      return;
    }

    console.log("👤 [Analytics User Properties]", {
      properties,
      timestamp: new Date().toISOString(),
    });
  }

  async reset(): Promise<void> {
    if (!this.isReady()) {
      this.debug("Analytics not ready, skipping reset");
      return;
    }

    console.log("🔄 [Analytics Reset]", {
      timestamp: new Date().toISOString(),
    });
  }
}
