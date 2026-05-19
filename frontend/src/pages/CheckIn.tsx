import { useState } from "react";

function CheckIn() {
  const [mood, setMood] = useState(3);
  const [stress, setStress] = useState(3);
  const [sleep, setSleep] = useState("");
  const [energy, setEnergy] = useState(3);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [menopauseMode, setMenopauseMode] = useState(false);

  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");
  const [flowIntensity, setFlowIntensity] = useState("medium");

  const [hotFlashes, setHotFlashes] = useState(1);
  const [nightSweats, setNightSweats] = useState(1);
  const [brainFog, setBrainFog] = useState(1);

  const [waterIntake, setWaterIntake] = useState("");
  const [exerciseMinutes, setExerciseMinutes] = useState("");
  const [caffeineIntake, setCaffeineIntake] = useState("");

  const symptomOptions = ["Headache", "Fatigue", "Mood Swings", "Bloating"];

  const handleSymptomChange = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((item) => item !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const handleSubmit = () => {
    const checkInData = {
      mood,
      stress,
      sleep,
      energy,
      periodStart,
      periodEnd,
      flowIntensity,
      waterIntake,
      exerciseMinutes,
      caffeineIntake,
      symptoms,
      menopauseMode,
      hotFlashes: menopauseMode ? hotFlashes : null,
      nightSweats: menopauseMode ? nightSweats : null,
      brainFog: menopauseMode ? brainFog : null,
    };

    console.log("Check-in submitted:", checkInData);
    alert("Wellness check-in submitted successfully!");
  };

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
          maxWidth: "860px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "36px",
          borderRadius: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#d63384",
            fontSize: "42px",
          }}
        >
          Daily Wellness Check-In
        </h1>

        <p style={{ textAlign: "center", color: "#777", marginBottom: "35px" }}>
          Track your mood, symptoms, sleep, cycle, and lifestyle patterns.
        </p>

        <div style={{ marginBottom: "24px" }}>
          <label>
            Mood: <strong>{mood}/5</strong>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
            style={{ width: "100%", marginTop: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label>
            Stress Level: <strong>{stress}/5</strong>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={stress}
            onChange={(e) => setStress(Number(e.target.value))}
            style={{ width: "100%", marginTop: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label>Sleep Hours</label>
          <input
            type="number"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            placeholder="Example: 7"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label>
            Energy Level: <strong>{energy}/5</strong>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            style={{ width: "100%", marginTop: "8px" }}
          />
        </div>

        <h2 style={{ color: "#d63384", marginTop: "30px" }}>Cycle Tracking</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div>
            <label>Period Start Date</label>
            <input
              type="date"
              value={periodStart}
              onChange={(e) => setPeriodStart(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            />
          </div>

          <div>
            <label>Period End Date</label>
            <input
              type="date"
              value={periodEnd}
              onChange={(e) => setPeriodEnd(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label>Flow Intensity</label>
          <select
            value={flowIntensity}
            onChange={(e) => setFlowIntensity(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
          >
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>

        <h2 style={{ color: "#d63384", marginTop: "30px" }}>
          Lifestyle Tracking
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div>
            <label>Water Intake (L)</label>
            <input
              type="number"
              value={waterIntake}
              onChange={(e) => setWaterIntake(e.target.value)}
              placeholder="2"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            />
          </div>

          <div>
            <label>Exercise (mins)</label>
            <input
              type="number"
              value={exerciseMinutes}
              onChange={(e) => setExerciseMinutes(e.target.value)}
              placeholder="30"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            />
          </div>

          <div>
            <label>Caffeine Intake</label>
            <input
              type="number"
              value={caffeineIntake}
              onChange={(e) => setCaffeineIntake(e.target.value)}
              placeholder="2 cups"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label>Symptoms</label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginTop: "12px",
            }}
          >
            {symptomOptions.map((symptom) => (
              <label
                key={symptom}
                style={{
                  padding: "12px",
                  border: "1px solid #eee",
                  borderRadius: "12px",
                  backgroundColor: symptoms.includes(symptom)
                    ? "#ffe3f0"
                    : "#fafafa",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={symptoms.includes(symptom)}
                  onChange={() => handleSymptomChange(symptom)}
                  style={{ marginRight: "8px" }}
                />
                {symptom}
              </label>
            ))}
          </div>
        </div>

        <div
          style={{
            marginBottom: "28px",
            padding: "18px",
            borderRadius: "14px",
            backgroundColor: "#fff5f9",
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={menopauseMode}
              onChange={(e) => setMenopauseMode(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            Enable Menopause / Perimenopause Mode
          </label>

          {menopauseMode && (
            <div style={{ marginTop: "20px" }}>
              <div style={{ marginBottom: "18px" }}>
                <label>
                  Hot Flashes: <strong>{hotFlashes}/5</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={hotFlashes}
                  onChange={(e) => setHotFlashes(Number(e.target.value))}
                  style={{ width: "100%", marginTop: "8px" }}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label>
                  Night Sweats: <strong>{nightSweats}/5</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={nightSweats}
                  onChange={(e) => setNightSweats(Number(e.target.value))}
                  style={{ width: "100%", marginTop: "8px" }}
                />
              </div>

              <div>
                <label>
                  Brain Fog / Focus Issues: <strong>{brainFog}/5</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={brainFog}
                  onChange={(e) => setBrainFog(Number(e.target.value))}
                  style={{ width: "100%", marginTop: "8px" }}
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#d63384",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "17px",
            fontWeight: "bold",
          }}
        >
          Submit Check-In
        </button>
      </div>
    </div>
  );
}

export default CheckIn;