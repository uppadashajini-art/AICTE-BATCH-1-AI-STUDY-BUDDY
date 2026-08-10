import express from "express";
import askAI from "../services/aiService.js";

const router = express.Router();

/* =========================================================
   CHAT
   POST /api/ai/chat
========================================================= */

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Validation
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Send message to AI
    const reply = await askAI(message.trim());

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("❌ Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get AI response",
    });
  }
});


/* =========================================================
   QUIZ
   POST /api/ai/quiz
========================================================= */

router.post("/quiz", async (req, res) => {
  try {
    const { topic } = req.body;

    // Validation
    if (!topic || !topic.trim()) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const prompt = `
You are an expert educational quiz generator.

Create exactly 5 multiple-choice questions about:

Topic: ${topic.trim()}

Requirements:
- Each question must have 4 options.
- Use options A, B, C and D.
- Only one option should be correct.
- Include the correct answer after each question.
- Questions should test understanding, not just memorization.
- Keep the difficulty suitable for a college student.
- Keep explanations short.

Use this exact format:

Question 1:
[Question]

A) [Option]
B) [Option]
C) [Option]
D) [Option]

Answer: [Correct option]

Explanation: [Short explanation]


Question 2:
[Question]

A) [Option]
B) [Option]
C) [Option]
D) [Option]

Answer: [Correct option]

Explanation: [Short explanation]

Continue until Question 5.
`;

    const quiz = await askAI(prompt);

    return res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.error("❌ Quiz Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate quiz",
    });
  }
});


/* =========================================================
   FLASHCARDS
   POST /api/ai/flashcards
========================================================= */

router.post("/flashcards", async (req, res) => {
  try {
    const { topic } = req.body;

    // Validation
    if (!topic || !topic.trim()) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const prompt = `
You are an expert study assistant.

Create exactly 10 study flashcards about:

Topic: ${topic.trim()}

Requirements:
- Keep questions clear and useful.
- Keep answers short and easy to remember.
- Focus on important concepts.
- Suitable for college-level students.
- Avoid unnecessary explanations.

Use this format:

Flashcard 1:
Q: [Question]
A: [Short answer]

Flashcard 2:
Q: [Question]
A: [Short answer]

Continue until Flashcard 10.
`;

    const flashcards = await askAI(prompt);

    return res.status(200).json({
      success: true,
      flashcards,
    });
  } catch (error) {
    console.error("❌ Flashcards Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate flashcards",
    });
  }
});


/* =========================================================
   STUDY PLAN
   POST /api/ai/study-plan
========================================================= */

router.post("/study-plan", async (req, res) => {
  try {
    const {
      subject,
      examDate,
      hoursPerDay,
    } = req.body;

    // Validation
    if (
      !subject ||
      !subject.trim() ||
      !examDate ||
      !hoursPerDay
    ) {
      return res.status(400).json({
        success: false,
        message: "Subject, exam date and study hours are required",
      });
    }

    // Validate hours
    const hours = Number(hoursPerDay);

    if (Number.isNaN(hours) || hours <= 0 || hours > 24) {
      return res.status(400).json({
        success: false,
        message: "Study hours must be between 1 and 24",
      });
    }

    const prompt = `
You are an expert academic study planner.

Create a personalized study plan using the following information:

Subject: ${subject.trim()}
Exam Date: ${examDate}
Study Hours Per Day: ${hours} hours

Create a practical and realistic plan.

Include:

1. Overview
2. Day-wise study schedule
3. Topics to study each day
4. Daily revision
5. Practice questions
6. Mock tests
7. Final revision before the exam
8. Tips for effective preparation

Important:
- Divide the workload realistically.
- Do not overload a single day.
- Include revision days.
- Include practice tests before the exam.
- Give extra attention to important topics.
- Keep the plan easy to follow.

Use clear headings and bullet points.
`;

    const plan = await askAI(prompt);

    return res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error("❌ Study Plan Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate study plan",
    });
  }
});


/* =========================================================
   EXPORT ROUTER
========================================================= */

export default router;