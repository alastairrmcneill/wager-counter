import { HomeScreen } from "@/src/components/HomeScreen";
import { WelcomeScreen } from "@/src/components/WelcomeScreen";
import { useCounterStore, useOnboardingStore } from "@/src/store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import CounterScreen from "./counter";

export default function AppNavigator() {
  const { isCompleted } = useOnboardingStore();
  const { counters, activeCounterId, setActiveCounter } = useCounterStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Give stores time to hydrate from persistence
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleCounterPress = (counter: any) => {
    setActiveCounter(counter.id);
  };

  const handleCreateCounter = () => {
    router.push("/create-counter");
  };

  if (!isReady) {
    // Return a loading state or null while stores hydrate
    return null;
  }

  // Show counter screen only if user has actively selected a counter in this session
  if (isCompleted && activeCounterId && counters.find((c) => c.id === activeCounterId)) {
    return <CounterScreen />;
  }

  // Main flow: Check if onboarding is completed
  if (isCompleted) {
    // Onboarding completed → Always show home screen (list of counters) on app open
    return <HomeScreen counters={counters} onCounterPress={handleCounterPress} onCreateCounter={handleCreateCounter} />;
  }

  // Onboarding not completed → Show welcome screen
  return <WelcomeScreen />;
}
