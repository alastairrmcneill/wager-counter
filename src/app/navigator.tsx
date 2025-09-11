import { OnboardingWizard } from "@/src/components/OnboardingWizard";
import { WelcomeScreen } from "@/src/components/WelcomeScreen";
import { useCounterStore, useOnboardingStore } from "@/src/store";
import React, { useEffect, useState } from "react";
import CounterScreen from "./counter";

export default function AppNavigator() {
  const { isCompleted, currentStep } = useOnboardingStore();
  const { counters, activeCounterId } = useCounterStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Give stores time to hydrate from persistence
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    // Return a loading state or null while stores hydrate
    return null;
  }

  // Show wizard if user has started onboarding (currentStep > 0)
  if (currentStep > 0) {
    return <OnboardingWizard />;
  }

  // Show counter screen if onboarding completed and there's an active counter
  if (isCompleted && activeCounterId && counters.length > 0) {
    return <CounterScreen />;
  }

  // Show welcome screen by default (fresh app start or no counters)
  return <WelcomeScreen />;
}
