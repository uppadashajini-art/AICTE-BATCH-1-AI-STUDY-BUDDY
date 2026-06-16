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
        res.data?.quiz ??
        res.data?.data ??
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
          "Failed to generate quiz"
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
        <h1 style={styles.title}>🧠 AI Quiz Generator</h1>

        <p style={styles.subtitle}>
          Generate smart quizzes instantly
        </p>

        <input
          type="text"
          placeholder="Enter topic (React, DBMS, Python...)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          style={styles.input}
        />

        <button
          onClick={generateQuiz}
          disabled={loading || !topic.trim()}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating..." : "🚀 Generate Quiz"}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.output}>
          {loading
            ? "⏳ Creating your quiz..."
            : quiz || "Your generated quiz will appear here"}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e1b4b, #0b1020)",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },

  container: {
    width: "100%",
    maxWidth: "720px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  title: {
    textAlign: "center",
    color: "#ffffff",
    margin: 0,
    fontSize: "28px",
  },

  subtitle: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "14px",
    marginTop: "-5px",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.15)",
    outline: "none",
    fontSize: "15px",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#ffffff",
    boxSizing: "border-box",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "15px",
  },

  output: {
    marginTop: "10px",
    padding: "18px",
    borderRadius: "12px",
    background: "#ffffff",
    color: "#111827",
    minHeight: "160px",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    lineHeight: "1.6",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },

  error: {
    color: "#ff4d4d",
    fontSize: "13px",
    textAlign: "center",
  },
};

export default Quiz;