import { useEffect, useState } from "react";
import Onboarding from "./pages/Onboarding";
import CheckIn from "./pages/CheckIn";
import "./App.css";

function App() {
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [trackingMode, setTrackingMode] = useState("");

  useEffect(() => {
    const handlePopState = () => {
      setShowCheckIn(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  const goToCheckIn = (
    mode: string
  ) => {
    setTrackingMode(mode);

    setShowCheckIn(true);

    window.history.pushState(
      { page: "checkin" },
      ""
    );
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      {showCheckIn ? (
        <CheckIn
          trackingMode={trackingMode}
          onBack={goBack}
        />
      ) : (
        <Onboarding
          onFinish={goToCheckIn}
        />
      )}
    </>
  );
}

export default App;