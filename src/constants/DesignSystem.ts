/**
 * Design System - Brand colors and design tokens
 * These colors replace the previous Tailwind configuration
 */

export const brandColors = {
  gunmetal: {
    50: "#f4f6f7",
    100: "#e3e8eb",
    200: "#c9d3d9",
    300: "#a3b5be",
    400: "#76909d",
    500: "#5a7481",
    600: "#4d626e",
    700: "#43525c",
    800: "#3c464e",
    900: "#343c43",
    950: "#1f252a", // Primary gunmetal
  },
  mint: {
    50: "#f0fdf9",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf", // Primary mint
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e",
  },
  coral: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444", // Primary coral
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981", // Primary emerald
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22",
  },
};

export const systemFonts = {
  sans: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  mono: ["SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Consolas", "monospace"],
};

// Convenience exports for commonly used colors
export const colors = {
  primary: brandColors.mint[400],
  secondary: brandColors.gunmetal[600],
  danger: brandColors.coral[500],
  success: brandColors.mint[500],

  background: {
    light: "#ffffff",
    dark: brandColors.gunmetal[950],
  },

  text: {
    primary: brandColors.gunmetal[900],
    secondary: brandColors.gunmetal[600],
    light: "#ffffff",
  },
};
