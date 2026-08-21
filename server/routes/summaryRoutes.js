import express from "express";
import fs from "fs";
import multer from "multer";
import extractText from "../services/pdfService.js";
import askAI from "../services/aiService.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

// =====================================
// TEST ROUTE
// =====================================
router.get("/test", (req, res) => {
  console.log("✅ SUMMARY TEST ROUTE HIT");

  res.json({
    success: true,
    message: "Summary route is working",
  });
});

// =====================================
// PDF SUMMARIZE ROUTE
// =====================================
router.post("/summarize", upload.single("pdf"), async (req, res) => {
  try {
    console.log("=================================");
    console.log("📥 PDF SUMMARY REQUEST RECEIVED");
    console.log("=================================");

    console.log("📄 FILE:", req.file);

    // Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF file uploaded",
      });
    }

    // Read PDF
    const buffer = fs.readFileSync(req.file.path);

    console.log("✅ PDF buffer loaded");
    console.log("📦 Buffer size:", buffer.length);

    // Extract text
    const text = await extractText(buffer);

    console.log("✅ PDF text extracted");
    console.log("📝 Extracted text length:", text.length);

    // Check text
    if (!text.trim()) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(400).json({
        success: false,
        message: "No readable text found in PDF",
      });
    }

    // =====================================
    // AI PROMPT
    // =====================================

    const prompt = `
You are an AI study assistant.

Summarize the following PDF study material clearly for a student.

Use exactly this structure:

## Short Summary

Give a simple and clear explanation of the main topic.

## Key Points

- Important point 1
- Important point 2
- Important point 3
- Important point 4
- Important point 5

## Exam Tips

- Important concept to remember
- Important definition or fact
- Important point that may be useful for exams

Keep the explanation simple and easy to understand.

PDF TEXT:

${text.slice(0, 12000)}
`;

    console.log("🤖 Sending text to Groq AI...");

    // Generate summary
    const summary = await askAI(prompt);

    console.log("✅ AI summary generated");

    // Delete uploaded PDF
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Send response
    return res.status(200).json({
      success: true,
      summary: summary || "No summary generated",
    });

  } catch (err) {
    console.error("❌ SUMMARY ERROR:", err);

    // Delete uploaded file
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: err.message || "Failed to summarize PDF",
    });
  }
});

export default router;