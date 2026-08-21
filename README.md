# 🤖 AI Study Buddy

AI Study Buddy is an **AI-powered learning assistant** designed to help students study more effectively. It provides tools for **summarizing content, chatting with an AI assistant, generating quizzes, and creating flashcards** from study material.

The project uses a **React + Vite frontend** and a **Node.js + Express backend**, with **MongoDB Atlas** for data storage and AI integration for intelligent learning features.

---

## ✨ Features

### 📄 AI Summarizer

* Converts lengthy study content into concise summaries.
* Helps students quickly understand important concepts.
* Useful for notes, articles, and learning materials.

### 💬 AI Chat

* Allows students to interact with an AI study assistant.
* Students can ask questions and receive contextual explanations.
* Helps clarify difficult concepts.

### 📝 AI Quiz Generator

* Generates quizzes from study content.
* Helps students test their understanding.
* Useful for self-assessment and exam preparation.

### 🗂️ AI Flashcards

* Automatically generates flashcards from learning material.
* Helps with quick revision and memorization.
* Supports active-recall based learning.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* TypeScript
* Vite
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* Mongoose

### Database

* MongoDB Atlas

### AI

* AI-powered content generation and processing

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 🏗️ Project Architecture

```text
AI Study Buddy
│
├── Frontend
│   ├── React
│   ├── TypeScript
│   ├── Vite
│   └── UI Components
│
├── Backend
│   ├── Node.js
│   ├── Express.js
│   ├── API Routes
│   ├── Controllers
│   └── Services
│
├── Database
│   └── MongoDB Atlas
│
└── AI Services
    ├── Summarizer
    ├── AI Chat
    ├── Quiz Generator
    └── Flashcard Generator
```

---

## 📂 Project Structure

```text
AI-Study-Buddy/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd AI-Study-Buddy
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
AI_API_KEY=your_ai_api_key
```

Replace the values with your actual credentials.

> **Important:** Never commit your `.env` file or API keys to GitHub.

---

## ▶️ Running the Application

### Start the Backend

```bash
cd server
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will run on the Vite development server, typically:

```text
http://localhost:5173
```

---

## 🔄 How It Works

```text
Student
   │
   ▼
React Frontend
   │
   ▼
Express REST API
   │
   ├──────────────► MongoDB Atlas
   │
   ▼
AI Service
   │
   ├── Summarization
   ├── Chat
   ├── Quiz Generation
   └── Flashcard Generation
   │
   ▼
AI Response
   │
   ▼
React UI
```

---

## 🎯 Use Cases

AI Study Buddy can be used by students for:

* 📚 Exam preparation
* 📝 Quick revision
* 🧠 Understanding difficult topics
* ❓ Practicing questions
* 🗃️ Creating revision flashcards
* 📄 Summarizing lengthy study material

---

## 🔮 Future Enhancements

* User authentication and personalized profiles
* Study progress tracking
* Personalized learning recommendations
* PDF/document upload and analysis
* Difficulty-based quiz generation
* Study schedules and reminders
* Performance analytics
* Voice-based AI interaction
* More AI-powered learning tools

---

## 👩‍💻 Author

**Shajini Uppada**

Computer Science Engineering Student
Interested in **Java, React, Spring Boot, Node.js, AI, and Full-Stack Development**.

---

## ⭐ Project Goal

The goal of AI Study Buddy is to make learning **simpler, faster, and more interactive** by combining modern web technologies with artificial intelligence.




