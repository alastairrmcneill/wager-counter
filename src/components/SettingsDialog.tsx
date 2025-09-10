import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { brandColors } from "../constants/DesignSystem";
import { fromPence, toPence } from "../utils/currency";
import { ThemedText } from "./ThemedText";
import { Button } from "./ui";

interface SettingsDialogProps {
  visible: boolean;
  onClose: () => void;
  currentStakePence: number;
  onStakeChange: (newStakePence: number) => void;
}

export function SettingsDialog({ visible, onClose, currentStakePence, onStakeChange }: SettingsDialogProps) {
  const [stakeInput, setStakeInput] = useState("");

  useEffect(() => {
    if (visible) {
      // Initialize input with current stake value
      setStakeInput(fromPence(currentStakePence).toFixed(2));
    }
  }, [visible, currentStakePence]);

  const handleInputChange = (text: string) => {
    // Remove any non-numeric characters except decimal point
    let cleanText = text.replace(/[^0-9.]/g, "");

    // Only allow one decimal point
    const parts = cleanText.split(".");
    if (parts.length > 2) {
      cleanText = parts[0] + "." + parts.slice(1).join("");
    }

    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      cleanText = parts[0] + "." + parts[1].substring(0, 2);
    }

    setStakeInput(cleanText);
  };

  const handleSave = () => {
    const stakeValue = parseFloat(stakeInput);

    if (isNaN(stakeValue) || stakeValue <= 0) {
      Alert.alert("Invalid Stake", "Please enter a valid stake amount greater than £0.00");
      return;
    }

    if (stakeValue > 1000) {
      Alert.alert("Invalid Stake", "Stake amount cannot exceed £1000.00");
      return;
    }

    const newStakePence = toPence(stakeValue);
    onStakeChange(newStakePence);
    onClose();
  };

  const handleQuickSelect = (amount: number) => {
    setStakeInput(amount.toFixed(2));
  };

  const quickSelectAmounts = [0.1, 0.2, 0.5, 1.0, 2.0, 5.0];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.dialog} activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <View style={styles.content}>
            <ThemedText style={styles.sectionTitle}>Spin Value</ThemedText>

            <View style={styles.quickSelectContainer}>
              <View style={styles.quickSelectGrid}>
                {quickSelectAmounts.map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    style={[
                      styles.quickSelectButton,
                      parseFloat(stakeInput) === amount && styles.quickSelectButtonActive,
                    ]}
                    onPress={() => handleQuickSelect(amount)}
                  >
                    <ThemedText
                      style={[
                        styles.quickSelectText,
                        parseFloat(stakeInput) === amount && styles.quickSelectTextActive,
                      ]}
                    >
                      £{amount.toFixed(2)}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.currencySymbol}>£</ThemedText>
              <TextInput
                style={styles.input}
                value={stakeInput}
                onChangeText={handleInputChange}
                placeholder="0.00"
                keyboardType="decimal-pad"
                returnKeyType="done"
                selectTextOnFocus
                maxLength={7} // Max 1000.00
              />
            </View>
          </View>

          <View style={styles.actions}>
            <Button title="Cancel" onPress={onClose} variant="secondary" style={styles.actionButton} />
            <Button title="Save" onPress={handleSave} variant="primary" style={styles.actionButton} />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dialog: {
    backgroundColor: "white",
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: brandColors.gunmetal[200],
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: brandColors.gunmetal[900],
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: "300",
    color: brandColors.gunmetal[600],
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: brandColors.gunmetal[900],
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: brandColors.gunmetal[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: brandColors.gunmetal[50],
    marginBottom: 16,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "600",
    color: brandColors.gunmetal[700],
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: brandColors.gunmetal[900],
    paddingVertical: 12,
  },
  quickSelectContainer: {
    marginBottom: 20,
  },
  quickSelectGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  quickSelectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: brandColors.gunmetal[300],
    backgroundColor: brandColors.gunmetal[50],
  },
  quickSelectButtonActive: {
    backgroundColor: brandColors.mint[400],
    borderColor: brandColors.mint[400],
  },
  quickSelectText: {
    fontSize: 14,
    fontWeight: "500",
    color: brandColors.gunmetal[700],
  },
  quickSelectTextActive: {
    color: "white",
  },
  currentStakeInfo: {
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: brandColors.gunmetal[50],
    borderRadius: 8,
  },
  currentStakeLabel: {
    fontSize: 14,
    color: brandColors.gunmetal[600],
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: brandColors.gunmetal[200],
  },
  actionButton: {
    flex: 1,
  },
});
