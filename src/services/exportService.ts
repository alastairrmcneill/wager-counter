import { Platform } from "react-native";
import { Dirs, FileSystem } from "react-native-file-access";
import Share from "react-native-share";
import { Spin } from "../types";
import { generateSpinsCsv } from "../utils";

/**
 * Export service for sharing CSV files
 */
export class ExportService {
  /**
   * Export spins as CSV file
   * @param spins - Array of spins to export
   * @param counterName - Name of the counter for filename
   * @returns Promise that resolves when export is complete
   */
  static async exportSpinsCsv(spins: Spin[], counterName: string): Promise<void> {
    try {
      // Generate CSV content
      const { csvString, filename } = generateSpinsCsv(spins, counterName);

      // Write to temporary file in cache directory
      const tempPath = `${Dirs.CacheDir}/${filename}`;
      await FileSystem.writeFile(tempPath, csvString, "utf8");

      // Share the file
      const shareOptions = {
        url: `file://${tempPath}`,
        type: "text/csv",
        filename: filename,
        failOnCancel: false,
        subject: `${counterName} Spins Export`,
        message: `Exported spins data for ${counterName}`,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error("Failed to export CSV:", error);
      throw new Error("Failed to export CSV file. Please try again.");
    }
  }

  /**
   * Check if export functionality is available
   * @returns True if export is supported on current platform
   */
  static isExportSupported(): boolean {
    return Platform.OS === "ios" || Platform.OS === "android";
  }
}
