import { useState } from "react";
import axios from "axios";

function Summarizer() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a PDF file only.");
      setFile(null);
      return;
    }

    // Optional file size validation: 10 MB
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Please select a PDF smaller than 10 MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError("");
    setSummary("");
    setCopied(false);
  };

  const handleUpload = async () => {
    if (!file || loading) {
      if (!file) {
        setError("Please select a PDF file.");
      }
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSummary("");
      setCopied(false);

      const formData = new FormData();
      formData.append("pdf", file);

      const res = await axios.post(
        "https://ai-study-buddy-api-j47c.onrender.com/api/summary/summarize",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const generatedSummary =
        res.data?.summary ||
        res.data?.data ||
        res.data?.result ||
        "";

      if (!generatedSummary) {
        setError("No summary was generated. Please try again.");
        return;
      }

      setSummary(
        typeof generatedSummary === "string"
          ? generatedSummary
          : JSON.stringify(generatedSummary, null, 2)
      );
    } catch (error) {
      console.error("UPLOAD ERROR:", error);

      setError(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to summarize the PDF. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const copySummary = async () => {
    if (!summary) return;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("COPY ERROR:", error);
    }
  };

  const removeFile = () => {
    if (loading) return;

    setFile(null);
    setSummary("");
    setError("");
    setCopied(false);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  /*
   * Converts plain AI text into a cleaner visual format.
   * It does NOT change the actual summary content.
   */
  const renderSummary = (text) => {
    if (!text) return null;

    const lines = text.split("\n");

    return lines.map((line, index) => {
      const trimmed = line.trim();

      if (!trimmed) {
        return <div key={index} style={styles.emptyLine} />;
      }

      // Main markdown heading
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={index} style={styles.summaryHeading3}>
            {trimmed.replace(/^###\s*/, "")}
          </h3>
        );
      }

      // Secondary markdown heading
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={index} style={styles.summaryHeading2}>
            {trimmed.replace(/^##\s*/, "")}
          </h2>
        );
      }

      // Main markdown heading
      if (trimmed.startsWith("# ")) {
        return (
          <h2 key={index} style={styles.summaryHeading1}>
            {trimmed.replace(/^#\s*/, "")}
          </h2>
        );
      }

      // Bullet points
      if (
        trimmed.startsWith("• ") ||
        trimmed.startsWith("- ") ||
        trimmed.startsWith("* ")
      ) {
        return (
          <div key={index} style={styles.bulletRow}>
            <span style={styles.bullet}>•</span>
            <span style={styles.bulletText}>
              {trimmed.replace(/^([•\-*])\s*/, "")}
            </span>
          </div>
        );
      }

      // Numbered points
      if (/^\d+[\.\)]\s/.test(trimmed)) {
        const match = trimmed.match(/^(\d+)[\.\)]\s(.*)$/);

        return (
          <div key={index} style={styles.numberRow}>
            <div style={styles.numberBadge}>{match[1]}</div>

            <div style={styles.numberText}>
              {match[2]}
            </div>
          </div>
        );
      }

      // Lines containing a colon can often be headings
      if (
        trimmed.endsWith(":") &&
        trimmed.length < 80
      ) {
        return (
          <h3 key={index} style={styles.summaryHeading3}>
            {trimmed}
          </h3>
        );
      }

      // Normal paragraph
      return (
        <p key={index} style={styles.summaryParagraph}>
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* ================= HEADER ================= */}

        <div style={styles.header}>
          <div style={styles.iconBox}>
            📄
          </div>

          <div style={styles.headerText}>
            <div style={styles.titleRow}>
              <h1 style={styles.title}>
                AI PDF Summarizer
              </h1>

              <span style={styles.aiBadge}>
                ✨ AI Powered
              </span>
            </div>

            <p style={styles.subtitle}>
              Upload your study material and turn lengthy
              PDFs into clear, easy-to-understand notes.
            </p>
          </div>
        </div>

        {/* ================= UPLOAD CARD ================= */}

        <div style={styles.uploadCard}>

          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>
                📚 Upload your study material
              </h2>

              <p style={styles.sectionDescription}>
                Select a PDF and let AI extract the important
                information for you.
              </p>
            </div>

            <div style={styles.pdfBadge}>
              PDF
            </div>
          </div>

          {/* UPLOAD AREA */}

          <label
            style={{
              ...styles.uploadArea,
              borderColor: file
                ? "rgba(34,197,94,0.45)"
                : "rgba(129,140,248,0.35)",
              background: file
                ? "rgba(34,197,94,0.05)"
                : "rgba(99,102,241,0.05)",
            }}
          >
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              style={styles.hiddenInput}
              disabled={loading}
            />

            <div
              style={{
                ...styles.uploadIcon,
                background: file
                  ? "rgba(34,197,94,0.12)"
                  : "rgba(99,102,241,0.15)",
              }}
            >
              {file ? "✓" : "📤"}
            </div>

            <h3 style={styles.uploadTitle}>
              {file
                ? "PDF Selected Successfully"
                : "Choose a PDF file"}
            </h3>

            <p style={styles.uploadText}>
              {file
                ? "Click here if you want to choose another PDF"
                : "Click to browse or select a file from your computer"}
            </p>

            <div style={styles.uploadInfo}>
              <span style={styles.fileType}>
                📄 PDF only
              </span>

              <span style={styles.fileType}>
                📦 Max 10 MB
              </span>
            </div>
          </label>

          {/* SELECTED FILE */}

          {file && (
            <div style={styles.fileCard}>

              <div style={styles.pdfFileIcon}>
                📕
              </div>

              <div style={styles.fileInfo}>
                <div style={styles.fileName}>
                  {file.name}
                </div>

                <div style={styles.fileMeta}>
                  <span>
                    {formatFileSize(file.size)}
                  </span>

                  <span style={styles.metaDot}>
                    •
                  </span>

                  <span>
                    PDF Document
                  </span>
                </div>
              </div>

              <div style={styles.fileActions}>
                <div style={styles.check}>
                  ✓
                </div>

                {!loading && (
                  <button
                    type="button"
                    onClick={removeFile}
                    style={styles.removeButton}
                  >
                    ✕
                  </button>
                )}
              </div>

            </div>
          )}

          {/* GENERATE BUTTON */}

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
            {loading ? (
              <>
                <span style={styles.buttonSpinner}>
                  ⟳
                </span>

                Analyzing PDF...
              </>
            ) : (
              <>
                ✨ Generate AI Summary
              </>
            )}
          </button>

          <p style={styles.uploadHint}>
            🔒 Your PDF is used only to generate the
            summary.
          </p>
        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div style={styles.error}>
            <div style={styles.errorIcon}>
              ⚠️
            </div>

            <div>
              <strong style={styles.errorTitle}>
                Something went wrong
              </strong>

              <div style={styles.errorText}>
                {error}
              </div>
            </div>
          </div>
        )}

        {/* ================= SUMMARY CARD ================= */}

        <div style={styles.summaryCard}>

          {/* SUMMARY HEADER */}

          <div style={styles.summaryHeader}>

            <div>
              <div style={styles.summaryTitleRow}>
                <div style={styles.summaryHeaderIcon}>
                  📝
                </div>

                <div>
                  <h2 style={styles.summaryTitle}>
                    AI Generated Summary
                  </h2>

                  <p style={styles.summarySubtitle}>
                    Important concepts and key points
                    from your PDF
                  </p>
                </div>
              </div>
            </div>

            {summary && !loading && (
              <button
                onClick={copySummary}
                style={styles.copyButton}
              >
                {copied
                  ? "✓ Copied"
                  : "📋 Copy Summary"}
              </button>
            )}

          </div>

          <div style={styles.divider}></div>

          {/* ================= EMPTY STATE ================= */}

          {!loading && !summary && (
            <div style={styles.emptyState}>

              <div style={styles.emptyIllustration}>
                <div style={styles.emptyDocument}>
                  📄
                </div>

                <div style={styles.emptySparkle}>
                  ✨
                </div>
              </div>

              <h3 style={styles.emptyTitle}>
                Your summary will appear here
              </h3>

              <p style={styles.emptyText}>
                Upload a PDF above and AI will transform
                your study material into concise,
                well-organized notes.
              </p>

              <div style={styles.featureRow}>

                <div style={styles.featureCard}>
                  <div style={styles.featureIcon}>
                    📖
                  </div>

                  <div>
                    <strong>
                      Key Concepts
                    </strong>

                    <p>
                      Important ideas
                    </p>
                  </div>
                </div>

                <div style={styles.featureCard}>
                  <div style={styles.featureIcon}>
                    ⚡
                  </div>

                  <div>
                    <strong>
                      Quick Notes
                    </strong>

                    <p>
                      Easy revision
                    </p>
                  </div>
                </div>

                <div style={styles.featureCard}>
                  <div style={styles.featureIcon}>
                    🎯
                  </div>

                  <div>
                    <strong>
                      Important Points
                    </strong>

                    <p>
                      Exam focused
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================= LOADING ================= */}

          {loading && (
            <div style={styles.loadingState}>

              <div style={styles.loadingCircle}>
                <div style={styles.loadingBrain}>
                  🧠
                </div>
              </div>

              <h3 style={styles.loadingTitle}>
                Reading your PDF...
              </h3>

              <p style={styles.loadingText}>
                AI is analyzing your document and
                creating clear, useful study notes.
              </p>

              <div style={styles.progressBar}>
                <div style={styles.progressFill}></div>
              </div>

              <div style={styles.loadingSteps}>

                <span>
                  ✓ Reading document
                </span>

                <span>
                  • Extracting concepts
                </span>

                <span>
                  • Creating summary
                </span>

              </div>

            </div>
          )}

          {/* ================= SUMMARY OUTPUT ================= */}

          {!loading && summary && (
            <div style={styles.summaryWrapper}>

              {/* SUMMARY INFO */}

              <div style={styles.summaryInfoBar}>

                <div style={styles.summaryInfoLeft}>
                  <span style={styles.readyDot}></span>

                  <span>
                    Summary generated successfully
                  </span>
                </div>

                <div style={styles.summaryInfoRight}>
                  📄 {file?.name}
                </div>

              </div>

              {/* ACTUAL SUMMARY */}

              <div style={styles.summaryContent}>
                {renderSummary(summary)}
              </div>

            </div>
          )}

        </div>

        {/* ================= FOOTER ================= */}

        <p style={styles.footer}>
          ✨ AI Study Buddy
          <span style={styles.footerDot}> • </span>
          Learn smarter, not harder
        </p>

      </div>
    </div>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = {

  /* ================= PAGE ================= */

  page: {
    minHeight: "100vh",
    width: "100%",
    background:
      "linear-gradient(135deg, #080b2a 0%, #11133f 45%, #21164f 100%)",
    color: "#ffffff",
    fontFamily:
      "Arial, Helvetica, sans-serif",
    padding: "35px 20px 45px",
    boxSizing: "border-box",
  },

  container: {
    width: "100%",
    maxWidth: "950px",
    margin: "0 auto",
  },

  /* ================= HEADER ================= */

  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "25px",
  },

  iconBox: {
    width: "60px",
    height: "60px",
    minWidth: "60px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    background:
      "linear-gradient(135deg, #6366f1, #8b5cf6)",
    boxShadow:
      "0 10px 30px rgba(99,102,241,0.35)",
  },

  headerText: {
    flex: 1,
  },

  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  title: {
    margin: 0,
    fontSize: "29px",
    fontWeight: "700",
    color: "#ffffff",
  },

  aiBadge: {
    padding: "5px 9px",
    borderRadius: "20px",
    background:
      "rgba(139,92,246,0.14)",
    border:
      "1px solid rgba(139,92,246,0.25)",
    color: "#c4b5fd",
    fontSize: "10px",
    fontWeight: "700",
  },

  subtitle: {
    margin: "7px 0 0",
    color: "#a5b4fc",
    fontSize: "14px",
    lineHeight: "1.5",
  },

  /* ================= UPLOAD CARD ================= */

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

  sectionHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "18px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
  },

  sectionDescription: {
    margin: "5px 0 0",
    color: "#8f9bb8",
    fontSize: "12px",
  },

  pdfBadge: {
    padding: "6px 9px",
    borderRadius: "8px",
    background:
      "rgba(239,68,68,0.12)",
    border:
      "1px solid rgba(239,68,68,0.2)",
    color: "#fca5a5",
    fontSize: "10px",
    fontWeight: "700",
  },

  /* ================= UPLOAD AREA ================= */

  uploadArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "215px",
    border:
      "2px dashed rgba(129,140,248,0.35)",
    borderRadius: "16px",
    cursor: "pointer",
    textAlign: "center",
    boxSizing: "border-box",
    padding: "25px",
    transition: "all 0.2s ease",
  },

  hiddenInput: {
    display: "none",
  },

  uploadIcon: {
    width: "62px",
    height: "62px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    marginBottom: "12px",
    color: "#86efac",
  },

  uploadTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#ffffff",
  },

  uploadText: {
    margin: "7px 0 12px",
    fontSize: "13px",
    color: "#9ca3af",
  },

  uploadInfo: {
    display: "flex",
    gap: "7px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  fileType: {
    padding: "5px 10px",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.06)",
    color: "#818cf8",
    fontSize: "10px",
  },

  /* ================= FILE CARD ================= */

  fileCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "15px",
    padding: "13px 14px",
    borderRadius: "13px",
    background:
      "rgba(255,255,255,0.05)",
    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  pdfFileIcon: {
    width: "42px",
    height: "42px",
    minWidth: "42px",
    borderRadius: "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "rgba(239,68,68,0.12)",
    fontSize: "21px",
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

  fileMeta: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "4px",
    color: "#6b7280",
    fontSize: "11px",
  },

  metaDot: {
    color: "#4b5563",
  },

  fileActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  check: {
    width: "27px",
    height: "27px",
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

  removeButton: {
    width: "27px",
    height: "27px",
    borderRadius: "50%",
    border:
      "1px solid rgba(255,255,255,0.08)",
    background:
      "rgba(255,255,255,0.05)",
    color: "#9ca3af",
    cursor: "pointer",
    fontSize: "11px",
  },

  /* ================= BUTTON ================= */

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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  buttonSpinner: {
    display: "inline-block",
    fontSize: "18px",
  },

  uploadHint: {
    textAlign: "center",
    color: "#5f6b85",
    fontSize: "10px",
    margin: "10px 0 0",
  },

  /* ================= ERROR ================= */

  error: {
    marginTop: "15px",
    padding: "13px 15px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    background:
      "rgba(239,68,68,0.1)",
    border:
      "1px solid rgba(239,68,68,0.2)",
    color: "#fca5a5",
    fontSize: "13px",
  },

  errorIcon: {
    fontSize: "16px",
  },

  errorTitle: {
    display: "block",
    marginBottom: "3px",
    color: "#fca5a5",
  },

  errorText: {
    color: "#fda4af",
    lineHeight: "1.5",
  },

  /* ================= SUMMARY CARD ================= */

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

  summaryTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  summaryHeaderIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "rgba(99,102,241,0.12)",
    fontSize: "20px",
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

  copyButton: {
    padding: "8px 12px",
    borderRadius: "9px",
    border:
      "1px solid rgba(129,140,248,0.2)",
    background:
      "rgba(99,102,241,0.1)",
    color: "#c7d2fe",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "600",
  },

  divider: {
    height: "1px",
    background:
      "rgba(255,255,255,0.08)",
    margin: "18px 0",
  },

  /* ================= EMPTY ================= */

  emptyState: {
    minHeight: "330px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  emptyIllustration: {
    position: "relative",
    width: "75px",
    height: "75px",
    marginBottom: "12px",
  },

  emptyDocument: {
    width: "65px",
    height: "65px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "rgba(99,102,241,0.12)",
    fontSize: "32px",
  },

  emptySparkle: {
    position: "absolute",
    right: "-2px",
    top: "-5px",
    fontSize: "20px",
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
    margin: "8px 0",
  },

  featureRow: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "22px",
    flexWrap: "wrap",
  },

  featureCard: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "10px 13px",
    borderRadius: "11px",
    background:
      "rgba(255,255,255,0.04)",
    border:
      "1px solid rgba(255,255,255,0.07)",
    color: "#c7d2fe",
    textAlign: "left",
  },

  featureIcon: {
    fontSize: "18px",
  },

  featureCardStrong: {
    fontSize: "11px",
  },

  feature: {
    textAlign: "center",
    color: "#a5b4fc",
    fontSize: "12px",
  },

  /* ================= LOADING ================= */

  loadingState: {
    minHeight: "330px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  loadingCircle: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "rgba(99,102,241,0.12)",
    border:
      "1px solid rgba(129,140,248,0.2)",
    marginBottom: "15px",
  },

  loadingBrain: {
    fontSize: "36px",
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
    lineHeight: "1.5",
  },

  progressBar: {
    width: "220px",
    height: "5px",
    marginTop: "18px",
    borderRadius: "10px",
    background:
      "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },

  progressFill: {
    width: "60%",
    height: "100%",
    borderRadius: "10px",
    background:
      "linear-gradient(90deg, #2563eb, #8b5cf6)",
  },

  loadingSteps: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "13px",
    color: "#818cf8",
    fontSize: "10px",
  },

  /* ================= SUMMARY OUTPUT ================= */

  summaryWrapper: {
    width: "100%",
  },

  summaryInfoBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    flexWrap: "wrap",
    padding: "10px 13px",
    marginBottom: "14px",
    borderRadius: "10px",
    background:
      "rgba(34,197,94,0.06)",
    border:
      "1px solid rgba(34,197,94,0.12)",
    color: "#86efac",
    fontSize: "11px",
  },

  summaryInfoLeft: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
  },

  readyDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#4ade80",
    display: "inline-block",
  },

  summaryInfoRight: {
    maxWidth: "45%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "#6b7280",
  },

  summaryContent: {
    padding: "25px",
    borderRadius: "15px",
    background:
      "rgba(0,0,0,0.15)",
    border:
      "1px solid rgba(255,255,255,0.06)",
    color: "#e5e7eb",
    fontSize: "15px",
    lineHeight: "1.75",
    overflowX: "auto",
    boxSizing: "border-box",
  },

  summaryHeading1: {
    margin: "4px 0 17px",
    paddingBottom: "10px",
    borderBottom:
      "1px solid rgba(129,140,248,0.2)",
    color: "#ffffff",
    fontSize: "23px",
  },

  summaryHeading2: {
    margin: "24px 0 10px",
    color: "#c7d2fe",
    fontSize: "20px",
  },

  summaryHeading3: {
    margin: "20px 0 8px",
    color: "#a5b4fc",
    fontSize: "16px",
    fontWeight: "700",
  },

  summaryParagraph: {
    margin: "7px 0",
    color: "#d1d5db",
    fontSize: "14px",
    lineHeight: "1.75",
  },

  bulletRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    margin: "8px 0",
    padding: "8px 10px",
    borderRadius: "9px",
    background:
      "rgba(255,255,255,0.025)",
  },

  bullet: {
    color: "#818cf8",
    fontSize: "18px",
    lineHeight: "1.2",
  },

  bulletText: {
    flex: 1,
    color: "#d1d5db",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  numberRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "11px",
    margin: "9px 0",
    padding: "9px 10px",
    borderRadius: "10px",
    background:
      "rgba(99,102,241,0.04)",
  },

  numberBadge: {
    width: "25px",
    height: "25px",
    minWidth: "25px",
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "rgba(99,102,241,0.18)",
    color: "#c7d2fe",
    fontSize: "11px",
    fontWeight: "700",
  },

  numberText: {
    flex: 1,
    color: "#d1d5db",
    fontSize: "14px",
    lineHeight: "1.6",
    paddingTop: "2px",
  },

  emptyLine: {
    height: "6px",
  },

  /* ================= FOOTER ================= */

  footer: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "11px",
    marginTop: "18px",
  },

  footerDot: {
    color: "#4b5563",
  },
};

export default Summarizer;