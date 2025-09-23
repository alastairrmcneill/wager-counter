import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "./ThemedText";

interface CounterHeaderProps {
  title: string;
  onBackPress?: () => void;
  onSettingsPress?: () => void;
  onExportPress?: () => void;
  showBackButton?: boolean;
}

export function CounterHeader({ title, onBackPress, onSettingsPress, onExportPress }: CounterHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton} onPress={onBackPress}>
        <FontAwesome5 name="chevron-left" size={20} color="#687076" />
      </TouchableOpacity>

      <ThemedText style={styles.headerTitle}>{title}</ThemedText>

      <View style={styles.headerActions}>
        {onExportPress && (
          <TouchableOpacity style={styles.headerButton} onPress={onExportPress}>
            <FontAwesome5 name="file-export" size={20} color="#687076" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.headerButton} onPress={onSettingsPress}>
          <FontAwesome5 name="coins" size={22} color="#687076" />
        </TouchableOpacity>
      </View>
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
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
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
