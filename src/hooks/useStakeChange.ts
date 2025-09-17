import { useCallback } from "react";
import { trackEvent } from "../analytics";
import { AnalyticsEvents } from "../analytics/events";
import { useCounterStore } from "../store/counterStore";
import { validateStake } from "../utils/errors";

/**
 * Hook for handling stake changes for a counter
 */
export function useStakeChange() {
  const { updateStake, getCounter } = useCounterStore();

  const changeStake = useCallback(
    (counterId: string, stakePence: number) => {
      // Validate stake is positive
      const stakeValidation = validateStake(stakePence);
      if (!stakeValidation.isValid) {
        console.warn(stakeValidation.error);
        return false;
      }

      // Check if counter exists
      const counter = getCounter(counterId);
      if (!counter) {
        console.warn(`Counter with id ${counterId} not found`);
        return false;
      }

      // Store old stake for analytics
      const previousStakePence = counter.currentStakePence;

      // Update the stake for future spins
      updateStake(counterId, stakePence);

      // Track stake change event
      const timeSinceStart = Date.now() - counter.createdAt;
      trackEvent(AnalyticsEvents.STAKE_CHANGE, {
        counterId,
        previousStakePence,
        newStakePence: stakePence,
        targetPence: counter.targetPence,
        timeSinceStart,
      });

      return true;
    },
    [updateStake, getCounter]
  );

  return { changeStake };
}
