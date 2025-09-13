import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "./ThemedText";

interface HomeHeaderProps {
  onAddPress: () => void;
}

export function HomeHeader({ onAddPress }: HomeHeaderProps) {
  return (
    <View style={styles.header}>
      {/* Empty left side for symmetry */}
      <View style={styles.headerButton} />

      <ThemedText style={styles.headerTitle}>Counters</ThemedText>

      <TouchableOpacity style={styles.headerButton} onPress={onAddPress}>
        <FontAwesome5 name="plus" size={20} color="#687076" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
