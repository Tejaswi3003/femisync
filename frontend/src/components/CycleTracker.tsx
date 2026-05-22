type Props = {
  cramps: number;
  setCramps: (v: number) => void;
};

function CycleTracker({
  cramps,
  setCramps,
}: Props) {
  return (
    <div>
      <label>
        Cramps Score:
        <strong>{cramps}/10</strong>
      </label>

      <input
        type="range"
        min="0"
        max="10"
        value={cramps}
        onChange={(e) =>
          setCramps(Number(e.target.value))
        }
        style={{
          width: "100%",
        }}
      />
    </div>
  );
}

export default CycleTracker;