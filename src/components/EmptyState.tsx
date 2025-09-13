import { brandColors } from "@/src/constants/DesignSystem";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Button } from "./ui/Button";

// Define spacing constants
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

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
    paddingHorizontal: spacing.xl,
  },
  content: {
    alignItems: "center",
    maxWidth: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: brandColors.gunmetal[900],
    marginBottom: spacing.md,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: brandColors.gunmetal[600],
    textAlign: "center",
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  button: {
    minWidth: 160,
  },
});
