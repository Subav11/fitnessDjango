import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 text-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.15),transparent_50%)]"></div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>

        <div className="relative">
          <div className="mb-6 inline-block">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-6 hover:rotate-12 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-2">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Fit
            </span>
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700 bg-clip-text text-transparent">
              Track
            </span>
          </h1>

          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full border border-blue-200 mb-6">
            <p className="text-sm font-semibold text-blue-700">Smart Fitness Companion</p>
          </div>

          <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
            Your personalized fitness & nutrition companion powered by smart
            calculations and AI.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              to="/register"
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              Get Started
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-xl border-2 border-gray-300 bg-white/80 backdrop-blur-sm text-gray-700 font-bold text-lg hover:bg-white hover:border-gray-400 hover:shadow-xl transition-all duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 py-20 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-900 to-cyan-900 bg-clip-text text-transparent mb-4">
            What You Get
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Powerful features designed to help you achieve your fitness goals
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative rounded-2xl bg-white/90 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/40">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Smart Calories
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Automatic BMR & TDEE calculation based on your height, weight, and
                activity level.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative rounded-2xl bg-white/90 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/40">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Macro Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Protein, carbs, and fats calculated precisely according to your
                fitness goal.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative rounded-2xl bg-white/90 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/40">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                AI Diet Plans
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Personalized meal plans generated using AI
                <span className="inline-block ml-1 px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">coming soon</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-auto py-8 text-center text-sm text-gray-600 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <p className="font-medium">
          © {new Date().getFullYear()} FitTrack. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

export default Home;
