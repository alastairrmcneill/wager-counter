import * as Haptics from "expo-haptics";
import { useCallback } from "react";
import { useCounterStore } from "../store/counterStore";
import { useSessionStore } from "../store/sessionStore";
import { useSpinStore } from "../store/spinStore";

/**
 * Hook for handling counter undo functionality
 */
export function useCounterUndo() {
  const { updateCounter, getCounter } = useCounterStore();
  const { removeSpin, getLastSpinForCounter } = useSpinStore();
  const { updateSessionActivity } = useSessionStore();

  const undoLastSpin = useCallback(
    async (counterId: string) => {
      // Get current counter
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

      // Update session activity
      updateSessionActivity(counterId);

      // Trigger haptic feedback (different style for undo)
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch (error) {
        // Haptics might not be available on all devices/simulators
        console.log("Haptic feedback not available:", error);
      }

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
