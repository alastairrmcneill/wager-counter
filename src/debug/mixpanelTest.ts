import { Mixpanel } from "mixpanel-react-native";

/**
 * Standalone test to verify Mixpanel SDK works independently
 */
export async function testMixpanelDirectly(projectToken: string): Promise<void> {
  console.log("🧪 Testing Mixpanel SDK directly...");
  console.log("Project token:", projectToken.substring(0, 8) + "...");

  try {
    // Create a new Mixpanel instance directly
    const mixpanel = new Mixpanel(projectToken, true);

    console.log("📡 Initializing Mixpanel instance...");
    await mixpanel.init();

    console.log("✅ Mixpanel instance initialized");

    // Track a test event
    console.log("📤 Tracking direct test event...");
    mixpanel.track("DIRECT_MIXPANEL_TEST", {
      timestamp: new Date().toISOString(),
      testType: "direct_sdk_test",
      randomValue: Math.random(),
    });

    // Flush immediately
    console.log("🔄 Flushing events...");
    mixpanel.flush();

    console.log("✅ Direct Mixpanel test completed successfully");

    return;
  } catch (error) {
    console.error("❌ Direct Mixpanel test failed:", error);
    throw error;
  }
}
