import AppLayout from "../components/AppLayout";

function Dashboard() {
  return (
    <AppLayout>

      <h1 className="text-4xl font-bold text-violet-700 mb-10">
        Dashboard 💜
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <section className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">
            Wellness Score
          </h2>

          <p className="text-5xl font-bold text-violet-700">
            82%
          </p>
        </section>

        <section className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">
            Sleep Average
          </h2>

          <p className="text-5xl font-bold text-violet-700">
            7.5h
          </p>
        </section>

        <section className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">
            Mood Trend
          </h2>

          <p className="text-5xl font-bold text-violet-700">
            ↑
          </p>
        </section>

      </div>

    </AppLayout>
  );
}

export default Dashboard;