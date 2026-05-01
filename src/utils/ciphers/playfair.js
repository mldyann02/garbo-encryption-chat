/**
 * Playfair Cipher
 * Uses a 5x5 key matrix (I/J merged) to encrypt letter pairs.
 * Non-letter characters are preserved in position and case is restored per letter.
 */

const ALPHABET = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
const FILLER = "X";

const isLetter = (char) => /[a-z]/i.test(char);

const normalizeLetter = (char) => char.toUpperCase().replace("J", "I");

const buildMatrix = (key) => {
  const merged = `${String(key ?? "").toUpperCase()}${ALPHABET}`.replace(/J/g, "I");
  const unique = [];

  for (const char of merged) {
    if (/[A-Z]/.test(char) && !unique.includes(char)) unique.push(char);
  }

  const matrix = [];
  for (let i = 0; i < 5; i += 1) {
    matrix.push(unique.slice(i * 5, i * 5 + 5));
  }
  return matrix;
};

const findInMatrix = (matrix, target) => {
  for (let row = 0; row < 5; row += 1) {
    const col = matrix[row].indexOf(target);
    if (col !== -1) return [row, col];
  }
  return [0, 0];
};

const letterTokensFromText = (text) => {
  const tokens = [];
  [...text].forEach((char, index) => {
    if (!isLetter(char)) return;
    tokens.push({
      index,
      source: char,
      upper: normalizeLetter(char),
    });
  });
  return tokens;
};

const toDigraphs = (tokens) => {
  const pairs = [];
  let i = 0;

  while (i < tokens.length) {
    const first = tokens[i];
    const second = tokens[i + 1];

    if (!second) {
      pairs.push({
        first,
        second: {
          index: -1,
          source: FILLER,
          upper: FILLER,
          synthetic: true,
        },
      });
      i += 1;
      continue;
    }

    if (first.upper === second.upper) {
      pairs.push({
        first,
        second: {
          index: -1,
          source: FILLER,
          upper: FILLER,
          synthetic: true,
        },
      });
      i += 1;
      continue;
    }

    pairs.push({ first, second });
    i += 2;
  }

  return pairs;
};

const transformPair = (matrix, a, b, direction) => {
  const [rowA, colA] = findInMatrix(matrix, a);
  const [rowB, colB] = findInMatrix(matrix, b);

  if (rowA === rowB) {
    return [matrix[rowA][(colA + direction + 5) % 5], matrix[rowB][(colB + direction + 5) % 5]];
  }

  if (colA === colB) {
    return [matrix[(rowA + direction + 5) % 5][colA], matrix[(rowB + direction + 5) % 5][colB]];
  }

  return [matrix[rowA][colB], matrix[rowB][colA]];
};

const applyCase = (original, transformedUpper) => {
  if (!original) return transformedUpper;
  return original === original.toUpperCase() ? transformedUpper : transformedUpper.toLowerCase();
};

export const encrypt = (text, key) => {
  const input = String(text ?? "");
  const matrix = buildMatrix(key);
  const output = [...input];

  const tokens = letterTokensFromText(input);
  if (tokens.length === 0) return input;

  const digraphs = toDigraphs(tokens);

  digraphs.forEach(({ first, second }) => {
    const [encA, encB] = transformPair(matrix, first.upper, second.upper, 1);
    output[first.index] = applyCase(first.source, encA);

    if (second.index !== -1) {
      output[second.index] = applyCase(second.source, encB);
    } else {
      output.push(encB);
    }
  });

  return output.join("");
};

export const decrypt = (text, key) => {
  const input = String(text ?? "");
  const matrix = buildMatrix(key);
  const output = [...input];

  const tokens = letterTokensFromText(input);
  if (tokens.length === 0) return input;

  const digraphs = [];
  for (let i = 0; i < tokens.length; i += 2) {
    const first = tokens[i];
    const second = tokens[i + 1];
    if (!second) break;
    digraphs.push({ first, second });
  }

  digraphs.forEach(({ first, second }) => {
    const [decA, decB] = transformPair(matrix, first.upper, second.upper, -1);
    output[first.index] = applyCase(first.source, decA);
    output[second.index] = applyCase(second.source, decB);
  });

  return output.join("");
};
