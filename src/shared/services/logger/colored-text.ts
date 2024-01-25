import { COLORS } from "./colors.const";

/**
 * Adds codes for coloring output in terminal.
 * @param {string} text The text.
 * @param {string} color Color name. (One of: blue, yellow, red, cyan, green, magenta, white, gray).
 * @returns The line for printing in terminal.
 */
export function coloredText(text: string, color: keyof typeof COLORS) {
  const defaultColor = COLORS.white;

  return `\x1b[${COLORS[color] ?? defaultColor}m${text}\x1b[0m`;
}
