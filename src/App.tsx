import { useState } from "react";
import { ChatHistory } from "./components/ChatHistory";
import { CipherControls } from "./components/CipherControls";
import type { ChatMessage, CipherOption } from "./types/chat";
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
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const handleEncrypt = () => {
    if (!message.trim()) return;
    setEncryptedPreview(`[${cipher.toUpperCase()}] ${message}`);
  };

  const handleSend = () => {
    if (!encryptedPreview.trim()) return;

    const nextMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: messages.length % 2 === 0 ? "User A" : "User B",
      plaintext: message,
      encrypted: encryptedPreview,
      decrypted: "(Pending integration)",
      cipher,
      key: keyValue,
    };

    setMessages((current) => [...current, nextMessage]);
    setMessage("");
    setEncryptedPreview("");
  };

  const handleDecrypt = () => {
    if (!encryptedPreview.trim()) return;
    setEncryptedPreview(`${encryptedPreview} -> (decrypted preview pending)`);
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
