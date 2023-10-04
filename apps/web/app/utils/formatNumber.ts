export function formatNumber(
  number: number | undefined | null,
  defaultValue?: string,
): string {
  if (number === undefined || number === null) {
    return defaultValue ?? '—';
  }

  const digits = Math.floor(Math.log10(number) + 1);

  if (digits <= 3) {
    return number.toString();
  } else if (digits <= 6) {
    const formattedNumber = (number / 1000).toFixed(2);
    const decimalPart = formattedNumber.split('.')[1];

    if (decimalPart === '00') {
      return Math.floor(number / 1000) + 'k';
    }

    return formattedNumber + 'k';
  } else if (digits <= 9) {
    const formattedNumber = (number / 1000000).toFixed(2);
    const decimalPart = formattedNumber.split('.')[1];

    if (decimalPart === '00') {
      return Math.floor(number / 1000000) + 'M';
    }

    return formattedNumber + 'M';
  } else {
    const formattedNumber = (number / 1000000000).toFixed(2);
    const decimalPart = formattedNumber.split('.')[1];

    if (decimalPart === '00') {
      return Math.floor(number / 1000000000) + 'B';
    }

    return formattedNumber + 'B';
  }
}
