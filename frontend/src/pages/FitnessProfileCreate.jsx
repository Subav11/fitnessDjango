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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Create Fitness Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="number"
              name="height_cm"
              placeholder="Height (cm)"
              required
              onChange={handleChange}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="number"
              step="0.1"
              name="weight_kg"
              placeholder="Weight (kg)"
              required
              onChange={handleChange}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              required
              onChange={handleChange}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Gender */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">Gender</p>
            <div className="flex gap-6">
              {["male", "female"].map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  <span className="capitalize">{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">Fitness Goal</p>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { value: "cut", label: "Fat Loss" },
                { value: "maintain", label: "Maintain" },
                { value: "lean_bulk", label: "Lean Bulk" },
                { value: "bulk", label: "Muscle Gain" },
              ].map((g) => (
                <label
                  key={g.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="goal"
                    value={g.value}
                    checked={formData.goal === g.value}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  {g.label}
                </label>
              ))}
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">
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
                  className="flex gap-3 items-start cursor-pointer"
                >
                  <input
                    type="radio"
                    name="activity_level"
                    value={a.value}
                    checked={formData.activity_level === a.value}
                    onChange={handleChange}
                    className="mt-1 accent-blue-600"
                  />
                  <span>
                    <strong>{a.title}</strong> – {a.desc}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {loading && (
          <div className="mt-6 flex justify-center">
            <div className="h-10 w-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
          </div>
        )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default FitnessProfileCreate;
