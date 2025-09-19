import { create } from "zustand";

interface SettingsState {
  hapticsEnabled: boolean;
}

interface SettingsActions {
  setHapticsEnabled: (enabled: boolean) => void;
  hydrate: (settings: Partial<SettingsState>) => void;
}

type SettingsStore = SettingsState & SettingsActions;

export const useSettingsStore = create<SettingsStore>((set) => ({
  // State - default values
  hapticsEnabled: true, // Default to enabled

  // Actions
  setHapticsEnabled: (enabled: boolean) => {
    set({ hapticsEnabled: enabled });
  },

  hydrate: (settings: Partial<SettingsState>) => {
    set(settings);
  },
}));
