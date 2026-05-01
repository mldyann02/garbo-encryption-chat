import { encrypt as caesarEncrypt, decrypt as caesarDecrypt } from '../src/utils/ciphers/caesar.js';
import { encrypt as vigenereEncrypt, decrypt as vigenereDecrypt } from '../src/utils/ciphers/vigenere.js';
import { encrypt as railFenceEncrypt, decrypt as railFenceDecrypt } from '../src/utils/ciphers/railFence.js';
import { encrypt as playfairEncrypt, decrypt as playfairDecrypt } from '../src/utils/ciphers/playfair.js';

const equal = (a, b) => a === b;

const tests = [];

// Caesar known test
{
  const plain = 'HELLO WORLD';
  const key = '3';
  const enc = caesarEncrypt(plain, key);
  const dec = caesarDecrypt(enc, key);
  tests.push({ name: 'Caesar encrypt/decrypt', plain, enc, dec, pass: equal(dec, plain) && enc === 'KHOOR ZRUOG' });
}

// Vigenere roundtrip
{
  const plain = 'HELLO WORLD';
  const key = 'LEMON';
  const enc = vigenereEncrypt(plain, key);
  const dec = vigenereDecrypt(enc, key);
  tests.push({ name: 'Vigenere roundtrip', plain, enc, dec, pass: equal(dec, plain) });
}

// Rail Fence roundtrip
{
  const plain = 'HELLO WORLD';
  const key = '3';
  const enc = railFenceEncrypt(plain, key);
  const dec = railFenceDecrypt(enc, key);
  tests.push({ name: 'Rail Fence roundtrip', plain, enc, dec, pass: equal(dec, plain) });
}

// Playfair roundtrip (note: Playfair transforms letters only and inserts filler X for odd lengths/doubles)
{
  const plain = 'HELLOWORLD'; // letters only to match playfair expectations
  const key = 'KEYWORD';
  const enc = playfairEncrypt(plain, key);
  const dec = playfairDecrypt(enc, key);
  tests.push({ name: 'Playfair roundtrip (letters only)', plain, enc, dec, pass: equal(dec.replace(/X/g, ''), plain.replace(/J/g, 'I')) });
}

console.log('Running cipher tests...');
let failed = 0;
for (const t of tests) {
  console.log(`\nTest: ${t.name}`);
  console.log(`Plain: ${t.plain}`);
  console.log(`Encrypted: ${t.enc}`);
  console.log(`Decrypted: ${t.dec}`);
  console.log(`Pass: ${t.pass}`);
  if (!t.pass) failed += 1;
}

if (failed === 0) {
  console.log('\nAll tests passed ✅');
  process.exit(0);
} else {
  console.log(`\n${failed} test(s) failed ❌`);
  process.exit(2);
}
