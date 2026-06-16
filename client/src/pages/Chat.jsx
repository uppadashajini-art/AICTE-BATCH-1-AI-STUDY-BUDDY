import { useState } from "react";
import API from "../services/api";

function Quiz() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateQuiz = async () => {
    const trimmed = topic.trim();

    if (!trimmed || loading) return;

    try {
      setLoading(true);
      setError("");
      setQuiz("");

      const res = await API.post("/api/ai/quiz", {
        topic: trimmed,
      });

      const data = res.data?.quiz ?? res.data?.data ?? res.data;

      setQuiz(
        typeof data === "string"
          ? data
          : JSON.stringify(data, null, 2)
      );

      setTopic("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to generate quiz. Try again."
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
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>
        🧠 AI Quiz Generator
      </h1>

      <p style={{ color: "#666", marginBottom: "20px" }}>
        Generate smart quizzes instantly
      </p>

      <input
        type="text"
        placeholder="Enter topic (React, DBMS, Python...)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "15px",
          outline: "none",
        }}
      />

      <button
        onClick={generateQuiz}
        disabled={loading || !topic.trim()}
        style={{
          marginTop: "10px",
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: loading ? "#888" : "#2563eb",
          color: "white",
          fontSize: "15px",
        }}
      >
        {loading ? "Generating..." : "🚀 Generate Quiz"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}

      <hr style={{ margin: "20px 0" }} />

      <h3>Quiz Output:</h3>

      <div
        style={{
          marginTop: "10px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#f8f9fa",
          whiteSpace: "pre-wrap",
          minHeight: "120px",
          color: "#111",
          fontSize: "15px",
          lineHeight: "1.6",
        }}
      >
        {loading
          ? "Creating your quiz..."
          : quiz || "Your generated quiz will appear here"}
      </div>
    </div>
  );
}

export default Quiz;