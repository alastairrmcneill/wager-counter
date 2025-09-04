import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { CounterControls } from "@/src/components/CounterControls";
import { CounterStats } from "@/src/components/CounterStats";
import { RecentSpins } from "@/src/components/RecentSpins";
import { StakeChanger } from "@/src/components/StakeChanger";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { useCounterIncrement } from "@/src/hooks/useCounterIncrement";
import { useCounterUndo } from "@/src/hooks/useCounterUndo";
import { useStakeChange } from "@/src/hooks/useStakeChange";
import { useCounterStore, useSessionStore, useSpinStore } from "@/src/store";
import { toPence } from "@/src/utils/currency";

export default function HomeScreen() {
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
        targetPence: 5000, // £50.00
        wageredPence: 0,
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

  const handleStakeChange = (pounds: number) => {
    if (!testCounterId) {
      Alert.alert("Error", "No test counter available");
      return;
    }

    const stakePence = toPence(pounds);
    const success = changeStake(testCounterId, stakePence);
    if (!success) {
      Alert.alert("Error", "Failed to change stake");
    }
  };

  const counter = testCounterId ? getCounter(testCounterId) : null;
  const spins = testCounterId ? getSpinsForCounter(testCounterId) : [];
  const sessionStats = testCounterId ? getSessionStats(testCounterId) : { elapsedMs: 0, avgSpinsPerMin: 0 };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Wager Counter</ThemedText>

      {counter && (
        <View style={styles.counterContainer}>
          <ThemedText type="subtitle">{counter.name}</ThemedText>

          <CounterStats counter={counter} spinsCount={spins.length} avgSpinsPerMin={sessionStats.avgSpinsPerMin} />

          <CounterControls
            counter={counter}
            onIncrement={handleIncrement}
            onUndo={handleUndo}
            canUndo={testCounterId ? canUndo(testCounterId) : false}
          />

          <StakeChanger onStakeChange={handleStakeChange} />

          <RecentSpins spins={spins} />
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  counterContainer: {
    alignItems: "center",
    padding: 20,
    gap: 16,
    width: "100%",
  },
});
