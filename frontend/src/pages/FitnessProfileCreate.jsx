import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/FitnessProfile.css";
import LoadingIndicator from "../components/LoadingIndicator"

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
        <div className="profile-container">
            <h2>Create Fitness Profile</h2>

            <form onSubmit={handleSubmit} className="profile-form">
                <input
                    type="number"
                    name="height_cm"
                    placeholder="Height (cm)"
                    required
                    onChange={handleChange}
                />

                <input
                    type="number"
                    step="0.1"
                    name="weight_kg"
                    placeholder="Weight (kg)"
                    required
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    required
                    onChange={handleChange}
                />

                {/* Gender Radio */}
                <div className="radio-group">
                    <label>Gender</label>
                    <div className="radio-options">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === "male"}
                                onChange={handleChange}
                            />
                            Male
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === "female"}
                                onChange={handleChange}
                            />
                            Female
                        </label>
                    </div>
                </div>

                {/* Goal Radio */}
                <div className="radio-group">
                    <label>Fitness Goal</label>
                    <div className="radio-options">
                        <label>
                            <input
                                type="radio"
                                name="goal"
                                value="cut"
                                checked={formData.goal === "cut"}
                                onChange={handleChange}
                            />
                            Fat Loss
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="goal"
                                value="maintain"
                                checked={formData.goal === "maintain"}
                                onChange={handleChange}
                            />
                            Maintain
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="goal"
                                value="lean_bulk"
                                checked={formData.goal === "lean_bulk"}
                                onChange={handleChange}
                            />
                            Lean Bulk
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="goal"
                                value="bulk"
                                checked={formData.goal === "bulk"}
                                onChange={handleChange}
                            />
                            Muscle Gain
                        </label>
                    </div>
                </div>

               {/* Activity Level Radio */}
<div className="radio-group">
    <label>Activity Level</label>
    <div className="radio-options vertical">
        <label>
            <input
                type="radio"
                name="activity_level"
                value="sedentary"
                checked={formData.activity_level === "sedentary"}
                onChange={handleChange}
            />
            <span>
                <strong>Sedentary</strong> – Little or no exercise, mostly sitting
            </span>
        </label>

        <label>
            <input
                type="radio"
                name="activity_level"
                value="light"
                checked={formData.activity_level === "light"}
                onChange={handleChange}
            />
            <span>
                <strong>Lightly Active</strong> – Light exercise 1–3 days/week
            </span>
        </label>

        <label>
            <input
                type="radio"
                name="activity_level"
                value="moderate"
                checked={formData.activity_level === "moderate"}
                onChange={handleChange}
            />
            <span>
                <strong>Moderately Active</strong> – Gym or sports 3–5 days/week
            </span>
        </label>

        <label>
            <input
                type="radio"
                name="activity_level"
                value="active"
                checked={formData.activity_level === "active"}
                onChange={handleChange}
            />
            <span>
                <strong>Very Active</strong> – Intense training or physical job
            </span>
        </label>
    </div>
</div>


                {error && <p className="error">{error}</p>}
                {loading && <LoadingIndicator/>}
                <button type="submit" disabled={loading}>Create
                </button>
            </form>
        </div>
    );
}

export default FitnessProfileCreate;
