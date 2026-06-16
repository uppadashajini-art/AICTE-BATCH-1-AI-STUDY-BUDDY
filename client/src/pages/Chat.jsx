import { useState } from "react";
import API from "../services/api";

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    const trimmed = message.trim();

    if (!trimmed || loading) return;

    try {
      setLoading(true);
      setError("");

      // add user message
      const newChat = [...chat, { role: "user", text: trimmed }];
      setChat(newChat);

      setMessage("");

      const res = await API.post("/api/ai/chat", {
        message: trimmed,
      });

      const reply = res.data?.reply;

      setChat([
        ...newChat,
        { role: "ai", text: reply },
      ]);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to get response from AI"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <h1>🤖 AI Chat Assistant</h1>

      {/* CHAT BOX */}
      <div style={styles.chatBox}>
        {chat.map((c, i) => (
          <div
            key={i}
            style={{
              ...styles.msg,
              alignSelf:
                c.role === "user"
                  ? "flex-end"
                  : "flex-start",
              backgroundColor:
                c.role === "user" ? "#2563eb" : "#e5e7eb",
              color: c.role === "user" ? "white" : "black",
            }}
          >
            {c.text}
          </div>
        ))}

        {loading && (
          <div style={styles.typing}>AI is typing...</div>
        )}
      </div>

      {/* INPUT */}
      <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />

        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    fontFamily: "Arial",
  },

  chatBox: {
    height: "400px",
    border: "1px solid #ddd",
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#fafafa",
    borderRadius: "10px",
  },

  msg: {
    padding: "10px 14px",
    borderRadius: "10px",
    maxWidth: "70%",
    wordWrap: "break-word",
  },

  typing: {
    fontStyle: "italic",
    color: "#666",
  },

  inputBox: {
    display: "flex",
    marginTop: "10px",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "10px 16px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Chat;