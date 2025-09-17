import React, { useState } from "react";
import { Alert, StatusBar, StyleSheet, View } from "react-native";

import { trackEvent } from "@/src/analytics";
import { AnalyticsEvents } from "@/src/analytics/events";
import { CounterControls } from "@/src/components/CounterControls";
import { CounterHeader } from "@/src/components/CounterHeader";
import { CounterStats } from "@/src/components/CounterStats";
import { SettingsDialog } from "@/src/components/SettingsDialog";
import { TargetCompletionDialog } from "@/src/components/TargetCompletionDialog";
import { ThemedView } from "@/src/components/ThemedView";
import { useCounterScreen } from "@/src/hooks/useCounterScreen";
import { useTargetCompletion } from "@/src/hooks/useTargetCompletion";
import { ExportService } from "@/src/services";
import { useCounterStore } from "@/src/store";

export default function CounterScreen() {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const { setActiveCounter } = useCounterStore();
  const { showTargetDialog, checkTargetCompletion, closeTargetDialog, getCompletedCounter } = useTargetCompletion();
  const { counter, spins, sessionStats, canUndoSpin, handleIncrement, handleUndo, handleStakeChange } =
    useCounterScreen({
      onTargetReached: checkTargetCompletion,
    });

  const handleOpenSettings = () => {
    setShowSettingsDialog(true);
  };

  const handleCloseSettings = () => {
    setShowSettingsDialog(false);
  };

  const handleBackPress = () => {
    setActiveCounter(null); // This will navigate back to the home screen
  };

  const handleExportCsv = async () => {
    if (!counter) return;

    try {
      await ExportService.exportSpinsCsv(spins, counter.name);

      // Track export CSV event
      trackEvent(AnalyticsEvents.EXPORT_CSV, {
        counterId: counter.id,
        exportType: "csv",
        totalSpins: spins.length,
        wageredPence: counter.wageredPence,
        targetPence: counter.targetPence,
      });
    } catch (error) {
      Alert.alert(
        "Export Failed",
        error instanceof Error ? error.message : "Failed to export CSV file. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />

      <CounterHeader
        title={counter?.name || "Test Counter"}
        onBackPress={handleBackPress}
        onSettingsPress={handleOpenSettings}
        onExportPress={handleExportCsv}
        showBackButton={true}
      />

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

      {/* Target Completion Dialog */}
      {counter && showTargetDialog && (
        <TargetCompletionDialog
          visible={showTargetDialog}
          onClose={closeTargetDialog}
          counter={getCompletedCounter() || counter}
          totalSpins={spins.length}
          elapsedMs={sessionStats.elapsedMs}
          avgSpinsPerMin={sessionStats.avgSpinsPerMin}
          spins={spins}
          onExport={handleExportCsv}
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
