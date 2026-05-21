import { useEffect, useState } from "react";
import "../App.css";

type Props = {
  onFinish: (mode: string) => void;
};

function Onboarding({ onFinish }: Props) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [trackingMode, setTrackingMode] = useState("");

  useEffect(() => {
    const handleBack = () => {
      setStep(1);
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  const handleGoalSelect = (selectedGoal: string) => {
    setGoal(selectedGoal);

    let selectedMode = "General wellness tracking";

    if (selectedGoal === "Cycle wellness") {
      selectedMode = "Menstrual cycle tracking";
    } else if (selectedGoal === "Menopause support") {
      selectedMode = "Perimenopause / menopause tracking";
    }

    setTrackingMode(selectedMode);
    setStep(2);

    window.history.pushState({ page: "onboarding-summary" }, "");
  };

  const handleFinish = () => {
    onFinish(trackingMode);
  };

  return (
    <div className="wellness-page">
      <main className="wellness-container">
        <h1 className="wellness-title">Welcome to Femisync</h1>

        <p className="tracking-mode">
          A calm space to understand your wellness patterns ✨
        </p>

        {step === 1 && (
          <>
            <div className="section-heading">
              <span className="circle-icon">🪷</span>
              <h2>What would you like to focus on?</h2>
            </div>

            <div className="onboarding-grid">
              <button
                className="onboarding-card"
                onClick={() => handleGoalSelect("Cycle wellness")}
              >
                <span className="onboarding-icon">🌸</span>
                <h3>Cycle Wellness</h3>
                <p>Track cramps, symptoms, and cycle-related wellness.</p>
              </button>

              <button
                className="onboarding-card"
                onClick={() => handleGoalSelect("Mood & stress")}
              >
                <span className="onboarding-icon">🌿</span>
                <h3>Mood & Stress</h3>
                <p>Understand emotional patterns and daily stress levels.</p>
              </button>

              <button
                className="onboarding-card"
                onClick={() => handleGoalSelect("Sleep & energy")}
              >
                <span className="onboarding-icon">🌙</span>
                <h3>Sleep & Energy</h3>
                <p>Connect rest, fatigue, and energy changes.</p>
              </button>

              <button
                className="onboarding-card"
                onClick={() => handleGoalSelect("Menopause support")}
              >
                <span className="onboarding-icon">☀️</span>
                <h3>Menopause Support</h3>
                <p>Track hot flashes and menopause-related changes.</p>
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="section-heading">
              <span className="circle-icon">♡</span>
              <h2>You’re all set</h2>
            </div>

            <section className="horizontal-card lavender-card">
              <div className="card-title-block">
                <span className="circle-icon">✨</span>

                <div>
                  <h2>{goal}</h2>
                  <p>{trackingMode}</p>
                </div>
              </div>

              <p className="onboarding-summary">
                Femisync will personalize your check-in experience based on your
                selected wellness goal.
              </p>
            </section>

            <button className="submit-button" onClick={handleFinish}>
              Start Tracking <span>→</span>
            </button>

            <button
              className="back-button"
              onClick={() => {
                setStep(1);
                window.history.back();
              }}
            >
              ← Back
            </button>
          </>
        )}

        <p className="footer-message">You’re doing great! 💜</p>
      </main>
    </div>
  );
}

export default Onboarding;