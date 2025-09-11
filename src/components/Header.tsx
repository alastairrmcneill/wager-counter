import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "./ThemedText";

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  onSettingsPress?: () => void;
  showBackButton?: boolean;
  showSettingsButton?: boolean;
}

export function Header({
  title,
  onBackPress,
  onSettingsPress,
  showBackButton = true,
  showSettingsButton = true,
}: HeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton} onPress={onBackPress} disabled={!showBackButton}>
        {showBackButton && <ThemedText style={styles.headerIcon}>←</ThemedText>}
      </TouchableOpacity>
      <ThemedText style={styles.headerTitle}>{title}</ThemedText>
      <TouchableOpacity style={styles.headerButton} onPress={onSettingsPress} disabled={!showSettingsButton}>
        {showSettingsButton && <FontAwesome5 name="coins" size={22} color="#687076" />}
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
