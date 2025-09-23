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
    flex: 1,
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
    backgroundColor: brandColors.coral[200],
    borderRadius: 20,
    gap: 8,
    borderWidth: 3,
    borderColor: brandColors.coral[300],
  },
  undoButtonDisabled: {
    opacity: 0.5,
    backgroundColor: brandColors.coral[100],
    borderColor: brandColors.coral[200],
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
    color: brandColors.coral[700],
  },
  undoText: {
    fontSize: 16,
    fontWeight: "500",
    color: brandColors.coral[900],
  },
  undoTextDisabled: {
    opacity: 0.5,
    color: brandColors.coral[600],
  },
  spinButton: {
    flex: 1,
    backgroundColor: brandColors.emerald[200],
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 3,
    borderColor: brandColors.emerald[300],
  },
  spinIconContainer: {
    marginBottom: 8,
  },
  spinIcon: {
    fontSize: 32,
    fontWeight: "700",
    color: brandColors.emerald[700],
  },
  spinTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: brandColors.emerald[900],
    letterSpacing: 2,
  },
  spinSubtitle: {
    fontSize: 16,
    color: brandColors.emerald[600],
    marginTop: 4,
  },
});
