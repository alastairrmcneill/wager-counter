import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { useCounterIncrement } from "./useCounterIncrement";
import { useCounterUndo } from "./useCounterUndo";
import { useStakeChange } from "./useStakeChange";
import { useCounterStore, useSessionStore, useSpinStore } from "../store";

/**
 * Custom hook to manage counter screen logic and state
 */
export function useCounterScreen() {
  const { counters, addCounter, getCounter } = useCounterStore();
  const { getSpinsForCounter } = useSpinStore();
  const { startSession, getSessionStats } = useSessionStore();
  const { incrementCounter } = useCounterIncrement();
  const { undoLastSpin, canUndo } = useCounterUndo();
  const { changeStake } = useStakeChange();
  const [testCounterId, setTestCounterId] = useState<string | null>(null);

  // Create a test counter if none exists
  useEffect(() => {
    if (counters.length === 0) {
      addCounter({
        name: "Test Counter",
        targetPence: 5000, // £50.00 to match the design
        wageredPence: 955, // £9.55 to match the design
        currentStakePence: 50, // £0.50
      });
    } else {
      setTestCounterId(counters[0].id);
    }
  }, [counters, addCounter]);

  // Start session for test counter
  useEffect(() => {
    if (testCounterId) {
      startSession(testCounterId);
    }
  }, [testCounterId, startSession]);

  const handleIncrement = async () => {
    if (!testCounterId) {
      Alert.alert("Error", "No test counter available");
      return;
    }
    await incrementCounter(testCounterId);
  };

  const handleUndo = async () => {
    if (!testCounterId) {
      Alert.alert("Error", "No test counter available");
      return;
    }

    const success = await undoLastSpin(testCounterId);
    if (!success) {
      Alert.alert("Info", "No spins to undo");
    }
  };

  const handleStakeChange = (newStakePence: number) => {
    if (!testCounterId) {
      Alert.alert("Error", "No test counter available");
      return;
    }

    const success = changeStake(testCounterId, newStakePence);
    if (!success) {
      Alert.alert("Error", "Failed to change stake");
    }
  };

  // Computed values
  const counter = testCounterId ? getCounter(testCounterId) : null;
  const spins = testCounterId ? getSpinsForCounter(testCounterId) : [];
  const sessionStats = testCounterId ? getSessionStats(testCounterId) : { elapsedMs: 0, avgSpinsPerMin: 0 };
  const canUndoSpin = testCounterId ? canUndo(testCounterId) : false;

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
