import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/src/hooks/useThemeColor";

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({}, "background");

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
