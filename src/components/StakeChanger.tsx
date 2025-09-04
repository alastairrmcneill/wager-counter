import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Button } from "./ui";

interface StakeChangerProps {
  onStakeChange: (pounds: number) => void;
}

const STAKE_OPTIONS = [0.1, 0.2, 0.5, 1.0, 2.0];

export function StakeChanger({ onStakeChange }: StakeChangerProps) {
  return (
    <View style={styles.stakeChangeContainer}>
      <ThemedText type="defaultSemiBold">Change Stake (Future Spins Only):</ThemedText>
      <View style={styles.stakeButtonsContainer}>
        {STAKE_OPTIONS.map((amount) => (
          <Button
            key={amount}
            title={`£${amount.toFixed(2)}`}
            onPress={() => onStakeChange(amount)}
            variant="secondary"
            style={styles.stakeButton}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stakeChangeContainer: {
    alignItems: "center",
    gap: 12,
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    width: "100%",
  },
  stakeButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  stakeButton: {
    minWidth: 60,
    paddingHorizontal: 8,
  },
});
