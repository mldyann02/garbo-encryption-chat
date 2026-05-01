/**
 * Playfair Cipher (letters-only canonical implementation)
 * - Prepares text by removing non-letters and replacing J with I
 * - Builds a 5x5 matrix from the keyword
 * - Inserts 'X' between duplicate letters in a digraph and pads final pair with 'X'
 * - Encrypts/decrypts digraphs according to Playfair rules
 * Note: This version returns letters-only ciphertext and attempts to remove
 * filler 'X' on decryption for a readable round-trip for typical inputs.
 */

const ALPHABET = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
const FILLER = "X";

const normalize = (str) => String(str ?? "").toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");

const buildMatrix = (key) => {
  const merged = `${normalize(key)}${ALPHABET}`;
  const unique = [];
  for (const ch of merged) {
    if (!unique.includes(ch)) unique.push(ch);
  }
  const matrix = [];
  for (let r = 0; r < 5; r++) matrix.push(unique.slice(r * 5, r * 5 + 5));
  return matrix;
};

const find = (matrix, ch) => {
  for (let r = 0; r < 5; r++) {
    const c = matrix[r].indexOf(ch);
    if (c !== -1) return [r, c];
  }
  return [-1, -1];
};

const makeDigraphs = (letters) => {
  const digraphs = [];
  let i = 0;
  while (i < letters.length) {
    const a = letters[i];
    const b = letters[i + 1];
    if (!b) {
      digraphs.push([a, FILLER]);
      i += 1;
      continue;
    }
    if (a === b) {
      digraphs.push([a, FILLER]);
      i += 1;
      continue;
    }
    digraphs.push([a, b]);
    i += 2;
  }
  return digraphs;
};

const transform = (matrix, [a, b], encrypting = true) => {
  const dir = encrypting ? 1 : -1;
  const [r1, c1] = find(matrix, a);
  const [r2, c2] = find(matrix, b);
  if (r1 === r2) {
    return [matrix[r1][(c1 + dir + 5) % 5], matrix[r2][(c2 + dir + 5) % 5]];
  }
  if (c1 === c2) {
    return [matrix[(r1 + dir + 5) % 5][c1], matrix[(r2 + dir + 5) % 5][c2]];
  }
  return [matrix[r1][c2], matrix[r2][c1]];
};

export const encrypt = (text, key) => {
  const letters = normalize(text);
  if (!letters) return "";
  const matrix = buildMatrix(key);
  const digraphs = makeDigraphs(letters);
  const out = digraphs.map((dg) => transform(matrix, dg, true)).flat().join("");
  return out;
};

export const decrypt = (text, key) => {
  const letters = normalize(text);
  if (!letters) return "";
  const matrix = buildMatrix(key);
  const pairs = [];
  for (let i = 0; i < letters.length; i += 2) pairs.push([letters[i], letters[i + 1]]);

  const out = pairs.map((dg) => transform(matrix, dg, false)).flat().join("");

  // attempt to remove filler X between duplicate letters introduced during encryption
  const cleaned = out.replace(/([A-Z])X(?=\1)/g, "$1").replace(/X$/, "");
  return cleaned;
};
