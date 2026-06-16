import { useState } from "react";
import API from "../services/api";

function StudyPlan() {
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePlan = async () => {
    const sub = subject.trim();

    if (!sub || !examDate || !hoursPerDay || loading) return;

    try {
      setLoading(true);
      setError("");
      setPlan("");

      // ✅ FIXED: USING DEPLOYED BACKEND
      const res = await API.post("/api/ai/study-plan", {
        subject: sub,
        examDate,
        hoursPerDay,
      });

      const data = res.data?.plan ?? res.data;

      setPlan(
        typeof data === "string"
          ? data
          : JSON.stringify(data, null, 2)
      );

      setSubject("");
      setExamDate("");
      setHoursPerDay("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to generate study plan"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      generatePlan();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>📘 AI Study Planner</h1>

        <p style={styles.subtitle}>
          Create a smart personalized study schedule
        </p>

        {/* SUBJECT */}
        <input
          type="text"
          placeholder="Enter Subject (e.g. DBMS, React)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />

        {/* DATE */}
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          style={styles.input}
        />

        {/* HOURS */}
        <input
          type="number"
          placeholder="Hours per day"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(e.target.value)}
          style={styles.input}
        />

        {/* BUTTON */}
        <button
          onClick={generatePlan}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating..." : "🚀 Generate Plan"}
        </button>

        {/* ERROR */}
        {error && <p style={styles.error}>{error}</p>}

        {/* OUTPUT */}
        <div style={styles.output}>
          {loading
            ? "⏳ Creating your study plan..."
            : plan || "Your study plan will appear here"}
        </div>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
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
    color: "#fff",
    fontSize: "28px",
    margin: 0,
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
    color: "#fff",
    boxSizing: "border-box",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
  },

  output: {
    marginTop: "10px",
    padding: "18px",
    borderRadius: "12px",
    background: "#fff",
    color: "#111",
    minHeight: "160px",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  error: {
    color: "#ff4d4d",
    fontSize: "13px",
    textAlign: "center",
  },
};

export default StudyPlan;