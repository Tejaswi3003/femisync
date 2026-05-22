import { useEffect, useState } from "react";
import Auth from "./pages/Auth";
import CheckIn from "./pages/CheckIn";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import "./App.css";

type Page = "auth" | "dashboard" | "checkin" | "analytics";
type AuthMode = "signin" | "signup";

function App() {
  const [page, setPage] = useState<Page>("auth");
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [trackingMode, setTrackingMode] = useState("General wellness tracking");

  const navigateTo = (nextPage: Page, nextAuthMode?: AuthMode) => {
    setPage(nextPage);

    if (nextPage === "auth") {
      const mode = nextAuthMode || authMode;
      setAuthMode(mode);
      window.history.pushState({ page: "auth", authMode: mode }, "", `/${mode}`);
      return;
    }

    if (nextPage === "dashboard") {
      window.history.pushState({ page: "dashboard" }, "", "/dashboard");
      return;
    }

    if (nextPage === "checkin") {
      window.history.pushState({ page: "checkin" }, "", "/checkin");
      return;
    }

    if (nextPage === "analytics") {
      window.history.pushState({ page: "analytics" }, "", "/analytics");
    }
  };

  useEffect(() => {
    const demoUser = localStorage.getItem("femisync_demo_user");
    const path = window.location.pathname;

    if (demoUser === "true") {
      if (path === "/analytics") {
        setPage("analytics");
        window.history.replaceState({ page: "analytics" }, "", "/analytics");
      } else if (path === "/checkin") {
        setPage("checkin");
        window.history.replaceState({ page: "checkin" }, "", "/checkin");
      } else {
        setPage("dashboard");
        window.history.replaceState({ page: "dashboard" }, "", "/dashboard");
      }

      return;
    }

    if (path === "/signup") {
      setAuthMode("signup");
      setPage("auth");
      window.history.replaceState(
        { page: "auth", authMode: "signup" },
        "",
        "/signup"
      );
    } else {
      setAuthMode("signin");
      setPage("auth");
      window.history.replaceState(
        { page: "auth", authMode: "signin" },
        "",
        "/signin"
      );
    }
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const historyPage = event.state?.page;
      const historyAuthMode = event.state?.authMode;

      if (historyPage === "auth") {
        setPage("auth");
        setAuthMode(historyAuthMode === "signup" ? "signup" : "signin");
      }

      if (historyPage === "dashboard") setPage("dashboard");
      if (historyPage === "checkin") setPage("checkin");
      if (historyPage === "analytics") setPage("analytics");
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleAuthModeChange = (mode: AuthMode) => {
    navigateTo("auth", mode);
  };

  const handleDemoLogin = () => {
    localStorage.setItem("femisync_demo_user", "true");
    navigateTo("dashboard");
  };

  const goToCheckIn = () => {
    setTrackingMode("General wellness tracking");
    navigateTo("checkin");
  };

  const goToDashboard = () => {
    navigateTo("dashboard");
  };

  const goToAnalytics = () => {
    navigateTo("analytics");
  };

  const logout = () => {
    localStorage.removeItem("femisync_demo_user");
    setTrackingMode("");
    sessionStorage.clear();
    navigateTo("auth", "signin");
  };

  if (page === "auth") {
    return (
      <Auth
        initialMode={authMode}
        onModeChange={handleAuthModeChange}
        onDemoLogin={handleDemoLogin}
      />
    );
  }

  if (page === "checkin") {
    return <CheckIn trackingMode={trackingMode} onBack={goToDashboard} />;
  }

  if (page === "analytics") {
    return (
      <Analytics
        onDashboard={goToDashboard}
        onCheckIn={goToCheckIn}
        onLogout={logout}
      />
    );
  }

  return (
    <Dashboard
      onCheckIn={goToCheckIn}
      onAnalytics={goToAnalytics}
      onLogout={logout}
    />
  );
}

export default App;
