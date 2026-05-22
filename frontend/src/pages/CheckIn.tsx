import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import { submitCheckIn } from "../api/api";

type Props = {
  trackingMode: string;
  onBack: () => void;
};

type SliderBlockProps = {
  icon: string;
  label: string;
  value: number;
  setValue: (v: number) => void;
  max?: number;
  helper?: string;
  disabled?: boolean;
};

type FieldErrors = {
  date?: string;
  sleep?: string;
  cycleDay?: string;
  form?: string;
};

function CheckIn({ onBack }: Props) {
  const [date, setDate] = useState<Date | null>(new Date());
  const [sleep, setSleep] = useState("");

  const [mood, setMood] = useState(5);
  const [stress, setStress] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [fatigue, setFatigue] = useState(5);

  const [periodStatus, setPeriodStatus] = useState(false);
  const [flowIntensity, setFlowIntensity] = useState(0);
  const [cycleDay, setCycleDay] = useState("");
  const [cramps, setCramps] = useState(0);

  const [hotFlashes, setHotFlashes] = useState(0);
  const [nightSweats, setNightSweats] = useState(0);
  const [sleepDisruption, setSleepDisruption] = useState(0);
  const [brainFog, setBrainFog] = useState(0);
  const [moodSwings, setMoodSwings] = useState(0);

  const [notes, setNotes] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);

  const formatDate = (selectedDate: Date) => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const toggleSymptom = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((item) => item !== symptom)
        : [...prev, symptom]
    );
  };

  const buildNotes = () => {
    const trimmedNotes = notes.trim();

    if (symptoms.length === 0) {
      return trimmedNotes;
    }

    const symptomText = `Additional symptoms: ${symptoms.join(", ")}`;

    return trimmedNotes ? `${trimmedNotes}\n${symptomText}` : symptomText;
  };

  const resetForAnotherCheckIn = () => {
    const nextDate = date ? new Date(date) : new Date();
    nextDate.setDate(nextDate.getDate() - 1);

    setDate(nextDate);
    setSleep("");
    setMood(5);
    setStress(5);
    setEnergy(5);
    setFatigue(5);

    setPeriodStatus(false);
    setFlowIntensity(0);
    setCycleDay("");
    setCramps(0);

    setHotFlashes(0);
    setNightSweats(0);
    setSleepDisruption(0);
    setBrainFog(0);
    setMoodSwings(0);

    setNotes("");
    setSymptoms([]);
    setSubmitted(false);
    setErrors({});

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateForm = () => {
    const nextErrors: FieldErrors = {};
    const sleepValue = Number(sleep);
    const cycleDayValue = Number(cycleDay);

    if (!date) {
      nextErrors.date = "Choose a check-in date.";
    }

    if (sleep.trim() === "") {
      nextErrors.sleep = "Add sleep hours to save this check-in.";
    } else if (Number.isNaN(sleepValue) || sleepValue < 0 || sleepValue > 24) {
      nextErrors.sleep = "Enter a value between 0 and 24.";
    }

    if (
      periodStatus &&
      cycleDay.trim() !== "" &&
      (Number.isNaN(cycleDayValue) || cycleDayValue < 1)
    ) {
      nextErrors.cycleDay = "Cycle day should be 1 or higher.";
    }

    return nextErrors;
  };

  const handleSubmit = async () => {
    setSubmitted(false);

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !date) {
      window.setTimeout(() => {
        errorSummaryRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);

      return;
    }

    const sleepValue = Number(sleep);
    const cycleDayValue = cycleDay === "" ? 0 : Number(cycleDay);

    const checkInData = {
      date: formatDate(date),
      sleep_hours: sleepValue,
      stress_score: stress,
      mood_score: mood,
      energy_score: energy,
      fatigue_score: fatigue,

      period_status: periodStatus,
      flow_intensity: periodStatus ? flowIntensity : 0,
      cycle_day: periodStatus ? cycleDayValue : 0,
      cramps_score: periodStatus ? cramps : 0,

      hot_flashes: hotFlashes,
      night_sweats: nightSweats,

      sleep_disruption: sleepDisruption,
      brain_fog: brainFog,
      mood_swings: moodSwings,

      notes: buildNotes(),
    };

    try {
      setIsSubmitting(true);
      await submitCheckIn(checkInData);
      setSubmitted(true);
      setErrors({});
    } catch (err) {
      console.error(err);
      setErrors({
        form: "Could not save check-in. Please make sure the backend is running.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const SliderBlock = ({
    icon,
    label,
    value,
    setValue,
    max = 10,
    helper,
    disabled = false,
  }: SliderBlockProps) => (
    <div className={`checkin-field ${disabled ? "is-disabled" : ""}`}>
      <div className="checkin-field-header">
        <div className="metric-label">
          <span className="metric-icon">{icon}</span>
          <span>{label}</span>
        </div>

        <span className="checkin-score">
          {value}/{max}
        </span>
      </div>

      {helper && <p className="field-helper">{helper}</p>}

      <input
        className="soft-slider"
        type="range"
        min="0"
        max={max}
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  );

  return (
    <div className="wellness-page">
      <main className="wellness-container checkin-container">
        <div className="checkin-header">
          <h1 className="wellness-title">Daily Check-In</h1>
          <p className="tracking-mode">
            Track today&apos;s wellness, cycle, and symptom details.
          </p>
        </div>

        <section className="checkin-panel">
          <div className="checkin-panel-header">
            <span className="circle-icon">♡</span>
            <div>
              <h2>Wellness Overview</h2>
              <p>Your core daily wellness signals.</p>
            </div>
          </div>

          <div className="checkin-grid">
            <div className="checkin-field">
              <div className="metric-label">
                <span className="metric-icon">📅</span>
                <span>Date</span>
              </div>

              <DatePicker
                selected={date}
                onChange={(selectedDate: Date | null) => {
                  setDate(selectedDate);
                  setErrors((prev) => ({ ...prev, date: undefined }));
                }}
                placeholderText="Select date"
                dateFormat="MMMM d, yyyy"
                maxDate={new Date()}
                className={`date-picker-input ${errors.date ? "input-error" : ""}`}
              />

              {errors.date && <p className="inline-error">{errors.date}</p>}
            </div>

            <SliderBlock
              icon="🌺"
              label="Mood"
              value={mood}
              setValue={setMood}
              helper="0 = very low, 10 = very positive"
            />

            <SliderBlock
              icon="🍵"
              label="Stress"
              value={stress}
              setValue={setStress}
              helper="0 = calm, 10 = very stressed"
            />

            <div className="checkin-field">
              <div className="metric-label">
                <span className="metric-icon">☾</span>
                <span>Sleep</span>
              </div>

              <p className="field-helper">Hours slept last night</p>

              <div className="sleep-wrapper">
                <input
                  value={sleep}
                  type="number"
                  min="0"
                  max="24"
                  step="0.25"
                  onChange={(e) => {
                    setSleep(e.target.value);
                    setErrors((prev) => ({ ...prev, sleep: undefined }));
                  }}
                  placeholder="e.g. 7.5"
                  className={`soft-input ${errors.sleep ? "input-error" : ""}`}
                />
                <span>hrs</span>
              </div>

              {errors.sleep && <p className="inline-error">{errors.sleep}</p>}
            </div>

            <SliderBlock
              icon="⚡"
              label="Energy"
              value={energy}
              setValue={setEnergy}
              helper="0 = drained, 10 = energized"
            />

            <SliderBlock
              icon="☁️"
              label="Fatigue"
              value={fatigue}
              setValue={setFatigue}
              helper="0 = none, 10 = very high"
            />
          </div>
        </section>

        <section className="checkin-panel tinted-panel">
          <div className="checkin-panel-header">
            <span className="circle-icon">🌸</span>
            <div>
              <h2>Cycle Details</h2>
              <p>Add period details when they apply.</p>
            </div>
          </div>

          <div className="period-toggle-row">
            <button
              type="button"
              className={`period-toggle ${periodStatus ? "active" : ""}`}
              onClick={() => setPeriodStatus(!periodStatus)}
            >
              <div className="period-icon">{periodStatus ? "🪷" : "✨"}</div>

              <div>
                <div className="period-title">Period today</div>
                <div className="period-subtitle">
                  {periodStatus
                    ? "Period day included in this check-in"
                    : "Tap if period started or continued today"}
                </div>
              </div>

              <div className="toggle-circle">{periodStatus ? "✓" : ""}</div>
            </button>
          </div>

          <div className="checkin-grid">
            <div className={`checkin-field ${!periodStatus ? "is-disabled" : ""}`}>
              <div className="metric-label">
                <span className="metric-icon">📍</span>
                <span>Cycle Day</span>
              </div>

              <p className="field-helper">Use 1 for the first day of period</p>

              <input
                value={cycleDay}
                type="number"
                min="1"
                onChange={(e) => {
                  setCycleDay(e.target.value);
                  setErrors((prev) => ({ ...prev, cycleDay: undefined }));
                }}
                placeholder="e.g. 2"
                className={`soft-input ${errors.cycleDay ? "input-error" : ""}`}
                disabled={!periodStatus}
              />

              {errors.cycleDay && <p className="inline-error">{errors.cycleDay}</p>}
            </div>

            <SliderBlock
              icon="🩸"
              label="Flow"
              value={flowIntensity}
              setValue={setFlowIntensity}
              max={5}
              helper="0 = none, 5 = heavy"
              disabled={!periodStatus}
            />

            <SliderBlock
              icon="🌧️"
              label="Cramps"
              value={cramps}
              setValue={setCramps}
              helper="0 = none, 10 = intense"
              disabled={!periodStatus}
            />
          </div>
        </section>

        <section className="checkin-panel tinted-panel">
          <div className="checkin-panel-header">
            <span className="circle-icon">🦋</span>
            <div>
              <h2>Menopause Support</h2>
              <p>Track symptoms that may appear during perimenopause or menopause.</p>
            </div>
          </div>

          <div className="checkin-grid menopause-grid">
            <SliderBlock
              icon="🔥"
              label="Hot Flashes"
              value={hotFlashes}
              setValue={setHotFlashes}
              helper="0 = none, 10 = very frequent"
            />

            <SliderBlock
              icon="🌙"
              label="Night Sweats"
              value={nightSweats}
              setValue={setNightSweats}
              helper="0 = none, 10 = very frequent"
            />

            <SliderBlock
              icon="💤"
              label="Sleep Disruption"
              value={sleepDisruption}
              setValue={setSleepDisruption}
              helper="0 = none, 10 = severe disruption"
            />

            <SliderBlock
              icon="💭"
              label="Brain Fog"
              value={brainFog}
              setValue={setBrainFog}
              helper="0 = none, 10 = very noticeable"
            />

            <SliderBlock
              icon="🔄"
              label="Mood Swings"
              value={moodSwings}
              setValue={setMoodSwings}
              helper="0 = none, 10 = very frequent"
            />
          </div>
        </section>

        <section className="checkin-panel sage-panel">
          <div className="checkin-panel-header">
            <span className="circle-icon sage">♡</span>
            <div>
              <h2>Additional Symptoms</h2>
              <p>Select anything else you noticed today.</p>
            </div>
          </div>

          <div className="symptom-row">
            {["Headache", "Bloating", "Breast Tenderness", "Back Pain"].map((symptom) => (
              <button
                type="button"
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={symptoms.includes(symptom) ? "symptom-pill active" : "symptom-pill"}
              >
                <span>
                  {symptom === "Headache"
                    ? "🧠"
                    : symptom === "Bloating"
                    ? "🌙"
                    : symptom === "Breast Tenderness"
                    ? "🌸"
                    : "🌧️"}
                </span>
                {symptom}
              </button>
            ))}
          </div>
        </section>

        <section className="checkin-panel notes-panel">
          <div className="checkin-panel-header">
            <span className="circle-icon">📝</span>
            <div>
              <h2>Notes</h2>
              <p>Add any context you want to remember.</p>
            </div>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Example: low sleep, cramps in the morning, stressful workday..."
            className="soft-textarea"
          />
        </section>

        {Object.entries(errors).some(
          ([key, value]) => key !== "form" && Boolean(value)
        ) && !submitted && (
          <div className="validation-summary" ref={errorSummaryRef}>
            <span>⚠️</span>
            <div>
              <strong>Almost done</strong>
              <p>Please complete the highlighted field before submitting.</p>
            </div>
          </div>
        )}

        {errors.form && (
          <div className="error-box" ref={errorSummaryRef}>
            {errors.form}
          </div>
        )}

        {submitted && (
          <div className="success-panel">
            <div>
              <strong>Check-in saved successfully ✓</strong>
              <p>You can add another day or return to the dashboard.</p>
            </div>

            <button type="button" onClick={resetForAnotherCheckIn}>
              + Log Another Day
            </button>
          </div>
        )}

        <div className="checkin-actions">
          <button
            onClick={handleSubmit}
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Submit Check-In"} <span>→</span>
          </button>

          <button className="back-button" onClick={onBack}>
            ← Back to Dashboard
          </button>
        </div>

        <p className="footer-message">You&apos;re doing great! 💜</p>
      </main>
    </div>
  );
}

export default CheckIn;
