type Props = {
  label: string;
  value: number;
  setValue: (value: number) => void;
};

function WellnessSlider({
  label,
  value,
  setValue,
}: Props) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <label>
        {label}: <strong>{value}/10</strong>
      </label>

      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) =>
          setValue(Number(e.target.value))
        }
        style={{
          width: "100%",
          marginTop: "8px",
        }}
      />
    </div>
  );
}

export default WellnessSlider;