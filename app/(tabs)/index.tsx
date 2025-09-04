import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui";
import { useCounterIncrement } from "@/hooks/useCounterIncrement";
import { useCounterUndo } from "@/hooks/useCounterUndo";
import { useStakeChange } from "@/hooks/useStakeChange";
import { useCounterStore } from "@/store/counterStore";
import { useSessionStore } from "@/store/sessionStore";
import { useSpinStore } from "@/store/spinStore";
import { formatGBP, toPence } from "@/utils/currency";

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

          <View style={styles.statsContainer}>
            <ThemedText>Target: {formatGBP(counter.targetPence)}</ThemedText>
            <ThemedText>Wagered: {formatGBP(counter.wageredPence)}</ThemedText>
            <ThemedText>Current Stake: {formatGBP(counter.currentStakePence)}</ThemedText>
            <ThemedText>Spins: {spins.length}</ThemedText>
            <ThemedText>Avg Spins/Min: {sessionStats.avgSpinsPerMin.toFixed(1)}</ThemedText>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={`+${formatGBP(counter.currentStakePence)}`}
              onPress={handleIncrement}
              variant="primary"
              style={styles.incrementButton}
            />

            <Button
              title="Undo"
              onPress={handleUndo}
              variant="secondary"
              style={styles.undoButton}
              disabled={!testCounterId || !canUndo(testCounterId)}
            />
          </View>

          <View style={styles.stakeChangeContainer}>
            <ThemedText type="defaultSemiBold">Change Stake (Future Spins Only):</ThemedText>
            <View style={styles.stakeButtonsContainer}>
              <Button
                title="£0.10"
                onPress={() => handleStakeChange(0.1)}
                variant="secondary"
                style={styles.stakeButton}
              />
              <Button
                title="£0.20"
                onPress={() => handleStakeChange(0.2)}
                variant="secondary"
                style={styles.stakeButton}
              />
              <Button
                title="£0.50"
                onPress={() => handleStakeChange(0.5)}
                variant="secondary"
                style={styles.stakeButton}
              />
              <Button
                title="£1.00"
                onPress={() => handleStakeChange(1.0)}
                variant="secondary"
                style={styles.stakeButton}
              />
              <Button
                title="£2.00"
                onPress={() => handleStakeChange(2.0)}
                variant="secondary"
                style={styles.stakeButton}
              />
            </View>
          </View>

          {spins.length > 0 && (
            <View style={styles.recentSpinsContainer}>
              <ThemedText type="defaultSemiBold">Recent Spins:</ThemedText>
              {spins.slice(0, 3).map((spin) => (
                <ThemedText key={spin.id} style={styles.spinText}>
                  {formatGBP(spin.stakePence)} at {new Date(spin.timestamp).toLocaleTimeString()}
                </ThemedText>
              ))}
            </View>
          )}
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  counterContainer: {
    alignItems: "center",
    padding: 20,
    gap: 16,
    width: "100%",
  },
  statsContainer: {
    alignItems: "center",
    gap: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "rgba(128, 128, 128, 0.1)",
  },
  incrementButton: {
    marginTop: 16,
    minWidth: 120,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    alignItems: "center",
  },
  undoButton: {
    minWidth: 80,
  },
  recentSpinsContainer: {
    alignItems: "center",
    gap: 4,
    marginTop: 16,
  },
  spinText: {
    fontSize: 12,
    opacity: 0.7,
  },
  stakeChangeContainer: {
    alignItems: "center",
    gap: 12,
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    width: "100%",
  },
  stakeButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  stakeButton: {
    minWidth: 60,
    paddingHorizontal: 8,
  },
});
