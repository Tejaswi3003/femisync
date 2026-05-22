type Props = {
  sleep: string;
  setSleep: (v: string) => void;

  notes: string;
  setNotes: (v: string) => void;
};

function LifestyleInputs({
  sleep,
  setSleep,
  notes,
  setNotes,
}: Props) {
  return (
    <>
      <div style={{ marginBottom: "24px" }}>
        <label>Sleep Hours</label>

        <input
          type="number"
          value={sleep}
          onChange={(e) =>
            setSleep(e.target.value)
          }
          style={inputStyle}
        />
      </div>

      <div>
        <label>Notes</label>

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          style={textareaStyle}
        />
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
};

const textareaStyle = {
  width: "100%",
  minHeight: "120px",
  padding: "14px",
};

export default LifestyleInputs;