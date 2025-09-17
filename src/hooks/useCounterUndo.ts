import * as Haptics from "expo-haptics";
import { useCallback } from "react";
import { trackEvent } from "../analytics";
import { AnalyticsEvents } from "../analytics/events";
import { useCounterStore } from "../store/counterStore";
import { useSessionStore } from "../store/sessionStore";
import { useSpinStore } from "../store/spinStore";
import { safeHapticFeedback } from "../utils/errors";

/**
 * Hook for handling counter undo functionality
 */
export function useCounterUndo() {
  const { updateCounter, getCounter } = useCounterStore();
  const { removeSpin, getLastSpinForCounter } = useSpinStore();
  const { updateSessionActivity } = useSessionStore();

  const undoLastSpin = useCallback(
    async (counterId: string) => {
      // Get and validate counter
      const counter = getCounter(counterId);
      if (!counter) {
        console.warn(`Counter with id ${counterId} not found`);
        return false;
      }

      // Get the most recent spin for this counter
      const lastSpin = getLastSpinForCounter(counterId);
      if (!lastSpin) {
        console.log(`No spins found for counter ${counterId}`);
        return false;
      }

      // Remove the spin from store
      removeSpin(lastSpin.id);

      // Update counter's wagered amount by subtracting the undone spin's stake
      const newWageredPence = Math.max(0, counter.wageredPence - lastSpin.stakePence);
      updateCounter(counterId, {
        wageredPence: newWageredPence,
      });

      // Track undo event
      const timeSinceStart = Date.now() - counter.createdAt;
      trackEvent(AnalyticsEvents.UNDO_TAP, {
        counterId,
        stakePence: counter.currentStakePence,
        targetPence: counter.targetPence,
        wageredPence: newWageredPence,
        timeSinceStart,
      });

      // Update session activity
      updateSessionActivity(counterId);

      // Trigger haptic feedback (different style for undo)
      await safeHapticFeedback(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium));

      return true;
    },
    [updateCounter, getCounter, removeSpin, getLastSpinForCounter, updateSessionActivity]
  );

  const canUndo = useCallback(
    (counterId: string) => {
      const lastSpin = getLastSpinForCounter(counterId);
      return lastSpin !== undefined;
    },
    [getLastSpinForCounter]
  );

  return { undoLastSpin, canUndo };
}
