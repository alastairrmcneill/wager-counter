import React from "react";
import { StyleSheet, View } from "react-native";
import { Counter } from "../types";
import { formatGBP } from "../utils/currency";
import { ThemedText } from "./ThemedText";

interface CounterStatsProps {
  counter: Counter;
  spinsCount: number;
  avgSpinsPerMin: number;
}

export function CounterStats({ counter, spinsCount, avgSpinsPerMin }: CounterStatsProps) {
  return (
    <View style={styles.statsContainer}>
      <ThemedText>Target: {formatGBP(counter.targetPence)}</ThemedText>
      <ThemedText>Wagered: {formatGBP(counter.wageredPence)}</ThemedText>
      <ThemedText>Current Stake: {formatGBP(counter.currentStakePence)}</ThemedText>
      <ThemedText>Spins: {spinsCount}</ThemedText>
      <ThemedText>Avg Spins/Min: {avgSpinsPerMin.toFixed(1)}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    alignItems: "center",
    gap: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "rgba(128, 128, 128, 0.1)",
  },
});
