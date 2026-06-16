import express from "express";
import fs from "fs";
import multer from "multer";
import askAI from "../services/aiService.js";
import pdfParse from "pdf-parse";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/summarize", upload.single("pdf"), async (req, res) => {
  try {
    console.log("📥 FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const buffer = fs.readFileSync(req.file.path);

    // ✅ FIXED USAGE
    const data = await pdfParse(buffer);

    const text = data.text || "";

    if (!text.trim()) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "No text found in PDF" });
    }

    const prompt = `
Summarize this PDF:

1. Short summary
2. Key points
3. Exam tips

TEXT:
${text.slice(0, 12000)}
`;

    const summary = await askAI(prompt);

    fs.unlinkSync(req.file.path);

    return res.json({
      success: true,
      summary,
    });

  } catch (err) {
    console.error("ERROR:", err);

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;