import React from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";

// Brand colors from our plan
const colors = {
  gunmetal: {
    50: "#f4f6f7",
    100: "#e3e8eb",
    200: "#c9d3d9",
    300: "#a3b5be",
    400: "#76909d",
    500: "#5a7481",
    600: "#4d626e",
    700: "#43525c",
    800: "#3c464e",
    900: "#343c43",
    950: "#1f252a",
  },
  mint: {
    400: "#2dd4bf",
    500: "#14b8a6",
  },
  coral: {
    500: "#ef4444",
    600: "#dc2626",
  },
};

interface ChipProps {
  label: string;
  onPress?: () => void;
  variant?: "default" | "primary" | "success" | "danger";
  size?: "small" | "medium";
  selected?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Chip({
  label,
  onPress,
  variant = "default",
  size = "medium",
  selected = false,
  disabled = false,
  style,
  textStyle,
}: ChipProps) {
  const getChipStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.chip, styles[size]];

    if (selected) {
      switch (variant) {
        case "primary":
          baseStyle.push(styles.primarySelected);
          break;
        case "success":
          baseStyle.push(styles.successSelected);
          break;
        case "danger":
          baseStyle.push(styles.dangerSelected);
          break;
        default:
          baseStyle.push(styles.defaultSelected);
      }
    } else {
      baseStyle.push(styles.default);
    }

    if (disabled) {
      baseStyle.push(styles.disabled);
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyle: TextStyle[] = [
      styles.text,
      styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles] as TextStyle,
    ];

    if (selected) {
      switch (variant) {
        case "primary":
        case "success":
        case "danger":
          baseStyle.push(styles.selectedText);
          break;
        default:
          baseStyle.push(styles.defaultSelectedText);
      }
    } else {
      baseStyle.push(styles.defaultText);
    }

    if (disabled) {
      baseStyle.push(styles.disabledText);
    }

    return baseStyle;
  };

  const ChipContainer = onPress ? TouchableOpacity : View;

  return (
    <ChipContainer
      style={[getChipStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Text style={[getTextStyle(), textStyle]}>{label}</Text>
    </ChipContainer>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  // Sizes
  small: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    minHeight: 24,
  },
  medium: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 32,
  },
  // Variants
  default: {
    backgroundColor: colors.gunmetal[50],
    borderColor: colors.gunmetal[200],
  },
  defaultSelected: {
    backgroundColor: colors.gunmetal[600],
    borderColor: colors.gunmetal[600],
  },
  primarySelected: {
    backgroundColor: colors.mint[400],
    borderColor: colors.mint[400],
  },
  successSelected: {
    backgroundColor: colors.mint[500],
    borderColor: colors.mint[500],
  },
  dangerSelected: {
    backgroundColor: colors.coral[500],
    borderColor: colors.coral[500],
  },
  disabled: {
    backgroundColor: colors.gunmetal[100],
    borderColor: colors.gunmetal[200],
  },
  // Text styles
  text: {
    fontWeight: "500",
  },
  textSmall: {
    fontSize: 12,
  },
  textMedium: {
    fontSize: 14,
  },
  defaultText: {
    color: colors.gunmetal[700],
  },
  defaultSelectedText: {
    color: "#ffffff",
  },
  selectedText: {
    color: "#ffffff",
  },
  disabledText: {
    color: colors.gunmetal[400],
  },
});
