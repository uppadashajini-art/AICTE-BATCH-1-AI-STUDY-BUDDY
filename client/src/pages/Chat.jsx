import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

      // Add user message
      const newChat = [
        ...chat,
        {
          role: "user",
          text: trimmed,
        },
      ];

      setChat(newChat);
      setMessage("");

      // Call backend
      const res = await API.post("/api/ai/chat", {
        message: trimmed,
      });

      const reply = res.data?.reply;

      setChat([
        ...newChat,
        {
          role: "ai",
          text: reply || "Sorry, I couldn't generate a response.",
        },
      ]);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to get response from AI. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.aiIcon}>🤖</div>

          <div>
            <h1 style={styles.title}>AI Chat Assistant</h1>

            <p style={styles.subtitle}>
              Ask questions, understand concepts, and learn smarter.
            </p>
          </div>

          <div style={styles.status}>
            <span style={styles.statusDot}></span>
            Online
          </div>
        </div>

        {/* CHAT CARD */}
        <div style={styles.chatCard}>

          {/* EMPTY STATE */}
          {chat.length === 0 && !loading && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>✨</div>

              <h2 style={styles.emptyTitle}>
                How can I help you?
              </h2>

              <p style={styles.emptyText}>
                Ask me anything about programming, academics,
                concepts, or your studies.
              </p>

              <div style={styles.suggestions}>
                <button
                  style={styles.suggestion}
                  onClick={() =>
                    setMessage("Explain OOP concepts in Java")
                  }
                >
                  💻 Explain OOP in Java
                </button>

                <button
                  style={styles.suggestion}
                  onClick={() =>
                    setMessage("What is database indexing?")
                  }
                >
                  🗄️ Explain Database Indexing
                </button>

                <button
                  style={styles.suggestion}
                  onClick={() =>
                    setMessage(
                      "Give me some Java interview questions"
                    )
                  }
                >
                  🎯 Java Interview Questions
                </button>
              </div>
            </div>
          )}

          {/* CHAT MESSAGES */}
          <div style={styles.chatBox}>
            {chat.map((c, i) => (
              <div
                key={i}
                style={{
                  ...styles.messageRow,
                  justifyContent:
                    c.role === "user"
                      ? "flex-end"
                      : "flex-start",
                }}
              >

                {/* AI ICON */}
                {c.role === "ai" && (
                  <div style={styles.smallAiIcon}>
                    🤖
                  </div>
                )}

                {/* MESSAGE */}
                <div
                  style={{
                    ...styles.msg,

                    background:
                      c.role === "user"
                        ? "linear-gradient(135deg, #2563eb, #4f46e5)"
                        : "rgba(255,255,255,0.08)",

                    color:
                      c.role === "user"
                        ? "#ffffff"
                        : "#e5e7eb",

                    border:
                      c.role === "ai"
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "none",

                    borderBottomRightRadius:
                      c.role === "user"
                        ? "4px"
                        : "16px",

                    borderBottomLeftRadius:
                      c.role === "ai"
                        ? "4px"
                        : "16px",
                  }}
                >

                  {/* USER MESSAGE */}
                  {c.role === "user" ? (
                    c.text
                  ) : (

                    /* AI MARKDOWN MESSAGE */
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{

                        /* HEADINGS */

                        h1: ({ children }) => (
                          <h1 style={styles.markdownH1}>
                            {children}
                          </h1>
                        ),

                        h2: ({ children }) => (
                          <h2 style={styles.markdownH2}>
                            {children}
                          </h2>
                        ),

                        h3: ({ children }) => (
                          <h3 style={styles.markdownH3}>
                            {children}
                          </h3>
                        ),

                        h4: ({ children }) => (
                          <h4 style={styles.markdownH4}>
                            {children}
                          </h4>
                        ),

                        /* PARAGRAPH */

                        p: ({ children }) => (
                          <p style={styles.markdownP}>
                            {children}
                          </p>
                        ),

                        /* LISTS */

                        ul: ({ children }) => (
                          <ul style={styles.markdownUl}>
                            {children}
                          </ul>
                        ),

                        ol: ({ children }) => (
                          <ol style={styles.markdownOl}>
                            {children}
                          </ol>
                        ),

                        li: ({ children }) => (
                          <li style={styles.markdownLi}>
                            {children}
                          </li>
                        ),

                        /* TEXT */

                        strong: ({ children }) => (
                          <strong style={styles.markdownStrong}>
                            {children}
                          </strong>
                        ),

                        em: ({ children }) => (
                          <em style={styles.markdownEm}>
                            {children}
                          </em>
                        ),

                        /* BLOCKQUOTE */

                        blockquote: ({ children }) => (
                          <blockquote
                            style={styles.blockquote}
                          >
                            {children}
                          </blockquote>
                        ),

                        /* INLINE CODE + CODE BLOCK */

                        code: ({
                          inline,
                          className,
                          children,
                          ...props
                        }) => {
                          return inline ? (
                            <code
                              style={styles.inlineCode}
                              {...props}
                            >
                              {children}
                            </code>
                          ) : (
                            <code
                              style={styles.codeBlockCode}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },

                        pre: ({ children }) => (
                          <pre style={styles.codeBlock}>
                            {children}
                          </pre>
                        ),

                        /* HORIZONTAL LINE */

                        hr: () => (
                          <hr style={styles.horizontalLine} />
                        ),

                        /* LINKS */

                        a: ({ children, href }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.link}
                          >
                            {children}
                          </a>
                        ),

                        /* TABLE */

                        table: ({ children }) => (
                          <div style={styles.tableWrapper}>
                            <table style={styles.table}>
                              {children}
                            </table>
                          </div>
                        ),

                        thead: ({ children }) => (
                          <thead style={styles.thead}>
                            {children}
                          </thead>
                        ),

                        tbody: ({ children }) => (
                          <tbody>{children}</tbody>
                        ),

                        tr: ({ children }) => (
                          <tr style={styles.tableRow}>
                            {children}
                          </tr>
                        ),

                        th: ({ children }) => (
                          <th style={styles.tableHeader}>
                            {children}
                          </th>
                        ),

                        td: ({ children }) => (
                          <td style={styles.tableCell}>
                            {children}
                          </td>
                        ),
                      }}
                    >
                      {c.text}
                    </ReactMarkdown>
                  )}

                </div>

                {/* USER ICON */}
                {c.role === "user" && (
                  <div style={styles.smallUserIcon}>
                    👤
                  </div>
                )}

              </div>
            ))}

            {/* TYPING INDICATOR */}
            {loading && (
              <div style={styles.messageRow}>
                <div style={styles.smallAiIcon}>
                  🤖
                </div>

                <div style={styles.typingBubble}>
                  <span style={styles.dot}>●</span>
                  <span style={styles.dot}>●</span>
                  <span style={styles.dot}>●</span>

                  <span style={styles.typingText}>
                    AI is thinking...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ERROR */}
          {error && (
            <div style={styles.error}>
              ⚠️ {error}
            </div>
          )}

          {/* INPUT AREA */}
          <div style={styles.inputArea}>
            <div style={styles.inputWrapper}>

              <input
                type="text"
                placeholder="Ask your AI study assistant..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={handleKeyDown}
                disabled={loading}
                style={styles.input}
              />

              <span style={styles.enterHint}>
                Enter ↵
              </span>

            </div>

            <button
              onClick={sendMessage}
              disabled={
                loading || !message.trim()
              }
              style={{
                ...styles.button,

                opacity:
                  loading || !message.trim()
                    ? 0.5
                    : 1,

                cursor:
                  loading || !message.trim()
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {loading ? "..." : "➤"}
            </button>
          </div>

          <p style={styles.footerText}>
            AI Study Buddy can make mistakes. Verify
            important information.
          </p>

        </div>
      </div>
    </div>
  );
}

const styles = {

  /* PAGE */

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #080b2a 0%, #11133f 45%, #21164f 100%)",
    color: "#ffffff",
    fontFamily:
      "Arial, Helvetica, sans-serif",
    padding: "30px 20px",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "950px",
    margin: "0 auto",
  },

  /* HEADER */

  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "25px",
  },

  aiIcon: {
    width: "55px",
    height: "55px",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    boxShadow:
      "0 8px 25px rgba(99,102,241,0.35)",
  },

  title: {
    margin: "0",
    fontSize: "28px",
    fontWeight: "700",
  },

  subtitle: {
    margin: "5px 0 0",
    color: "#a5b4fc",
    fontSize: "14px",
  },

  status: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "7px 12px",
    borderRadius: "20px",
    background:
      "rgba(34,197,94,0.1)",
    color: "#86efac",
    fontSize: "13px",
    border:
      "1px solid rgba(34,197,94,0.2)",
  },

  statusDot: {
    width: "8px",
    height: "8px",
    background: "#22c55e",
    borderRadius: "50%",
    display: "inline-block",
  },

  /* CHAT CARD */

  chatCard: {
    background:
      "rgba(255,255,255,0.06)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "22px",
    padding: "20px",
    backdropFilter: "blur(15px)",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.3)",
  },

  /* EMPTY STATE */

  emptyState: {
    minHeight: "430px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
  },

  emptyIcon: {
    fontSize: "50px",
    marginBottom: "10px",
  },

  emptyTitle: {
    fontSize: "24px",
    margin: "5px 0",
  },

  emptyText: {
    maxWidth: "500px",
    color: "#a5b4fc",
    lineHeight: "1.6",
    fontSize: "14px",
  },

  suggestions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },

  suggestion: {
    padding: "10px 14px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.12)",
    background:
      "rgba(255,255,255,0.06)",
    color: "#e5e7eb",
    cursor: "pointer",
    fontSize: "13px",
  },

  /* CHAT */

  chatBox: {
    minHeight: "430px",
    maxHeight: "430px",
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    scrollbarWidth: "thin",
  },

  messageRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "9px",
  },

  msg: {
    maxWidth: "85%",
    padding: "12px 16px",
    borderRadius: "16px",
    fontSize: "14px",
    lineHeight: "1.6",
    wordBreak: "break-word",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.12)",
  },

  /* MARKDOWN */

  markdownH1: {
    fontSize: "23px",
    fontWeight: "700",
    margin: "5px 0 14px",
    color: "#ffffff",
    lineHeight: "1.3",
  },

  markdownH2: {
    fontSize: "20px",
    fontWeight: "700",
    margin: "18px 0 10px",
    color: "#ffffff",
    lineHeight: "1.35",
  },

  markdownH3: {
    fontSize: "17px",
    fontWeight: "600",
    margin: "15px 0 8px",
    color: "#c7d2fe",
    lineHeight: "1.4",
  },

  markdownH4: {
    fontSize: "15px",
    fontWeight: "600",
    margin: "12px 0 7px",
    color: "#ddd6fe",
  },

  markdownP: {
    margin: "0 0 12px",
    lineHeight: "1.7",
  },

  markdownUl: {
    margin: "8px 0 14px",
    paddingLeft: "24px",
  },

  markdownOl: {
    margin: "8px 0 14px",
    paddingLeft: "24px",
  },

  markdownLi: {
    marginBottom: "6px",
    lineHeight: "1.6",
    paddingLeft: "3px",
  },

  markdownStrong: {
    color: "#ffffff",
    fontWeight: "700",
  },

  markdownEm: {
    color: "#c4b5fd",
  },

  /* INLINE CODE */

  inlineCode: {
    background:
      "rgba(0,0,0,0.4)",
    padding: "3px 7px",
    borderRadius: "5px",
    fontFamily:
      "Consolas, Monaco, monospace",
    fontSize: "13px",
    color: "#c4b5fd",
  },

  /* CODE BLOCK */

  codeBlock: {
    background: "#080c18",
    padding: "15px",
    borderRadius: "10px",
    overflowX: "auto",
    margin: "14px 0",
    border:
      "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "inset 0 0 20px rgba(0,0,0,0.2)",
  },

  codeBlockCode: {
    fontFamily:
      "Consolas, Monaco, 'Courier New', monospace",
    fontSize: "13px",
    lineHeight: "1.65",
    color: "#e2e8f0",
    whiteSpace: "pre",
  },

  /* BLOCKQUOTE */

  blockquote: {
    margin: "12px 0",
    padding: "10px 15px",
    borderLeft:
      "4px solid #6366f1",
    background:
      "rgba(99,102,241,0.08)",
    color: "#cbd5e1",
    borderRadius: "0 8px 8px 0",
  },

  /* LINKS */

  link: {
    color: "#93c5fd",
    textDecoration: "underline",
  },

  /* HORIZONTAL LINE */

  horizontalLine: {
    border: "none",
    borderTop:
      "1px solid rgba(255,255,255,0.12)",
    margin: "18px 0",
  },

  /* TABLE */

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    margin: "14px 0",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
    minWidth: "450px",
  },

  thead: {
    background:
      "rgba(99,102,241,0.18)",
  },

  tableRow: {
    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
  },

  tableHeader: {
    padding: "10px 12px",
    textAlign: "left",
    fontWeight: "700",
    color: "#ffffff",
    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  tableCell: {
    padding: "9px 12px",
    color: "#d1d5db",
    border:
      "1px solid rgba(255,255,255,0.08)",
    lineHeight: "1.5",
  },

  /* ICONS */

  smallAiIcon: {
    width: "32px",
    height: "32px",
    minWidth: "32px",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },

  smallUserIcon: {
    width: "32px",
    height: "32px",
    minWidth: "32px",
    borderRadius: "10px",
    background:
      "rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },

  /* TYPING */

  typingBubble: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "12px 15px",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.08)",
    color: "#a5b4fc",
  },

  dot: {
    fontSize: "8px",
    animation:
      "pulse 1.2s infinite",
  },

  typingText: {
    marginLeft: "6px",
    fontSize: "12px",
  },

  /* INPUT */

  inputArea: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  inputWrapper: {
    flex: 1,
    position: "relative",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding:
      "15px 75px 15px 17px",
    borderRadius: "14px",
    border:
      "1px solid rgba(255,255,255,0.12)",
    outline: "none",
    background:
      "rgba(255,255,255,0.07)",
    color: "#ffffff",
    fontSize: "14px",
  },

  enterHint: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform:
      "translateY(-50%)",
    color: "#818cf8",
    fontSize: "11px",
  },

  button: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    border: "none",
    background:
      "linear-gradient(135deg, #2563eb, #6366f1)",
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "bold",
    boxShadow:
      "0 8px 20px rgba(37,99,235,0.3)",
  },

  /* ERROR */

  error: {
    marginTop: "12px",
    padding: "10px 14px",
    borderRadius: "10px",
    background:
      "rgba(239,68,68,0.1)",
    border:
      "1px solid rgba(239,68,68,0.2)",
    color: "#fca5a5",
    fontSize: "13px",
  },

  footerText: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "11px",
    margin: "12px 0 0",
  },
};

export default Chat;