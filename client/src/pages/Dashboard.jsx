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

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Study tools
  const features = [
    {
      title: "AI Chat",
      icon: <MessageSquare size={32} />,
      path: "/chat",
      description:
        "Ask questions and get instant AI-powered explanations for any topic.",
    },
    {
      title: "Generate Quiz",
      icon: <Brain size={32} />,
      path: "/quiz",
      description:
        "Test your knowledge with AI-generated multiple-choice quizzes.",
    },
    {
      title: "Flashcards",
      icon: <BookOpen size={32} />,
      path: "/flashcards",
      description:
        "Create smart flashcards and revise important concepts quickly.",
    },
    {
      title: "Study Plan",
      icon: <CalendarDays size={32} />,
      path: "/study-plan",
      description:
        "Create a personalized study schedule based on your exam date.",
    },
    {
      title: "PDF Summarizer",
      icon: <FileText size={32} />,
      path: "/summarizer",
      description:
        "Upload your PDF and turn lengthy study material into simple notes.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <span className="text-2xl">🎓</span>
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                AI Study Buddy
              </h1>

              <p className="text-sm text-slate-400">
                Learn smarter. Study better.
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              flex items-center gap-2
              px-5 py-2.5
              rounded-xl
              border border-red-400/20
              bg-red-500/10
              text-red-400
              hover:bg-red-500
              hover:text-white
              transition-all
              duration-300
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Welcome */}
        <section
          className="
            mb-10
            rounded-3xl
            border border-white/10
            bg-white/[0.06]
            backdrop-blur-xl
            p-8
            shadow-2xl
          "
        >
          <h2 className="text-4xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="text-slate-300 mt-3 text-lg max-w-3xl">
            Continue your learning journey with AI-powered tools
            designed to help you study smarter and stay organized.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-7">

            {/* Streak */}
            <div
              className="
                flex items-center gap-3
                px-5 py-3
                rounded-2xl
                bg-orange-500/10
                border border-orange-400/20
              "
            >
              <Flame className="text-orange-400" size={22} />

              <div>
                <p className="text-sm text-slate-400">
                  Study Streak
                </p>

                <p className="font-bold">
                  7 Days
                </p>
              </div>
            </div>

            {/* XP */}
            <div
              className="
                flex items-center gap-3
                px-5 py-3
                rounded-2xl
                bg-yellow-500/10
                border border-yellow-400/20
              "
            >
              <Trophy className="text-yellow-400" size={22} />

              <div>
                <p className="text-sm text-slate-400">
                  XP Earned
                </p>

                <p className="font-bold">
                  250 XP
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ================= STUDY TOOLS ================= */}
        <section>

          <div className="mb-7">
            <h3 className="text-3xl font-bold">
              Study Tools
            </h3>

            <p className="text-slate-400 mt-2">
              Everything you need to study smarter.
            </p>
          </div>

          {/* IMPORTANT:
              There are ONLY 5 cards here.
              Upload Notes has been completely removed.
          */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {features.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border border-white/10
                  bg-white/[0.07]
                  backdrop-blur-xl
                  p-7
                  min-h-[270px]
                  flex flex-col
                  hover:bg-white/[0.11]
                  hover:border-cyan-400/30
                  hover:-translate-y-2
                  transition-all
                  duration-300
                  shadow-xl
                "
              >

                {/* Glow */}
                <div
                  className="
                    absolute
                    -top-20
                    -right-20
                    w-40
                    h-40
                    bg-cyan-500/10
                    rounded-full
                    blur-3xl
                    group-hover:bg-cyan-500/20
                    transition
                  "
                />

                {/* Icon */}
                <div
                  className="
                    relative
                    w-14
                    h-14
                    rounded-2xl
                    bg-cyan-500/10
                    border border-cyan-400/20
                    flex items-center justify-center
                    text-cyan-400
                    mb-6
                    group-hover:bg-cyan-500/20
                    group-hover:scale-110
                    transition-all
                    duration-300
                  "
                >
                  {item.icon}
                </div>

                {/* Title */}
                <h4 className="relative text-xl font-bold mb-3">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="relative text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Open Tool */}
                <div
                  className="
                    relative
                    mt-auto
                    pt-6
                    flex items-center gap-2
                    text-cyan-400
                    font-semibold
                    group-hover:gap-3
                    transition-all
                  "
                >
                  Open Tool
                  <span className="text-xl">→</span>
                </div>

              </Link>
            ))}

          </div>
        </section>

        {/* ================= PROGRESS ================= */}
        <section className="mt-10">

          <div
            className="
              rounded-3xl
              border border-white/10
              bg-white/[0.06]
              backdrop-blur-xl
              p-8
            "
          >

            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-2xl font-bold">
                  📈 Today's Progress
                </h3>

                <p className="text-slate-400 mt-1">
                  Keep going, you're doing great!
                </p>
              </div>

              <span className="text-cyan-400 font-bold text-lg">
                80%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

              <div
                className="
                  h-full
                  w-[80%]
                  bg-gradient-to-r
                  from-cyan-400
                  to-blue-500
                  rounded-full
                  transition-all
                  duration-500
                "
              />

            </div>

            <p className="mt-4 text-slate-300">
              You completed{" "}
              <strong className="text-white">
                4 out of 5
              </strong>{" "}
              study tasks today.
            </p>

          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-slate-500 py-8">
        © 2026 AI Study Buddy • Learn Smarter with AI
      </footer>

    </div>
  );
}