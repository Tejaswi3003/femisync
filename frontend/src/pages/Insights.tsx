import AppLayout from "../components/AppLayout";

function Insights() {
  return (
    <AppLayout>

      <h1 className="text-4xl font-bold text-violet-700 mb-10">
        AI Wellness Insights 🧠
      </h1>

      <div className="grid gap-8">

        <section className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            Mood Patterns
          </h2>

          <p className="text-gray-700 leading-7">
            Your mood improves significantly on days with
            consistent sleep above 7 hours.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            Sleep Insights 😴
          </h2>

          <p className="text-gray-700 leading-7">
            Lower fatigue scores correlate with stable
            bedtime schedules across the week.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            Stress Recommendations 🌿
          </h2>

          <p className="text-gray-700 leading-7">
            Mindfulness breaks and hydration appear beneficial
            during high stress periods.
          </p>
        </section>

      </div>

    </AppLayout>
  );
}

export default Insights;