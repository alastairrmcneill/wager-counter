import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { ThemedView } from "@/src/components/ThemedView";
import { Button } from "@/src/components/ui/Button";
import { brandColors } from "@/src/constants/DesignSystem";
import { useCounterStore, useOnboardingStore } from "@/src/store";
import { toPence } from "@/src/utils";

interface WizardStepProps {
  step: number;
  title: string;
  children: React.ReactNode;
  onNext?: () => void;
  nextButtonText?: string;
  nextButtonDisabled?: boolean;
  showBackButton?: boolean;
}

function WizardStep({
  children,
  onNext,
  nextButtonText = "Next",
  nextButtonDisabled = false,
  showBackButton = true,
}: WizardStepProps) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepContent}>{children}</View>

      <View style={styles.stepActions}>
        {onNext && (
          <Button
            title={nextButtonText}
            onPress={onNext}
            disabled={nextButtonDisabled}
            style={showBackButton ? styles.nextButtonWithBack : styles.nextButton}
          />
        )}
      </View>
    </View>
  );
}

export function OnboardingWizard() {
  const { setCompleted, setCurrentStep: setOnboardingStep } = useOnboardingStore();
  const { addCounter, setActiveCounter } = useCounterStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [counterName, setCounterName] = useState("Counter");
  const [targetAmount, setTargetAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");

  const handleNextFromStep1 = () => {
    if (counterName.trim().length === 0) {
      Alert.alert("Error", "Please enter a counter name");
      return;
    }
    setCurrentStep(2);
  };

  const handleNextFromStep2 = () => {
    const targetValue = parseFloat(targetAmount);
    if (isNaN(targetValue) || targetValue <= 0) {
      Alert.alert("Error", "Please enter a valid target amount greater than £0.00");
      return;
    }
    setCurrentStep(3);
  };

  const handleCreateCounter = () => {
    const targetValue = parseFloat(targetAmount);
    const stakeValue = parseFloat(stakeAmount);

    if (isNaN(targetValue) || targetValue <= 0) {
      Alert.alert("Error", "Please enter a valid target amount greater than £0.00");
      return;
    }

    if (isNaN(stakeValue) || stakeValue <= 0) {
      Alert.alert("Error", "Please enter a valid stake amount greater than £0.00");
      return;
    }

    // Create the counter
    const newCounter = {
      name: counterName.trim(),
      targetPence: toPence(targetValue),
      wageredPence: 0,
      currentStakePence: toPence(stakeValue),
    };

    addCounter(newCounter);

    // Get the most recently created counter (should be the last in the array)
    // Use a small timeout to ensure the state has updated
    setTimeout(() => {
      const counters = useCounterStore.getState().counters;
      if (counters.length > 0) {
        const newestCounter = counters[counters.length - 1];
        setActiveCounter(newestCounter.id);
      }
      setCompleted(true);
      setOnboardingStep(0); // Reset the onboarding step for next time
    }, 50);
  };

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

  const renderStep1 = () => (
    <WizardStep
      step={1}
      title="What would you like to call your counter?"
      onNext={handleNextFromStep1}
      showBackButton={false}
    >
      <Text style={styles.description}>Give your counter a memorable name</Text>
      <TextInput
        style={styles.textInput}
        value={counterName}
        onChangeText={setCounterName}
        placeholder="Counter"
        placeholderTextColor={brandColors.gunmetal[400]}
        maxLength={50}
        autoFocus
        returnKeyType="next"
        onSubmitEditing={handleNextFromStep1}
      />
    </WizardStep>
  );

  const renderStep2 = () => (
    <WizardStep
      step={2}
      title="What's your target amount?"
      onNext={handleNextFromStep2}
      nextButtonDisabled={!targetAmount || parseFloat(targetAmount) <= 0}
    >
      <Text style={styles.description}>Enter the total amount you need to wager</Text>
      <View style={styles.currencyInputContainer}>
        <Text style={styles.currencySymbol}>£</Text>
        <TextInput
          style={styles.currencyInput}
          value={targetAmount}
          onChangeText={handleTargetAmountChange}
          placeholder="0.00"
          placeholderTextColor={brandColors.gunmetal[400]}
          keyboardType="decimal-pad"
          autoFocus
          returnKeyType="next"
          onSubmitEditing={handleNextFromStep2}
        />
      </View>
    </WizardStep>
  );

  const renderStep3 = () => {
    const spinsNeeded = calculateSpinsNeeded();

    return (
      <WizardStep
        step={3}
        title="What's your stake per spin?"
        onNext={handleCreateCounter}
        nextButtonText="Create Counter"
        nextButtonDisabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
      >
        <Text style={styles.description}>Enter how much you&apos;ll wager on each spin</Text>
        <View style={styles.currencyInputContainer}>
          <Text style={styles.currencySymbol}>£</Text>
          <TextInput
            style={styles.currencyInput}
            value={stakeAmount}
            onChangeText={handleStakeAmountChange}
            placeholder="0.00"
            placeholderTextColor={brandColors.gunmetal[400]}
            keyboardType="decimal-pad"
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleCreateCounter}
          />
        </View>

        <View style={styles.spinsNeededContainer}>
          <Text style={styles.spinsNeededLabel}>Spins needed:</Text>
          <Text style={styles.spinsNeededValue}>{spinsNeeded ? spinsNeeded.toLocaleString() : "—"}</Text>
        </View>
      </WizardStep>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
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
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 44,
    justifyContent: "space-between",
  },
  stepHeader: {
    alignItems: "center",
    marginBottom: 40,
  },
  stepNumber: {
    fontSize: 16,
    color: brandColors.gunmetal[600],
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: brandColors.gunmetal[950],
    textAlign: "center",
    lineHeight: 34,
  },
  stepContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 18,
    color: brandColors.gunmetal[600],
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  textInput: {
    width: "100%",
    height: 56,
    borderWidth: 2,
    borderColor: brandColors.gunmetal[200],
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    color: brandColors.gunmetal[950],
    backgroundColor: "white",
    textAlign: "center",
  },
  currencyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: brandColors.gunmetal[200],
    borderRadius: 12,
    backgroundColor: "white",
    paddingHorizontal: 16,
    height: 56,
    minWidth: 200,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "600",
    color: brandColors.gunmetal[600],
    marginRight: 4,
  },
  currencyInput: {
    flex: 1,
    fontSize: 18,
    color: brandColors.gunmetal[950],
    textAlign: "left",
    padding: 0,
  },
  spinsNeededContainer: {
    marginTop: 24,
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
  stepActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 40,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
  nextButtonWithBack: {
    flex: 1,
  },
});
