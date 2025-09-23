import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Spacing } from "../constants/Spacing";
import { ThemedText } from "./ThemedText";

interface DeleteActionProps {
  onPress: () => void;
  counterName: string;
}

export default function DeleteAction({ onPress, counterName }: DeleteActionProps) {
  return (
    <View style={styles.deleteContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.deleteAction, pressed && { opacity: 0.8 }]}
        accessibilityRole="button"
        accessibilityLabel={`Delete ${counterName}`}
      >
        <ThemedText style={styles.deleteLabel}>Delete</ThemedText>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  deleteContainer: {
    width: 88,
    marginVertical: Spacing.xs,
    marginRight: Spacing.md,
  },
  deleteAction: {
    flex: 1,
    backgroundColor: "#ff3b30",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    minHeight: 80,
  },
  deleteLabel: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
});
