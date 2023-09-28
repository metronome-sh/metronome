import { customAlphabet } from 'nanoid';

// prettier-ignore
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const lowerCaseAlphabet = 'abcdefghijklmnopqrstuvwxyz';

/**
 * Generate a random lowercase string of length 10.
 */
const lower = customAlphabet(lowerCaseAlphabet, 10);

export const nanoid = Object.assign(customAlphabet(alphabet, 10), {
  lower,
});
