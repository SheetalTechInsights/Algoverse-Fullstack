import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export default function PatternDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pattern, setPattern] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE_URL}/api/patterns/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setPattern(data));

    fetch(`${API_BASE_URL}/api/problems/pattern/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setProblems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

  }, [id]);

  const getDifficultyBadge = (difficulty) => {
    if (difficulty === "Easy") return "bg-green-100 text-green-700";
    if (difficulty === "Medium") return "bg-yellow-100 text-yellow-700";
    if (difficulty === "Hard") return "bg-red-100 text-red-700";
    return "";
  };

  const markSolved = async (problemId) => {
    await fetch(`${API_BASE_URL}/api/problems/${problemId}/solve`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });

    setProblems(prev =>
      prev.map(p => p.id === problemId ? { ...p, status: "SOLVED" } : p)
    );
  };

  const markAttempted = async (problemId) => {
    await fetch(`${API_BASE_URL}/api/problems/${problemId}/attempt`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });

    setProblems(prev =>
      prev.map(p => p.id === problemId ? { ...p, status: "ATTEMPTED" } : p)
    );
  };

  if (loading) return <div className="p-10 sm:p-20 text-center">Loading...</div>;
  if (!pattern) return <div className="p-10 sm:p-20 text-center">Pattern Not Found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10 sm:space-y-16">

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{pattern.title}</h1>

      <div className="bg-white p-5 sm:p-8 rounded-2xl border shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Theory</h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{pattern.theory}</p>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-8">Problems</h2>

        <div className="space-y-4 sm:space-y-6">
          {problems.map((problem) => (
            <div
              key={problem.id}
              className="bg-white p-5 sm:p-8 rounded-2xl border shadow-sm flex flex-col sm:flex-row justify-between items-start gap-4"
            >
              <div className="flex-1 w-full">
                <Link to={`/pattern/${id}/${problem.id}`}>
                  <h3 className="font-semibold text-base sm:text-lg hover:underline">
                    {problem.name}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  {problem.description}
                </p>

                {problem.status === "SOLVED" && (
                  <p className="text-green-600 mt-2 text-sm"> Solved</p>
                )}

                {problem.status === "ATTEMPTED" && (
                  <p className="text-yellow-600 mt-2 text-sm">⚡ Attempted</p>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => markSolved(problem.id)}
                    className="bg-green-500 text-white px-3 sm:px-4 py-1 rounded-lg text-xs sm:text-sm"
                  >
                    Solve
                  </button>

                  <button
                    onClick={() => markAttempted(problem.id)}
                    className="bg-yellow-400 text-white px-3 sm:px-4 py-1 rounded-lg text-xs sm:text-sm"
                  >
                    Attempt
                  </button>
                </div>
              </div>

              <span className={`self-start px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap ${getDifficultyBadge(problem.difficulty)}`}>
                {problem.difficulty}
              </span>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}