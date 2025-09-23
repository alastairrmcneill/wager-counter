import { brandColors } from "@/src/constants/DesignSystem";
import { Counter } from "@/src/types/domain";
import { formatGBP } from "@/src/utils/currency";
import * as Haptics from "expo-haptics";
import React, { useCallback, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Spacing } from "../constants/Spacing";
import DeleteAction from "./CounterListItemDeleteAction";
import { ThemedText } from "./ThemedText";
import { ProgressBar } from "./ui/ProgressBar";

interface CounterListItemProps {
  counter: Counter;
  onPress: (counter: Counter) => void;
  onDelete: (counter: Counter) => void;
}

export function CounterListItem({ counter, onPress, onDelete }: CounterListItemProps) {
  const swipeableRef = useRef<Swipeable>(null);
  const progress = counter.targetPence > 0 ? counter.wageredPence / counter.targetPence : 0;
  const progressPercentage = Math.min(progress * 100, 100);

  const handleDelete = useCallback(async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}

    swipeableRef.current?.close();

    onDelete(counter);

    Toast.show({
      type: "error",
      text1: "Counter deleted",
      text2: `"${counter.name}" has been deleted`,
      visibilityTime: 3000,
      position: "bottom",
      bottomOffset: 40,
      autoHide: true,
    });
  }, [counter, onDelete]);

  const renderRightActions = () => {
    return <DeleteAction onPress={handleDelete} counterName={counter.name} />;
  };

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      overshootRight={false}
      rightThreshold={72}
      renderRightActions={renderRightActions}
      enableTrackpadTwoFingerGesture
    >
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
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    shadowColor: brandColors.gunmetal[950],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: Spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  counterName: {
    fontSize: 18,
    fontWeight: "600",
    color: brandColors.gunmetal[900],
    flex: 1,
    marginRight: Spacing.sm,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "500",
    color: brandColors.gunmetal[700],
  },
  amountContainer: {
    marginBottom: Spacing.sm,
  },
  amountText: {
    fontSize: 14,
    color: brandColors.gunmetal[600],
    opacity: 0.8,
  },
  progressContainer: {
    marginTop: Spacing.xs,
  },
  progressBar: {
    height: 8,
  },
});
