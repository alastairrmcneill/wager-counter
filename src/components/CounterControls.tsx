import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { brandColors } from "../constants/DesignSystem";
import { Counter } from "../types";
import { ThemedText } from "./ThemedText";

interface CounterControlsProps {
  counter: Counter;
  onIncrement: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

export function CounterControls({ counter, onIncrement, onUndo, canUndo }: CounterControlsProps) {
  return (
    <View style={styles.controlsContainer}>
      {/* Undo button */}
      <TouchableOpacity
        style={[styles.undoButton, !canUndo && styles.undoButtonDisabled]}
        onPress={onUndo}
        disabled={!canUndo}
      >
        <View style={styles.undoIconContainer}>
          <ThemedText style={styles.undoIcon}>↶</ThemedText>
        </View>
        <ThemedText style={[styles.undoText, !canUndo && styles.undoTextDisabled]}>Undo Last Spin</ThemedText>
      </TouchableOpacity>

      {/* Large spin button */}
      <TouchableOpacity style={styles.spinButton} onPress={onIncrement}>
        <View style={styles.spinIconContainer}>
          <ThemedText style={styles.spinIcon}>⟲</ThemedText>
        </View>
        <ThemedText style={styles.spinTitle}>SPIN</ThemedText>
        <ThemedText style={styles.spinSubtitle}>Tap to Count</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  controlsContainer: {
    width: "100%",
    paddingHorizontal: 24,
    gap: 16,
  },
  undoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    gap: 8,
  },
  undoButtonDisabled: {
    opacity: 0.5,
  },
  undoIconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  undoIcon: {
    fontSize: 18,
    fontWeight: "600",
  },
  undoText: {
    fontSize: 16,
    fontWeight: "500",
  },
  undoTextDisabled: {
    opacity: 0.5,
  },
  spinButton: {
    backgroundColor: brandColors.gunmetal[200],
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 3,
    borderColor: brandColors.gunmetal[300],
  },
  spinIconContainer: {
    marginBottom: 8,
  },
  spinIcon: {
    fontSize: 32,
    fontWeight: "700",
    color: brandColors.gunmetal[700],
  },
  spinTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: brandColors.gunmetal[900],
    letterSpacing: 2,
  },
  spinSubtitle: {
    fontSize: 16,
    color: brandColors.gunmetal[600],
    marginTop: 4,
  },
});
