import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import { CounterControls } from "@/src/components/CounterControls";
import { CounterStats } from "@/src/components/CounterStats";
import { Header } from "@/src/components/Header";
import { SettingsDialog } from "@/src/components/SettingsDialog";
import { ThemedView } from "@/src/components/ThemedView";
import { useCounterScreen } from "@/src/hooks/useCounterScreen";

export default function CounterScreen() {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const { counter, spins, sessionStats, canUndoSpin, handleIncrement, handleUndo, handleStakeChange } =
    useCounterScreen();

  const handleOpenSettings = () => {
    setShowSettingsDialog(true);
  };

  const handleCloseSettings = () => {
    setShowSettingsDialog(false);
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />

      <Header title={counter?.name || "Test Counter"} onSettingsPress={handleOpenSettings} showBackButton={false} />

      {counter && (
        <View style={styles.content}>
          {/* Stats Section */}
          <CounterStats counter={counter} spinsCount={spins.length} avgSpinsPerMin={sessionStats.avgSpinsPerMin} />

          {/* Controls Section */}
          <CounterControls counter={counter} onIncrement={handleIncrement} onUndo={handleUndo} canUndo={canUndoSpin} />
        </View>
      )}

      {/* Settings Dialog */}
      {counter && (
        <SettingsDialog
          visible={showSettingsDialog}
          onClose={handleCloseSettings}
          currentStakePence={counter.currentStakePence}
          onStakeChange={handleStakeChange}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 44, // Add status bar height for Android, default for iOS
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 32,
    paddingBottom: 20,
  },
});
