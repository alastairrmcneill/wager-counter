import { brandColors } from "@/src/constants/DesignSystem";
import { Counter } from "@/src/types/domain";
import { formatGBP } from "@/src/utils/currency";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ProgressBar } from "./ui/ProgressBar";

// Define spacing constants
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

interface CounterListItemProps {
  counter: Counter;
  onPress: (counter: Counter) => void;
}

export function CounterListItem({ counter, onPress }: CounterListItemProps) {
  const progress = counter.targetPence > 0 ? counter.wageredPence / counter.targetPence : 0;
  const progressPercentage = Math.min(progress * 100, 100);

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(counter)} activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText style={styles.counterName} numberOfLines={1}>
            {counter.name}
          </ThemedText>
          <ThemedText style={styles.progressText}>{progressPercentage.toFixed(0)}%</ThemedText>
        </View>

        <View style={styles.amountContainer}>
          <ThemedText style={styles.amountText}>
            {formatGBP(counter.wageredPence)} / {formatGBP(counter.targetPence)}
          </ThemedText>
        </View>

        <View style={styles.progressContainer}>
          <ProgressBar
            progress={progress}
            variant={progress >= 1 ? "success" : "primary"}
            size="medium"
            style={styles.progressBar}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    shadowColor: brandColors.gunmetal[950],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  counterName: {
    fontSize: 18,
    fontWeight: "600",
    color: brandColors.gunmetal[900],
    flex: 1,
    marginRight: spacing.sm,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "500",
    color: brandColors.gunmetal[700],
  },
  amountContainer: {
    marginBottom: spacing.sm,
  },
  amountText: {
    fontSize: 14,
    color: brandColors.gunmetal[600],
    opacity: 0.8,
  },
  progressContainer: {
    marginTop: spacing.xs,
  },
  progressBar: {
    height: 8,
  },
});
