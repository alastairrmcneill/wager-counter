// Test file to verify CSV export functionality
import { Spin } from "../../types";
import { generateSpinsCsv } from "../csv";

// Sample test data
const testSpins: Spin[] = [
  {
    id: "spin_1",
    counterId: "counter_123",
    stakePence: 50, // £0.50
    timestamp: 1640995200000, // 2022-01-01 00:00:00
  },
  {
    id: "spin_2",
    counterId: "counter_123",
    stakePence: 100, // £1.00
    timestamp: 1640995260000, // 2022-01-01 00:01:00
  },
  {
    id: "spin_3",
    counterId: "counter_123",
    stakePence: 75, // £0.75
    timestamp: 1640995320000, // 2022-01-01 00:02:00
  },
];

// Test the CSV generation
const result = generateSpinsCsv(testSpins, "Test Counter");

console.log("Generated CSV:");
console.log(result.csvString);
console.log("\nFilename:", result.filename);

// Expected output:
// "spinId","timestamp","stake","cumulativeWagered"
// "spin_1","2022-01-01T00:00:00.000Z","£0.50","£0.50"
// "spin_2","2022-01-01T00:01:00.000Z","£1.00","£1.50"
// "spin_3","2022-01-01T00:02:00.000Z","£0.75","£2.25"

export { result };
