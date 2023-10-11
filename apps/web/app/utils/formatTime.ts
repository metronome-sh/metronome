export function formatTime(milliseconds: number | null): string {
  if (milliseconds === null) {
    return '--:--';
  }

  // Calculate minutes and seconds
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);

  // Convert to mm:ss format
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
