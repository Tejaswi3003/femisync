type Props = {
  symptoms: string[];

  setSymptoms: (
    symptoms: string[]
  ) => void;
};

const options = [
  "Headache",
  "Fatigue",
  "Mood Swings",
  "Bloating",
];

function SymptomForm({
  symptoms,
  setSymptoms,
}: Props) {
  const toggle = (
    symptom: string
  ) => {
    if (
      symptoms.includes(
        symptom
      )
    ) {
      setSymptoms(
        symptoms.filter(
          (x) =>
            x !== symptom
        )
      );
    } else {
      setSymptoms([
        ...symptoms,
        symptom,
      ]);
    }
  };

  return (
    <>
      {options.map(
        (symptom) => (
          <label
            key={symptom}
            style={{
              display:
                "block",
              marginBottom:
                "12px",
            }}
          >
            <input
              type="checkbox"
              checked={symptoms.includes(
                symptom
              )}
              onChange={() =>
                toggle(
                  symptom
                )
              }
            />

            {" "}
            {symptom}
          </label>
        )
      )}
    </>
  );
}

export default SymptomForm;