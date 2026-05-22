import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", fatigue: 2 },
  { day: "Tue", fatigue: 4 },
  { day: "Wed", fatigue: 3 },
  { day: "Thu", fatigue: 5 },
  { day: "Fri", fatigue: 4 },
];

const SymptomChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Fatigue Trends
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="fatigue"
            stroke="#ec4899"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SymptomChart;