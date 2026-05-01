import { useState } from "react";
import { ChatHistory } from "./components/ChatHistory";
import { CipherControls } from "./components/CipherControls";
import type { ChatMessage, CipherOption } from "./types/chat";
import { ciphers } from "./utils/ciphers";
import "./App.css";

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "User A",
    plaintext: "HELLO WORLD",
    encrypted: "KHOOR ZRUOG",
    decrypted: "HELLO WORLD",
    cipher: "caesar",
    key: "3",
  },
  {
    id: "2",
    sender: "User B",
    plaintext: "READY FOR LAB",
    encrypted: "UHDGB IRU ODE",
    decrypted: "READY FOR LAB",
    cipher: "caesar",
    key: "3",
  },
];

function App() {
  const [cipher, setCipher] = useState<CipherOption>("caesar");
  const [keyValue, setKeyValue] = useState("3");
  const [message, setMessage] = useState("");
  const [encryptedPreview, setEncryptedPreview] = useState("");
  const [decryptedPreview, setDecryptedPreview] = useState("");
  const [workflowNote, setWorkflowNote] = useState(
    "Enter a message and click Encrypt.",
  );
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const cipherMap = ciphers as Record<
    CipherOption,
    {
      encrypt: (text: string, key: string) => string;
      decrypt: (text: string, key: string) => string;
    }
  >;

  const getCipherHandler = () => cipherMap[cipher] ?? cipherMap.caesar;

  const handleEncrypt = () => {
    if (!message.trim()) {
      setWorkflowNote("Type a plaintext message before encrypting.");
      return;
    }

    const encrypted = getCipherHandler().encrypt(message, keyValue);
    setEncryptedPreview(encrypted);
    setDecryptedPreview("");
    setWorkflowNote(
      "Message encrypted. Click Send to move it into chat history.",
    );
  };

  const handleSend = () => {
    if (!message.trim() && !encryptedPreview.trim()) {
      setWorkflowNote("Type a message first, then Encrypt or Send.");
      return;
    }

    const encryptedPayload = encryptedPreview.trim()
      ? encryptedPreview
      : getCipherHandler().encrypt(message, keyValue);
    const decryptedPayload = getCipherHandler().decrypt(
      encryptedPayload,
      keyValue,
    );

    const nextMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: messages.length % 2 === 0 ? "User A" : "User B",
      plaintext: message,
      encrypted: encryptedPayload,
      decrypted: decryptedPayload,
      cipher,
      key: keyValue,
    };

    setMessages((current) => [...current, nextMessage]);
    setMessage("");
    setEncryptedPreview("");
    setDecryptedPreview(decryptedPayload);
    setWorkflowNote(
      "Message sent. Receiver can view decrypted output in chat history.",
    );
  };

  const handleDecrypt = () => {
    if (!encryptedPreview.trim()) {
      setWorkflowNote(
        "Encrypt or send a message first so there is ciphertext to decrypt.",
      );
      return;
    }

    const decrypted = getCipherHandler().decrypt(encryptedPreview, keyValue);
    setDecryptedPreview(decrypted);
    setWorkflowNote(
      "Decryption complete. Compare decrypted text with original plaintext.",
    );
  };

  return (
    <main className="app-shell">
      <div className="backdrop" aria-hidden="true" />
      <div className="layout">
        <CipherControls
          cipher={cipher}
          keyValue={keyValue}
          message={message}
          encryptedPreview={encryptedPreview}
          decryptedPreview={decryptedPreview}
          workflowNote={workflowNote}
          onCipherChange={setCipher}
          onKeyChange={setKeyValue}
          onMessageChange={setMessage}
          onEncrypt={handleEncrypt}
          onSend={handleSend}
          onDecrypt={handleDecrypt}
        />
        <ChatHistory messages={messages} />
      </div>
    </main>
  );
}

export default App;
