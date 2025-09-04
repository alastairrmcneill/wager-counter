/**
 * Currency conversion utilities
 */

/**
 * Convert pounds to pence
 * @param pounds - Amount in pounds (e.g., 1.50)
 * @returns Amount in pence (e.g., 150)
 */
export const toPence = (pounds: number): number => {
  return Math.round(pounds * 100);
};

/**
 * Convert pence to pounds
 * @param pence - Amount in pence (e.g., 150)
 * @returns Amount in pounds (e.g., 1.50)
 */
export const fromPence = (pence: number): number => {
  return pence / 100;
};

/**
 * Format pence as GBP string
 * @param pence - Amount in pence
 * @returns Formatted string (e.g., "£1.50")
 */
export const formatGBP = (pence: number): string => {
  const pounds = fromPence(pence);
  return `£${pounds.toFixed(2)}`;
};

/**
 * Ceiling division - rounds up to nearest integer
 * @param dividend - Number to divide
 * @param divisor - Number to divide by
 * @returns Ceiling of the division
 */
export const ceilDiv = (dividend: number, divisor: number): number => {
  return Math.ceil(dividend / divisor);
};
