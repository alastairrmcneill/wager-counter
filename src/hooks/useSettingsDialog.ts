import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { fromPence, toPence } from "../utils/currency";

/**
 * Custom hook to manage settings dialog state and validation
 */
export function useSettingsDialog(visible: boolean, currentStakePence: number) {
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

  const validateStake = (value: string): { isValid: boolean; errorMessage?: string; stakePence?: number } => {
    const stakeValue = parseFloat(value);

    if (isNaN(stakeValue) || stakeValue <= 0) {
      return { isValid: false, errorMessage: "Please enter a valid stake amount greater than £0.00" };
    }

    if (stakeValue > 1000) {
      return { isValid: false, errorMessage: "Stake amount cannot exceed £1000.00" };
    }

    return { isValid: true, stakePence: toPence(stakeValue) };
  };

  const handleSave = (onStakeChange: (newStakePence: number) => void, onClose: () => void) => {
    const validation = validateStake(stakeInput);

    if (!validation.isValid) {
      Alert.alert("Invalid Stake", validation.errorMessage);
      return;
    }

    onStakeChange(validation.stakePence!);
    onClose();
  };

  const handleQuickSelect = (amount: number) => {
    setStakeInput(amount.toFixed(2));
  };

  return {
    stakeInput,
    handleInputChange,
    handleSave,
    handleQuickSelect,
  };
}
