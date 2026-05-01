/**
 * Caesar Cipher
 * Shifts alphabetic characters by a numeric key with wrap-around behavior.
 * Non-letter characters are preserved as-is.
 */

const UPPER_A = "A".charCodeAt(0);
const LOWER_A = "a".charCodeAt(0);
const ALPHABET_SIZE = 26;

const isLetter = (char) => /[a-z]/i.test(char);

const normalizeShift = (rawKey) => {
  const key = Number(rawKey);
  if (!Number.isFinite(key)) return 0;
  return ((Math.trunc(key) % ALPHABET_SIZE) + ALPHABET_SIZE) % ALPHABET_SIZE;
};

const shiftChar = (char, shift) => {
  if (!isLetter(char)) return char;

  const code = char.charCodeAt(0);
  const isUpper = code >= UPPER_A && code < UPPER_A + ALPHABET_SIZE;
  const base = isUpper ? UPPER_A : LOWER_A;

  return String.fromCharCode(((code - base + shift + ALPHABET_SIZE) % ALPHABET_SIZE) + base);
};

export const encrypt = (text, key) => {
  const shift = normalizeShift(key);
  return [...String(text ?? "")].map((char) => shiftChar(char, shift)).join("");
};

export const decrypt = (text, key) => {
  const shift = normalizeShift(key);
  return [...String(text ?? "")].map((char) => shiftChar(char, -shift)).join("");
};
