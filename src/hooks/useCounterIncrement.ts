import * as Haptics from "expo-haptics";
import { useCallback } from "react";
import { useCounterStore } from "../store/counterStore";
import { useSessionStore } from "../store/sessionStore";
import { useSpinStore } from "../store/spinStore";
import { safeHapticFeedback } from "../utils/errors";
import { useDebounce } from "./useDebounce";

/**
 * Hook for handling counter increment with debounce and haptic feedback
 */
export function useCounterIncrement() {
  const { updateCounter, getCounter } = useCounterStore();
  const { addSpin } = useSpinStore();
  const { updateSessionActivity } = useSessionStore();
  const { isDebounced } = useDebounce(120);

  const incrementCounter = useCallback(
    async (counterId: string) => {
      // Debounce check
      if (isDebounced()) {
        return;
      }

      // Get and validate counter
      const counter = getCounter(counterId);
      if (!counter) {
        console.warn(`Counter with id ${counterId} not found`);
        return;
      }

      const now = Date.now();

      // Create spin with current stake
      const spin = {
        counterId,
        stakePence: counter.currentStakePence,
        timestamp: now,
      };

      // Add spin to store
      addSpin(spin);

      // Update counter's wagered amount
      const newWageredPence = counter.wageredPence + counter.currentStakePence;
      updateCounter(counterId, {
        wageredPence: newWageredPence,
      });

      // Update session activity
      updateSessionActivity(counterId);

      // Trigger haptic feedback
      await safeHapticFeedback(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
    },
    [updateCounter, getCounter, addSpin, updateSessionActivity, isDebounced]
  );

  return { incrementCounter };
}
