import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "../App.css";

type Props = {
  onCheckIn: () => void;
  onAnalytics: () => void;
  onLogout: () => void;
};

const API_BASE = "http://127.0.0.1:8000";

function Dashboard({ onCheckIn, onAnalytics, onLogout }: Props) {
  const [windowFilter, setWindowFilter] = useState("all");
  const [analytics, setAnalytics] = useState<any>(null);
  const [aiInsight, setAiInsight] = useState<any>(null);
  const [cycle, setCycle] = useState<any>(null);
  const [trends, setTrends] = useState<any>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [loadingAi, setLoadingAi] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, [windowFilter]);

  const fetchDashboardData = async () => {
    try {
      setLoadingDashboard(true);
      setLoadingAi(true);
      setError("");
      setAiInsight(null);

      const [analyticsRes, cycleRes, trendsRes] = await Promise.all([
        fetch(`${API_BASE}/analytics?window=${windowFilter}`),
        fetch(`${API_BASE}/analytics/cycle`),
        fetch(`${API_BASE}/analytics/trends?window=${windowFilter}`),
      ]);

      const analyticsData = await analyticsRes.json();
      const cycleData = await cycleRes.json();
      const trendsData = await trendsRes.json();

      setAnalytics(analyticsData);
      setCycle(cycleData);
      setTrends(trendsData);
      setLoadingDashboard(false);

      const cachedAi = sessionStorage.getItem(`ai-insight-${windowFilter}`);

      if (cachedAi) {
        setAiInsight(JSON.parse(cachedAi));
        setLoadingAi(false);
        return;
      }

      const aiRes = await fetch(`${API_BASE}/ai-insights?window=${windowFilter}`);
      const aiData = await aiRes.json();

      setAiInsight(aiData);

      if (aiData?.is_ai_generated) {
        sessionStorage.setItem(
          `ai-insight-${windowFilter}`,
          JSON.stringify(aiData)
        );
      }
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
      setError("Unable to load dashboard data. Please make sure backend is running.");
    } finally {
      setLoadingDashboard(false);
      setLoadingAi(false);
    }
  };

  const hasData = Number(analytics?.total_entries || 0) > 0;

  const summaryText = () => {
    if (loadingAi) return "Generating your wellness summary...";
    if (aiInsight?.summary) return aiInsight.summary;
    return "Femisync is preparing your wellness insight.";
  };

  const summaryBadge = () => {
    if (loadingAi) return "Analyzing patterns";
    if (aiInsight?.is_ai_generated) return "Generated with Gemini";
    return "Analytics summary";
  };

  return (
    <div className="wellness-page">
      <main className="wellness-container dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="wellness-title">Femisync Dashboard</h1>
            <p className="tracking-mode">Your wellness snapshot ✨</p>
          </div>

          <div className="dashboard-header-actions">
            <button className="dashboard-primary-action" onClick={onCheckIn}>
              + Log Check-In
            </button>

            <button className="dashboard-secondary-action" onClick={onAnalytics}>
              Analytics
            </button>

            <button className="dashboard-secondary-action" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        {!loadingDashboard && hasData && (
          <div className="dashboard-window-buttons">
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

        {loadingDashboard && (
          <section className="dashboard-empty-card">
            <span className="circle-icon">✨</span>
            <h2>Loading dashboard...</h2>
            <p>Preparing your wellness overview.</p>
          </section>
        )}

        {!loadingDashboard && error && (
          <section className="dashboard-empty-card">
            <span className="circle-icon">⚠️</span>
            <h2>Dashboard could not load</h2>
            <p>{error}</p>
          </section>
        )}

        {!loadingDashboard && !error && !hasData && (
          <section className="dashboard-empty-card">
            <span className="circle-icon">🌸</span>
            <h2>Start tracking</h2>
            <p>Log your first check-in to unlock insights.</p>

            <button className="submit-button" onClick={onCheckIn}>
              Log First Check-In <span>→</span>
            </button>
          </section>
        )}

        {!loadingDashboard && !error && hasData && (
          <>
            <section className="dashboard-ai-card">
              <span className="circle-icon">✨</span>

              <div>
                <p className="dashboard-label">
                  {aiInsight?.is_ai_generated ? "AI Summary" : "Wellness Summary"}
                </p>

                <h2>Pattern Insight</h2>
                <p>{summaryText()}</p>

                <div className="dashboard-ai-meta">{summaryBadge()}</div>
              </div>
            </section>

            <div className="dashboard-card-grid">
              <section className="dashboard-stat-card">
                <span>🌙</span>
                <p className="dashboard-label">Sleep</p>
                <h3>{analytics.average_sleep ?? "N/A"} hrs</h3>
              </section>

              <section className="dashboard-stat-card">
                <span>😌</span>
                <p className="dashboard-label">Stress</p>
                <h3>{analytics.average_stress ?? "N/A"}/10</h3>
              </section>

              <section className="dashboard-stat-card">
                <span>⚡</span>
                <p className="dashboard-label">Fatigue</p>
                <h3>{analytics.average_fatigue ?? "N/A"}/10</h3>
              </section>

              <section className="dashboard-stat-card">
                <span>🌸</span>
                <p className="dashboard-label">Cycle</p>
                <h3>{cycle?.average_cycle_length ?? "N/A"} days</h3>
              </section>
            </div>

            <section className="dashboard-section-card">
              <div className="dashboard-section-header">
                <div>
                  <p className="dashboard-label">Trends</p>
                  <h2>Recent Patterns</h2>
                  <p className="dashboard-section-subtitle">
                    Sleep, stress, and fatigue changes across the selected window.
                  </p>
                </div>
              </div>

              <div className="dashboard-chart-grid">
                <TrendAreaChart
                  title="Sleep"
                  emoji="🌙"
                  data={trends?.sleep_trend}
                  unit="hrs"
                  yDomain={[0, 10]}
                  trendType="higher-good"
                />

                <TrendAreaChart
                  title="Stress"
                  emoji="😌"
                  data={trends?.stress_trend}
                  unit="/10"
                  yDomain={[0, 10]}
                  trendType="lower-good"
                />

                <TrendAreaChart
                  title="Fatigue"
                  emoji="⚡"
                  data={trends?.fatigue_trend}
                  unit="/10"
                  yDomain={[0, 10]}
                  trendType="lower-good"
                />
              </div>
            </section>

            <div className="dashboard-action-grid">
              <section className="dashboard-action-card">
                <p className="dashboard-label">Today</p>
                <h2>Log a check-in</h2>
                <p>
                  Track mood, sleep, stress, cycle symptoms, and menopause-related symptoms.
                </p>

                <div className="dashboard-action-row">
                  <button className="dashboard-primary-action" onClick={onCheckIn}>
                    Log Check-In
                  </button>

                  <button className="dashboard-secondary-action" onClick={onAnalytics}>
                    View Analytics
                  </button>
                </div>
              </section>

              <section className="dashboard-action-card">
                <p className="dashboard-label">Cycle</p>
                <h2>Cycle Pattern</h2>
                <p>
                  Your logged cycle pattern appears{" "}
                  <strong>{cycle?.cycle_regularity ?? "not enough data"}</strong>,
                  with an average length of{" "}
                  <strong>{cycle?.average_cycle_length ?? "N/A"}</strong> days.
                </p>
              </section>
            </div>
          </>
        )}

        <p className="footer-message">You’re doing great! 💜</p>
      </main>
    </div>
  );
}

function TrendAreaChart({
  title,
  emoji,
  data,
  unit,
  yDomain,
  trendType,
}: {
  title: string;
  emoji: string;
  data: any[];
  unit: string;
  yDomain: [number, number];
  trendType: "higher-good" | "lower-good";
}) {
  const chartData =
    data?.slice(-14).map((item) => ({
      date: item.date?.slice(5),
      value: Number(item.value),
    })) || [];

  const latestValue =
    chartData.length > 0 ? chartData[chartData.length - 1].value : null;

  const firstValue = chartData.length > 0 ? chartData[0].value : null;

  const trendBadge = () => {
    if (firstValue === null || latestValue === null) return "Loading";
    if (latestValue === firstValue) return "Stable";

    const wentUp = latestValue > firstValue;

    if (trendType === "higher-good") {
      return wentUp ? "Improving" : "Lower";
    }

    return wentUp ? "Rising" : "Improving";
  };

  if (chartData.length === 0) {
    return (
      <div className="dashboard-chart-card">
        <div className="dashboard-chart-title">
          <div className="dashboard-chart-title-left">
            <span>{emoji}</span>
            <h3>{title}</h3>
          </div>
        </div>
        <p>No chart data yet.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-chart-card">
      <div className="dashboard-chart-title">
        <div className="dashboard-chart-title-left">
          <span>{emoji}</span>
          <h3>{title}</h3>
        </div>

        <div className="dashboard-chart-value">
          <span>Latest</span>
          <strong>
            {latestValue} {unit}
          </strong>
        </div>
      </div>

      <div className="dashboard-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b63d7" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#93c79c" stopOpacity={0.08} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e6def8" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis domain={yDomain} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(value) => [`${value} ${unit}`, title]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8b63d7"
              strokeWidth={3}
              fill={`url(#gradient-${title})`}
              dot={{ r: 3, strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-trend-badge">{trendBadge()}</div>
    </div>
  );
}

export default Dashboard;
