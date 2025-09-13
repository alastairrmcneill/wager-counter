import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "./ThemedText";

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  onSettingsPress?: () => void;
  onAddPress?: () => void;
  showBackButton?: boolean;
  showSettingsButton?: boolean;
  showAddButton?: boolean;
  variant?: "home" | "counter";
}

export function Header({
  title,
  onBackPress,
  onSettingsPress,
  onAddPress,
  showBackButton = true,
  showSettingsButton = true,
  showAddButton = false,
  variant = "counter",
}: HeaderProps) {
  // For home variant, don't show back button by default
  const shouldShowBackButton = variant === "home" ? false : showBackButton;
  const shouldShowSettingsButton = variant === "home" ? false : showSettingsButton;
  const shouldShowAddButton = variant === "home" ? true : showAddButton;

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton} onPress={onBackPress} disabled={!shouldShowBackButton}>
        {shouldShowBackButton && <ThemedText style={styles.headerIcon}>←</ThemedText>}
      </TouchableOpacity>

      <ThemedText style={styles.headerTitle}>{title}</ThemedText>

      <TouchableOpacity
        style={styles.headerButton}
        onPress={shouldShowAddButton ? onAddPress : onSettingsPress}
        disabled={!shouldShowAddButton && !shouldShowSettingsButton}
      >
        {shouldShowAddButton && <FontAwesome5 name="plus" size={20} color="#687076" />}
        {shouldShowSettingsButton && <FontAwesome5 name="coins" size={22} color="#687076" />}
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
  headerIcon: {
    fontSize: 20,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
