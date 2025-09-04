import * as Haptics from "expo-haptics";
import { useCallback, useRef } from "react";
import { useCounterStore } from "../store/counterStore";
import { useSessionStore } from "../store/sessionStore";
import { useSpinStore } from "../store/spinStore";

/**
 * Hook for handling counter increment with debounce and haptic feedback
 */
export function useCounterIncrement() {
  const { updateCounter, getCounter } = useCounterStore();
  const { addSpin } = useSpinStore();
  const { updateSessionActivity } = useSessionStore();

  // Debounce ref to prevent duplicate taps
  const lastIncrementTime = useRef<number>(0);
  const DEBOUNCE_MS = 120;

  const incrementCounter = useCallback(
    async (counterId: string) => {
      const now = Date.now();

      // Debounce check
      if (now - lastIncrementTime.current < DEBOUNCE_MS) {
        return;
      }
      lastIncrementTime.current = now;

      // Get current counter
      const counter = getCounter(counterId);
      if (!counter) {
        console.warn(`Counter with id ${counterId} not found`);
        return;
      }

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
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        // Haptics might not be available on all devices/simulators
        console.log("Haptic feedback not available:", error);
      }
    },
    [updateCounter, getCounter, addSpin, updateSessionActivity]
  );

  return { incrementCounter };
}
