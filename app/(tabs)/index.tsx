import { Image } from "expo-image";
import { Platform, StyleSheet, Text, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, Card, Chip, ProgressBar } from "@/components/ui";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image source={require("@/assets/images/partial-react-logo.png")} style={styles.reactLogo} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* UI Primitives Test Section */}
      <Card variant="elevated" style={{ margin: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12, color: "#343c43" }}>UI Primitives Test</Text>

        {/* Buttons */}
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <Button title="Primary" onPress={() => {}} variant="primary" size="medium" />
          <Button title="Secondary" onPress={() => {}} variant="secondary" size="medium" />
          <Button title="Danger" onPress={() => {}} variant="danger" size="small" />
        </View>

        {/* Chips */}
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <Chip label="Default" />
          <Chip label="Selected" selected />
          <Chip label="Primary" variant="primary" selected />
          <Chip label="Success" variant="success" selected />
        </View>

        {/* Progress Bars */}
        <View style={{ gap: 12 }}>
          <View>
            <Text style={{ color: "#4d626e", fontSize: 14, marginBottom: 4 }}>Progress: 30%</Text>
            <ProgressBar progress={0.3} variant="primary" />
          </View>
          <View>
            <Text style={{ color: "#4d626e", fontSize: 14, marginBottom: 4 }}>Success: 75%</Text>
            <ProgressBar progress={0.75} variant="success" size="large" />
          </View>
          <View>
            <Text style={{ color: "#4d626e", fontSize: 14, marginBottom: 4 }}>Danger: 90%</Text>
            <ProgressBar progress={0.9} variant="danger" />
          </View>
        </View>
      </Card>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>{`Tap the Explore tab to learn more about what's included in this starter app.`}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
