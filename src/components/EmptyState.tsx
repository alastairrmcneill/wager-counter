import { brandColors } from "@/src/constants/DesignSystem";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Spacing } from "../constants/Spacing";
import { ThemedText } from "./ThemedText";
import { Button } from "./ui/Button";

interface EmptyStateProps {
  onCreateCounter: () => void;
}

export function EmptyState({ onCreateCounter }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>No Counters Yet</ThemedText>
        <ThemedText style={styles.description}>
          Create your first counter to start tracking your wagers and progress.
        </ThemedText>
        <Button
          title="Create Counter"
          onPress={onCreateCounter}
          variant="primary"
          size="medium"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  content: {
    alignItems: "center",
    maxWidth: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: brandColors.gunmetal[900],
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: brandColors.gunmetal[600],
    textAlign: "center",
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  button: {
    minWidth: 160,
  },
});
