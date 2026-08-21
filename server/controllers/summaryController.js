const fs = require("fs");
const extractText = require("../services/pdfService");

const summarizePDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    console.log("PDF received:", req.file.originalname);
    console.log("PDF path:", req.file.path);

    const buffer = fs.readFileSync(req.file.path);

    console.log("PDF buffer loaded");

    const text = await extractText(buffer);

    console.log("PDF text extracted");
    console.log("Extracted text length:", text.length);

    return res.json({
      summary: text.slice(0, 1000),
    });

  } catch (error) {
    console.error("PDF SUMMARIZER ERROR:", error);

    return res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

module.exports = { summarizePDF };