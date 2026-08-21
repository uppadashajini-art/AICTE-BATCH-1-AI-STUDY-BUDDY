import { Link, useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Brain,
  BookOpen,
  CalendarDays,
  LogOut,
  FileText,
  ArrowRight,
  Sparkles,
  CheckCircle2,
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
      icon: <MessageSquare size={30} />,
      path: "/chat",
      description:
        "Ask questions and get instant AI-powered explanations for any topic.",
    },
    {
      title: "Generate Quiz",
      icon: <Brain size={30} />,
      path: "/quiz",
      description:
        "Test your knowledge with AI-generated quizzes and strengthen your understanding.",
    },
    {
      title: "Flashcards",
      icon: <BookOpen size={30} />,
      path: "/flashcards",
      description:
        "Create smart flashcards and revise important concepts quickly and effectively.",
    },
    {
      title: "Study Plan",
      icon: <CalendarDays size={30} />,
      path: "/study-plan",
      description:
        "Create a personalized study schedule based on your subject, exam date, and available time.",
    },
    {
      title: "PDF Summarizer",
      icon: <FileText size={30} />,
      path: "/summarizer",
      description:
        "Upload study material and turn lengthy PDF documents into easy-to-understand notes.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div
              className="
                w-11 h-11
                rounded-2xl
                bg-gradient-to-br
                from-cyan-400
                to-blue-600
                flex
                items-center
                justify-center
                shadow-lg
                shadow-cyan-500/20
              "
            >
              <span className="text-xl">🎓</span>
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                AI Study Buddy
              </h1>

              <p className="text-xs text-slate-400">
                Learn smarter. Study better.
              </p>
            </div>

          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              border
              border-red-400/20
              bg-red-500/10
              text-red-400
              hover:bg-red-500
              hover:text-white
              transition-all
              duration-300
            "
          >
            <LogOut size={17} />
            <span className="hidden sm:inline">Logout</span>
          </button>

        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* ================= HERO SECTION ================= */}
        <section
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-gradient-to-br
            from-white/[0.08]
            to-white/[0.03]
            backdrop-blur-xl
            p-8
            md:p-10
            shadow-2xl
            mb-12
          "
        >

          {/* Background Glow */}
          <div
            className="
              absolute
              -top-32
              -right-32
              w-80
              h-80
              bg-cyan-500/10
              rounded-full
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-32
              -left-32
              w-80
              h-80
              bg-indigo-500/10
              rounded-full
              blur-3xl
            "
          />

          <div className="relative">

            {/* Small Badge */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-cyan-400/10
                border
                border-cyan-400/20
                text-cyan-300
                text-xs
                font-semibold
                mb-5
              "
            >
              <Sparkles size={14} />
              AI-Powered Learning
            </div>

            {/* Heading */}
            <h2
              className="
                text-4xl
                md:text-5xl
                font-bold
                tracking-tight
                leading-tight
              "
            >
              Welcome Back 👋
            </h2>

            {/* Description */}
            <p
              className="
                text-slate-300
                mt-4
                text-base
                md:text-lg
                leading-relaxed
                max-w-3xl
              "
            >
              Continue your learning journey with intelligent tools
              designed to help you understand concepts, revise faster,
              and prepare smarter.
            </p>

            {/* Feature Highlights */}
            <div
              className="
                flex
                flex-wrap
                gap-x-6
                gap-y-3
                mt-7
                text-sm
                text-slate-300
              "
            >

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-cyan-400"
                />
                AI-powered learning
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-cyan-400"
                />
                Personalized study tools
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-cyan-400"
                />
                Learn at your own pace
              </div>

            </div>

          </div>

        </section>

        {/* ================= STUDY TOOLS ================= */}
        <section>

          {/* Section Header */}
          <div className="mb-7">

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-cyan-500/10
                  border
                  border-cyan-400/20
                  flex
                  items-center
                  justify-center
                  text-cyan-400
                "
              >
                <Brain size={21} />
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  Study Tools
                </h3>

                <p className="text-slate-400 mt-1">
                  Everything you need to study smarter.
                </p>
              </div>

            </div>

          </div>

          {/* Tool Cards */}
          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
            "
          >

            {features.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.06]
                  backdrop-blur-xl
                  p-7
                  min-h-[275px]
                  flex
                  flex-col
                  hover:bg-white/[0.10]
                  hover:border-cyan-400/30
                  hover:-translate-y-2
                  transition-all
                  duration-300
                  shadow-xl
                "
              >

                {/* Card Glow */}
                <div
                  className="
                    absolute
                    -top-24
                    -right-24
                    w-48
                    h-48
                    bg-cyan-500/10
                    rounded-full
                    blur-3xl
                    group-hover:bg-cyan-500/20
                    transition-all
                    duration-300
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
                    border
                    border-cyan-400/20
                    flex
                    items-center
                    justify-center
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
                <h4
                  className="
                    relative
                    text-xl
                    font-bold
                    mb-3
                  "
                >
                  {item.title}
                </h4>

                {/* Description */}
                <p
                  className="
                    relative
                    text-slate-400
                    leading-relaxed
                    text-sm
                  "
                >
                  {item.description}
                </p>

                {/* Open Tool */}
                <div
                  className="
                    relative
                    mt-auto
                    pt-6
                    flex
                    items-center
                    gap-2
                    text-cyan-400
                    font-semibold
                    text-sm
                    group-hover:gap-3
                    transition-all
                  "
                >
                  Open Tool

                  <ArrowRight
                    size={18}
                    className="
                      group-hover:translate-x-1
                      transition-transform
                    "
                  />
                </div>

              </Link>
            ))}

          </div>

        </section>

        {/* ================= BOTTOM CTA ================= */}
        <section
          className="
            relative
            overflow-hidden
            mt-12
            rounded-3xl
            border
            border-cyan-400/10
            bg-gradient-to-r
            from-cyan-500/10
            via-blue-500/10
            to-indigo-500/10
            p-8
            text-center
          "
        >

          {/* Glow */}
          <div
            className="
              absolute
              inset-0
              bg-cyan-500/5
              blur-3xl
            "
          />

          <div className="relative">

            <div
              className="
                inline-flex
                items-center
                justify-center
                w-12
                h-12
                rounded-2xl
                bg-cyan-400/10
                border
                border-cyan-400/20
                text-cyan-400
                mb-4
              "
            >
              <Sparkles size={22} />
            </div>

            <h3 className="text-2xl font-bold">
              Ready to learn something new?
            </h3>

            <p
              className="
                text-slate-400
                mt-2
                max-w-xl
                mx-auto
                text-sm
                leading-relaxed
              "
            >
              Choose any study tool above and let AI help you
              understand, practice, and revise more effectively.
            </p>

          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer
        className="
          border-t
          border-white/10
          mt-8
        "
      >

        <div
          className="
            max-w-6xl
            mx-auto
            px-6
            py-7
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-3
          "
        >

          <p className="text-slate-500 text-sm">
            © 2026 AI Study Buddy
          </p>

          <p className="text-slate-500 text-sm">
            Learn smarter with AI ✨
          </p>

        </div>

      </footer>

    </div>
  );
}