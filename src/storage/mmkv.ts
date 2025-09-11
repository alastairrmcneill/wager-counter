import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
  id: "wager-counter-storage",
});

// Storage keys
export const STORAGE_KEYS = {
  COUNTERS: "counters",
  SPINS: "spins",
  SESSIONS: "sessions",
  ACTIVE_COUNTER_ID: "activeCounterId",
  ONBOARDING: "onboarding",
} as const;

// Helper functions for JSON serialization
export const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = storage.getString(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Failed to parse storage item ${key}:`, error);
    return defaultValue;
  }
};

export const setStorageItem = <T>(key: string, value: T): void => {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set storage item ${key}:`, error);
  }
};

export const removeStorageItem = (key: string): void => {
  storage.delete(key);
};

export const clearStorage = (): void => {
  storage.clearAll();
};
