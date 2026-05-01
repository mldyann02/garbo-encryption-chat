import type { ChatMessage } from "../types/chat";

interface ChatHistoryProps {
  messages: ChatMessage[];
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <section className="panel history-panel" aria-label="Chat history">
      <header className="history-header">
        <p className="eyebrow">Chat History</p>
        <h2>Messages Between User A and User B</h2>
      </header>

      <ul className="chat-list">
        {messages.map((message) => (
          <li
            key={message.id}
            className={`chat-item ${message.sender === "User A" ? "from-a" : "from-b"}`}
          >
            <p className="sender">{message.sender}</p>
            <p>
              <strong>Cipher:</strong> {message.cipher} | <strong>Key:</strong>{" "}
              {message.key || "-"}
            </p>
            <p>
              <strong>Plaintext:</strong> {message.plaintext}
            </p>
            <p>
              <strong>Encrypted Payload:</strong> {message.encrypted}
            </p>
            <p>
              <strong>Decrypted Output:</strong> {message.decrypted}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
