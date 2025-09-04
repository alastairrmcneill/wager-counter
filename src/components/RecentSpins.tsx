import React from "react";
import { StyleSheet, View } from "react-native";
import { Spin } from "../types";
import { formatGBP } from "../utils/currency";
import { ThemedText } from "./ThemedText";

interface RecentSpinsProps {
  spins: Spin[];
  maxSpins?: number;
}

export function RecentSpins({ spins, maxSpins = 3 }: RecentSpinsProps) {
  if (spins.length === 0) {
    return null;
  }

  return (
    <View style={styles.recentSpinsContainer}>
      <ThemedText type="defaultSemiBold">Recent Spins:</ThemedText>
      {spins.slice(0, maxSpins).map((spin) => (
        <ThemedText key={spin.id} style={styles.spinText}>
          {formatGBP(spin.stakePence)} at {new Date(spin.timestamp).toLocaleTimeString()}
        </ThemedText>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  recentSpinsContainer: {
    alignItems: "center",
    gap: 4,
    marginTop: 16,
  },
  spinText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
