export type CipherOption = "caesar" | "vigenere" | "railFence" | "playfair";

export type Sender = "User A" | "User B";

export interface ChatMessage {
  id: string;
  sender: Sender;
  plaintext: string;
  encrypted: string;
  decrypted: string;
  cipher: CipherOption;
  key: string;
}
