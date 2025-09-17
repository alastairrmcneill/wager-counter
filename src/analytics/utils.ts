import Constants from "expo-constants";
import { Platform } from "react-native";
import { analytics } from "./AnalyticsService";
import { AnalyticsEventPayload } from "./types";

/**
 * Convenience function for tracking events throughout the app
 * This provides a simple way to track events without importing the analytics service directly
 * Automatically enriches events with platform information and app metadata
 *
 * @param eventName - The name of the event to track
 * @param payload - Optional event properties/payload
 * @returns Promise that resolves when the event is tracked
 */
export async function trackEvent(eventName: string, payload?: AnalyticsEventPayload): Promise<void> {
  // Enrich payload with platform information and app metadata
  const enrichedPayload = {
    ...payload,
    platform: Platform.OS as "ios" | "android" | "web",
    appVersion: Constants.expoConfig?.version || "unknown",
    isPro: false, // TODO: Implement when premium features are added
  };

  return analytics.trackEvent(eventName, enrichedPayload);
}

/**
 * Convenience function for identifying users
 *
 * @param userId - Unique user identifier
 * @param properties - User properties to set
 * @returns Promise that resolves when the user is identified
 */
export async function identifyUser(userId: string, properties?: AnalyticsEventPayload): Promise<void> {
  return analytics.identify(userId, properties);
}

/**
 * Convenience function for setting user properties
 *
 * @param properties - User properties to set
 * @returns Promise that resolves when the properties are set
 */
export async function setUserProperties(properties: AnalyticsEventPayload): Promise<void> {
  return analytics.setUserProperties(properties);
}

/**
 * Convenience function for resetting user identity
 *
 * @returns Promise that resolves when the reset is complete
 */
export async function resetUser(): Promise<void> {
  return analytics.reset();
}
