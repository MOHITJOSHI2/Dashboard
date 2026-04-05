import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register ChartJS elements
ChartJS.register(ArcElement, Tooltip, Legend);

const Leaderboard = () => {
  // Chart Data to match your "Readiness Distribution"
  const chartData = {
    labels: ["Ready", "In Progress", "Pending"],
    datasets: [
      {
        data: [32, 43, 12],
        backgroundColor: [
          "rgba(34, 197, 94, 0.7)", // Green
          "rgba(234, 179, 8, 0.7)", // Yellow
          "rgba(239, 68, 68, 0.7)", // Red
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#BFDBFE", // text-blue-200
          font: { weight: "bold", family: "Inter" },
          padding: 20,
        },
      },
    },
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
  };

  const operators = [
    {
      name: "Kathmandu Upatyaka WSMB",
      region: "Bagmati Province",
      score: "88%",
      color: "border-l-green-500",
      tag: "bg-green-500/20 text-green-300 border-green-500/50",
    },
    {
      name: "Pokhara Water Supply Corp",
      region: "Gandaki Province",
      score: "65%",
      color: "border-l-yellow-500",
      tag: "bg-yellow-500/20 text-yellow-300 border-yellow-500/50",
    },
    {
      name: "RRN Chitwan Workshop P1",
      region: "Bagmati Province",
      score: "32%",
      color: "border-l-red-500",
      tag: "bg-red-500/20 text-red-300 border-red-500/50",
    },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 lg:px-20 py-24">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h3 className="text-3xl font-black uppercase tracking-widest text-blue-400 mb-4 italic">
              Service Leaderboard
            </h3>
            <p className="text-lg text-blue-100/70 font-medium">
              Ranking 87 operators based on KPI performance. High-performing
              operators are prioritized for budget allocation.
            </p>
          </div>
          <button className="px-8 py-4 bg-blue-600/20 hover:bg-blue-600 border border-blue-400/50 rounded-2xl font-bold flex items-center gap-3 transition-all">
            <span>🗺️</span> VIEW ON FULL BASEMAP
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Chart Section */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] h-[450px] flex flex-col">
            <h4 className="text-xl font-black text-center mb-8 uppercase tracking-tighter">
              Readiness Distribution
            </h4>
            <div className="flex-1">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Ranking List */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-blue-400 mb-6">
              Top Ranked Operators
            </h4>
            {operators.map((op, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl border-l-4 ${op.color} hover:bg-white/10 transition-all cursor-pointer`}
              >
                <div>
                  <h5 className="text-lg font-black text-white">{op.name}</h5>
                  <p className="text-sm font-bold text-blue-300/60">
                    {op.region}
                  </p>
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-black border ${op.tag}`}
                >
                  {op.score} READY
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
