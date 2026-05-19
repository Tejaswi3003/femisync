import { useState } from "react";

function Onboarding() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [mode, setMode] = useState("");

  const handleFinish = () => {
    const onboardingData = { goal, mode };
    console.log("Onboarding completed:", onboardingData);
    alert("Onboarding completed!");
  };

  const optionStyle = (selected: boolean) => ({
    width: "100%",
    padding: "18px",
    marginBottom: "16px",
    borderRadius: "16px",
    border: selected ? "2px solid #d63384" : "1px solid #ddd",
    backgroundColor: selected ? "#ffe3f0" : "white",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "600",
    color: "#222",
    transition: "0.2s",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fdf4f7",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "42px",
          borderRadius: "28px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#d63384",
            fontSize: "72px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          Welcome to Femisync
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#555",
            fontSize: "24px",
            marginBottom: "40px",
          }}
        >
          Let’s personalize your wellness tracking experience.
        </p>

        {step === 1 && (
          <div>
            <h2
              style={{
                textAlign: "center",
                color: "#222",
                fontSize: "36px",
                marginBottom: "30px",
              }}
            >
              What would you like to focus on?
            </h2>

            {[
              "Cycle wellness",
              "Mood & stress",
              "Sleep & energy",
              "Menopause support",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setGoal(item)}
                style={optionStyle(goal === item)}
              >
                {item}
              </button>
            ))}

            <button
              onClick={() => setStep(2)}
              style={primaryButton}
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2
              style={{
                textAlign: "center",
                color: "#222",
                fontSize: "36px",
                marginBottom: "30px",
              }}
            >
              Choose your tracking mode
            </h2>

            {[
              "Menstrual cycle tracking",
              "Perimenopause / menopause tracking",
              "General wellness tracking",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                style={optionStyle(mode === item)}
              >
                {item}
              </button>
            ))}

            <button
              onClick={() => setStep(1)}
              style={secondaryButton}
            >
              Back
            </button>

            <button
              onClick={() => setStep(3)}
              style={primaryButton}
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                color: "#222",
                fontSize: "40px",
                marginBottom: "20px",
              }}
            >
              You’re all set!
            </h2>

            <p
              style={{
                color: "#555",
                fontSize: "22px",
                lineHeight: "1.6",
                marginBottom: "30px",
              }}
            >
              Femisync will help you track wellness patterns,
              visualize trends, and generate personalized
              AI-powered insights.
            </p>

            <button
              onClick={() => setStep(2)}
              style={secondaryButton}
            >
              Back
            </button>

            <button
              onClick={handleFinish}
              style={primaryButton}
            >
              Start Tracking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const primaryButton = {
  width: "100%",
  padding: "18px",
  backgroundColor: "#d63384",
  color: "white",
  border: "none",
  borderRadius: "16px",
  cursor: "pointer",
  fontSize: "24px",
  fontWeight: "bold",
  marginTop: "18px",
};

const secondaryButton = {
  width: "100%",
  padding: "18px",
  backgroundColor: "#f8f8f8",
  color: "#222",
  border: "1px solid #ddd",
  borderRadius: "16px",
  cursor: "pointer",
  fontSize: "22px",
  marginTop: "18px",
};

export default Onboarding;