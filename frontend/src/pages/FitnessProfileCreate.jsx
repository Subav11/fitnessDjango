import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function FitnessProfileCreate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    height_cm: "",
    weight_kg: "",
    age: "",
    gender: "male",
    goal: "maintain",
    activity_level: "moderate",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/fitness-profile/create/", {
        height_cm: Number(formData.height_cm),
        weight_kg: Number(formData.weight_kg),
        age: Number(formData.age),
        gender: formData.gender,
        goal: formData.goal,
        activity_level: formData.activity_level,
      });

      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create profile. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.15),transparent_50%)]"></div>

      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent text-center mb-10 mt-8">
          Create Fitness Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="group">
              <input
                type="number"
                name="height_cm"
                placeholder="Height (cm)"
                required
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-200 px-5 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition-all duration-200 hover:border-blue-300 group-hover:shadow-md"
              />
            </div>

            <div className="group">
              <input
                type="number"
                step="0.1"
                name="weight_kg"
                placeholder="Weight (kg)"
                required
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-200 px-5 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition-all duration-200 hover:border-blue-300 group-hover:shadow-md"
              />
            </div>

            <div className="group">
              <input
                type="number"
                name="age"
                placeholder="Age"
                required
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-200 px-5 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition-all duration-200 hover:border-blue-300 group-hover:shadow-md"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-2xl border border-blue-100">
            <p className="font-bold text-gray-900 mb-3 text-lg">Gender</p>
            <div className="flex gap-6">
              {["male", "female"].map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                  />
                  <span className="capitalize font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-5 rounded-2xl border border-cyan-100">
            <p className="font-bold text-gray-900 mb-4 text-lg">Fitness Goal</p>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { value: "cut", label: "Fat Loss" },
                { value: "maintain", label: "Maintain" },
                { value: "lean_bulk", label: "Lean Bulk" },
                { value: "bulk", label: "Muscle Gain" },
              ].map((g) => (
                <label
                  key={g.value}
                  className="flex items-center gap-3 cursor-pointer bg-white/70 px-4 py-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group"
                >
                  <input
                    type="radio"
                    name="goal"
                    value={g.value}
                    checked={formData.goal === g.value}
                    onChange={handleChange}
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                  />
                  <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{g.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Activity Level */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-2xl border border-teal-100">
            <p className="font-bold text-gray-900 mb-4 text-lg">
              Activity Level
            </p>

            <div className="space-y-3">
              {[
                {
                  value: "sedentary",
                  title: "Sedentary",
                  desc: "Little or no exercise, mostly sitting",
                },
                {
                  value: "light",
                  title: "Lightly Active",
                  desc: "Light exercise 1–3 days/week",
                },
                {
                  value: "moderate",
                  title: "Moderately Active",
                  desc: "Gym or sports 3–5 days/week",
                },
                {
                  value: "active",
                  title: "Very Active",
                  desc: "Intense training or physical job",
                },
              ].map((a) => (
                <label
                  key={a.value}
                  className="flex gap-4 items-start cursor-pointer bg-white/70 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group"
                >
                  <input
                    type="radio"
                    name="activity_level"
                    value={a.value}
                    checked={formData.activity_level === a.value}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 accent-blue-600 cursor-pointer flex-shrink-0"
                  />
                  <span className="text-gray-700">
                    <strong className="text-gray-900 group-hover:text-blue-600 transition-colors">{a.title}</strong> – {a.desc}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-xl">
              <p className="text-red-700 font-medium text-center">{error}</p>
            </div>
          )}

          {loading && (
          <div className="flex justify-center py-4">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
            </div>
          </div>
        )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-600 py-4 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default FitnessProfileCreate;
