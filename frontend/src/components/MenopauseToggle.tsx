type Props = {
  hotFlashes: number;

  setHotFlashes: (
    value: number
  ) => void;
};

function MenopauseToggle({
  hotFlashes,
  setHotFlashes,
}: Props) {
  return (
    <div>
      <label>
        Hot Flashes:
        <strong>
          {hotFlashes}/10
        </strong>
      </label>

      <input
        type="range"
        min="0"
        max="10"
        value={hotFlashes}
        onChange={(e) =>
          setHotFlashes(
            Number(
              e.target.value
            )
          )
        }
        style={{
          width: "100%",
        }}
      />
    </div>
  );
}

export default MenopauseToggle;