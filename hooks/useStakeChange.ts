import { useCallback } from "react";
import { useCounterStore } from "../store/counterStore";

/**
 * Hook for handling stake changes for a counter
 */
export function useStakeChange() {
  const { updateStake, getCounter } = useCounterStore();

  const changeStake = useCallback(
    (counterId: string, stakePence: number) => {
      // Validate stake is positive
      if (stakePence <= 0) {
        console.warn("Stake must be greater than 0");
        return false;
      }

      // Check if counter exists
      const counter = getCounter(counterId);
      if (!counter) {
        console.warn(`Counter with id ${counterId} not found`);
        return false;
      }

      // Update the stake for future spins
      updateStake(counterId, stakePence);
      return true;
    },
    [updateStake, getCounter]
  );

  return { changeStake };
}
