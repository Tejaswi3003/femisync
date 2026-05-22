import { useEffect, useState } from "react";
import "../App.css";

type Props = {
  initialMode: "signin" | "signup";
  onModeChange: (mode: "signin" | "signup") => void;
  onDemoLogin: () => void;
};

function Auth({ initialMode, onModeChange, onDemoLogin }: Props) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const isSignup = mode === "signup";

  const switchMode = (nextMode: "signin" | "signup") => {
    setMode(nextMode);
    onModeChange(nextMode);
  };

  return (
    <div className="wellness-page auth-page">
      <main className="auth-container">
        <h1 className="wellness-title">Femisync</h1>
        <p className="auth-subtitle">
          AI-powered insights for cycle, symptom, and wellness patterns ✨
        </p>

        <section className="auth-card">
          <div className="auth-card-header">
            <span className="circle-icon">🌺</span>

            <div>
              <h2>{isSignup ? "Create account" : "Welcome back"}</h2>
              <p>
                {isSignup
                  ? "Start tracking with the demo experience."
                  : "Continue with demo mode to explore Femisync."}
              </p>
            </div>
          </div>

          <input className="auth-input" type="email" placeholder="Email" />
          <input className="auth-input" type="password" placeholder="Password" />

          {isSignup && (
            <input
              className="auth-input"
              type="password"
              placeholder="Confirm password"
            />
          )}

          <button className="submit-button" onClick={onDemoLogin}>
            {isSignup ? "Create Demo Account" : "Log In"} <span>→</span>
          </button>

          <button className="demo-button" onClick={onDemoLogin}>
            Continue as Demo User
          </button>

          <p className="auth-switch">
            {isSignup ? "Already have an account?" : "New to Femisync?"}{" "}
            <button
              type="button"
              onClick={() => switchMode(isSignup ? "signin" : "signup")}
            >
              {isSignup ? "Log in" : "Create account"}
            </button>
          </p>
        </section>

        <p className="auth-note">
          Demo mode opens a preloaded wellness profile so the dashboard,
          analytics, cycle tracking, and AI summary can be viewed immediately.
        </p>

        <p className="footer-message">You’re doing great! 💜</p>
      </main>
    </div>
  );
}

export default Auth;
