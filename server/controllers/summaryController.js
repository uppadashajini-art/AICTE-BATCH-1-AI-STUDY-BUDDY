const fs = require("fs");
const extractText = require("../services/pdfService");

const summarizePDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const buffer = fs.readFileSync(req.file.path);

    const text = await extractText(buffer);

    return res.json({
      summary: text.slice(0, 1000), // temporary summary
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { summarizePDF };