import { Spin } from "../types";
import { formatGBP } from "./currency";

/**
 * CSV export utilities
 */

/**
 * Generate CSV string from spins data
 * @param spins - Array of spins for a counter
 * @param counterName - Name of the counter for filename
 * @returns Object containing CSV string and suggested filename
 */
export const generateSpinsCsv = (spins: Spin[], counterName: string) => {
  // Sort spins by timestamp to ensure cumulative calculation is correct
  const sortedSpins = spins.sort((a, b) => a.timestamp - b.timestamp);

  // CSV headers
  const headers = ["spinId", "timestamp", "stake", "cumulativeWagered"];

  // Generate CSV rows
  let cumulativeWagered = 0;
  const rows = sortedSpins.map((spin) => {
    cumulativeWagered += spin.stakePence;

    return [spin.id, new Date(spin.timestamp).toISOString(), formatGBP(spin.stakePence), formatGBP(cumulativeWagered)];
  });

  // Combine headers and rows
  const csvLines = [headers, ...rows];
  const csvString = csvLines.map((row) => row.map((field) => `"${field}"`).join(",")).join("\n");

  // Generate filename with counter name and timestamp
  const sanitizedCounterName = counterName.replace(/[^a-zA-Z0-9]/g, "_");
  const timestamp = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const filename = `${sanitizedCounterName}_spins_${timestamp}.csv`;

  return {
    csvString,
    filename,
  };
};

/**
 * Escape CSV field values to handle commas, quotes, and newlines
 * @param value - The value to escape
 * @returns Escaped value safe for CSV
 */
export const escapeCsvField = (value: string): string => {
  // If the value contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};
