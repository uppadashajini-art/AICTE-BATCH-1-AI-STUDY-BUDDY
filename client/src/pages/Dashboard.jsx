import { Link, useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Brain,
  BookOpen,
  CalendarDays,
  LogOut,
  Flame,
  Trophy,
  FileText,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  // ✅ LOGOUT FUNCTION (FIXED)
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");  

    navigate("/login");
  };

  const features = [
    {
      title: "AI Chat",
      icon: <MessageSquare size={32} />,
      path: "/chat",
      description: "Get instant answers and AI-powered explanations.",
    },
  
    {
      title: "Generate Quiz",
      icon: <Brain size={32} />,
      path: "/quiz",
      description: "Create quizzes automatically from notes.",
    },
    {
      title: "Flashcards",
      icon: <BookOpen size={32} />,
      path: "/flashcards",
      description: "Revise quickly with smart flashcards.",
    },
    {
      title: "Study Plan",
      icon: <CalendarDays size={32} />,
      path: "/study-plan",
      description: "Build personalized study schedules.",
    },
     {
      title: "PDF Summarizer",
      icon: <FileText size={32} />,
      path: "/summarizer",
      description: "Upload PDFs and get AI-powered summaries instantly.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-white/10">
        <h1 className="text-3xl font-bold">
          🎓 AI Study Buddy
        </h1>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 rounded-xl font-semibold transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>

      {/* Welcome Section */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8">
          <h2 className="text-4xl font-bold">Welcome Back 👋</h2>

          <p className="text-slate-300 mt-4 text-lg">
            Continue your learning journey with AI-powered tools
            designed to help you study smarter and stay organized.
          </p>

          <div className="flex gap-4 mt-6 flex-wrap">
            <div className="bg-orange-500/20 border border-orange-400/30 px-5 py-3 rounded-2xl flex items-center gap-2">
              <Flame className="text-orange-400" />
              <span>7 Day Streak</span>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-400/30 px-5 py-3 rounded-2xl flex items-center gap-2">
              <Trophy className="text-yellow-400" />
              <span>250 XP Earned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-3xl font-bold mb-2">Study Tools</h3>

        <p className="text-slate-400 mb-8">
          Choose a tool and continue learning.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="
                bg-white/10
                backdrop-blur-md
                border border-white/10
                rounded-3xl
                p-6
                hover:scale-105
                hover:bg-white/15
                transition-all
                duration-300
              "
            >
              <div className="text-cyan-400 mb-4">
                {item.icon}
              </div>

              <h4 className="text-xl font-semibold mb-2">
                {item.title}
              </h4>

              <p className="text-slate-300">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-4">
            📈 Today's Progress
          </h3>

          <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-cyan-400 rounded-full"></div>
          </div>

          <p className="mt-4 text-slate-300">
            You completed <strong>4 out of 5</strong> study tasks today.
          </p>
        </div>
      </div>
    </div>
  );
}