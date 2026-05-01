export interface CipherModule {
  encrypt: (text: string, key: string) => string;
  decrypt: (text: string, key: string) => string;
}

export const ciphers: {
  caesar: CipherModule;
  vigenere: CipherModule;
  railFence: CipherModule;
  playfair: CipherModule;
};

export const caesarEncrypt: CipherModule["encrypt"];
export const caesarDecrypt: CipherModule["decrypt"];
export const vigenereEncrypt: CipherModule["encrypt"];
export const vigenereDecrypt: CipherModule["decrypt"];
export const railFenceEncrypt: CipherModule["encrypt"];
export const railFenceDecrypt: CipherModule["decrypt"];
export const playfairEncrypt: CipherModule["encrypt"];
export const playfairDecrypt: CipherModule["decrypt"];
export const playfairBuildMatrix: (key: string) => string[][];
