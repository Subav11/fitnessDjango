import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Dashboard() {
  const [profileExists, setProfileExists] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const firstName = user?.first_name;

  useEffect(() => {
    checkProfile();
  }, []);

  //Check if fitness profile exists
  const checkProfile = async () => {
    try {
      await api.get("/fitness-profile/");
      setProfileExists(true);
      fetchCaloriesAndMacros();
    } catch (err) {
      setProfileExists(false);
      setLoading(false);
    }
  };

  //Fetch dashboard data ONLY if profile exists
  const fetchCaloriesAndMacros = async () => {
    try {
      const res = await api.get("/calories/macros/");
      setData(res.data);
    } catch (err) {
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
        </div>
        <p className="mt-6 text-lg font-semibold text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  if (profileExists === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.15),transparent_50%)]"></div>

        <div className="relative bg-white/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-white/40 max-w-2xl">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-xl mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
            Welcome {firstName}!
          </h2>

          <p className="mt-5 text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
            Your personalized fitness journey starts here. Create your fitness
            profile to see calories, macros, and insights.
          </p>

          <Link
            to="/fitness-profile/create"
            className="mt-8 inline-block rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-200"
          >
            Create Fitness Profile
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 px-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-red-500">
          <p className="text-red-600 font-semibold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 px-6 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.1),transparent_50%)]"></div>

      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/40">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
            {firstName}'s Fitness Dashboard
          </h1>

          <div className="flex gap-3">
            <Link
              to="/fitness-profile/update"
              className="rounded-xl border-2 border-gray-300 px-5 py-2.5 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-400 hover:shadow-md transition-all duration-200"
            >
              Update Profile
            </Link>

            <Link
              to="/logout"
              className="rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-5 py-2.5 text-white font-semibold hover:shadow-xl hover:shadow-red-500/50 hover:scale-105 transition-all duration-200"
            >
              Logout
            </Link>
          </div>
        </div>

        {/* Calories Section */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold">Target Calories</h3>
              </div>
              <p className="text-5xl font-extrabold mb-2">
                {Math.round(data.target_calories)}
              </p>
              <span className="text-blue-100 font-medium">kcal daily intake goal</span>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative rounded-2xl bg-white/90 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/40">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">BMR</h3>
              </div>
              <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 mb-2">
                {Math.round(data.bmr)}
              </p>
              <span className="text-gray-600 font-medium">kcal base metabolic rate</span>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative rounded-2xl bg-white/90 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/40">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">TDEE</h3>
              </div>
              <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 mb-2">
                {Math.round(data.tdee)}
              </p>
              <span className="text-gray-600 font-medium">kcal burned daily</span>
            </div>
          </div>
        </div>

        {/* Macros */}
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            Daily Macronutrients
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative rounded-2xl bg-white/90 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/40">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Protein</h3>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                    </svg>
                  </div>
                </div>
                <p className="text-5xl font-extrabold text-blue-600 mb-2">
                  {data.protein_g}
                </p>
                <span className="text-gray-600 font-semibold text-lg">grams</span>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative rounded-2xl bg-white/90 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/40">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Carbs</h3>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                    </svg>
                  </div>
                </div>
                <p className="text-5xl font-extrabold text-green-600 mb-2">
                  {data.carbs_g}
                </p>
                <span className="text-gray-600 font-semibold text-lg">grams</span>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative rounded-2xl bg-white/90 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/40">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Fats</h3>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                    </svg>
                  </div>
                </div>
                <p className="text-5xl font-extrabold text-yellow-600 mb-2">
                  {data.fat_g}
                </p>
                <span className="text-gray-600 font-semibold text-lg">grams</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
