import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "../styles/Dashboard.css";

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

  // 1️⃣ Check if fitness profile exists
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

  // 2️⃣ Fetch dashboard data ONLY if profile exists
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
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  // 🚫 Profile NOT created yet
  if (profileExists === false) {
    return (
      <div className="dashboard-empty">
        <h2>Welcome {firstName}👋</h2>
        <p>Your personalized fitness journey starts here.</p>
        <p>
          To see your calories, macros, and fitness insights, please create your
          fitness profile first.
        </p>

        <Link to="/fitness-profile/create" className="primary-btn">
          Create Fitness Profile
        </Link>
      </div>
    );
  }

  // ⚠️ Error loading dashboard
  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  // ✅ Profile exists → show dashboard
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{firstName}'s Fitness Dashboard</h1>
        <div className="dashboard-actions">
          <Link to="/fitness-profile/update" className="secondary-btn">
            Update Profile
          </Link>

          <Link to="/logout" className="logout-btn">
            Logout
          </Link>
        </div>
      </div>

      {/* Calories Section */}
      <div className="dashboard-grid">
        <div className="card highlight">
          <h3>Target Calories</h3>
          <p className="value">{Math.round(data.target_calories)} kcal</p>
          <span className="note">Daily intake goal</span>
        </div>

        <div className="card">
          <h3>BMR</h3>
          <p className="value">{Math.round(data.bmr)} kcal</p>
          <span className="note">Base metabolic rate</span>
        </div>

        <div className="card">
          <h3>TDEE</h3>
          <p className="value">{Math.round(data.tdee)} kcal</p>
          <span className="note">Calories burned daily</span>
        </div>
      </div>

      {/* Macros */}
      <h2 className="section-title">Daily Macros</h2>

      <div className="dashboard-grid">
        <div className="card macro protein">
          <h3>Protein</h3>
          <p className="value">{data.protein_g} g</p>
        </div>

        <div className="card macro carbs">
          <h3>Carbs</h3>
          <p className="value">{data.carbs_g} g</p>
        </div>

        <div className="card macro fats">
          <h3>Fats</h3>
          <p className="value">{data.fat_g} g</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
