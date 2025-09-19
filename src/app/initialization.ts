import { analytics } from "../analytics";
import { hydrateStores, setupPersistence } from "../storage";
import { validateOnLoad } from "../utils";

interface InitializationResult {
  hydration: {
    success: boolean;
    duration: number;
    countersLoaded: number;
    spinsLoaded: number;
  };
  validation: {
    totalCounters: number;
    countersWithDrift: number;
    totalDriftFixed: number;
  };
  persistenceSetup: boolean;
  analytics: {
    initialized: boolean;
    provider: string;
  };
}

// Global cleanup function storage
let persistenceCleanup: (() => void) | null = null;

/**
 * Initialize the app - hydrate stores, validate data, setup persistence
 */
export const initializeApp = async (): Promise<InitializationResult> => {
  const hydrationResult = await hydrateStores();

  if (!hydrationResult.success) {
    console.error("❌ Failed to hydrate stores");
    throw new Error("App initialization failed during hydration");
  }

  console.log(
    `✅ Hydration complete in ${hydrationResult.duration}ms ` +
      `(${hydrationResult.countersLoaded} counters, ${hydrationResult.spinsLoaded} spins)`
  );

  // Step 2: Validate wageredPence against spin history
  console.log("🔍 Validating counter data...");
  const validationResult = await validateOnLoad();

  // Step 3: Initialize analytics
  console.log("📊 Initializing analytics...");
  let analyticsProvider = "none";
  let analyticsInitialized = false;

  try {
    await analytics.initializeFromEnvironment();
    analyticsProvider = analytics.getCurrentProvider() || "unknown";
    analyticsInitialized = analytics.isInitialized();
    console.log(`✅ Analytics initialized with ${analyticsProvider} provider`);
  } catch (error) {
    console.error("❌ Failed to initialize analytics:", error);
  }

  // Step 4: Setup persistence subscriptions
  console.log("💾 Setting up persistence...");
  persistenceCleanup = setupPersistence();

  console.log("✅ App initialization complete!");

  return {
    hydration: hydrationResult,
    validation: {
      totalCounters: validationResult.totalCounters,
      countersWithDrift: validationResult.countersWithDrift,
      totalDriftFixed: validationResult.totalDriftFixed,
    },
    persistenceSetup: true,
    analytics: {
      initialized: analyticsInitialized,
      provider: analyticsProvider,
    },
  };
};

/**
 * Clean up resources (call this on app unmount if needed)
 */
export const cleanupApp = (): void => {
  if (persistenceCleanup) {
    persistenceCleanup();
    persistenceCleanup = null;
  }
  console.log("🧹 App cleanup complete");
};
