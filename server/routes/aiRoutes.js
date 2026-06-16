import express from "express";
import askAI from "../services/aiService.js";

const router = express.Router();

/* =========================
   CHAT ROUTE
========================= */
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
    console.error("Chat Error:", error);

    res.status(500).json({
      success: false,
      message: "AI Error",
    });
  }
});

/* =========================
   QUIZ ROUTE (FIXED)
========================= */
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
Generate 5 multiple choice questions on ${topic}.

Format:
Question:
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
    console.error("Quiz Error:", error);

    res.status(500).json({
      success: false,
      message: "Quiz generation failed",
    });
  }
});

/* =========================
   FLASHCARDS ROUTE
========================= */
router.post("/flashcards", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const prompt = `
Create 10 study flashcards about ${topic}.

Format:
Q: Question
A: Answer

Keep answers short and simple.
`;

    const flashcards = await askAI(prompt);

    res.json({
      success: true,
      flashcards,
    });
  } catch (error) {
    console.error("Flashcards Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate flashcards",
    });
  }
});

/* =========================
   STUDY PLAN ROUTE
========================= */
router.post("/study-plan", async (req, res) => {
  try {
    const { subject, examDate, hoursPerDay } = req.body;

    if (!subject || !examDate || !hoursPerDay) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const prompt = `
Create a detailed study plan.

Subject: ${subject}
Exam Date: ${examDate}
Study Hours Per Day: ${hoursPerDay}

Include:
- Day-wise schedule
- Topics
- Revision plan
- Practice tests
`;

    const plan = await askAI(prompt);

    res.json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error("Study Plan Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate study plan",
    });
  }
});

export default router;