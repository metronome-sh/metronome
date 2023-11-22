import { customAlphabet } from 'nanoid';

// prettier-ignore
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const nanoid = customAlphabet(alphabet, 10);
