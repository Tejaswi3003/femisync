import { useState } from "react";
import "../App.css";

type Props = {
  onDemoLogin: () => void;
};

function Auth({ onDemoLogin }: Props) {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="wellness-page">
      <main className="auth-container">
        <h1 className="wellness-title">Femisync</h1>

        <p className="tracking-mode">
          Your calm space for wellness patterns ✨
        </p>

        <div className="auth-card">
          <div className="section-heading">
            <span className="circle-icon">🪷</span>
            <h2>{isSignup ? "Create your account" : "Welcome back"}</h2>
          </div>

          {isSignup && (
            <input className="auth-input" placeholder="Full Name" />
          )}

          <input className="auth-input" placeholder="Email" type="email" />

          <input
            className="auth-input"
            placeholder="Password"
            type="password"
          />

          <button className="submit-button" onClick={onDemoLogin}>
            {isSignup ? "Sign Up" : "Log In"} <span>→</span>
          </button>

          <button className="demo-button" onClick={onDemoLogin}>
            Continue as Demo User
          </button>

          <p className="auth-switch">
            {isSignup ? "Already have an account?" : "New to Femisync?"}{" "}
            <button onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? "Log in" : "Create account"}
            </button>
          </p>
        </div>

        <p className="footer-message">You’re doing great! 💜</p>
      </main>
    </div>
  );
}

export default Auth;