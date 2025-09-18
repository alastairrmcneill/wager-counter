import { trackEvent } from "@/src/analytics";
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

      // Test analytics tracking when app loads
      console.log("🧪 Testing analytics from navigator...");
      trackEvent("navigator_loaded", {
        isOnboardingCompleted: isCompleted,
        currentStep,
        totalCounters: counters.length,
        hasActiveCounter: !!activeCounterId,
      });

      // Add a very distinctive test event
      trackEvent("DEBUGGING_MIXPANEL_CONNECTION_TEST_EVENT_12345", {
        timestamp: new Date().toISOString(),
        testMessage: "If you see this event in Mixpanel, the connection is working!",
        randomNumber: Math.floor(Math.random() * 1000),
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [isCompleted, currentStep, counters.length, activeCounterId]);

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
    // Onboarding completed → Always show home screen (list of counters) on app open
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
