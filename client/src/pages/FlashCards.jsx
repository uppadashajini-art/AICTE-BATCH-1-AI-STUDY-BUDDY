import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import API from "../services/api";

function FlashCards() {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateCards = async () => {
    const trimmed = topic.trim();

    if (!trimmed || loading) return;

    try {
      setLoading(true);
      setError("");
      setCards("");

      const res = await API.post("/api/ai/flashcards", {
        topic: trimmed,
      });

      console.log("API RESPONSE:", res.data);

      const data =
        res.data?.flashcards ??
        res.data?.data ??
        res.data;

      setCards(
        typeof data === "string"
          ? data
          : JSON.stringify(data, null, 2)
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to generate flashcards. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      generateCards();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.iconBox}>
            🧠
          </div>

          <div>
            <h1 style={styles.title}>
              AI Flash Cards
            </h1>

            <p style={styles.subtitle}>
              Turn any topic into smart, easy-to-review
              flashcards with AI.
            </p>
          </div>
        </div>

        {/* GENERATOR CARD */}
        <div style={styles.generatorCard}>

          <label style={styles.label}>
            📚 What do you want to learn?
          </label>

          <div style={styles.inputRow}>
            <input
              type="text"
              placeholder="Enter topic (e.g. React, Python, DBMS)"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              style={styles.input}
              disabled={loading}
            />

            <button
              onClick={generateCards}
              disabled={loading || !topic.trim()}
              style={{
                ...styles.button,
                opacity:
                  loading || !topic.trim()
                    ? 0.5
                    : 1,
                cursor:
                  loading || !topic.trim()
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {loading
                ? "Generating..."
                : "✨ Generate"}
            </button>
          </div>

          <p style={styles.hint}>
            💡 Try topics like Java, DBMS, React,
            Python, Operating Systems or Computer Networks.
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {/* FLASHCARD RESULT */}
        <div style={styles.resultCard}>

          {/* RESULT HEADER */}
          <div style={styles.resultHeader}>

            <div>
              <h2 style={styles.resultTitle}>
                📖 Your Flashcards
              </h2>

              <p style={styles.resultSubtitle}>
                AI-generated study material
              </p>
            </div>

            {cards && !loading && (
              <div style={styles.readyBadge}>
                ✓ Ready
              </div>
            )}

          </div>

          <div style={styles.divider}></div>

          {/* LOADING */}
          {loading && (
            <div style={styles.loadingState}>

              <div style={styles.loadingIcon}>
                🧠
              </div>

              <h3 style={styles.loadingTitle}>
                Creating your flashcards...
              </h3>

              <p style={styles.loadingText}>
                AI is preparing useful questions and
                answers for you.
              </p>

              <div style={styles.loadingDots}>
                <span>●</span>
                <span>●</span>
                <span>●</span>
              </div>

            </div>
          )}

          {/* EMPTY */}
          {!loading && !cards && (
            <div style={styles.emptyState}>

              <div style={styles.emptyIcon}>
                📚
              </div>

              <h3 style={styles.emptyTitle}>
                Ready to learn?
              </h3>

              <p style={styles.emptyText}>
                Enter a topic above and let AI create
                personalized flashcards for you.
              </p>

              <div style={styles.topicSuggestions}>

                <button
                  style={styles.suggestion}
                  onClick={() => setTopic("Java")}
                >
                  ☕ Java
                </button>

                <button
                  style={styles.suggestion}
                  onClick={() => setTopic("DBMS")}
                >
                  🗄️ DBMS
                </button>

                <button
                  style={styles.suggestion}
                  onClick={() => setTopic("React")}
                >
                  ⚛️ React
                </button>

                <button
                  style={styles.suggestion}
                  onClick={() => setTopic("Python")}
                >
                  🐍 Python
                </button>

              </div>

            </div>
          )}

          {/* RESULTS */}
          {!loading && cards && (
            <div style={styles.cardsContent}>

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{

                  /* H1 */

                  h1: ({ children }) => (
                    <h1 style={styles.markdownH1}>
                      {children}
                    </h1>
                  ),

                  /* H2 */

                  h2: ({ children }) => (
                    <h2 style={styles.markdownH2}>
                      {children}
                    </h2>
                  ),

                  /* H3 */

                  h3: ({ children }) => (
                    <h3 style={styles.markdownH3}>
                      {children}
                    </h3>
                  ),

                  /* H4 */

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

                  /* UNORDERED LIST */

                  ul: ({ children }) => (
                    <ul style={styles.markdownUl}>
                      {children}
                    </ul>
                  ),

                  /* ORDERED LIST */

                  ol: ({ children }) => (
                    <ol style={styles.markdownOl}>
                      {children}
                    </ol>
                  ),

                  /* LIST ITEM */

                  li: ({ children }) => (
                    <li style={styles.markdownLi}>
                      {children}
                    </li>
                  ),

                  /* BOLD */

                  strong: ({ children }) => (
                    <strong style={styles.markdownStrong}>
                      {children}
                    </strong>
                  ),

                  /* ITALIC */

                  em: ({ children }) => (
                    <em style={styles.markdownEm}>
                      {children}
                    </em>
                  ),

                  /* INLINE CODE */

                  code: ({
                    inline,
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

                  /* CODE BLOCK */

                  pre: ({ children }) => (
                    <pre style={styles.codeBlock}>
                      {children}
                    </pre>
                  ),

                  /* BLOCKQUOTE */

                  blockquote: ({ children }) => (
                    <blockquote
                      style={styles.blockquote}
                    >
                      {children}
                    </blockquote>
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
                    <tbody>
                      {children}
                    </tbody>
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
                {cards}
              </ReactMarkdown>

            </div>
          )}

        </div>

        {/* FOOTER */}
        <p style={styles.footer}>
          ✨ AI Study Buddy • Learn smarter, not harder
        </p>

      </div>
    </div>
  );
}

const styles = {

  /* PAGE */

  page: {
    minHeight: "100vh",
    width: "100%",

    background:
      "linear-gradient(135deg, #080b2a 0%, #11133f 45%, #21164f 100%)",

    color: "#ffffff",

    fontFamily:
      "Arial, Helvetica, sans-serif",

    padding: "35px 20px",

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

    gap: "16px",

    marginBottom: "25px",
  },

  iconBox: {
    width: "58px",

    height: "58px",

    minWidth: "58px",

    borderRadius: "17px",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "30px",

    background:
      "linear-gradient(135deg, #6366f1, #8b5cf6)",

    boxShadow:
      "0 10px 30px rgba(99,102,241,0.35)",
  },

  title: {
    margin: "0",

    fontSize: "29px",

    fontWeight: "700",

    color: "#ffffff",
  },

  subtitle: {
    margin: "6px 0 0",

    color: "#a5b4fc",

    fontSize: "14px",

    lineHeight: "1.5",
  },

  /* GENERATOR */

  generatorCard: {
    background:
      "rgba(255,255,255,0.06)",

    border:
      "1px solid rgba(255,255,255,0.1)",

    borderRadius: "20px",

    padding: "24px",

    backdropFilter: "blur(15px)",

    boxShadow:
      "0 15px 45px rgba(0,0,0,0.25)",
  },

  label: {
    display: "block",

    color: "#ffffff",

    fontSize: "14px",

    fontWeight: "600",

    marginBottom: "10px",
  },

  inputRow: {
    display: "flex",

    gap: "10px",
  },

  input: {
    flex: "1",

    minWidth: "0",

    padding: "15px 17px",

    borderRadius: "13px",

    border:
      "1px solid rgba(255,255,255,0.13)",

    outline: "none",

    background:
      "rgba(255,255,255,0.07)",

    color: "#ffffff",

    fontSize: "14px",

    boxSizing: "border-box",
  },

  button: {
    padding: "0 22px",

    minWidth: "130px",

    borderRadius: "13px",

    border: "none",

    background:
      "linear-gradient(135deg, #2563eb, #6366f1)",

    color: "#ffffff",

    fontSize: "14px",

    fontWeight: "700",

    boxShadow:
      "0 8px 20px rgba(37,99,235,0.3)",
  },

  hint: {
    color: "#818cf8",

    fontSize: "12px",

    margin: "12px 0 0",
  },

  /* ERROR */

  error: {
    marginTop: "15px",

    padding: "12px 15px",

    borderRadius: "11px",

    background:
      "rgba(239,68,68,0.1)",

    border:
      "1px solid rgba(239,68,68,0.2)",

    color: "#fca5a5",

    fontSize: "13px",
  },

  /* RESULT */

  resultCard: {
    marginTop: "22px",

    background:
      "rgba(255,255,255,0.06)",

    border:
      "1px solid rgba(255,255,255,0.1)",

    borderRadius: "20px",

    padding: "24px",

    minHeight: "430px",

    backdropFilter: "blur(15px)",

    boxShadow:
      "0 15px 45px rgba(0,0,0,0.25)",

    boxSizing: "border-box",
  },

  resultHeader: {
    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",
  },

  resultTitle: {
    margin: "0",

    fontSize: "20px",

    color: "#ffffff",
  },

  resultSubtitle: {
    margin: "5px 0 0",

    color: "#818cf8",

    fontSize: "12px",
  },

  readyBadge: {
    padding: "6px 11px",

    borderRadius: "20px",

    background:
      "rgba(34,197,94,0.1)",

    border:
      "1px solid rgba(34,197,94,0.2)",

    color: "#86efac",

    fontSize: "12px",

    fontWeight: "600",
  },

  divider: {
    height: "1px",

    background:
      "rgba(255,255,255,0.08)",

    margin: "18px 0",
  },

  /* EMPTY */

  emptyState: {
    minHeight: "330px",

    display: "flex",

    flexDirection: "column",

    justifyContent: "center",

    alignItems: "center",

    textAlign: "center",
  },

  emptyIcon: {
    fontSize: "50px",

    marginBottom: "10px",
  },

  emptyTitle: {
    margin: "5px 0",

    fontSize: "21px",

    color: "#ffffff",
  },

  emptyText: {
    maxWidth: "480px",

    color: "#9ca3af",

    fontSize: "14px",

    lineHeight: "1.6",
  },

  topicSuggestions: {
    display: "flex",

    flexWrap: "wrap",

    justifyContent: "center",

    gap: "9px",

    marginTop: "18px",
  },

  suggestion: {
    padding: "9px 14px",

    borderRadius: "11px",

    border:
      "1px solid rgba(255,255,255,0.1)",

    background:
      "rgba(255,255,255,0.06)",

    color: "#dbeafe",

    cursor: "pointer",

    fontSize: "13px",
  },

  /* LOADING */

  loadingState: {
    minHeight: "330px",

    display: "flex",

    flexDirection: "column",

    justifyContent: "center",

    alignItems: "center",

    textAlign: "center",
  },

  loadingIcon: {
    fontSize: "45px",

    marginBottom: "10px",
  },

  loadingTitle: {
    margin: "5px 0",

    fontSize: "20px",
  },

  loadingText: {
    color: "#9ca3af",

    fontSize: "13px",
  },

  loadingDots: {
    display: "flex",

    gap: "5px",

    marginTop: "12px",

    color: "#6366f1",

    fontSize: "10px",
  },

  /* MARKDOWN CONTENT */

  cardsContent: {
    minHeight: "330px",

    padding: "20px",

    borderRadius: "14px",

    background:
      "rgba(0,0,0,0.15)",

    border:
      "1px solid rgba(255,255,255,0.06)",

    color: "#e5e7eb",

    fontSize: "15px",

    lineHeight: "1.7",

    overflowX: "auto",

    boxSizing: "border-box",
  },

  /* HEADINGS */

  markdownH1: {
    fontSize: "25px",

    fontWeight: "700",

    color: "#ffffff",

    margin: "5px 0 18px",

    paddingBottom: "10px",

    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
  },

  markdownH2: {
    fontSize: "21px",

    fontWeight: "700",

    color: "#ffffff",

    margin: "22px 0 12px",
  },

  markdownH3: {
    fontSize: "18px",

    fontWeight: "700",

    color: "#c7d2fe",

    margin: "18px 0 10px",
  },

  markdownH4: {
    fontSize: "16px",

    fontWeight: "600",

    color: "#ddd6fe",

    margin: "15px 0 8px",
  },

  /* PARAGRAPHS */

  markdownP: {
    margin: "0 0 13px",

    lineHeight: "1.75",
  },

  /* LISTS */

  markdownUl: {
    margin: "10px 0 16px",

    paddingLeft: "25px",
  },

  markdownOl: {
    margin: "10px 0 16px",

    paddingLeft: "28px",
  },

  markdownLi: {
    marginBottom: "8px",

    paddingLeft: "4px",

    lineHeight: "1.65",
  },

  /* BOLD */

  markdownStrong: {
    color: "#ffffff",

    fontWeight: "700",
  },

  /* ITALIC */

  markdownEm: {
    color: "#c4b5fd",
  },

  /* INLINE CODE */

  inlineCode: {
    background:
      "rgba(0,0,0,0.4)",

    color: "#c4b5fd",

    padding: "3px 7px",

    borderRadius: "5px",

    fontFamily:
      "Consolas, Monaco, 'Courier New', monospace",

    fontSize: "13px",
  },

  /* CODE BLOCK */

  codeBlock: {
    background: "#080c18",

    padding: "16px",

    borderRadius: "11px",

    overflowX: "auto",

    margin: "15px 0",

    border:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "inset 0 0 20px rgba(0,0,0,0.25)",
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
    margin: "15px 0",

    padding: "12px 16px",

    borderLeft:
      "4px solid #6366f1",

    background:
      "rgba(99,102,241,0.08)",

    color: "#cbd5e1",

    borderRadius:
      "0 8px 8px 0",
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
      "1px solid rgba(255,255,255,0.1)",

    margin: "20px 0",
  },

  /* TABLE */

  tableWrapper: {
    width: "100%",

    overflowX: "auto",

    margin: "16px 0",
  },

  table: {
    width: "100%",

    borderCollapse: "collapse",

    fontSize: "13px",

    minWidth: "500px",
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
    padding: "11px 13px",

    textAlign: "left",

    fontWeight: "700",

    color: "#ffffff",

    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  tableCell: {
    padding: "10px 13px",

    color: "#d1d5db",

    border:
      "1px solid rgba(255,255,255,0.08)",

    lineHeight: "1.5",
  },

  /* FOOTER */

  footer: {
    textAlign: "center",

    color: "#6b7280",

    fontSize: "11px",

    marginTop: "18px",
  },
};

export default FlashCards;