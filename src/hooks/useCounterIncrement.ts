import * as Haptics from "expo-haptics";
import { useCallback } from "react";
import { trackEvent } from "../analytics";
import { AnalyticsEvents } from "../analytics/events";
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
    async (counterId: string, onTargetReached?: (counterId: string, previousWagered: number) => void) => {
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

      // Store previous wagered amount for target checking
      const previousWageredPence = counter.wageredPence;

      // Update counter's wagered amount
      const newWageredPence = counter.wageredPence + counter.currentStakePence;
      updateCounter(counterId, {
        wageredPence: newWageredPence,
      });

      // Track increment event
      const timeSinceStart = now - counter.createdAt;
      trackEvent(AnalyticsEvents.INCREMENT_TAP, {
        counterId,
        stakePence: counter.currentStakePence,
        targetPence: counter.targetPence,
        wageredPence: newWageredPence,
        timeSinceStart,
      });

      // Check if target was reached and call callback
      if (onTargetReached) {
        onTargetReached(counterId, previousWageredPence);
      }

      // Update session activity
      updateSessionActivity(counterId);

      // Trigger haptic feedback
      await safeHapticFeedback(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
    },
    [updateCounter, getCounter, addSpin, updateSessionActivity, isDebounced]
  );

  return { incrementCounter };
}
