import { useState } from "react";
import axios from "axios";

function Summarizer() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a PDF file only.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError("");
    setSummary("");
  };

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

      setSummary(
        res.data.summary || "No summary generated"
      );
    } catch (error) {
      console.error("UPLOAD ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to summarize the PDF"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.iconBox}>
            📄
          </div>

          <div>
            <h1 style={styles.title}>
              AI PDF Summarizer
            </h1>

            <p style={styles.subtitle}>
              Upload your PDF and get instant AI-generated
              notes and summaries.
            </p>
          </div>
        </div>

        {/* UPLOAD CARD */}
        <div style={styles.uploadCard}>

          <div style={styles.sectionTitle}>
            📚 Upload your study material
          </div>

          {/* UPLOAD AREA */}
          <label style={styles.uploadArea}>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              style={styles.hiddenInput}
              disabled={loading}
            />

            <div style={styles.uploadIcon}>
              📤
            </div>

            <h3 style={styles.uploadTitle}>
              {file
                ? "PDF Selected"
                : "Choose a PDF file"}
            </h3>

            <p style={styles.uploadText}>
              {file
                ? "Click here to choose another file"
                : "Click to browse your files"}
            </p>

            <span style={styles.fileType}>
              PDF files only
            </span>
          </label>

          {/* SELECTED FILE */}
          {file && (
            <div style={styles.fileCard}>

              <div style={styles.pdfIcon}>
                📕
              </div>

              <div style={styles.fileInfo}>
                <div style={styles.fileName}>
                  {file.name}
                </div>

                <div style={styles.fileSize}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>

              <div style={styles.check}>
                ✓
              </div>

            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            style={{
              ...styles.button,
              opacity:
                loading || !file ? 0.5 : 1,
              cursor:
                loading || !file
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {loading
              ? "⏳ Summarizing PDF..."
              : "✨ Generate AI Summary"}
          </button>

        </div>

        {/* ERROR */}
        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {/* SUMMARY CARD */}
        <div style={styles.summaryCard}>

          <div style={styles.summaryHeader}>

            <div>
              <h2 style={styles.summaryTitle}>
                📝 AI Generated Summary
              </h2>

              <p style={styles.summarySubtitle}>
                Your PDF summarized into easy-to-read notes
              </p>
            </div>

            {summary && !loading && (
              <div style={styles.readyBadge}>
                ✓ Ready
              </div>
            )}

          </div>

          <div style={styles.divider}></div>

          {/* EMPTY STATE */}
          {!loading && !summary && (
            <div style={styles.emptyState}>

              <div style={styles.emptyIcon}>
                🧠
              </div>

              <h3 style={styles.emptyTitle}>
                Your summary will appear here
              </h3>

              <p style={styles.emptyText}>
                Upload a PDF and let AI extract the important
                concepts, key points and useful notes for you.
              </p>

              <div style={styles.featureRow}>

                <div style={styles.feature}>
                  <span>📖</span>
                  <p>Key Concepts</p>
                </div>

                <div style={styles.feature}>
                  <span>⚡</span>
                  <p>Quick Notes</p>
                </div>

                <div style={styles.feature}>
                  <span>🎯</span>
                  <p>Important Points</p>
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
                Reading your PDF...
              </h3>

              <p style={styles.loadingText}>
                AI is analyzing your document and creating
                easy-to-understand notes.
              </p>

              <div style={styles.loadingDots}>
                <span>●</span>
                <span>●</span>
                <span>●</span>
              </div>

            </div>
          )}

          {/* SUMMARY */}
          {!loading && summary && (
            <div style={styles.summaryContent}>
              {summary}
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
    margin: 0,
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

  /* UPLOAD CARD */

  uploadCard: {
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
    marginBottom: "18px",
    color: "#ffffff",
  },

  /* UPLOAD AREA */

  uploadArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "210px",
    border:
      "2px dashed rgba(129,140,248,0.35)",
    borderRadius: "16px",
    background:
      "rgba(99,102,241,0.05)",
    cursor: "pointer",
    transition: "0.2s",
    textAlign: "center",
    boxSizing: "border-box",
    padding: "25px",
  },

  hiddenInput: {
    display: "none",
  },

  uploadIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    background:
      "rgba(99,102,241,0.15)",
    marginBottom: "12px",
  },

  uploadTitle: {
    margin: "0",
    fontSize: "18px",
    color: "#ffffff",
  },

  uploadText: {
    margin: "7px 0",
    fontSize: "13px",
    color: "#9ca3af",
  },

  fileType: {
    padding: "5px 10px",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.06)",
    color: "#818cf8",
    fontSize: "11px",
  },

  /* FILE */

  fileCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "15px",
    padding: "12px 14px",
    borderRadius: "12px",
    background:
      "rgba(255,255,255,0.05)",
    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  pdfIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "rgba(239,68,68,0.12)",
    fontSize: "20px",
  },

  fileInfo: {
    flex: 1,
    minWidth: 0,
  },

  fileName: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#e5e7eb",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  fileSize: {
    fontSize: "11px",
    color: "#6b7280",
    marginTop: "3px",
  },

  check: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "rgba(34,197,94,0.15)",
    color: "#86efac",
    fontSize: "13px",
    fontWeight: "bold",
  },

  /* BUTTON */

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "18px",
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

  /* SUMMARY CARD */

  summaryCard: {
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

  summaryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
  },

  summaryTitle: {
    margin: 0,
    fontSize: "20px",
    color: "#ffffff",
  },

  summarySubtitle: {
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
    maxWidth: "520px",
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
    color: "#ffffff",
  },

  loadingText: {
    color: "#9ca3af",
    fontSize: "13px",
    maxWidth: "500px",
  },

  loadingDots: {
    display: "flex",
    gap: "5px",
    marginTop: "12px",
    color: "#6366f1",
    fontSize: "10px",
  },

  /* SUMMARY */

  summaryContent: {
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

export default Summarizer;