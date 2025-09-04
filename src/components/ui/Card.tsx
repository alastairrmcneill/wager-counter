import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

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
};

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "small" | "medium" | "large";
  onPress?: () => void;
  style?: ViewStyle;
}

export function Card({ children, variant = "default", padding = "medium", onPress, style }: CardProps) {
  const getCardStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.card, styles[padding]];

    switch (variant) {
      case "elevated":
        baseStyle.push(styles.elevated);
        break;
      case "outlined":
        baseStyle.push(styles.outlined);
        break;
      default:
        baseStyle.push(styles.default);
    }

    return baseStyle;
  };

  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer style={[getCardStyle(), style]} onPress={onPress} activeOpacity={onPress ? 0.95 : 1}>
      {children}
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
  },
  // Padding variants
  none: {
    padding: 0,
  },
  small: {
    padding: 8,
  },
  medium: {
    padding: 16,
  },
  large: {
    padding: 24,
  },
  // Style variants
  default: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  elevated: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  outlined: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: colors.gunmetal[200],
  },
});
