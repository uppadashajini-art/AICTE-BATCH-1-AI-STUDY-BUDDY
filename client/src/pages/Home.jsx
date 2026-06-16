import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      icon: "🤖",
      title: "AI Chat",
      description:
        "Get instant answers, explanations, and study help from your AI tutor.",
    },
    {
      icon: "📄",
      title: "Upload Notes",
      description:
        "Upload PDFs and study materials to keep all your learning resources organized.",
    },
    {
      icon: "🧠",
      title: "Quiz Generator",
      description:
        "Automatically create quizzes from your notes and test your understanding.",
    },
    {
      icon: "🗂️",
      title: "Flashcards",
      description:
        "Revise important concepts with interactive flashcards for better memory retention.",
    },
    {
      icon: "📅",
      title: "Study Plan",
      description:
        "Generate personalized study schedules based on your goals and deadlines.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          🎓 AI Study Buddy
        </h1>

        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
          Your smart learning companion designed to make studying easier,
          faster, and more effective. Learn with AI-powered tools that help
          you understand concepts, practice efficiently, and stay organized.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/login"
            className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-lg font-bold transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl text-lg font-bold transition"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold text-center mb-4">
          What Can You Do?
        </h2>

        <p className="text-center text-slate-300 mb-12">
          Everything you need to study smarter in one platform.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:scale-105 transition"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>

              <h3 className="text-2xl font-bold mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10">
          <h2 className="text-4xl font-bold mb-6 text-center">
            Why Choose AI Study Buddy?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">⚡ Faster Learning</h3>
              <p className="text-slate-300">
                Understand difficult topics quickly with AI assistance.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">🎯 Better Revision</h3>
              <p className="text-slate-300">
                Use quizzes and flashcards to reinforce your knowledge.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">📈 Stay Organized</h3>
              <p className="text-slate-300">
                Manage notes and follow personalized study plans.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-slate-400 py-8">
        © 2026 AI Study Buddy • Learn Smarter with AI
      </footer>
    </div>
  );
}