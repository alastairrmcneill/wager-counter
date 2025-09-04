import { useCounterStore, useSpinStore } from "../store";
import { Counter, Spin } from "../types";

interface ValidationResult {
  counterId: string;
  counterName: string;
  expectedPence: number;
  actualPence: number;
  drift: number;
  fixed: boolean;
}

/**
 * Calculate the total wagered pence from spin history
 */
export const calculateWageredFromSpins = (counterId: string, spins: Spin[]): number => {
  return spins.filter((spin) => spin.counterId === counterId).reduce((total, spin) => total + spin.stakePence, 0);
};

/**
 * Validate a single counter's wageredPence against its spin history
 */
export const validateCounter = (counter: Counter, spins: Spin[]): ValidationResult => {
  const expectedPence = calculateWageredFromSpins(counter.id, spins);
  const actualPence = counter.wageredPence;
  const drift = actualPence - expectedPence;

  return {
    counterId: counter.id,
    counterName: counter.name,
    expectedPence,
    actualPence,
    drift,
    fixed: false,
  };
};

/**
 * Fix wageredPence drift by updating the counter
 */
export const fixCounterDrift = (counterId: string, correctPence: number): void => {
  const updateCounter = useCounterStore.getState().updateCounter;
  updateCounter(counterId, { wageredPence: correctPence });
};

/**
 * Validate all counters against their spin histories
 */
export const validateAllCounters = (): ValidationResult[] => {
  const counters = useCounterStore.getState().getAllCounters();
  const spins = useSpinStore.getState().getAllSpins();

  const results: ValidationResult[] = [];

  for (const counter of counters) {
    const result = validateCounter(counter, spins);

    // Log any drift found
    if (result.drift !== 0) {
      console.warn(
        `Counter "${result.counterName}" (${result.counterId}) has drift:`,
        `Expected: ${result.expectedPence}p, Actual: ${result.actualPence}p, Drift: ${result.drift}p`
      );

      // Auto-fix the drift
      fixCounterDrift(result.counterId, result.expectedPence);
      result.fixed = true;
    }

    results.push(result);
  }

  return results;
};

/**
 * Validate and fix wageredPence on app load
 */
export const validateOnLoad = async (): Promise<{
  totalCounters: number;
  countersWithDrift: number;
  totalDriftFixed: number;
  results: ValidationResult[];
}> => {
  console.log("Starting wageredPence validation...");

  const results = validateAllCounters();
  const countersWithDrift = results.filter((r) => r.drift !== 0);
  const totalDriftFixed = countersWithDrift.reduce((total, result) => total + Math.abs(result.drift), 0);

  if (countersWithDrift.length > 0) {
    console.log(
      `Fixed wageredPence drift for ${countersWithDrift.length} counters. ` +
        `Total drift corrected: ${totalDriftFixed}p`
    );
  } else {
    console.log("All counters validated successfully - no drift detected.");
  }

  return {
    totalCounters: results.length,
    countersWithDrift: countersWithDrift.length,
    totalDriftFixed,
    results,
  };
};
