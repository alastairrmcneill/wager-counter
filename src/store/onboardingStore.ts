import { create } from "zustand";
import { persistOnboarding } from "../storage/persistence";

interface OnboardingState {
  isCompleted: boolean;
  currentStep: number; // For wizard steps - not persisted, always starts at 0
}

interface OnboardingActions {
  setCompleted: (completed: boolean) => void;
  setCurrentStep: (step: number) => void;
  reset: () => void;
  hydrate: (state: { isCompleted: boolean }) => void;
}

type OnboardingStore = OnboardingState & OnboardingActions;

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  // State
  isCompleted: false,
  currentStep: 0, // Always starts at 0, not persisted

  // Actions
  setCompleted: (completed: boolean) => {
    set({ isCompleted: completed });
    // Only persist the isCompleted state, not currentStep
    persistOnboarding({ isCompleted: completed });
  },

  setCurrentStep: (step: number) => {
    // Only update state, don't persist currentStep
    set({ currentStep: step });
  },

  reset: () => {
    set({ isCompleted: false, currentStep: 0 });
    persistOnboarding({ isCompleted: false });
  },

  hydrate: (state: { isCompleted: boolean }) => {
    // Only hydrate isCompleted, currentStep always starts at 0
    set({ isCompleted: state.isCompleted, currentStep: 0 });
  },
}));
