import React from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";

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

interface ProgressBarProps {
  progress: number; // 0 to 1
  variant?: "primary" | "success" | "danger";
  size?: "small" | "medium" | "large";
  animated?: boolean;
  style?: ViewStyle;
  trackStyle?: ViewStyle;
  fillStyle?: ViewStyle;
}

export function ProgressBar({
  progress,
  variant = "primary",
  size = "medium",
  animated = true,
  style,
  trackStyle,
  fillStyle,
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: clampedProgress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(clampedProgress);
    }
  }, [clampedProgress, animated, animatedValue]);

  const getTrackStyle = (): ViewStyle[] => {
    return [styles.track, styles[`${size}Track` as keyof typeof styles]];
  };

  const getFillStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.fill, styles[`${size}Fill` as keyof typeof styles]];

    switch (variant) {
      case "success":
        baseStyle.push(styles.successFill);
        break;
      case "danger":
        baseStyle.push(styles.dangerFill);
        break;
      default:
        baseStyle.push(styles.primaryFill);
    }

    return baseStyle;
  };

  const fillWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <View style={[getTrackStyle(), trackStyle, style]}>
      <Animated.View style={[getFillStyle(), fillStyle, { width: fillWidth }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: colors.gunmetal[100],
    borderRadius: 999,
    overflow: "hidden",
  },
  fill: {
    borderRadius: 999,
    height: "100%",
  },
  // Sizes
  smallTrack: {
    height: 4,
  },
  smallFill: {
    // Height inherited from track
  },
  mediumTrack: {
    height: 8,
  },
  mediumFill: {
    // Height inherited from track
  },
  largeTrack: {
    height: 12,
  },
  largeFill: {
    // Height inherited from track
  },
  // Fill variants
  primaryFill: {
    backgroundColor: colors.mint[400],
  },
  successFill: {
    backgroundColor: colors.mint[500],
  },
  dangerFill: {
    backgroundColor: colors.coral[500],
  },
});
