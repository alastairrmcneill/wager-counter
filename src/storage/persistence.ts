import { useCounterStore, useOnboardingStore, useSessionStore, useSpinStore } from "../store";
import { Counter, Session, Spin } from "../types";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "./mmkv";

interface HydrationResult {
  success: boolean;
  duration: number;
  countersLoaded: number;
  spinsLoaded: number;
}

/**
 * Persist counter data to MMKV
 */
export const persistCounters = (counters: Counter[]): void => {
  setStorageItem(STORAGE_KEYS.COUNTERS, counters);
};

/**
 * Persist spin data to MMKV
 */
export const persistSpins = (spins: Spin[]): void => {
  setStorageItem(STORAGE_KEYS.SPINS, spins);
};

/**
 * Persist session data to MMKV
 */
export const persistSessions = (sessions: Session[]): void => {
  setStorageItem(STORAGE_KEYS.SESSIONS, sessions);
};

/**
 * Persist active counter ID to MMKV
 */
export const persistActiveCounterId = (counterId: string | null): void => {
  setStorageItem(STORAGE_KEYS.ACTIVE_COUNTER_ID, counterId);
};

/**
 * Persist onboarding state to MMKV
 */
export const persistOnboarding = (onboardingState: { isCompleted: boolean }): void => {
  setStorageItem(STORAGE_KEYS.ONBOARDING, onboardingState);
};

/**
 * Hydrate all stores from MMKV
 */
export const hydrateStores = async (): Promise<HydrationResult> => {
  const startTime = Date.now();

  try {
    // Load data from storage
    const counters = getStorageItem<Counter[]>(STORAGE_KEYS.COUNTERS, []);
    const spins = getStorageItem<Spin[]>(STORAGE_KEYS.SPINS, []);
    const sessions = getStorageItem<Session[]>(STORAGE_KEYS.SESSIONS, []);
    const onboardingState = getStorageItem<{ isCompleted: boolean }>(STORAGE_KEYS.ONBOARDING, {
      isCompleted: false,
    });

    // Set state directly (bypass actions to avoid triggers)
    // Note: activeCounterId is intentionally NOT restored - always starts as null
    useCounterStore.setState({
      counters,
      activeCounterId: null, // Always start with no active counter
    });

    useSpinStore.setState({
      spins,
    });

    useSessionStore.setState({
      sessions,
    });

    // Use the hydrate method to set only isCompleted, currentStep always starts at 0
    useOnboardingStore.getState().hydrate(onboardingState);

    const duration = Date.now() - startTime;

    return {
      success: true,
      duration,
      countersLoaded: counters.length,
      spinsLoaded: spins.length,
    };
  } catch (error) {
    console.error("Failed to hydrate stores:", error);
    const duration = Date.now() - startTime;

    return {
      success: false,
      duration,
      countersLoaded: 0,
      spinsLoaded: 0,
    };
  }
};

/**
 * Subscribe to store changes and persist to MMKV
 */
export const setupPersistence = (): (() => void) => {
  // Subscribe to counter store changes
  const unsubCounters = useCounterStore.subscribe((state) => {
    persistCounters(state.counters);
    // Note: activeCounterId is intentionally NOT persisted
  });

  // Subscribe to spin store changes
  const unsubSpins = useSpinStore.subscribe((state) => {
    persistSpins(state.spins);
  });

  // Subscribe to session store changes
  const unsubSessions = useSessionStore.subscribe((state) => {
    persistSessions(state.sessions);
  });

  // Subscribe to onboarding store changes
  const unsubOnboarding = useOnboardingStore.subscribe((state) => {
    persistOnboarding({ isCompleted: state.isCompleted });
  });

  // Return cleanup function
  return () => {
    unsubCounters();
    unsubSpins();
    unsubSessions();
    unsubOnboarding();
  };
};
