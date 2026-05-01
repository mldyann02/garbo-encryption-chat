import { useState } from "react";
import { ChatHistory } from "./components/ChatHistory";
import { UserAPanel } from "./components/UserAPanel";
import { UserBPanel } from "./components/UserBPanel";
import type { ChatMessage, CipherOption } from "./types/chat";
import { ciphers } from "./utils/ciphers";
import "./App.css";

const initialMessages: ChatMessage[] = [];

function App() {
  // User A state
  const [cipherA, setCipherA] = useState<CipherOption>("caesar");
  const [keyValueA, setKeyValueA] = useState("3");
  const [plaintextA, setPlaintextA] = useState("");

  // User B state
  const [cipherB, setCipherB] = useState<CipherOption>("caesar");
  const [keyValueB, setKeyValueB] = useState("3");
  const [plaintextB, setPlaintextB] = useState("");

  // Shared state
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [showChatHistory, setShowChatHistory] = useState(true);
  const [decryptionKeyA, setDecryptionKeyA] = useState("3");
  const [decryptionKeyB, setDecryptionKeyB] = useState("3");

  const cipherMap = ciphers as Record<
    CipherOption,
    {
      encrypt: (text: string, key: string) => string;
      decrypt: (text: string, key: string) => string;
    }
  >;

  const getCipherHandler = (cipher: CipherOption) =>
    cipherMap[cipher] ?? cipherMap.caesar;

  // User A sends a message
  const handleSendA = () => {
    if (!plaintextA.trim()) {
      return;
    }

    const encrypted = getCipherHandler(cipherA).encrypt(plaintextA, keyValueA);

    const nextMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "User A",
      plaintext: plaintextA,
      encrypted: encrypted,
      decrypted: plaintextA, // User A can see their own plaintext
      cipher: cipherA,
      key: keyValueA,
    };

    setMessages((current) => [...current, nextMessage]);
    setPlaintextA("");
  };

  // User B sends a message
  const handleSendB = () => {
    if (!plaintextB.trim()) {
      return;
    }

    const encrypted = getCipherHandler(cipherB).encrypt(plaintextB, keyValueB);

    const nextMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "User B",
      plaintext: plaintextB,
      encrypted: encrypted,
      decrypted: plaintextB, // User B can see their own plaintext
      cipher: cipherB,
      key: keyValueB,
    };

    setMessages((current) => [...current, nextMessage]);
    setPlaintextB("");
  };

  // Get decrypted message for User A viewing messages from User B
  const getDecryptedMessageForA = (msg: ChatMessage) => {
    if (msg.sender === "User A") {
      return msg.plaintext; // User A can see their own messages
    }
    // Try to decrypt User B's message with User A's decryption key
    try {
      return getCipherHandler(msg.cipher).decrypt(msg.encrypted, decryptionKeyA);
    } catch {
      return "[Unable to decrypt]";
    }
  };

  // Get decrypted message for User B viewing messages from User A
  const getDecryptedMessageForB = (msg: ChatMessage) => {
    if (msg.sender === "User B") {
      return msg.plaintext; // User B can see their own messages
    }
    // Try to decrypt User A's message with User B's decryption key
    try {
      return getCipherHandler(msg.cipher).decrypt(msg.encrypted, decryptionKeyB);
    } catch {
      return "[Unable to decrypt]";
    }
  };

  const handleClearChatHistory = () => {
    setMessages([]);
  };

  return (
    <main className="app-shell">
      <div className="backdrop" aria-hidden="true" />
      <div className="app-header">
        <h1>Conventional Encryptions Chat Program</h1>
        <p className="app-subtitle">By Melody Ann M. Garbo</p>
        <div className="header-controls">
          <button
            type="button"
            className="btn-toggle"
            onClick={() => setShowChatHistory(!showChatHistory)}
          >
            {showChatHistory ? "Hide" : "Show"} Chat History
          </button>
          <button
            type="button"
            className="btn-clear-chat"
            onClick={handleClearChatHistory}
          >
            Clear Chat History
          </button>
        </div>
      </div>

      <div className={`layout ${!showChatHistory ? "hide-chat" : ""}`}>
        <UserAPanel
          cipherA={cipherA}
          keyValueA={keyValueA}
          plaintextA={plaintextA}
          decryptionKeyA={decryptionKeyA}
          messages={messages}
          onCipherAChange={setCipherA}
          onKeyValueAChange={setKeyValueA}
          onPlaintextAChange={setPlaintextA}
          onDecryptionKeyAChange={setDecryptionKeyA}
          onSendA={handleSendA}
          getDecryptedMessage={getDecryptedMessageForA}
        />

        {showChatHistory && <ChatHistory messages={messages} />}

        <UserBPanel
          cipherB={cipherB}
          keyValueB={keyValueB}
          plaintextB={plaintextB}
          decryptionKeyB={decryptionKeyB}
          messages={messages}
          onCipherBChange={setCipherB}
          onKeyValueBChange={setKeyValueB}
          onPlaintextBChange={setPlaintextB}
          onDecryptionKeyBChange={setDecryptionKeyB}
          onSendB={handleSendB}
          getDecryptedMessage={getDecryptedMessageForB}
        />
      </div>
    </main>
  );
}

export default App;
