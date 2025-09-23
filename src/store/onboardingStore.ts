import { create } from "zustand";
import { persistOnboarding } from "../storage/persistence";

interface OnboardingState {
  isCompleted: boolean;
  currentStep: number;
}

interface OnboardingActions {
  setCompleted: (completed: boolean) => void;
  setCurrentStep: (step: number) => void;
  reset: () => void;
  hydrate: (state: { isCompleted: boolean }) => void;
}

type OnboardingStore = OnboardingState & OnboardingActions;

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  isCompleted: false,
  currentStep: 0,

  setCompleted: (completed: boolean) => {
    set({ isCompleted: completed });
    persistOnboarding({ isCompleted: completed });
  },

  setCurrentStep: (step: number) => {
    set({ currentStep: step });
  },

  reset: () => {
    set({ isCompleted: false, currentStep: 0 });
    persistOnboarding({ isCompleted: false });
  },

  hydrate: (state: { isCompleted: boolean }) => {
    set({ isCompleted: state.isCompleted, currentStep: 0 });
  },
}));
