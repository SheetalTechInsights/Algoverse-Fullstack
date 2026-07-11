import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  const fetchStats = () => {
    fetch(`${API_BASE_URL}/api/problems/stats`, {
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
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 text-sm sm:text-base">Loading your progress...</p>
        </div>
      </div>
    );
  }

  const total = stats.solved + stats.attempted;
  const percentage = total === 0 ? 0 : Math.round((stats.solved / total) * 100);

  const cards = [
    {
      label: "Solved",
      value: stats.solved,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      ring: "ring-emerald-100",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ),
    },
    {
      label: "Attempted",
      value: stats.attempted,
      color: "text-amber-500",
      bg: "bg-amber-50",
      ring: "ring-amber-100",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: "Total Problems",
      value: total,
      color: "text-blue-600",
      bg: "bg-blue-50",
      ring: "ring-blue-100",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">

      {/* Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          Your Progress
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Keep the streak going — consistency beats intensity.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Overall Completion</span>
          <span className="text-sm font-bold text-emerald-600">{percentage}%</span>
        </div>
        <div className="bg-gray-100 h-3 sm:h-4 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-400 to-teal-600 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm ring-1 ${card.ring} hover:shadow-md transition-shadow duration-300`}
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${card.bg} ${card.color} rounded-xl flex items-center justify-center mb-4`}>
              {card.icon}
            </div>
            <h2 className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide mb-1">
              {card.label}
            </h2>
            <p className={`text-3xl sm:text-4xl font-bold ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Empty state nudge */}
      {total === 0 && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 sm:p-6 text-center">
          <p className="text-emerald-700 font-medium text-sm sm:text-base">
            You haven't attempted any problems yet.
          </p>
          <p className="text-emerald-600 text-xs sm:text-sm mt-1">
            Head to Patterns and solve your first problem to see progress here.
          </p>
        </div>
      )}
    </div>
  );
}