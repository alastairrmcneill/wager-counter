import Constants from "expo-constants";

/**
 * Environment configuration for the analytics system
 * This module provides safe access to environment variables for analytics configuration
 */

interface AnalyticsConfig {
  mixpanelProjectToken?: string;
  analyticsEnabled: boolean;
  analyticsDebug: boolean;
}

/**
 * Get analytics configuration from Expo Constants
 * This safely accesses environment variables injected at build time
 */
export function getAnalyticsConfig(): AnalyticsConfig {
  const extra = Constants.expoConfig?.extra || {};

  return {
    mixpanelProjectToken: extra.mixpanelProjectToken,
    analyticsEnabled: extra.analyticsEnabled || false,
    analyticsDebug: extra.analyticsDebug || false,
  };
}

/**
 * Check if Mixpanel is properly configured
 */
export function isMixpanelConfigured(): boolean {
  const config = getAnalyticsConfig();
  return Boolean(config.mixpanelProjectToken && config.analyticsEnabled);
}

/**
 * Get the Mixpanel project token
 * Returns undefined if not configured
 */
export function getMixpanelProjectToken(): string | undefined {
  const config = getAnalyticsConfig();
  return config.mixpanelProjectToken;
}

/**
 * Check if analytics is enabled
 */
export function isAnalyticsEnabled(): boolean {
  const config = getAnalyticsConfig();
  return config.analyticsEnabled;
}

/**
 * Check if analytics debug mode is enabled
 */
export function isAnalyticsDebugEnabled(): boolean {
  const config = getAnalyticsConfig();
  return config.analyticsDebug;
}
