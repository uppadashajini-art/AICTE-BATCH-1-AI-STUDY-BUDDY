import express from "express";
import askAI from "../services/aiService.js";

const router = express.Router();

// Chat
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const reply = await askAI(message);

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "AI Error",
    });
  }
});

// Generate Quiz
router.post("/quiz", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const prompt = `
Generate 5 multiple choice questions about ${topic}.

Format:

Question 1:
A)
B)
C)
D)
Answer:

Question 2:
A)
B)
C)
D)
Answer:
`;

    const quiz = await askAI(prompt);

    res.json({
      success: true,
      quiz,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Quiz generation failed",
    });
  }
});
router.post("/flashcards", async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Create 10 study flashcards about ${topic}.

Format:

Q: Question
A: Answer

Keep answers short and educational.
`;

    const flashcards = await askAI(prompt);

    res.json({
      success: true,
      flashcards
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate flashcards"
    });
  }
});
router.post("/study-plan", async (req, res) => {
  try {
    const { subject, examDate, hoursPerDay } = req.body;

    const prompt = `
Create a detailed study plan.

Subject: ${subject}
Exam Date: ${examDate}
Study Hours Per Day: ${hoursPerDay}

Requirements:
- Day-wise schedule
- Topics to cover each day
- Revision days
- Practice days
- Easy to understand
`;

    const plan = await askAI(prompt);

    res.json({
      success: true,
      plan,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate study plan",
    });
  }
});
export default router;