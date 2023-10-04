export function isDateDifferenceWithinDays(from: Date, to: Date, days: number) {
  const millisecondsDifference = Math.abs(from.valueOf() - to.valueOf());
  const daysDifference = millisecondsDifference / (1000 * 60 * 60 * 24);
  return daysDifference <= days;
}

export function areDatesInRange(
  from: Date,
  to: Date,
  minDays: number,
  maxDays: number,
) {
  const millisecondsDifference = Math.abs(from.valueOf() - to.valueOf());
  const daysDifference = millisecondsDifference / (1000 * 60 * 60 * 24);
  return daysDifference >= minDays && daysDifference <= maxDays;
}

export function isDifferenceGreaterThanDays(
  from: Date,
  to: Date,
  days: number,
): boolean {
  const millisecondsDifference = Math.abs(from.getTime() - to.getTime());
  const daysDifference = millisecondsDifference / (1000 * 60 * 60 * 24);
  return daysDifference > days;
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
