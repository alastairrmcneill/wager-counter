import { useEffect } from "react";
import { Alert } from "react-native";

import { useCounterStore, useSessionStore, useSpinStore } from "../store";
import { useCounterIncrement } from "./useCounterIncrement";
import { useCounterUndo } from "./useCounterUndo";
import { useStakeChange } from "./useStakeChange";

/**
 * Custom hook to manage counter screen logic and state
 */
export function useCounterScreen() {
  const { counters, addCounter, getCounter, activeCounterId, setActiveCounter } = useCounterStore();
  const { getSpinsForCounter } = useSpinStore();
  const { startSession, getSessionStats } = useSessionStore();
  const { incrementCounter } = useCounterIncrement();
  const { undoLastSpin, canUndo } = useCounterUndo();
  const { changeStake } = useStakeChange();

  // Determine which counter to use
  const getCurrentCounterId = (): string | null => {
    // If there's an active counter set, use it
    if (activeCounterId && getCounter(activeCounterId)) {
      return activeCounterId;
    }

    // If no active counter but counters exist, use the first one and set it as active
    if (counters.length > 0) {
      const firstCounterId = counters[0].id;
      setActiveCounter(firstCounterId);
      return firstCounterId;
    }

    return null;
  };

  const currentCounterId = getCurrentCounterId();

  // Create a test counter if none exists (for development/testing purposes)
  useEffect(() => {
    if (counters.length === 0) {
      addCounter({
        name: "Test Counter",
        targetPence: 5000, // £50.00 to match the design
        wageredPence: 955, // £9.55 to match the design
        currentStakePence: 50, // £0.50
      });
    }
  }, [counters, addCounter]);

  // Start session for current counter
  useEffect(() => {
    if (currentCounterId) {
      startSession(currentCounterId);
    }
  }, [currentCounterId, startSession]);

  const handleIncrement = async () => {
    if (!currentCounterId) {
      Alert.alert("Error", "No counter available");
      return;
    }
    await incrementCounter(currentCounterId);
  };

  const handleUndo = async () => {
    if (!currentCounterId) {
      Alert.alert("Error", "No counter available");
      return;
    }

    const success = await undoLastSpin(currentCounterId);
    if (!success) {
      Alert.alert("Info", "No spins to undo");
    }
  };

  const handleStakeChange = (newStakePence: number) => {
    if (!currentCounterId) {
      Alert.alert("Error", "No counter available");
      return;
    }

    const success = changeStake(currentCounterId, newStakePence);
    if (!success) {
      Alert.alert("Error", "Failed to change stake");
    }
  };

  // Computed values
  const counter = currentCounterId ? getCounter(currentCounterId) : null;
  const spins = currentCounterId ? getSpinsForCounter(currentCounterId) : [];
  const sessionStats = currentCounterId ? getSessionStats(currentCounterId) : { elapsedMs: 0, avgSpinsPerMin: 0 };
  const canUndoSpin = currentCounterId ? canUndo(currentCounterId) : false;

  return {
    counter,
    spins,
    sessionStats,
    canUndoSpin,
    handleIncrement,
    handleUndo,
    handleStakeChange,
  };
}
