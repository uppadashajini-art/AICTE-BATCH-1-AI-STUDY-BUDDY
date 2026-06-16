import { useState } from "react";
import axios from "axios";

function UploadNotes() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/summary/summarize",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSummary(res.data.summary);

    } catch (err) {
      console.log(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>📄 Upload Notes</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      <br /><br />

      {summary && (
        <div>
          <h3>🧠 Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default UploadNotes;