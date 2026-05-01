/**
 * Rail Fence Cipher
 * Writes characters in a zigzag over N rails, then reads row by row.
 * Decryption reconstructs the zigzag path and restores original order.
 */

const normalizeRails = (key) => {
  const rails = Math.trunc(Number(key));
  return Number.isFinite(rails) ? Math.max(2, rails) : 2;
};

const getPattern = (length, rails) => {
  const pattern = [];
  let rail = 0;
  let direction = 1;

  for (let i = 0; i < length; i += 1) {
    pattern.push(rail);
    if (rail === 0) direction = 1;
    else if (rail === rails - 1) direction = -1;
    rail += direction;
  }

  return pattern;
};

export const encrypt = (text, key) => {
  const input = String(text ?? "");
  const rails = normalizeRails(key);

  if (input.length <= 1 || rails >= input.length) return input;

  const buckets = Array.from({ length: rails }, () => []);
  const pattern = getPattern(input.length, rails);

  [...input].forEach((char, i) => {
    buckets[pattern[i]].push(char);
  });

  return buckets.flat().join("");
};

export const decrypt = (text, key) => {
  const input = String(text ?? "");
  const rails = normalizeRails(key);

  if (input.length <= 1 || rails >= input.length) return input;

  const pattern = getPattern(input.length, rails);
  const counts = Array.from({ length: rails }, () => 0);

  pattern.forEach((rail) => {
    counts[rail] += 1;
  });

  const slices = [];
  let cursor = 0;

  counts.forEach((count) => {
    slices.push([...input.slice(cursor, cursor + count)]);
    cursor += count;
  });

  const railReadIndex = Array.from({ length: rails }, () => 0);

  return pattern
    .map((rail) => {
      const i = railReadIndex[rail];
      railReadIndex[rail] += 1;
      return slices[rail][i];
    })
    .join("");
};
