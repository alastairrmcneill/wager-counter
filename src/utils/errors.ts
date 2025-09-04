/**
 * Common error handling utilities for the application
 */

export type ValidationResult = {
  isValid: boolean;
  error?: string;
};

/**
 * Validates that a counter exists
 */
export function validateCounterExists(counter: any, counterId: string): ValidationResult {
  if (!counter) {
    return {
      isValid: false,
      error: `Counter with id ${counterId} not found`,
    };
  }
  return { isValid: true };
}

/**
 * Validates that a stake value is positive
 */
export function validateStake(stakePence: number): ValidationResult {
  if (stakePence <= 0) {
    return {
      isValid: false,
      error: "Stake must be greater than 0",
    };
  }
  return { isValid: true };
}

/**
 * Safe haptic feedback that handles errors gracefully
 */
export async function safeHapticFeedback(
  hapticFunction: () => Promise<void>,
  errorMessage: string = "Haptic feedback not available"
): Promise<void> {
  try {
    await hapticFunction();
  } catch (error) {
    console.log(`${errorMessage}:`, error);
  }
}
