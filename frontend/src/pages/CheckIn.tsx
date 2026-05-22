import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import AppLayout from "../components/AppLayout";


function CheckIn() {
  const [date, setDate] = useState<Date | null>(null);
  const [mood, setMood] = useState(5);
  const [stress, setStress] = useState(5);
  const [sleep, setSleep] = useState("");
  const [energy, setEnergy] = useState(5);
  const [fatigue, setFatigue] = useState(5);
  const [cramps, setCramps] = useState(0);
  const [hotFlashes, setHotFlashes] = useState(0);
  const [notes, setNotes] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const trackingMode =
  localStorage.getItem("trackingMode") || "General wellness";
  const isCycleTracking = trackingMode === "Menstrual cycle tracking";
  const isMenopauseTracking =
    trackingMode === "Perimenopause / menopause tracking";

  const formatDate = (selectedDate: Date) =>
    selectedDate.toISOString().split("T")[0];

  const toggleSymptom = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((item) => item !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    setError("");
    setSubmitted(false);

    if (!date) {
      setError("Please select a date.");
      return;
    }

    const sleepValue = sleep === "" ? 0 : Number(sleep);

    if (sleepValue < 0 || sleepValue > 24) {
      setError("Sleep hours must be between 0 and 24.");
      return;
    }

    const checkInData = {
      date: formatDate(date),
      sleep_hours: sleepValue,
      stress_score: stress,
      mood_score: mood,
      energy_score: energy,
      fatigue_score: fatigue,
      cramps_score: isCycleTracking ? cramps : 0,
      hot_flashes: isMenopauseTracking ? hotFlashes : 0,
      notes,
    };

    console.log("Check-in submitted:", checkInData);

    try {
      const response = await fetch("http://127.0.0.1:8000/checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkInData),
      });

      if (!response.ok) throw new Error();

      setSubmitted(true);
    } catch {
      setError("Could not connect to backend. Please make sure FastAPI is running.");
    }
  };

  const SliderBlock = ({
    icon,
    label,
    value,
    setValue,
  }: {
    icon: string;
    label: string;
    value: number;
    setValue: (v: number) => void;
  }) => (
    <div className="metric-block">
      <div className="metric-label">
        <span className="metric-icon">{icon}</span>
        <span>{label}</span>
      </div>

      <input
        className="soft-slider"
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />

      <p className="score">{value}/10</p>
    </div>
  );

  return (
    <AppLayout>
      <main className="wellness-container">
        <h1 className="wellness-title">Daily Wellness Check-In</h1>

        <p className="tracking-mode">
          Tracking mode: <strong>{trackingMode || "General wellness"}</strong>
        </p>

        <section className="clean-section">
          <div className="section-heading">
            <span className="circle-icon">♡</span>
            <h2>Today&apos;s Wellness</h2>
          </div>

          <div className="metrics-grid">
            <div className="metric-block">
              <div className="metric-label">
                <span className="metric-icon">📅</span>
                <span>Select Date</span>
              </div>

              <DatePicker
                selected={date}
                onChange={(selectedDate) => setDate(selectedDate)}
                placeholderText="Select Date"
                dateFormat="MMMM d, yyyy"
                maxDate={new Date()}
                className="date-picker-input"
              />
            </div>

            <SliderBlock icon="☺" label="Mood Score" value={mood} setValue={setMood} />

            <SliderBlock
              icon="☹"
              label="Stress Score"
              value={stress}
              setValue={setStress}
            />

            <div className="metric-block">
              <div className="metric-label">
                <span className="metric-icon">☾</span>
                <span>Sleep Hours</span>
              </div>

              <div className="sleep-wrapper">
                <input
                  value={sleep}
                  type="number"
                  onChange={(e) => setSleep(e.target.value)}
                  placeholder="e.g. 7"
                  className="soft-input"
                />
                <span>hrs</span>
              </div>
            </div>

            <SliderBlock
              icon="⚡"
              label="Energy Score"
              value={energy}
              setValue={setEnergy}
            />

            <SliderBlock
              icon="☁"
              label="Fatigue Score"
              value={fatigue}
              setValue={setFatigue}
            />
          </div>

          <div className="notes-area">
            <div className="metric-label">
              <span className="metric-icon">📝</span>
              <span>Notes</span>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How are you feeling today?"
              className="soft-textarea"
            />
          </div>
        </section>

        {isCycleTracking && (
          <section className="horizontal-card lavender-card">
            <div className="card-title-block">
              <span className="circle-icon">🌸</span>
              <div>
                <h2>Cycle Tracking</h2>
                <p>Track your period symptoms</p>
              </div>
            </div>

            <div className="wide-slider">
              <label>Cramps Score</label>
              <input
                className="soft-slider"
                type="range"
                min="0"
                max="10"
                value={cramps}
                onChange={(e) => setCramps(Number(e.target.value))}
              />
              <p>{cramps}/10</p>
            </div>
          </section>
        )}

        {isMenopauseTracking && (
          <section className="horizontal-card lavender-card">
            <div className="card-title-block">
              <span className="circle-icon">☀️</span>
              <div>
                <h2>Menopause Tracking</h2>
                <p>Track menopause-related symptoms</p>
              </div>
            </div>

            <div className="wide-slider">
              <label>Hot Flashes</label>
              <input
                className="soft-slider"
                type="range"
                min="0"
                max="10"
                value={hotFlashes}
                onChange={(e) => setHotFlashes(Number(e.target.value))}
              />
              <p>{hotFlashes}/10</p>
            </div>
          </section>
        )}

        <section className="horizontal-card sage-card">
          <div className="card-title-block">
            <span className="circle-icon sage">♡</span>
            <div>
              <h2>Symptoms</h2>
              <p>Select any symptoms you&apos;re experiencing</p>
            </div>
          </div>

          <div className="symptom-row">
            {["Headache", "Fatigue", "Mood Swings", "Bloating"].map((symptom) => (
              <button
                type="button"
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={
                  symptoms.includes(symptom)
                    ? "symptom-pill active"
                    : "symptom-pill"
                }
              >
                <span>
                  {symptom === "Headache"
                    ? "🧠"
                    : symptom === "Fatigue"
                    ? "🔋"
                    : symptom === "Mood Swings"
                    ? "🎭"
                    : "🌙"}
                </span>
                {symptom}
              </button>
            ))}
          </div>
        </section>

        {error && <div className="error-box">{error}</div>}

        {submitted && (
          <div className="success-box">
            Wellness check-in submitted successfully ✓
          </div>
        )}

        <button onClick={handleSubmit} className="submit-button">
          Submit Check-In <span>→</span>
        </button>

        <button
  className="bottom-back-button"
  onClick={() => window.history.back()}
>
          ← Back to Onboarding
        </button>

        <p className="footer-message">You&apos;re doing great! 💜</p>
      </main>
    </AppLayout>
  );
}

export default CheckIn;