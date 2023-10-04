export function formatDuration(
  duration: number | undefined | null,
  unit: 'ms' | 'us' | 'ns',
): string {
  if (duration === undefined || duration === null) {
    return '—'; // Return a dash for undefined or null
  }

  let formattedDuration = '';
  let convertedDuration = 0;

  if (unit === 'ns') {
    convertedDuration = duration / 1000000; // Convert nanoseconds to milliseconds
  } else if (unit === 'us') {
    convertedDuration = duration / 1000; // Convert microseconds to milliseconds
  } else {
    convertedDuration = duration;
  }

  if (convertedDuration >= 1000) {
    formattedDuration = (convertedDuration / 1000).toFixed(2);
    if (formattedDuration.endsWith('.00')) {
      formattedDuration = (convertedDuration / 1000).toFixed(0);
    }
    return `${formattedDuration} secs`;
  }

  formattedDuration = convertedDuration.toFixed(0);
  return `${formattedDuration} ms`;
}
