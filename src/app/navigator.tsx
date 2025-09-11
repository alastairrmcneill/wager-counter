import { WelcomeScreen } from "@/src/components/WelcomeScreen";
import { useCounterStore, useOnboardingStore } from "@/src/store";
import React, { useEffect, useState } from "react";
import CounterScreen from "./counter";

export default function AppNavigator() {
  const { isCompleted } = useOnboardingStore();
  const { counters } = useCounterStore();
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

  // Show welcome screen if onboarding not completed or no counters exist
  if (!isCompleted || counters.length === 0) {
    return <WelcomeScreen />;
  }

  // Show counter screen if onboarding completed and counters exist
  return <CounterScreen />;
}
