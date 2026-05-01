import type { ChangeEvent } from "react";
import type { CipherOption, ChatMessage } from "../types/chat";

interface UserAPanelProps {
  cipherA: CipherOption;
  keyValueA: string;
  plaintextA: string;
  decryptionKeyA: string;
  messages: ChatMessage[];
  onCipherAChange: (value: CipherOption) => void;
  onKeyValueAChange: (value: string) => void;
  onPlaintextAChange: (value: string) => void;
  onDecryptionKeyAChange: (value: string) => void;
  onSendA: () => void;
  getDecryptedMessage: (msg: ChatMessage) => string;
}

const cipherOptions: Array<{ label: string; value: CipherOption }> = [
  { label: "Caesar", value: "caesar" },
  { label: "Vigenere", value: "vigenere" },
  { label: "Rail Fence", value: "railFence" },
  { label: "Playfair", value: "playfair" },
];

export function UserAPanel({
  cipherA,
  keyValueA,
  plaintextA,
  decryptionKeyA,
  messages,
  onCipherAChange,
  onKeyValueAChange,
  onPlaintextAChange,
  onDecryptionKeyAChange,
  onSendA,
  getDecryptedMessage,
}: UserAPanelProps) {
  const handleCipherSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onCipherAChange(event.target.value as CipherOption);
  };

  return (
    <section className="panel user-a-panel" aria-label="User A">
      <header>
        <p className="eyebrow">User A</p>
        <h2>Sender & Receiver</h2>
      </header>

      <div className="send-section">
        <h3 className="section-title">Send Message</h3>

        <label className="field">
          <span>Cipher Algorithm</span>
          <select value={cipherA} onChange={handleCipherSelect}>
            {cipherOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Encryption Key</span>
          <input
            type="text"
            value={keyValueA}
            onChange={(event) => onKeyValueAChange(event.target.value)}
            placeholder="Example: 3 or LEMON"
          />
        </label>

        <label className="field">
          <span>Your Message (Plaintext)</span>
          <textarea
            value={plaintextA}
            onChange={(event) => onPlaintextAChange(event.target.value)}
            rows={4}
            placeholder="Type your message..."
          />
        </label>

        <button type="button" onClick={onSendA} className="btn-primary">
          Send Message
        </button>
      </div>

      <div className="receive-section">
        <h3 className="section-title">Receive & Decrypt</h3>

        <label className="field">
          <span>Decryption Key</span>
          <input
            type="text"
            value={decryptionKeyA}
            onChange={(event) => onDecryptionKeyAChange(event.target.value)}
            placeholder="Key to decrypt messages from User B"
          />
        </label>

        <div className="messages-list">
          <label className="field">
            <span>Messages from User B</span>
            <div className="chat-messages">
              {messages.filter((m) => m.sender === "User B").length === 0 ? (
                <p className="no-messages">No messages from User B yet</p>
              ) : (
                messages
                  .filter((m) => m.sender === "User B")
                  .map((msg) => (
                    <div key={msg.id} className="message-item">
                      <div className="message-encrypted">
                        <strong>Encrypted:</strong>
                        <div className="message-text">{msg.encrypted}</div>
                      </div>
                      <div className="message-decrypted">
                        <strong>Decrypted:</strong>
                        <div className="message-text">
                          {getDecryptedMessage(msg)}
                        </div>
                      </div>
                      <div className="message-info">
                        <small>
                          {msg.cipher} | Key: {msg.key}
                        </small>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </label>
        </div>
      </div>
    </section>
  );
}
