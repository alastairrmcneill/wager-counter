import { useCallback, useState } from "react";

import { trackEvent } from "../analytics";
import { AnalyticsEvents } from "../analytics/events";
import { useCounterStore, useSessionStore, useSpinStore } from "../store";

/**
 * Hook for handling target completion detection and dialog management
 */
export function useTargetCompletion() {
  const [showTargetDialog, setShowTargetDialog] = useState(false);
  const [completedCounterId, setCompletedCounterId] = useState<string | null>(null);
  const { getCounter } = useCounterStore();
  const { getSpinsForCounter } = useSpinStore();
  const { getSessionStats } = useSessionStore();

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
        // Track target completion event
        const spins = getSpinsForCounter(counterId);
        const sessionStats = getSessionStats(counterId);

        trackEvent(AnalyticsEvents.TARGET_COMPLETED, {
          counterId,
          targetPence: counter.targetPence,
          finalWageredPence: counter.wageredPence,
          totalSpins: spins.length,
          sessionDurationMs: sessionStats.elapsedMs,
          avgSpinsPerMin: sessionStats.avgSpinsPerMin,
        });

        setCompletedCounterId(counterId);
        setShowTargetDialog(true);
        return true;
      }

      return false;
    },
    [getCounter, getSpinsForCounter, getSessionStats]
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
