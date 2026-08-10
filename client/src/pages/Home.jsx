import { Link } from "react-router-dom";

import {
  MessageSquare,
  Brain,
  BookOpen,
  CalendarDays,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <MessageSquare size={28} />,
      title: "AI Chat",
      description:
        "Get instant answers, explanations, and personalized study help from your AI tutor.",
    },
    {
      icon: <Brain size={28} />,
      title: "Quiz Generator",
      description:
        "Generate smart quizzes automatically and test your understanding of important concepts.",
    },
    {
      icon: <BookOpen size={28} />,
      title: "Flashcards",
      description:
        "Revise important concepts quickly with simple and effective AI-generated flashcards.",
    },
    {
      icon: <CalendarDays size={28} />,
      title: "Study Plan",
      description:
        "Create personalized study schedules based on your subjects, exam dates, and available time.",
    },
    {
      icon: <FileText size={28} />,
      title: "PDF Summarizer",
      description:
        "Upload your study PDF and let AI generate a clear, concise summary of the important concepts.",
    },
  ];

  const benefits = [
    {
      icon: <Brain size={28} />,
      title: "Faster Learning",
      description:
        "Understand difficult concepts quickly with AI-powered explanations.",
    },
    {
      icon: <BookOpen size={28} />,
      title: "Better Revision",
      description:
        "Strengthen your knowledge using quizzes, flashcards, and smart revision tools.",
    },
    {
      icon: <CalendarDays size={28} />,
      title: "Stay Organized",
      description:
        "Manage your learning and follow personalized study plans to stay on track.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Sparkles size={23} />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                AI Study Buddy
              </h1>

              <p className="text-xs text-slate-400">
                Learn Smarter with AI
              </p>
            </div>

          </div>

          {/* Navigation */}

          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-sm transition shadow-lg shadow-blue-500/20"
            >
              Get Started
            </Link>

          </div>

        </div>
      </nav>


      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">

        {/* Background Glow */}

        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">

          {/* Badge */}

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-sm font-medium mb-7">

            <Sparkles size={16} />

            AI-Powered Learning Platform

          </div>


          {/* Heading */}

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">

            Study Smarter.

            <br />

            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Learn Faster.
            </span>

          </h2>


          {/* Description */}

          <p className="max-w-3xl mx-auto mt-7 text-lg md:text-xl text-slate-300 leading-relaxed">

            Your intelligent learning companion that helps you understand
            concepts, practice effectively, organize your studies, and
            prepare smarter with AI.

          </p>


          {/* Buttons */}

          <div className="flex justify-center gap-4 flex-wrap mt-10">

            <Link
              to="/register"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-lg transition shadow-xl shadow-blue-600/20"
            >

              Start Learning

              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition"
              />

            </Link>


            <Link
              to="/login"
              className="px-8 py-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 font-bold text-lg transition backdrop-blur-md"
            >
              Login
            </Link>

          </div>


          {/* Highlights */}

          <div className="flex justify-center gap-10 mt-12 flex-wrap text-sm">

            <div className="flex items-center gap-2 text-slate-300">

              <CheckCircle2
                size={18}
                className="text-cyan-400"
              />

              AI-powered tools

            </div>


            <div className="flex items-center gap-2 text-slate-300">

              <CheckCircle2
                size={18}
                className="text-cyan-400"
              />

              Personalized learning

            </div>


            <div className="flex items-center gap-2 text-slate-300">

              <CheckCircle2
                size={18}
                className="text-cyan-400"
              />

              Smart revision

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-14">

          <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-3">

            <Sparkles size={17} />

            POWERFUL STUDY TOOLS

          </div>


          <h2 className="text-4xl md:text-5xl font-bold">

            Everything You Need to Study Better

          </h2>


          <p className="text-slate-400 max-w-2xl mx-auto mt-4">

            One platform with AI-powered tools designed to make your
            learning journey easier, faster, and more effective.

          </p>

        </div>


        {/* ================= 5 FEATURE CARDS ================= */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature, index) => (

            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 hover:bg-white/10 hover:border-cyan-400/20 hover:-translate-y-1 transition-all duration-300"
            >

              {/* Icon */}

              <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition">

                {feature.icon}

              </div>


              {/* Title */}

              <h3 className="text-xl font-bold mb-3">

                {feature.title}

              </h3>


              {/* Description */}

              <p className="text-slate-400 leading-relaxed">

                {feature.description}

              </p>


              {/* PDF Summarizer Link */}

              {feature.title === "PDF Summarizer" && (

                <Link
                  to="/summarizer"
                  className="inline-block mt-5 text-cyan-400 hover:text-cyan-300 font-semibold transition"
                >
                  Summarize PDF
                </Link>

              )}

            </div>

          ))}

        </div>

      </section>


      {/* ================= BENEFITS ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">

          {/* Background Glow */}

          <div className="absolute right-0 top-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />

          <div className="relative">

            <div className="text-center mb-12">

              <h2 className="text-4xl md:text-5xl font-bold">

                Why Choose AI Study Buddy?

              </h2>


              <p className="text-slate-400 mt-4">

                Make every study session more productive.

              </p>

            </div>


            <div className="grid md:grid-cols-3 gap-8">

              {benefits.map((benefit, index) => (

                <div
                  key={index}
                  className="text-center"
                >

                  {/* Icon */}

                  <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 mb-5">

                    {benefit.icon}

                  </div>


                  {/* Title */}

                  <h3 className="text-xl font-bold mb-3">

                    {benefit.title}

                  </h3>


                  {/* Description */}

                  <p className="text-slate-400 leading-relaxed">

                    {benefit.description}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="max-w-5xl mx-auto px-6 pb-20">

        <div className="relative overflow-hidden text-center rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-10 md:p-14">

          <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />

          <div className="relative">

            <div className="text-4xl mb-5">
              🚀
            </div>


            <h2 className="text-3xl md:text-4xl font-bold">

              Ready to Study Smarter?

            </h2>


            <p className="text-slate-400 mt-4 max-w-xl mx-auto">

              Create your account and start using AI-powered tools
              to improve your learning today.

            </p>


            <Link
              to="/register"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold transition shadow-lg shadow-blue-600/20"
            >

              Create Free Account

              <ArrowRight size={19} />

            </Link>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-2">

            <Sparkles
              size={18}
              className="text-cyan-400"
            />

            <span className="font-semibold">
              AI Study Buddy
            </span>

          </div>


          <p className="text-sm text-slate-500">

            © 2026 AI Study Buddy • Learn Smarter with AI

          </p>

        </div>

      </footer>

    </div>
  );
}