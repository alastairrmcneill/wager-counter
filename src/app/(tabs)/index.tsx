import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";

import { CounterControls } from "@/src/components/CounterControls";
import { CounterStats } from "@/src/components/CounterStats";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { useCounterIncrement } from "@/src/hooks/useCounterIncrement";
import { useCounterUndo } from "@/src/hooks/useCounterUndo";
import { useCounterStore, useSessionStore, useSpinStore } from "@/src/store";

export default function CounterScreen() {
  const { counters, addCounter, getCounter } = useCounterStore();
  const { getSpinsForCounter } = useSpinStore();
  const { startSession, getSessionStats } = useSessionStore();
  const { incrementCounter } = useCounterIncrement();
  const { undoLastSpin, canUndo } = useCounterUndo();
  const [testCounterId, setTestCounterId] = useState<string | null>(null);

  // Create a test counter if none exists
  useEffect(() => {
    if (counters.length === 0) {
      addCounter({
        name: "Spin Counter",
        targetPence: 250000, // £2,500.00 to match the design
        wageredPence: 125000, // £1,250.00 to match the design
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

  const counter = testCounterId ? getCounter(testCounterId) : null;
  const spins = testCounterId ? getSpinsForCounter(testCounterId) : [];
  const sessionStats = testCounterId ? getSessionStats(testCounterId) : { elapsedMs: 0, avgSpinsPerMin: 0 };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton}>
            <ThemedText style={styles.headerIcon}>←</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>{counter?.name || "Spin Counter"}</ThemedText>
          <TouchableOpacity style={styles.headerButton}>
            <ThemedText style={styles.headerIcon}>⚙</ThemedText>
          </TouchableOpacity>
        </View>

        {counter && (
          <View style={styles.content}>
            {/* Stats Section */}
            <CounterStats counter={counter} spinsCount={spins.length} avgSpinsPerMin={sessionStats.avgSpinsPerMin} />

            {/* Controls Section */}
            <CounterControls
              counter={counter}
              onIncrement={handleIncrement}
              onUndo={handleUndo}
              canUndo={testCounterId ? canUndo(testCounterId) : false}
            />
          </View>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    fontSize: 20,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 20,
  },
});
