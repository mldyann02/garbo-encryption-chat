import { encrypt as caesarEncrypt, decrypt as caesarDecrypt } from "./caesar";
import { encrypt as vigenereEncrypt, decrypt as vigenereDecrypt } from "./vigenere";
import { encrypt as railFenceEncrypt, decrypt as railFenceDecrypt } from "./railFence";
import { encrypt as playfairEncrypt, decrypt as playfairDecrypt, buildMatrix as playfairBuildMatrix } from "./playfair";

export const ciphers = {
  caesar: { encrypt: caesarEncrypt, decrypt: caesarDecrypt },
  vigenere: { encrypt: vigenereEncrypt, decrypt: vigenereDecrypt },
  railFence: { encrypt: railFenceEncrypt, decrypt: railFenceDecrypt },
  playfair: { encrypt: playfairEncrypt, decrypt: playfairDecrypt },
};

export {
  caesarEncrypt,
  caesarDecrypt,
  vigenereEncrypt,
  vigenereDecrypt,
  railFenceEncrypt,
  railFenceDecrypt,
  playfairEncrypt,
  playfairDecrypt,
  playfairBuildMatrix,
};
