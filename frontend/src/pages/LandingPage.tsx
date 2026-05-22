import { useNavigate } from "react-router-dom";
import "../App.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="wellness-page">

      <main className="wellness-container">

        <h1 className="wellness-title">
          Femisync 💜
        </h1>

        <p className="tracking-mode">
          Personalized wellness tracking for women
        </p>

        <section className="clean-section">

          <h2>Understand Your Wellness Journey</h2>

          <p className="onboarding-summary">
            Track mood, sleep, stress, cycle symptoms, energy,
            menopause wellness, and personalized health insights.
          </p>

          <button
            className="submit-button"
            onClick={() => navigate("/onboarding")}
          >
            Get Started →
          </button>

        </section>

      </main>

    </div>
  );
}

export default LandingPage;