/**
 * Vigenere Cipher
 * Uses a repeating keyword to shift alphabetic characters.
 * Non-letter characters are preserved and do not consume key letters.
 */

const LOWER_A = "a".charCodeAt(0);
const UPPER_A = "A".charCodeAt(0);
const ALPHABET_SIZE = 26;

const isLetter = (char) => /[a-z]/i.test(char);

const keyToShifts = (key) =>
  [...String(key ?? "")]
    .filter((char) => isLetter(char))
    .map((char) => char.toLowerCase().charCodeAt(0) - LOWER_A);

const shiftChar = (char, shift) => {
  if (!isLetter(char)) return char;

  const code = char.charCodeAt(0);
  const isUpper = code >= UPPER_A && code < UPPER_A + ALPHABET_SIZE;
  const base = isUpper ? UPPER_A : LOWER_A;
  return String.fromCharCode(((code - base + shift + ALPHABET_SIZE) % ALPHABET_SIZE) + base);
};

export const encrypt = (text, key) => {
  const normalizedText = String(text ?? "");
  const shifts = keyToShifts(key);
  if (shifts.length === 0) return normalizedText;

  let keyIndex = 0;
  return [...normalizedText]
    .map((char) => {
      if (!isLetter(char)) return char;
      const shift = shifts[keyIndex % shifts.length];
      keyIndex += 1;
      return shiftChar(char, shift);
    })
    .join("");
};

export const decrypt = (text, key) => {
  const normalizedText = String(text ?? "");
  const shifts = keyToShifts(key);
  if (shifts.length === 0) return normalizedText;

  let keyIndex = 0;
  return [...normalizedText]
    .map((char) => {
      if (!isLetter(char)) return char;
      const shift = shifts[keyIndex % shifts.length];
      keyIndex += 1;
      return shiftChar(char, -shift);
    })
    .join("");
};
