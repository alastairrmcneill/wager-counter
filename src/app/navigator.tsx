import { HomeScreen } from "@/src/components/HomeScreen";
import { OnboardingWizard } from "@/src/components/OnboardingWizard";
import { WelcomeScreen } from "@/src/components/WelcomeScreen";
import { useCounterStore, useOnboardingStore } from "@/src/store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import CounterScreen from "./counter";

export default function AppNavigator() {
  const { isCompleted, currentStep } = useOnboardingStore();
  const { counters, activeCounterId, setActiveCounter, deleteCounter } = useCounterStore();
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

  const handleDeleteCounter = (counter: any) => {
    deleteCounter(counter.id);
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
    return (
      <HomeScreen
        counters={counters}
        onCounterPress={handleCounterPress}
        onCreateCounter={handleCreateCounter}
        onDeleteCounter={handleDeleteCounter}
      />
    );
  }

  // Onboarding not completed → Show welcome screen or wizard based on currentStep
  if (currentStep > 0) {
    return <OnboardingWizard />;
  }

  return <WelcomeScreen />;
}
