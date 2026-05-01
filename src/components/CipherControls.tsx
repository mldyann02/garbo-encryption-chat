import { type ChangeEvent } from "react";
import type { CipherOption } from "../types/chat";

interface CipherControlsProps {
  cipher: CipherOption;
  keyValue: string;
  message: string;
  encryptedPreview: string;
  onCipherChange: (value: CipherOption) => void;
  onKeyChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onEncrypt: () => void;
  onSend: () => void;
  onDecrypt: () => void;
}

const cipherOptions: Array<{ label: string; value: CipherOption }> = [
  { label: "Caesar", value: "caesar" },
  { label: "Vigenere", value: "vigenere" },
  { label: "Rail Fence", value: "railFence" },
  { label: "Playfair", value: "playfair" },
];

export function CipherControls({
  cipher,
  keyValue,
  message,
  encryptedPreview,
  onCipherChange,
  onKeyChange,
  onMessageChange,
  onEncrypt,
  onSend,
  onDecrypt,
}: CipherControlsProps) {
  const handleCipherSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onCipherChange(event.target.value as CipherOption);
  };

  return (
    <section className="panel controls-panel" aria-label="Cipher controls">
      <header>
        <p className="eyebrow">Workflow</p>
        <h1>Conventional Encryptions Chat Program</h1>
        <p className="author">By Melody Ann M. Garbo</p>
        <p className="subtitle">
          Choose Cipher - Enter Key - Type Message - Encrypt - Send - Decrypt
        </p>
      </header>

      <div className="control-grid">
        <label className="field">
          <span>Cipher Algorithm</span>
          <select value={cipher} onChange={handleCipherSelect}>
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
            value={keyValue}
            onChange={(event) => onKeyChange(event.target.value)}
            placeholder="Example: 3 or LEMON"
          />
        </label>
      </div>

      <label className="field">
        <span>Message (Plaintext)</span>
        <textarea
          value={message}
          onChange={(event) => onMessageChange(event.target.value)}
          rows={4}
          placeholder="Type a plaintext message..."
        />
      </label>

      <label className="field">
        <span>Encrypted Output</span>
        <textarea
          value={encryptedPreview}
          readOnly
          rows={3}
          placeholder="Click Encrypt to preview ciphertext"
        />
      </label>

      <div className="actions" role="group" aria-label="Message actions">
        <button type="button" onClick={onEncrypt}>
          Encrypt
        </button>
        <button type="button" onClick={onSend}>
          Send
        </button>
        <button type="button" onClick={onDecrypt}>
          Decrypt
        </button>
      </div>
    </section>
  );
}
