import { useState } from "react";
import API from "../services/api";

function Quiz() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateQuiz = async () => {
    const trimmedTopic = topic.trim();

    if (!trimmedTopic || loading) return;

    try {
      setLoading(true);
      setError("");
      setQuiz("");

      const res = await API.post("/api/ai/quiz", {
        topic: trimmedTopic,
      });

      const data =
        res.data?.quiz ||
        res.data?.data ||
        res.data;

      setQuiz(
        typeof data === "string"
          ? data
          : JSON.stringify(data, null, 2)
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to generate quiz. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      generateQuiz();
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
              AI Quiz Generator
            </h1>

            <p style={styles.subtitle}>
              Test your knowledge with AI-generated quizzes
            </p>
          </div>
        </div>

        {/* GENERATOR CARD */}
        <div style={styles.generatorCard}>

          <label style={styles.label}>
            📚 Choose a topic
          </label>

          <div style={styles.inputRow}>
            <input
              type="text"
              placeholder="Enter topic (React, DBMS, Python...)"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              disabled={loading}
              style={styles.input}
            />

            <button
              onClick={generateQuiz}
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
                : "🚀 Generate"}
            </button>
          </div>

          <p style={styles.hint}>
            💡 Try Java, React, DBMS, Python, OS,
            Computer Networks, or any topic you want.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {/* QUIZ RESULT */}
        <div style={styles.quizCard}>

          <div style={styles.quizHeader}>
            <div>
              <h2 style={styles.quizTitle}>
                📝 Your AI Quiz
              </h2>

              <p style={styles.quizSubtitle}>
                Challenge yourself and improve your knowledge
              </p>
            </div>

            {quiz && !loading && (
              <div style={styles.readyBadge}>
                ✓ Ready
              </div>
            )}
          </div>

          <div style={styles.divider}></div>

          {/* EMPTY STATE */}
          {!loading && !quiz && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                🎯
              </div>

              <h3 style={styles.emptyTitle}>
                Ready to test yourself?
              </h3>

              <p style={styles.emptyText}>
                Enter a topic above and generate an
                AI-powered quiz to test your understanding.
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

          {/* LOADING STATE */}
          {loading && (
            <div style={styles.loadingState}>
              <div style={styles.loadingIcon}>
                🧠
              </div>

              <h3 style={styles.loadingTitle}>
                Creating your quiz...
              </h3>

              <p style={styles.loadingText}>
                AI is preparing questions based on{" "}
                <strong>{topic}</strong>
              </p>

              <div style={styles.loadingDots}>
                <span>●</span>
                <span>●</span>
                <span>●</span>
              </div>
            </div>
          )}

          {/* QUIZ OUTPUT */}
          {!loading && quiz && (
            <div style={styles.output}>
              {quiz}
            </div>
          )}

        </div>

        {/* FOOTER */}
        <p style={styles.footer}>
          ✨ AI Study Buddy • Learn smarter, test better
        </p>

      </div>
    </div>
  );
}

const styles = {
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
    width: "100%",
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
    minWidth: "135px",
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

  /* QUIZ CARD */

  quizCard: {
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

  quizHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  quizTitle: {
    margin: "0",
    fontSize: "20px",
    color: "#ffffff",
  },

  quizSubtitle: {
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
    maxWidth: "500px",
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

  /* OUTPUT */

  output: {
    minHeight: "330px",
    padding: "20px",
    borderRadius: "14px",
    background:
      "rgba(0,0,0,0.15)",
    border:
      "1px solid rgba(255,255,255,0.06)",
    color: "#e5e7eb",
    whiteSpace: "pre-wrap",
    fontSize: "15px",
    lineHeight: "1.8",
    overflowX: "auto",
    boxSizing: "border-box",
  },

  /* FOOTER */

  footer: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "11px",
    marginTop: "18px",
  },
};

export default Quiz;