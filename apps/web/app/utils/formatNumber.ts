export function formatNumber(
  value: number | undefined | null,
  defaultValue?: string,
): string {
  if (value === undefined || value === null) {
    return defaultValue ?? '-';
  }

  if (value < 1000) {
    return value.toString();
  } else if (value >= 1000 && value < 1_000_000) {
    return (Math.floor(value / 10) / 100).toFixed(2) + 'k';
  } else if (value >= 1_000_000 && value < 1_000_000_000) {
    return (Math.floor(value / 10_000) / 100).toFixed(2) + 'M';
  } else {
    return (Math.floor(value / 10_000_000) / 100).toFixed(2) + 'B';
  }
}
