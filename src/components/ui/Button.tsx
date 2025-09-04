import React from "react";
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

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

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.button, styles[size]];

    switch (variant) {
      case "primary":
        baseStyle.push(styles.primary);
        break;
      case "secondary":
        baseStyle.push(styles.secondary);
        break;
      case "danger":
        baseStyle.push(styles.danger);
        break;
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

    switch (variant) {
      case "primary":
        baseStyle.push(styles.primaryText);
        break;
      case "secondary":
        baseStyle.push(styles.secondaryText);
        break;
      case "danger":
        baseStyle.push(styles.dangerText);
        break;
    }

    if (disabled) {
      baseStyle.push(styles.disabledText);
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  // Sizes
  small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 32,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 52,
  },
  // Variants
  primary: {
    backgroundColor: colors.mint[400],
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.gunmetal[300],
  },
  danger: {
    backgroundColor: colors.coral[500],
  },
  disabled: {
    backgroundColor: colors.gunmetal[200],
    borderColor: colors.gunmetal[200],
  },
  // Text styles
  text: {
    fontWeight: "600",
    fontSize: 16,
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
  primaryText: {
    color: "#ffffff",
  },
  secondaryText: {
    color: colors.gunmetal[700],
  },
  dangerText: {
    color: "#ffffff",
  },
  disabledText: {
    color: colors.gunmetal[400],
  },
});
