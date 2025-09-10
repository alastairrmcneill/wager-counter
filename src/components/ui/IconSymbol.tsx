// Fallback for using MaterialIcons on Android and web.

import FontAwesome5 from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolView, SymbolWeight } from "expo-symbols";
import { OpaqueColorValue, Platform, type StyleProp, type TextStyle } from "react-native";

type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "chevron.left.forwardslash.chevron.right": { family: "MaterialIcons" as const, name: "code" },
  "chevron.right": { family: "MaterialIcons" as const, name: "chevron-right" },
  coins: { family: "FontAwesome" as const, name: "coins", sfSymbol: "coloncurrencysign.circle.fill" },
  gear: { family: "MaterialIcons" as const, name: "settings", sfSymbol: "gear" },
} as const;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = "regular",
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const iconConfig = MAPPING[name];

  // Use SF Symbols on iOS if available
  if (Platform.OS === "ios" && "sfSymbol" in iconConfig && iconConfig.sfSymbol) {
    return <SymbolView name={iconConfig.sfSymbol} size={size} tintColor={color} weight={weight} style={style as any} />;
  }

  // Fallback to FontAwesome or MaterialIcons
  if (iconConfig.family === "FontAwesome") {
    return <FontAwesome5 color={color} size={size} name={iconConfig.name as any} style={style} />;
  }

  return <MaterialIcons color={color} size={size} name={iconConfig.name as any} style={style} />;
}
