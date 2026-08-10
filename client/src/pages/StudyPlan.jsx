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
      e.preventDefault();
      generatePlan();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.iconBox}>
            📘
          </div>

          <div>
            <h1 style={styles.title}>
              AI Study Planner
            </h1>

            <p style={styles.subtitle}>
              Create a smart, personalized study schedule
              with AI.
            </p>
          </div>
        </div>

        {/* PLANNER CARD */}
        <div style={styles.plannerCard}>

          <div style={styles.sectionTitle}>
            🎯 Tell us about your study goal
          </div>

          {/* SUBJECT */}
          <div style={styles.field}>
            <label style={styles.label}>
              📚 Subject
            </label>

            <input
              type="text"
              placeholder="e.g. DBMS, React, Java"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              disabled={loading}
              style={styles.input}
            />
          </div>

          {/* DATE + HOURS */}
          <div style={styles.row}>

            <div style={styles.field}>
              <label style={styles.label}>
                📅 Exam Date
              </label>

              <input
                type="date"
                value={examDate}
                onChange={(e) => {
                  setExamDate(e.target.value);
                  setError("");
                }}
                disabled={loading}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                ⏱️ Hours Per Day
              </label>

              <input
                type="number"
                min="1"
                max="24"
                placeholder="e.g. 3"
                value={hoursPerDay}
                onChange={(e) => {
                  setHoursPerDay(e.target.value);
                  setError("");
                }}
                disabled={loading}
                style={styles.input}
              />
            </div>

          </div>

          {/* QUICK SUBJECTS */}
          <div style={styles.quickSection}>
            <span style={styles.quickLabel}>
              Quick topics:
            </span>

            <button
              style={styles.quickButton}
              onClick={() => setSubject("Java")}
              disabled={loading}
            >
              ☕ Java
            </button>

            <button
              style={styles.quickButton}
              onClick={() => setSubject("DBMS")}
              disabled={loading}
            >
              🗄️ DBMS
            </button>

            <button
              style={styles.quickButton}
              onClick={() => setSubject("React")}
              disabled={loading}
            >
              ⚛️ React
            </button>

            <button
              style={styles.quickButton}
              onClick={() =>
                setSubject("Operating Systems")
              }
              disabled={loading}
            >
              💻 OS
            </button>
          </div>

          {/* GENERATE BUTTON */}
          <button
            onClick={generatePlan}
            disabled={
              loading ||
              !subject.trim() ||
              !examDate ||
              !hoursPerDay
            }
            style={{
              ...styles.button,
              opacity:
                loading ||
                !subject.trim() ||
                !examDate ||
                !hoursPerDay
                  ? 0.5
                  : 1,
              cursor:
                loading ||
                !subject.trim() ||
                !examDate ||
                !hoursPerDay
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {loading
              ? "⏳ Creating Your Plan..."
              : "🚀 Generate Study Plan"}
          </button>

        </div>

        {/* ERROR */}
        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {/* OUTPUT CARD */}
        <div style={styles.outputCard}>

          <div style={styles.outputHeader}>
            <div>
              <h2 style={styles.outputTitle}>
                📋 Your Study Plan
              </h2>

              <p style={styles.outputSubtitle}>
                Your personalized AI-generated schedule
              </p>
            </div>

            {plan && !loading && (
              <div style={styles.readyBadge}>
                ✓ Ready
              </div>
            )}
          </div>

          <div style={styles.divider}></div>

          {/* EMPTY STATE */}
          {!loading && !plan && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                📅
              </div>

              <h3 style={styles.emptyTitle}>
                Plan your preparation
              </h3>

              <p style={styles.emptyText}>
                Enter your subject, exam date and available
                study hours. AI will create a personalized
                schedule for you.
              </p>

              <div style={styles.featureRow}>
                <div style={styles.feature}>
                  <span>📚</span>
                  <p>Topic Planning</p>
                </div>

                <div style={styles.feature}>
                  <span>⏰</span>
                  <p>Time Management</p>
                </div>

                <div style={styles.feature}>
                  <span>🎯</span>
                  <p>Exam Focus</p>
                </div>
              </div>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div style={styles.loadingState}>
              <div style={styles.loadingIcon}>
                🧠
              </div>

              <h3 style={styles.loadingTitle}>
                Building your study plan...
              </h3>

              <p style={styles.loadingText}>
                AI is creating a personalized schedule
                for <strong>{subject}</strong>.
              </p>

              <div style={styles.loadingDots}>
                <span>●</span>
                <span>●</span>
                <span>●</span>
              </div>
            </div>
          )}

          {/* PLAN */}
          {!loading && plan && (
            <div style={styles.planContent}>
              {plan}
            </div>
          )}

        </div>

        {/* FOOTER */}
        <p style={styles.footer}>
          ✨ AI Study Buddy • Plan smarter, learn better
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

  /* PLANNER */

  plannerCard: {
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

  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#ffffff",
  },

  row: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "15px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px",
  },

  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#c7d2fe",
    marginBottom: "8px",
  },

  input: {
    width: "100%",
    padding: "14px 15px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.13)",
    outline: "none",
    background:
      "rgba(255,255,255,0.07)",
    color: "#ffffff",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  quickSection: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "8px",
    marginBottom: "20px",
  },

  quickLabel: {
    color: "#818cf8",
    fontSize: "12px",
    marginRight: "3px",
  },

  quickButton: {
    padding: "7px 11px",
    borderRadius: "9px",
    border:
      "1px solid rgba(255,255,255,0.1)",
    background:
      "rgba(255,255,255,0.05)",
    color: "#dbeafe",
    cursor: "pointer",
    fontSize: "12px",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "13px",
    border: "none",
    background:
      "linear-gradient(135deg, #2563eb, #6366f1)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    boxShadow:
      "0 8px 20px rgba(37,99,235,0.3)",
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

  /* OUTPUT */

  outputCard: {
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

  outputHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  outputTitle: {
    margin: "0",
    fontSize: "20px",
    color: "#ffffff",
  },

  outputSubtitle: {
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

  featureRow: {
    display: "flex",
    justifyContent: "center",
    gap: "35px",
    marginTop: "22px",
    flexWrap: "wrap",
  },

  feature: {
    textAlign: "center",
    color: "#a5b4fc",
    fontSize: "12px",
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

  /* PLAN */

  planContent: {
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

export default StudyPlan;