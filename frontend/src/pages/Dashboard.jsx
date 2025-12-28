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
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  if (profileExists === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Welcome {firstName}!
        </h2>

        <p className="mt-3 text-gray-600 max-w-md">
          Your personalized fitness journey starts here. Create your fitness
          profile to see calories, macros, and insights.
        </p>

        <Link
          to="/fitness-profile/create"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
        >
          Create Fitness Profile
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {firstName}'s Fitness Dashboard
        </h1>

        <div className="flex gap-3">
          <Link
            to="/fitness-profile/update"
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            Update Profile
          </Link>

          <Link
            to="/logout"
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
          >
            Logout
          </Link>
        </div>
      </div>

      {/* Calories Section */}
      <div className="max-w-6xl mx-auto mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-blue-600 text-white p-6 shadow">
          <h3 className="text-lg font-semibold">Target Calories</h3>
          <p className="mt-2 text-3xl font-bold">
            {Math.round(data.target_calories)} kcal
          </p>
          <span className="text-sm opacity-90">Daily intake goal</span>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900">BMR</h3>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {Math.round(data.bmr)} kcal
          </p>
          <span className="text-sm text-gray-500">Base metabolic rate</span>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900">TDEE</h3>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {Math.round(data.tdee)} kcal
          </p>
          <span className="text-sm text-gray-500">Calories burned daily</span>
        </div>
      </div>

      {/* Macros */}
      <h2 className="max-w-6xl mx-auto mt-14 text-2xl font-bold text-gray-900">
        Daily Macros
      </h2>

      <div className="max-w-6xl mx-auto mt-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900">Protein</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {data.protein_g} g
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900">Carbs</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {data.carbs_g} g
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900">Fats</h3>
          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {data.fat_g} g
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
