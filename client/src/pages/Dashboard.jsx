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
      icon: "🧠",
      title: "Quiz Generator",
      description:
        "Automatically create quizzes on any topic and test your understanding.",
    },
    {
      icon: "🗂️",
      title: "Flashcards",
      description:
        "Revise important concepts with smart flashcards for better memory retention.",
    },
    {
      icon: "📅",
      title: "Study Plan",
      description:
        "Generate personalized study schedules based on your goals and exam deadlines.",
    },
    {
      icon: "📄",
      title: "PDF Summarizer",
      description:
        "Upload your PDF notes and get concise AI-powered summaries instantly.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">
      
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-[85vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">

          {/* Logo */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="bg-cyan-400/10 border border-cyan-400/20 backdrop-blur-md rounded-2xl px-5 py-3">
              <span className="text-cyan-400 font-semibold">
                🎓 AI-Powered Learning
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            AI Study{" "}
            <span className="text-cyan-400">
              Buddy
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Your smart learning companion designed to make studying
            easier, faster, and more effective.
          </p>

          <p className="text-slate-400 max-w-2xl mx-auto mb-10">
            Learn with AI-powered tools that help you understand concepts,
            practice efficiently, revise faster, and stay organized.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/login"
              className="
                px-8 py-4
                bg-cyan-500
                hover:bg-cyan-400
                text-slate-950
                rounded-xl
                text-lg
                font-bold
                transition-all
                duration-300
                hover:scale-105
                shadow-lg
                shadow-cyan-500/20
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                px-8 py-4
                bg-white/10
                hover:bg-white/20
                border border-white/20
                rounded-xl
                text-lg
                font-bold
                transition-all
                duration-300
                hover:scale-105
                backdrop-blur-md
              "
            >
              Get Started
            </Link>
          </div>

          {/* Small Trust Text */}
          <p className="text-sm text-slate-500 mt-8">
            Learn smarter • Practice better • Achieve more 🚀
          </p>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        
        <div className="text-center mb-14">
          <p className="text-cyan-400 font-semibold mb-3">
            POWERFUL AI TOOLS
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Study Smarter
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto">
            One platform with intelligent tools designed to improve
            your learning and revision experience.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                group
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-7
                hover:bg-white/10
                hover:border-cyan-400/30
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              {/* Icon */}
              <div
                className="
                  w-16 h-16
                  flex items-center justify-center
                  bg-cyan-400/10
                  border border-cyan-400/20
                  rounded-2xl
                  text-4xl
                  mb-6
                  group-hover:scale-110
                  transition-transform
                  duration-300
                "
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom Accent */}
              <div className="mt-6 h-1 w-10 bg-cyan-400 rounded-full group-hover:w-20 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div
          className="
            bg-white/5
            backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-8 md:p-12
          "
        >
          <div className="text-center mb-12">
            <p className="text-cyan-400 font-semibold mb-3">
              WHY AI STUDY BUDDY?
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              Study Smarter, Not Harder
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">

            {/* Benefit 1 */}
            <div className="text-center">
              <div className="text-5xl mb-5">
                ⚡
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Faster Learning
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Understand difficult topics quickly with
                AI-powered explanations and instant answers.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <div className="text-5xl mb-5">
                🎯
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Better Revision
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Strengthen your knowledge using quizzes,
                flashcards, summaries, and smart revision tools.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <div className="text-5xl mb-5">
                📈
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Stay Organized
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Plan your preparation and manage your study
                time with personalized AI study plans.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div
          className="
            text-center
            bg-gradient-to-r
            from-cyan-500/10
            via-indigo-500/10
            to-purple-500/10
            border border-cyan-400/20
            rounded-3xl
            p-10 md:p-14
          "
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make Studying Easier? 🚀
          </h2>

          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Start using AI Study Buddy and transform the way
            you learn, practice, and prepare for exams.
          </p>

          <Link
            to="/register"
            className="
              inline-block
              px-8 py-4
              bg-cyan-500
              hover:bg-cyan-400
              text-slate-950
              rounded-xl
              font-bold
              text-lg
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Start Learning Free →
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-8 text-center">
        <p className="text-slate-500 text-sm">
          © 2026 AI Study Buddy
        </p>

        <p className="text-slate-600 text-xs mt-2">
          Learn Smarter with AI 🤖
        </p>
      </footer>

    </div>
  );
}