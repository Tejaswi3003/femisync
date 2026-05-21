import { useEffect, useState } from "react";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import CheckIn from "./pages/CheckIn";
import "./App.css";

type Page = "auth" | "onboarding" | "checkin";

function App() {
  const [page, setPage] = useState<Page>("auth");
  const [trackingMode, setTrackingMode] = useState("");

  useEffect(() => {
    const demoUser = localStorage.getItem("femisync_demo_user");

    if (demoUser === "true") {
      setPage("onboarding");
      window.history.replaceState({ page: "onboarding" }, "");
    } else {
      window.history.replaceState({ page: "auth" }, "");
    }
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const historyPage = event.state?.page;

      if (historyPage === "auth") {
        setPage("auth");
      } else if (historyPage === "onboarding") {
        setPage("onboarding");
      } else if (historyPage === "checkin") {
        setPage("checkin");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleDemoLogin = () => {
    localStorage.setItem("femisync_demo_user", "true");
    setPage("onboarding");
    window.history.pushState({ page: "onboarding" }, "");
  };

  const goToCheckIn = (mode: string) => {
    setTrackingMode(mode);
    setPage("checkin");
    window.history.pushState({ page: "checkin" }, "");
  };

  const goBack = () => {
    window.history.back();
  };

  const logout = () => {
    localStorage.removeItem("femisync_demo_user");
    setPage("auth");
    setTrackingMode("");
    window.history.pushState({ page: "auth" }, "");
  };

  if (page === "auth") {
    return <Auth onDemoLogin={handleDemoLogin} />;
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          right: "24px",
          top: "24px",
          zIndex: 1000,
        }}
      >
        <button className="demo-button" onClick={logout}>
          Logout
        </button>
      </div>

      {page === "checkin" ? (
        <CheckIn trackingMode={trackingMode} onBack={goBack} />
      ) : (
        <Onboarding onFinish={goToCheckIn} />
      )}
    </>
  );
}

export default App;