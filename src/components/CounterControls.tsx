import React from "react";
import { StyleSheet, View } from "react-native";
import { Counter } from "../types";
import { formatGBP } from "../utils/currency";
import { Button } from "./ui";

interface CounterControlsProps {
  counter: Counter;
  onIncrement: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

export function CounterControls({ counter, onIncrement, onUndo, canUndo }: CounterControlsProps) {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title={`+${formatGBP(counter.currentStakePence)}`}
        onPress={onIncrement}
        variant="primary"
        style={styles.incrementButton}
      />

      <Button title="Undo" onPress={onUndo} variant="secondary" style={styles.undoButton} disabled={!canUndo} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    alignItems: "center",
  },
  incrementButton: {
    marginTop: 16,
    minWidth: 120,
  },
  undoButton: {
    minWidth: 80,
  },
});
