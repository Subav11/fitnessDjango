import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
    return (
        <div className="container">
            {/* Hero Section */}
            <section className="hero">
                <h1 className="title">FitTrack</h1>
                <p className="subtitle">
                    Your personalized fitness & nutrition companion
                </p>

                <div className="button-group">
                    <Link to="/register" className="primary-btn">
                        Get Started
                    </Link>
                    <Link to="/login" className="secondary-btn">
                        Login
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2>What You Get</h2>

                <div className="card-grid">
                    <div className="card">
                        <h3>🔥 Smart Calories</h3>
                        <p>
                            Automatic BMR & TDEE calculation based on your
                            height, weight, and activity level.
                        </p>
                    </div>

                    <div className="card">
                        <h3>🥗 Macro Tracking</h3>
                        <p>
                            Protein, carbs, and fats calculated precisely
                            according to your fitness goal.
                        </p>
                    </div>

                    <div className="card">
                        <h3>🤖 AI Diet Plans</h3>
                        <p>
                            Personalized meal plans generated using AI
                            (coming soon).
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>© {new Date().getFullYear()} FitTrack. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
