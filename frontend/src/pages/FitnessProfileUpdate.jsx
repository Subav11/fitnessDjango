import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function FitnessProfileUpdate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/fitness-profile/");
      setFormData(res.data);
    } catch (err) {
      setError("Failed to load fitness profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.put("/fitness-profile/", {
        height_cm: Number(formData.height_cm),
        weight_kg: Number(formData.weight_kg),
        age: Number(formData.age),
        gender: formData.gender,
        goal: formData.goal,
        activity_level: formData.activity_level,
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
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
        <p className="mt-6 text-lg font-semibold text-gray-700">Loading profile...</p>
      </div>
    );
  }

  if (!formData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.15),transparent_50%)]"></div>

      <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40 relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>

        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-pink-600 to-red-600 bg-clip-text text-transparent text-center mb-10 mt-8">
          Update Fitness Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="group">
              <input
                type="number"
                name="height_cm"
                placeholder="Height (cm)"
                value={formData.height_cm}
                onChange={handleChange}
                required
                className="w-full rounded-xl border-2 border-gray-200 px-5 py-3.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none transition-all duration-200 hover:border-orange-300 group-hover:shadow-md"
              />
            </div>

            <div className="group">
              <input
                type="number"
                step="0.1"
                name="weight_kg"
                placeholder="Weight (kg)"
                value={formData.weight_kg}
                onChange={handleChange}
                required
                className="w-full rounded-xl border-2 border-gray-200 px-5 py-3.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none transition-all duration-200 hover:border-orange-300 group-hover:shadow-md"
              />
            </div>

            <div className="group">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full rounded-xl border-2 border-gray-200 px-5 py-3.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none transition-all duration-200 hover:border-orange-300 group-hover:shadow-md"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-5 rounded-2xl border border-orange-100">
            <p className="font-bold text-gray-900 mb-3 text-lg">Gender</p>
            <div className="flex gap-6">
              {["male", "female"].map((g) => (
                <label key={g} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    className="w-5 h-5 accent-orange-600 cursor-pointer"
                  />
                  <span className="capitalize font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">{g}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-red-50 p-5 rounded-2xl border border-pink-100">
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
                    className="w-5 h-5 accent-orange-600 cursor-pointer"
                  />
                  <span className="font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">{g.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-2xl border border-red-100">
            <p className="font-bold text-gray-900 mb-4 text-lg">
              Activity Level
            </p>

            <div className="space-y-3">
              {[
                {
                  value: "sedentary",
                  title: "Sedentary",
                  desc: "Little or no exercise",
                },
                {
                  value: "light",
                  title: "Lightly Active",
                  desc: "1–3 days/week",
                },
                {
                  value: "moderate",
                  title: "Moderately Active",
                  desc: "3–5 days/week",
                },
                {
                  value: "active",
                  title: "Very Active",
                  desc: "Intense training",
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
                    className="mt-1 w-5 h-5 accent-orange-600 cursor-pointer flex-shrink-0"
                  />
                  <span className="text-gray-700">
                    <strong className="text-gray-900 group-hover:text-orange-600 transition-colors">{a.title}</strong> – {a.desc}
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
              <div className="absolute inset-0 rounded-full border-4 border-orange-100 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-600 animate-spin"></div>
            </div>
          </div>
        )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-orange-600 via-pink-600 to-red-600 py-4 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default FitnessProfileUpdate;
