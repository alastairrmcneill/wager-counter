/**
 * Analytics service for tracking events
 */
export class AnalyticsService {
  /**
   * Track an event
   * @param eventName - Name of the event
   * @param properties - Optional properties for the event
   */
  static trackEvent(eventName: string, properties?: Record<string, any>): void {
    // For now, just log the event
    // In a real app, this would integrate with analytics providers like Firebase, Mixpanel, etc.
    console.log(`[Analytics] ${eventName}`, properties);
  }

  /**
   * Track CSV export event
   * @param counterName - Name of the counter being exported
   * @param spinsCount - Number of spins exported
   */
  static trackCsvExport(counterName: string, spinsCount: number): void {
    this.trackEvent("export_csv", {
      counter_name: counterName,
      spins_count: spinsCount,
      timestamp: new Date().toISOString(),
    });
  }
}
