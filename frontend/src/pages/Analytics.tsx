import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "../App.css";

type Props = {
  onDashboard: () => void;
  onCheckIn: () => void;
  onLogout: () => void;
};

const API_BASE = "http://127.0.0.1:8000";

function Analytics({ onDashboard, onCheckIn, onLogout }: Props) {
  const [windowFilter, setWindowFilter] = useState("all");
  const [analytics, setAnalytics] = useState<any>(null);
  const [cycle, setCycle] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalyticsData();
  }, [windowFilter]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError("");

      const [analyticsRes, cycleRes, insightsRes] = await Promise.all([
        fetch(`${API_BASE}/analytics?window=${windowFilter}`),
        fetch(`${API_BASE}/analytics/cycle`),
        fetch(`${API_BASE}/insights?window=${windowFilter}`),
      ]);

      setAnalytics(await analyticsRes.json());
      setCycle(await cycleRes.json());
      setInsights(await insightsRes.json());
    } catch (err) {
      console.error("Analytics fetch failed:", err);
      setError("Unable to load analytics. Please make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const hasData = Number(analytics?.total_entries || 0) > 0;

  const getRawValue = (...keys: string[]) => {
    for (const key of keys) {
      if (analytics && analytics[key] !== undefined && analytics[key] !== null) {
        return analytics[key];
      }
    }

    return null;
  };

  const displayValue = (value: any, suffix = "") => {
    if (value === null || value === undefined || value === "") return "Not tracked";
    return `${value}${suffix}`;
  };

  const symptomData = [
    {
      name: "Hot flashes",
      value: Number(getRawValue("hot_flash_days", "hot_flashes_days", "hot_flashes", "total_hot_flashes")) || 0,
    },
    {
      name: "Night sweats",
      value: Number(getRawValue("night_sweat_days", "night_sweats_days", "night_sweats", "total_night_sweats")) || 0,
    },
    {
      name: "Brain fog",
      value: Number(getRawValue("brain_fog_days", "brain_fog", "avg_brain_fog")) || 0,
    },
    {
      name: "Mood swings",
      value: Number(getRawValue("mood_swing_days", "mood_swings", "avg_mood_swings")) || 0,
    },
    {
      name: "Sleep disruption",
      value: Number(getRawValue("sleep_disruption_days", "sleep_disruption", "avg_sleep_disruption")) || 0,
    },
  ];

  return (
    <div className="wellness-page">
      <main className="wellness-container analytics-container">
        <div className="analytics-header">
          <div>
            <h1 className="wellness-title">Femisync Analytics</h1>
            <p className="tracking-mode">
              Cycle, symptom, and pattern analysis ✨
            </p>
          </div>

          <div className="analytics-header-actions">
            <button className="analytics-primary-action" onClick={onCheckIn}>
              + Log Check-In
            </button>

            <button className="analytics-secondary-action" onClick={onDashboard}>
              Dashboard
            </button>

            <button className="analytics-secondary-action" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        {!loading && hasData && (
          <div className="analytics-window-buttons">
            <button
              className={windowFilter === "all" ? "active" : ""}
              onClick={() => setWindowFilter("all")}
            >
              All Time
            </button>

            <button
              className={windowFilter === "30" ? "active" : ""}
              onClick={() => setWindowFilter("30")}
            >
              30 Days
            </button>

            <button
              className={windowFilter === "7" ? "active" : ""}
              onClick={() => setWindowFilter("7")}
            >
              7 Days
            </button>
          </div>
        )}

        {loading && (
          <section className="analytics-empty-card">
            <span className="circle-icon">✨</span>
            <h2>Loading analytics...</h2>
            <p>Preparing your trends.</p>
          </section>
        )}

        {!loading && error && (
          <section className="analytics-empty-card">
            <span className="circle-icon">⚠️</span>
            <h2>Analytics could not load</h2>
            <p>{error}</p>
          </section>
        )}

        {!loading && !error && !hasData && (
          <section className="analytics-empty-card">
            <span className="circle-icon">🌸</span>
            <h2>No analytics yet</h2>
            <p>Add check-ins to unlock trend insights.</p>

            <button className="submit-button" onClick={onCheckIn}>
              Log First Check-In <span>→</span>
            </button>
          </section>
        )}

        {!loading && !error && hasData && (
          <>
            {insights?.insights?.length > 0 && (
              <section className="analytics-section-card">
                <div className="analytics-section-header">
                  <p className="analytics-label">Patterns</p>
                  <h2>Detected Insights</h2>
                  <p>Relationships found across logged wellness data.</p>
                </div>

                <div className="analytics-insight-list">
                  {insights.insights.map((insight: string, index: number) => (
                    <div className="analytics-insight-item" key={index}>
                      <span>✦</span>
                      <p>{insight}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="analytics-section-card">
              <div className="analytics-section-header">
                <p className="analytics-label">Cycle</p>
                <h2>Cycle Tracking</h2>
                <p>Estimated from logged period start dates.</p>
              </div>

              <div className="analytics-grid-3">
                <MetricCard icon="🌸" title="Regularity" value={cycle?.cycle_regularity ?? "Not enough data"} />
                <MetricCard icon="📅" title="Cycle length" value={displayValue(cycle?.average_cycle_length, " days")} />
                <MetricCard icon="🩷" title="Period starts" value={cycle?.period_start_dates?.length ?? "Not enough data"} />
              </div>
            </section>

            <section className="analytics-section-card">
              <div className="analytics-section-header">
                <p className="analytics-label">Menopause Support</p>
                <h2>Symptom Trends</h2>
                <p>
                  Menopause and perimenopause-related symptoms tracked over time.
                </p>
              </div>

              <div className="analytics-grid-3">
                <MetricCard icon="🔥" title="Hot flashes" value={displayValue(getRawValue("hot_flash_days", "hot_flashes_days", "hot_flashes", "total_hot_flashes"))} />
                <MetricCard icon="🌙" title="Night sweats" value={displayValue(getRawValue("night_sweat_days", "night_sweats_days", "night_sweats", "total_night_sweats"))} />
                <MetricCard icon="💭" title="Brain fog" value={displayValue(getRawValue("brain_fog_days", "brain_fog", "avg_brain_fog"))} />
                <MetricCard icon="🔄" title="Mood swings" value={displayValue(getRawValue("mood_swing_days", "mood_swings", "avg_mood_swings"))} />
                <MetricCard icon="💤" title="Sleep disruption" value={displayValue(getRawValue("sleep_disruption_days", "sleep_disruption", "avg_sleep_disruption"))} />
                <MetricCard icon="🧠" title="Mood" value={displayValue(getRawValue("average_mood", "avg_mood", "mood_score"), "/10")} />
              </div>

              <div className="analytics-chart-card menopause-chart-card">
                <div className="analytics-chart-title">
                  <h3>Symptom Frequency</h3>
                  <span>📊</span>
                </div>

                <div className="analytics-chart-wrapper">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={symptomData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e6def8" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8b63d7" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>
          </>
        )}

        <p className="footer-message">You’re doing great! 💜</p>
      </main>
    </div>
  );
}

function MetricCard({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: any;
}) {
  return (
    <div className="analytics-metric-card">
      <span>{icon}</span>
      <h3>{title}</h3>
      <strong>{value}</strong>
    </div>
  );
}

export default Analytics;
