import { create } from "zustand";

interface OnboardingState {
  isCompleted: boolean;
  currentStep: number; // For wizard steps
}

interface OnboardingActions {
  setCompleted: (completed: boolean) => void;
  setCurrentStep: (step: number) => void;
  reset: () => void;
}

type OnboardingStore = OnboardingState & OnboardingActions;

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  // State
  isCompleted: false,
  currentStep: 0,

  // Actions
  setCompleted: (completed: boolean) =>
    set(() => ({
      isCompleted: completed,
    })),
  setCurrentStep: (step: number) =>
    set(() => ({
      currentStep: step,
    })),
  reset: () =>
    set(() => ({
      isCompleted: false,
      currentStep: 0,
    })),
}));
