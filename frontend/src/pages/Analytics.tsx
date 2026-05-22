import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import AppLayout from "../components/AppLayout";

const moodData = [
  { day: "Mon", mood: 6, stress: 5 },
  { day: "Tue", mood: 7, stress: 4 },
  { day: "Wed", mood: 5, stress: 8 },
  { day: "Thu", mood: 8, stress: 3 },
  { day: "Fri", mood: 9, stress: 2 },
  { day: "Sat", mood: 7, stress: 5 },
  { day: "Sun", mood: 8, stress: 4 },
];

const sleepData = [
  { day: "Mon", sleep: 7 },
  { day: "Tue", sleep: 6 },
  { day: "Wed", sleep: 8 },
  { day: "Thu", sleep: 5 },
  { day: "Fri", sleep: 7 },
  { day: "Sat", sleep: 9 },
  { day: "Sun", sleep: 8 },
];

function Analytics() {
  return (
    <AppLayout>

      <h1 className="text-4xl font-bold text-violet-700 mb-10">
        Wellness Analytics 📊
      </h1>

      <div className="grid gap-8">

        <section className="bg-white rounded-3xl p-8 shadow-sm">

          <h2 className="text-2xl font-semibold mb-6">
            Mood & Stress Trends
          </h2>

          <ResponsiveContainer width="100%" height={320}>

            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="mood"
                stroke="#8b5cf6"
                strokeWidth={4}
              />

              <Line
                type="monotone"
                dataKey="stress"
                stroke="#c084fc"
                strokeWidth={4}
              />
            </LineChart>

          </ResponsiveContainer>

        </section>

        <section className="bg-white rounded-3xl p-8 shadow-sm">

          <h2 className="text-2xl font-semibold mb-6">
            Sleep Patterns 😴
          </h2>

          <ResponsiveContainer width="100%" height={320}>

            <BarChart data={sleepData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="sleep"
                fill="#8b5cf6"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </section>

      </div>

    </AppLayout>
  );
}

export default Analytics;