import React, { useEffect, useState } from "react";
import { Alert, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

import { CounterControls } from "@/src/components/CounterControls";
import { CounterStats } from "@/src/components/CounterStats";
import { SettingsDialog } from "@/src/components/SettingsDialog";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { useCounterIncrement } from "@/src/hooks/useCounterIncrement";
import { useCounterUndo } from "@/src/hooks/useCounterUndo";
import { useStakeChange } from "@/src/hooks/useStakeChange";
import { useCounterStore, useSessionStore, useSpinStore } from "@/src/store";

export default function CounterScreen() {
  const { counters, addCounter, getCounter } = useCounterStore();
  const { getSpinsForCounter } = useSpinStore();
  const { startSession, getSessionStats } = useSessionStore();
  const { incrementCounter } = useCounterIncrement();
  const { undoLastSpin, canUndo } = useCounterUndo();
  const { changeStake } = useStakeChange();
  const [testCounterId, setTestCounterId] = useState<string | null>(null);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

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

  const handleOpenSettings = () => {
    setShowSettingsDialog(true);
  };

  const handleCloseSettings = () => {
    setShowSettingsDialog(false);
  };

  const counter = testCounterId ? getCounter(testCounterId) : null;
  const spins = testCounterId ? getSpinsForCounter(testCounterId) : [];
  const sessionStats = testCounterId ? getSessionStats(testCounterId) : { elapsedMs: 0, avgSpinsPerMin: 0 };

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <ThemedText style={styles.headerIcon}>←</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>{counter?.name || "Test Counter"}</ThemedText>
        <TouchableOpacity style={styles.headerButton} onPress={handleOpenSettings}>
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

      {/* Settings Dialog */}
      {counter && (
        <SettingsDialog
          visible={showSettingsDialog}
          onClose={handleCloseSettings}
          currentStakePence={counter.currentStakePence}
          onStakeChange={handleStakeChange}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 44, // Add status bar height for Android, default for iOS
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(128, 128, 128, 0.9)",
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
    paddingTop: 32,
    paddingBottom: 20,
  },
});
