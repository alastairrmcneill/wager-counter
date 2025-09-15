import { useCallback, useState } from "react";

import { useCounterStore } from "../store";

/**
 * Hook for handling target completion detection and dialog management
 */
export function useTargetCompletion() {
  const [showTargetDialog, setShowTargetDialog] = useState(false);
  const [completedCounterId, setCompletedCounterId] = useState<string | null>(null);
  const { getCounter } = useCounterStore();

  /**
   * Check if a counter has reached its target and trigger dialog if needed
   * Returns true if target was just reached (to show dialog)
   */
  const checkTargetCompletion = useCallback(
    (counterId: string, previousWageredPence: number): boolean => {
      const counter = getCounter(counterId);
      if (!counter) {
        return false;
      }

      // Check if target was just reached in this increment
      const wasUnderTarget = previousWageredPence < counter.targetPence;
      const isNowAtOrOverTarget = counter.wageredPence >= counter.targetPence;

      // Target was just reached
      if (wasUnderTarget && isNowAtOrOverTarget) {
        setCompletedCounterId(counterId);
        setShowTargetDialog(true);
        return true;
      }

      return false;
    },
    [getCounter]
  );

  /**
   * Close the target completion dialog
   */
  const closeTargetDialog = useCallback(() => {
    setShowTargetDialog(false);
    setCompletedCounterId(null);
  }, []);

  /**
   * Get the counter that completed its target
   */
  const getCompletedCounter = useCallback(() => {
    return completedCounterId ? getCounter(completedCounterId) : null;
  }, [completedCounterId, getCounter]);

  return {
    showTargetDialog,
    completedCounterId,
    checkTargetCompletion,
    closeTargetDialog,
    getCompletedCounter,
  };
}
