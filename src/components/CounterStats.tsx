import React from "react";
import { StyleSheet, View } from "react-native";
import { Counter } from "../types";
import { formatGBP } from "../utils/currency";
import { ThemedText } from "./ThemedText";
import { ProgressBar } from "./ui";

interface CounterStatsProps {
  counter: Counter;
  spinsCount: number;
  avgSpinsPerMin: number;
}

export function CounterStats({ counter, spinsCount, avgSpinsPerMin }: CounterStatsProps) {
  const progress = counter.targetPence > 0 ? Math.min(counter.wageredPence / counter.targetPence, 1) : 0;
  const progressPercentage = Math.round(progress * 100);

  return (
    <View style={styles.statsContainer}>
      {/* Top row - Target and Wagered amounts */}
      <View style={styles.amountsRow}>
        <View style={styles.amountContainer}>
          <ThemedText style={styles.amountValue}>{formatGBP(counter.targetPence)}</ThemedText>
          <ThemedText style={styles.amountLabel}>Total to Wager</ThemedText>
        </View>
        <View style={styles.amountContainer}>
          <ThemedText style={styles.amountValue}>{formatGBP(counter.wageredPence)}</ThemedText>
          <ThemedText style={styles.amountLabel}>Current Wagered</ThemedText>
        </View>
      </View>

      {/* Progress section */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <ThemedText style={styles.progressLabel}>Progress</ThemedText>
          <ThemedText style={styles.progressPercentage}>{progressPercentage}%</ThemedText>
        </View>
        <ProgressBar progress={progress} size="large" style={styles.progressBar} />
      </View>

      {/* Bottom row - Spins stats */}
      <View style={styles.spinsRow}>
        <View style={styles.spinContainer}>
          <ThemedText style={styles.spinValue}>{spinsCount.toLocaleString()}</ThemedText>
          <ThemedText style={styles.spinLabel}>Total Spins</ThemedText>
        </View>
        <View style={styles.spinContainer}>
          <ThemedText style={styles.spinValue}>{Math.round(avgSpinsPerMin)}</ThemedText>
          <ThemedText style={styles.spinLabel}>Spins/Min</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 24,
  },
  amountsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountContainer: {
    alignItems: "center",
    flex: 1,
  },
  amountValue: {
    fontSize: 28,
    fontWeight: "700",
    paddingVertical: 4,
  },
  amountLabel: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: "center",
  },
  progressSection: {
    gap: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: "600",
  },
  progressBar: {
    height: 8,
  },
  spinsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spinContainer: {
    alignItems: "center",
    flex: 1,
  },
  spinValue: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  spinLabel: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: "center",
  },
});
