import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  const fetchStats = () => {
    fetch("http://localhost:8080/api/problems/stats", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchStats();

    // Auto refresh every 3 sec
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="p-20 text-center text-lg">
        Loading your progress...
      </div>
    );
  }

  const total = stats.solved + stats.attempted;
  const percentage =
    total === 0 ? 0 : Math.round((stats.solved / total) * 100);

  return (
    <div className="max-w-6xl mx-auto p-10 space-y-10">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800">
        Your Progress 🚀
      </h1>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="bg-gray-200 h-5 rounded-full overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-green-400 to-emerald-600 h-5 transition-all duration-700"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-gray-600 text-lg">
          Completion: <span className="font-semibold">{percentage}%</span>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Solved */}
        <div className="bg-white shadow-lg p-6 rounded-2xl hover:scale-105 transition duration-300">
          <h2 className="text-gray-500 mb-2">Solved</h2>
          <p className="text-4xl font-bold text-green-600">
            {stats.solved}
          </p>
        </div>

        {/* Attempted */}
        <div className="bg-white shadow-lg p-6 rounded-2xl hover:scale-105 transition duration-300">
          <h2 className="text-gray-500 mb-2">Attempted</h2>
          <p className="text-4xl font-bold text-yellow-500">
            {stats.attempted}
          </p>
        </div>

        {/* Total */}
        <div className="bg-white shadow-lg p-6 rounded-2xl hover:scale-105 transition duration-300">
          <h2 className="text-gray-500 mb-2">Total</h2>
          <p className="text-4xl font-bold text-blue-600">
            {total}
          </p>
        </div>

      </div>

    </div>
  );
}