import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Onboarding from "./pages/Onboarding";
import CheckIn from "./pages/CheckIn";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";

function AppRoutes() {
  const navigate = useNavigate();

  const handleOnboardingFinish = (mode: string) => {
    localStorage.setItem("trackingMode", mode);

    navigate("/checkin");
  };

  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route
        path="/onboarding"
        element={<Onboarding onFinish={handleOnboardingFinish} />}
      />

      <Route path="/checkin" element={<CheckIn />} />

      <Route path="/analytics" element={<Analytics />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/insights" element={<Insights />} />

    </Routes>
  );
}

export default AppRoutes;