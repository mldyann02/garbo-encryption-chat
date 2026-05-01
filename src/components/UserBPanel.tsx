import type { ChangeEvent } from "react";
import type { CipherOption, ChatMessage } from "../types/chat";

interface UserBPanelProps {
  cipherB: CipherOption;
  keyValueB: string;
  plaintextB: string;
  decryptionKeyB: string;
  messages: ChatMessage[];
  onCipherBChange: (value: CipherOption) => void;
  onKeyValueBChange: (value: string) => void;
  onPlaintextBChange: (value: string) => void;
  onDecryptionKeyBChange: (value: string) => void;
  onSendB: () => void;
  getDecryptedMessage: (msg: ChatMessage) => string;
}

const cipherOptions: Array<{ label: string; value: CipherOption }> = [
  { label: "Caesar", value: "caesar" },
  { label: "Vigenere", value: "vigenere" },
  { label: "Rail Fence", value: "railFence" },
  { label: "Playfair", value: "playfair" },
];

export function UserBPanel({
  cipherB,
  keyValueB,
  plaintextB,
  decryptionKeyB,
  messages,
  onCipherBChange,
  onKeyValueBChange,
  onPlaintextBChange,
  onDecryptionKeyBChange,
  onSendB,
  getDecryptedMessage,
}: UserBPanelProps) {
  const handleCipherSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onCipherBChange(event.target.value as CipherOption);
  };

  return (
    <section className="panel user-b-panel" aria-label="User B">
      <header>
        <p className="eyebrow">User B</p>
        <h2>Sender & Receiver</h2>
      </header>

      <div className="send-section">
        <h3 className="section-title">Send Message</h3>

        <label className="field">
          <span>Cipher Algorithm</span>
          <select value={cipherB} onChange={handleCipherSelect}>
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
            value={keyValueB}
            onChange={(event) => onKeyValueBChange(event.target.value)}
            placeholder="Example: 3 or LEMON"
          />
        </label>

        <label className="field">
          <span>Your Message (Plaintext)</span>
          <textarea
            value={plaintextB}
            onChange={(event) => onPlaintextBChange(event.target.value)}
            rows={4}
            placeholder="Type your message..."
          />
        </label>

        <button type="button" onClick={onSendB} className="btn-primary">
          Send Message
        </button>
      </div>

      <div className="receive-section">
        <h3 className="section-title">Receive & Decrypt</h3>

        <label className="field">
          <span>Decryption Key</span>
          <input
            type="text"
            value={decryptionKeyB}
            onChange={(event) => onDecryptionKeyBChange(event.target.value)}
            placeholder="Key to decrypt messages from User A"
          />
        </label>

        <div className="messages-list">
          <label className="field">
            <span>Messages from User A</span>
            <div className="chat-messages">
              {messages.filter((m) => m.sender === "User A").length === 0 ? (
                <p className="no-messages">No messages from User A yet</p>
              ) : (
                messages
                  .filter((m) => m.sender === "User A")
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
