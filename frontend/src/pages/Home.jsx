import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 text-gray-800">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          Fit<span className="text-blue-600">Track</span>
        </h1>

        <p className="mt-4 max-w-xl text-lg md:text-xl text-gray-600">
          Your personalized fitness & nutrition companion powered by smart
          calculations and AI.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/register"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          What You Get
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-900">
              Smart Calories
            </h3>
            <p className="mt-3 text-gray-600">
              Automatic BMR & TDEE calculation based on your height, weight, and
              activity level.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-900">
              Macro Tracking
            </h3>
            <p className="mt-3 text-gray-600">
              Protein, carbs, and fats calculated precisely according to your
              fitness goal.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-900">
              AI Diet Plans
            </h3>
            <p className="mt-3 text-gray-600">
              Personalized meal plans generated using AI
              <span className="italic"> (coming soon)</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} FitTrack. All rights reserved.
      </footer>

    </div>
  );
}

export default Home;
