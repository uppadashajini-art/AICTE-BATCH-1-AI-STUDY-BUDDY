import { useState } from "react";
import axios from "axios";

function FlashCards() {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateCards = async () => {
    if (!topic.trim()) return;

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/ai/flashcards",
        { topic }
      );

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
      setError("Failed to generate flashcards");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "750px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ marginBottom: "15px" }}>🧠 AI Flash Cards</h1>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Enter topic (e.g. React, Python, DBMS)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "15px",
          marginBottom: "10px",
        }}
      />

      {/* BUTTON */}
      <button
        onClick={generateCards}
        disabled={loading || !topic.trim()}
        style={{
          padding: "12px 18px",
          borderRadius: "8px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: loading ? "#888" : "#2563eb",
          color: "white",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        {loading ? "Generating..." : "🧠 Create Smart Flashcards"}
      </button>

      {/* ERROR */}
      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}

      {/* OUTPUT */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#f8f9fa",
          whiteSpace: "pre-wrap",
          color: "#111",
          minHeight: "120px",
          fontSize: "15px",
          lineHeight: "1.6",
        }}
      >
        {loading
          ? "⏳ Creating your smart flashcards..."
          : cards || "Your flashcards will appear here"}
      </div>
    </div>
  );
}

export default FlashCards;