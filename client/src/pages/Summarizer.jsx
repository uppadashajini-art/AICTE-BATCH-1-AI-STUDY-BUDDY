import { useState } from "react";
import axios from "axios";

function Summarizer() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSummary("");

      const formData = new FormData();
      formData.append("pdf", file);

      const res = await axios.post(
        "http://localhost:5000/api/summary/summarize",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSummary(res.data.summary || "No summary generated");
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      setError(error?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>📄 AI PDF Summarizer</h1>
        <p style={styles.subtitle}>
          Upload your PDF and get instant AI-generated notes
        </p>

        {/* FILE INPUT */}
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />

        {/* BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Summarizing..." : "🚀 Summarize PDF"}
        </button>

        {/* ERROR */}
        {error && <p style={styles.error}>{error}</p>}

        {/* OUTPUT */}
        <div style={styles.output}>
          {loading
            ? "⏳ Reading your PDF..."
            : summary || "Your summary will appear here"}
        </div>
      </div>
    </div>
  );
}

/* 🎨 SAME STUDYPLAN DARK UI THEME */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e1b4b, #0b1020)",
    fontFamily: "Arial",
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
    color: "white",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
  },

  output: {
    marginTop: "10px",
    padding: "18px",
    borderRadius: "12px",
    background: "#ffffff",
    color: "#111",
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

export default Summarizer;