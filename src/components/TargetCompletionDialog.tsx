import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

import { brandColors } from "../constants/DesignSystem";
import { Counter, Spin } from "../types";
import { formatGBP } from "../utils";
import { ThemedText } from "./ThemedText";
import { Button } from "./ui";

interface TargetCompletionDialogProps {
  visible: boolean;
  onClose: () => void;
  counter: Counter;
  totalSpins: number;
  elapsedMs: number;
  avgSpinsPerMin: number;
  spins?: Spin[];
  onExport?: () => void;
}

/**
 * Format elapsed time in milliseconds to a readable string
 */
const formatElapsedTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

export function TargetCompletionDialog({
  visible,
  onClose,
  counter,
  totalSpins,
  elapsedMs,
  avgSpinsPerMin,
  spins,
  onExport,
}: TargetCompletionDialogProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.dialog} activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <ThemedText style={styles.title}>🎉 Target Reached!</ThemedText>
              <ThemedText style={styles.subtitle}>
                Congratulations! You&apos;ve reached your target for &ldquo;{counter.name}&rdquo;
              </ThemedText>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statRow}>
                <ThemedText style={styles.statLabel}>Total Wagered:</ThemedText>
                <ThemedText style={styles.statValue}>{formatGBP(counter.wageredPence)}</ThemedText>
              </View>

              <View style={styles.statRow}>
                <ThemedText style={styles.statLabel}>Total Spins:</ThemedText>
                <ThemedText style={styles.statValue}>{totalSpins.toLocaleString()}</ThemedText>
              </View>

              <View style={styles.statRow}>
                <ThemedText style={styles.statLabel}>Time Elapsed:</ThemedText>
                <ThemedText style={styles.statValue}>{formatElapsedTime(elapsedMs)}</ThemedText>
              </View>

              <View style={styles.statRow}>
                <ThemedText style={styles.statLabel}>Average Spins/Min:</ThemedText>
                <ThemedText style={styles.statValue}>{Math.round(avgSpinsPerMin)}</ThemedText>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.buttonContainer}>
              {spins && onExport && (
                <Button
                  title="Export CSV"
                  onPress={onExport}
                  variant="secondary"
                  size="large"
                  style={styles.button}
                />
              )}
              <Button
                title="OK"
                onPress={onClose}
                variant="primary"
                size="large"
                style={styles.button}
              />
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    margin: 24,
    maxWidth: 400,
    width: "90%",
  },
  content: {
    backgroundColor: brandColors.gunmetal[50],
    borderRadius: 16,
    padding: 24,
    gap: 24,
  },
  header: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: brandColors.emerald[700],
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: brandColors.gunmetal[600],
    textAlign: "center",
    lineHeight: 22,
  },
  statsContainer: {
    gap: 16,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 16,
    color: brandColors.gunmetal[700],
    fontWeight: "500",
  },
  statValue: {
    fontSize: 16,
    color: brandColors.gunmetal[900],
    fontWeight: "600",
  },
  buttonContainer: {
    paddingTop: 8,
    gap: 12,
  },
  button: {
    width: "100%",
  },
});
