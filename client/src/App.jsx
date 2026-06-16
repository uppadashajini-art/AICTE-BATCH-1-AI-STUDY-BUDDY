import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Summarizer from "./pages/Summarizer";
import Chat from "./pages/Chat";
import UploadNotes from "./pages/UploadNotes";
import Quiz from "./pages/Quiz";
import FlashCards from "./pages/FlashCards";
import StudyPlan from "./pages/StudyPlan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/upload" element={<UploadNotes />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/flashcards" element={<FlashCards />} />
        <Route path="/study-plan" element={<StudyPlan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;