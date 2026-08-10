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
  ArrowRight,
  Sparkles,
  Target,
  Upload,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  /* =========================
     STUDY TOOLS
  ========================= */

  const features = [
    {
      title: "AI Chat",
      icon: <MessageSquare size={30} />,
      path: "/chat",
      description:
        "Ask questions and get instant AI-powered explanations for any topic.",
      iconBg: "bg-cyan-500/15",
      iconColor: "text-cyan-400",
    },

    {
      title: "Generate Quiz",
      icon: <Brain size={30} />,
      path: "/quiz",
      description:
        "Test your knowledge with AI-generated multiple-choice quizzes.",
      iconBg: "bg-purple-500/15",
      iconColor: "text-purple-400",
    },

    {
      title: "Flashcards",
      icon: <BookOpen size={30} />,
      path: "/flashcards",
      description:
        "Create smart flashcards and revise important concepts quickly.",
      iconBg: "bg-blue-500/15",
      iconColor: "text-blue-400",
    },

    {
      title: "Study Plan",
      icon: <CalendarDays size={30} />,
      path: "/study-plan",
      description:
        "Create a personalized study schedule based on your exam date.",
      iconBg: "bg-green-500/15",
      iconColor: "text-green-400",
    },

    {
      title: "PDF Summarizer",
      icon: <FileText size={30} />,
      path: "/summarizer",
      description:
        "Upload your PDF and turn lengthy study material into simple notes.",
      iconBg: "bg-red-500/15",
      iconColor: "text-red-400",
    },

    {
      title: "Upload Notes",
      icon: <Upload size={30} />,
      path: "/upload-notes",
      description:
        "Upload your study material and generate useful AI-powered notes.",
      iconBg: "bg-yellow-500/15",
      iconColor: "text-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}

          <Link
            to="/dashboard"
            className="flex items-center gap-3 group"
          >
            <div
              className="
                w-11 h-11
                rounded-xl
                bg-gradient-to-br
                from-cyan-400
                to-blue-600
                flex
                items-center
                justify-center
                shadow-lg
                shadow-cyan-500/20
                group-hover:scale-105
                transition
              "
            >
              🎓
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                AI Study Buddy
              </h1>

              <p className="text-xs text-slate-400 hidden sm:block">
                Learn smarter. Study better.
              </p>
            </div>
          </Link>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-red-500/10
              border
              border-red-400/20
              text-red-400
              hover:bg-red-500
              hover:text-white
              transition-all
              duration-300
              font-semibold
            "
          >
            <LogOut size={18} />

            <span className="hidden sm:block">
              Logout
            </span>
          </button>

        </div>
      </nav>


      {/* =========================
          MAIN
      ========================= */}

      <main className="max-w-7xl mx-auto px-5 md:px-6 py-8 md:py-12">

        {/* =========================
            WELCOME HERO
        ========================= */}

        <section
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.06]
            backdrop-blur-xl
            p-6
            md:p-10
            mb-10
          "
        >

          {/* Background Glow */}

          <div
            className="
              absolute
              -top-24
              -right-24
              w-72
              h-72
              bg-cyan-500/10
              rounded-full
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-32
              -left-20
              w-72
              h-72
              bg-purple-500/10
              rounded-full
              blur-3xl
            "
          />

          <div className="relative z-10">

            {/* Badge */}

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

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Welcome Back 👋
            </h2>

            <p className="mt-4 max-w-2xl text-slate-300 text-base md:text-lg leading-relaxed">
              Continue your learning journey with AI-powered
              tools designed to help you study smarter,
              revise faster, and stay organized.
            </p>


            {/* STATS */}

            <div className="flex flex-wrap gap-4 mt-7">

              {/* Streak */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  rounded-2xl
                  bg-orange-500/10
                  border
                  border-orange-400/20
                "
              >
                <div
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-orange-500/15
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Flame
                    size={20}
                    className="text-orange-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Current Streak
                  </p>

                  <p className="font-bold">
                    7 Days 🔥
                  </p>
                </div>
              </div>


              {/* XP */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  rounded-2xl
                  bg-yellow-500/10
                  border
                  border-yellow-400/20
                "
              >
                <div
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-yellow-500/15
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Trophy
                    size={20}
                    className="text-yellow-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Total XP
                  </p>

                  <p className="font-bold">
                    250 XP
                  </p>
                </div>
              </div>


              {/* Tasks */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  rounded-2xl
                  bg-cyan-500/10
                  border
                  border-cyan-400/20
                "
              >
                <div
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-cyan-500/15
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Target
                    size={20}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Today's Tasks
                  </p>

                  <p className="font-bold">
                    4 / 5 Complete
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* =========================
            STUDY TOOLS
        ========================= */}

        <section>

          <div className="flex items-end justify-between mb-7">

            <div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Study Tools
              </h3>

              <p className="text-slate-400 mt-2">
                Everything you need to study smarter.
              </p>
            </div>

          </div>


          {/* TOOL GRID */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

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
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:bg-white/[0.09]
                  hover:border-white/20
                  hover:shadow-2xl
                "
              >

                {/* Top Glow */}

                <div
                  className="
                    absolute
                    -top-16
                    -right-16
                    w-32
                    h-32
                    bg-cyan-400/5
                    rounded-full
                    blur-2xl
                    group-hover:bg-cyan-400/10
                    transition
                  "
                />


                {/* ICON */}

                <div
                  className={`
                    relative
                    w-14
                    h-14
                    rounded-2xl
                    ${item.iconBg}
                    ${item.iconColor}
                    flex
                    items-center
                    justify-center
                    mb-5
                    transition
                    duration-300
                    group-hover:scale-110
                  `}
                >
                  {item.icon}
                </div>


                {/* TITLE */}

                <h4 className="text-xl font-semibold mb-2">
                  {item.title}
                </h4>


                {/* DESCRIPTION */}

                <p className="text-slate-400 text-sm leading-relaxed min-h-[48px]">
                  {item.description}
                </p>


                {/* OPEN */}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mt-6
                    text-sm
                    font-semibold
                    text-cyan-400
                    group-hover:text-cyan-300
                  "
                >
                  Open Tool

                  <ArrowRight
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </div>

              </Link>

            ))}

          </div>

        </section>


        {/* =========================
            TODAY'S PROGRESS
        ========================= */}

        <section className="mt-10">

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.06]
              backdrop-blur-xl
              p-6
              md:p-8
            "
          >

            <div className="flex items-center justify-between mb-6">

              <div>

                <h3 className="text-xl md:text-2xl font-bold">
                  📈 Today's Progress
                </h3>

                <p className="text-slate-400 text-sm mt-1">
                  Keep going! You're almost there.
                </p>

              </div>

              <div
                className="
                  hidden
                  sm:block
                  text-2xl
                  font-bold
                  text-cyan-400
                "
              >
                80%
              </div>

            </div>


            {/* PROGRESS BAR */}

            <div className="w-full h-4 bg-slate-800/80 rounded-full overflow-hidden">

              <div
                className="
                  h-full
                  w-[80%]
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-400
                  to-blue-500
                  shadow-lg
                  shadow-cyan-500/20
                  transition-all
                "
              />

            </div>


            {/* PROGRESS TEXT */}

            <div className="flex justify-between items-center mt-4">

              <p className="text-slate-300 text-sm">
                You completed{" "}
                <strong className="text-white">
                  4 out of 5
                </strong>{" "}
                study tasks today.
              </p>

              <span className="text-xs text-slate-500">
                1 task remaining
              </span>

            </div>

          </div>

        </section>


        {/* =========================
            MOTIVATION CARD
        ========================= */}

        <section className="mt-6">

          <div
            className="
              rounded-3xl
              border
              border-purple-400/10
              bg-gradient-to-r
              from-purple-500/10
              to-cyan-500/10
              p-6
              text-center
            "
          >

            <Sparkles
              size={24}
              className="mx-auto text-cyan-400 mb-3"
            />

            <p className="text-slate-200 font-medium">
              "Small progress every day leads to big results."
            </p>

            <p className="text-slate-500 text-xs mt-2">
              Keep learning. Keep growing. 🚀
            </p>

          </div>

        </section>

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="border-t border-white/10 mt-10">

        <div className="max-w-7xl mx-auto px-6 py-6 text-center">

          <p className="text-xs text-slate-500">
            🎓 AI Study Buddy • Learn smarter, study better
          </p>

        </div>

      </footer>

    </div>
  );
}