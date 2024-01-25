/**
 * Adjusts current timestamp to format, needed for the logger in development mode.
 * Format: "YYYY-MM-DD HH:MM:SS".
 *
 * @returns Formatted timestamp for logger.
 */
export function getFormattedTimestamp() {
  const d = new Date();

  return `${d.getUTCFullYear()}-${adjustLength(d.getUTCMonth() + 1)}-${adjustLength(d.getUTCDate())} ${adjustLength(
    d.getUTCHours()
  )}:${adjustLength(d.getUTCMinutes())}:${adjustLength(d.getUTCSeconds())}`;
}

function adjustLength(val: string | number): string {
  const str = String(val);
  return str.length === 1 ? `0${str}` : str;
}
