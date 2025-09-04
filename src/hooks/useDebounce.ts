import { useRef } from "react";

/**
 * Custom hook for debouncing function calls
 */
export function useDebounce(delayMs: number = 120) {
  const lastCallTime = useRef<number>(0);

  const isDebounced = (): boolean => {
    const now = Date.now();
    if (now - lastCallTime.current < delayMs) {
      return true;
    }
    lastCallTime.current = now;
    return false;
  };

  return { isDebounced };
}
