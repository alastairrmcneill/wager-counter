import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { trackEvent } from "@/src/analytics";
import { AnalyticsEvents } from "@/src/analytics/events";
import { ThemedView } from "@/src/components/ThemedView";
import { Button } from "@/src/components/ui/Button";
import { brandColors } from "@/src/constants/DesignSystem";
import { useCounterStore } from "@/src/store";
import { toPence } from "@/src/utils";

interface CounterCreatorProps {
  onCounterCreated?: () => void;
  onCancel?: () => void;
}

export function CounterCreator({ onCounterCreated, onCancel }: CounterCreatorProps) {
  const { addCounter, setActiveCounter } = useCounterStore();

  const [counterName, setCounterName] = useState("Counter");
  const [targetAmount, setTargetAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");

  const formatCurrency = (value: string): string => {
    // Remove non-numeric characters except decimal point
    const cleaned = value.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      return parts[0] + "." + parts.slice(1).join("");
    }

    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      return parts[0] + "." + parts[1].substring(0, 2);
    }

    return cleaned;
  };

  const handleTargetAmountChange = (value: string) => {
    setTargetAmount(formatCurrency(value));
  };

  const handleStakeAmountChange = (value: string) => {
    setStakeAmount(formatCurrency(value));
  };

  const calculateSpinsNeeded = (): number | null => {
    const targetValue = parseFloat(targetAmount);
    const stakeValue = parseFloat(stakeAmount);

    if (isNaN(targetValue) || isNaN(stakeValue) || targetValue <= 0 || stakeValue <= 0) {
      return null;
    }

    return Math.ceil(targetValue / stakeValue);
  };

  const validateInputs = (): string | null => {
    if (counterName.trim().length === 0) {
      return "Please enter a counter name";
    }

    const targetValue = parseFloat(targetAmount);
    if (isNaN(targetValue) || targetValue <= 0) {
      return "Please enter a valid target amount greater than £0.00";
    }

    const stakeValue = parseFloat(stakeAmount);
    if (isNaN(stakeValue) || stakeValue <= 0) {
      return "Please enter a valid stake amount greater than £0.00";
    }

    return null;
  };

  const handleCreateCounter = () => {
    const validationError = validateInputs();
    if (validationError) {
      Alert.alert("Error", validationError);
      return;
    }

    const targetValue = parseFloat(targetAmount);
    const stakeValue = parseFloat(stakeAmount);

    // Create the counter
    const newCounter = {
      name: counterName.trim(),
      targetPence: toPence(targetValue),
      wageredPence: 0,
      currentStakePence: toPence(stakeValue),
    };

    addCounter(newCounter);

    // Track counter creation
    trackEvent(AnalyticsEvents.COUNTER_CREATE, {
      counterName: counterName.trim(),
      targetPence: toPence(targetValue),
      stakePence: toPence(stakeValue),
      spinsNeeded: calculateSpinsNeeded() || 0,
    });

    // Set the new counter as active and navigate to it
    setTimeout(() => {
      const counters = useCounterStore.getState().counters;
      if (counters.length > 0) {
        const newestCounter = counters[counters.length - 1];
        setActiveCounter(newestCounter.id);
      }
      onCounterCreated?.();
    }, 50);
  };

  const isFormValid = () => {
    return validateInputs() === null;
  };

  const spinsNeeded = calculateSpinsNeeded();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ThemedView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Create New Counter</Text>
              <Text style={styles.subtitle}>Set up your wager tracking counter</Text>
            </View>

            {/* Form Content */}
            <View style={styles.formContainer}>
              {/* Counter Name Input */}
              <View style={styles.inputSection}>
                <Text style={styles.label}>Counter Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={counterName}
                  onChangeText={setCounterName}
                  placeholder="Enter counter name"
                  placeholderTextColor={brandColors.gunmetal[400]}
                  maxLength={50}
                  returnKeyType="next"
                />
              </View>

              {/* Target Amount Input */}
              <View style={styles.inputSection}>
                <Text style={styles.label}>Target Amount</Text>
                <View style={styles.currencyInputContainer}>
                  <Text style={styles.currencySymbol}>£</Text>
                  <TextInput
                    style={styles.currencyInput}
                    value={targetAmount}
                    onChangeText={handleTargetAmountChange}
                    placeholder="0.00"
                    placeholderTextColor={brandColors.gunmetal[400]}
                    keyboardType="decimal-pad"
                    returnKeyType="next"
                  />
                </View>
              </View>

              {/* Stake Amount Input */}
              <View style={styles.inputSection}>
                <Text style={styles.label}>Stake per Spin</Text>
                <View style={styles.currencyInputContainer}>
                  <Text style={styles.currencySymbol}>£</Text>
                  <TextInput
                    style={styles.currencyInput}
                    value={stakeAmount}
                    onChangeText={handleStakeAmountChange}
                    placeholder="0.00"
                    placeholderTextColor={brandColors.gunmetal[400]}
                    keyboardType="decimal-pad"
                    returnKeyType="done"
                    onSubmitEditing={handleCreateCounter}
                  />
                </View>
              </View>

              {/* Spins Needed Display */}
              {spinsNeeded !== null && (
                <View style={styles.spinsNeededContainer}>
                  <Text style={styles.spinsNeededLabel}>Spins needed:</Text>
                  <Text style={styles.spinsNeededValue}>{spinsNeeded.toLocaleString()}</Text>
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
              {onCancel && <Button title="Cancel" onPress={onCancel} style={styles.cancelButton} variant="secondary" />}
              <Button
                title="Create Counter"
                onPress={handleCreateCounter}
                disabled={!isFormValid()}
                style={styles.createButton}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.gunmetal[50],
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 44, // Extra padding for home indicator
  },
  header: {
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: brandColors.gunmetal[950],
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: brandColors.gunmetal[600],
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    gap: 20,
  },
  inputSection: {
    gap: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: brandColors.gunmetal[700],
    marginBottom: 4,
  },
  textInput: {
    height: 48,
    borderWidth: 2,
    borderColor: brandColors.gunmetal[200],
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: brandColors.gunmetal[950],
    backgroundColor: "white",
  },
  currencyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: brandColors.gunmetal[200],
    borderRadius: 12,
    backgroundColor: "white",
    paddingHorizontal: 12,
    height: 48,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: "600",
    color: brandColors.gunmetal[600],
    marginRight: 8,
  },
  currencyInput: {
    flex: 1,
    fontSize: 16,
    color: brandColors.gunmetal[950],
    padding: 0,
  },
  spinsNeededContainer: {
    marginTop: 6,
    padding: 16,
    backgroundColor: brandColors.mint[400] + "20", // 20% opacity
    borderRadius: 12,
    alignItems: "center",
  },
  spinsNeededLabel: {
    fontSize: 16,
    color: brandColors.gunmetal[600],
    marginBottom: 4,
  },
  spinsNeededValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: brandColors.mint[600] || brandColors.mint[400],
  },
  actionContainer: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 24,
  },
  cancelButton: {
    flex: 1,
  },
  createButton: {
    flex: 2,
  },
});
