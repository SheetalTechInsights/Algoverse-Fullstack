import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

    // Fetch pattern
    fetch(`http://localhost:8080/api/patterns/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setPattern(data));

    // Fetch problems
    fetch(`http://localhost:8080/api/problems/pattern/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
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
    await fetch(`http://localhost:8080/api/problems/${problemId}/solve`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // update UI instantly
    setProblems(prev =>
      prev.map(p =>
        p.id === problemId ? { ...p, status: "SOLVED" } : p
      )
    );
  };

 
  const markAttempted = async (problemId) => {
    await fetch(`http://localhost:8080/api/problems/${problemId}/attempt`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setProblems(prev =>
      prev.map(p =>
        p.id === problemId ? { ...p, status: "ATTEMPTED" } : p
      )
    );
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!pattern) return <div className="p-20 text-center">Pattern Not Found</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">

      <h1 className="text-4xl font-bold">{pattern.title}</h1>

      <div className="bg-white p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Theory</h2>
        <p className="text-gray-600">{pattern.theory}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8">Problems</h2>

        <div className="space-y-6">
          {problems.map((problem) => (
            <div
              key={problem.id}
              className="bg-white p-8 rounded-2xl border shadow-sm flex justify-between items-start"
            >

              {/* LEFT SIDE */}
              <div>
                <Link to={`/pattern/${id}/${problem.id}`}>
                  <h3 className="font-semibold text-lg hover:underline">
                    {problem.name}
                  </h3>
                </Link>

                <p className="text-sm text-gray-500 mt-2">
                  {problem.description}
                </p>

                {/* STATUS */}
                {problem.status === "SOLVED" && (
                  <p className="text-green-600 mt-2"> Solved</p>
                )}

                {problem.status === "ATTEMPTED" && (
                  <p className="text-yellow-600 mt-2">⚡ Attempted</p>
                )}

                {/* BUTTONS */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => markSolved(problem.id)}
                    className="bg-green-500 text-white px-4 py-1 rounded-lg text-sm"
                  >
                    Solve
                  </button>

                  <button
                    onClick={() => markAttempted(problem.id)}
                    className="bg-yellow-400 text-white px-4 py-1 rounded-lg text-sm"
                  >
                    Attempt
                  </button>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <span className={`px-4 py-1 rounded-full text-sm ${getDifficultyBadge(problem.difficulty)}`}>
                {problem.difficulty}
              </span>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}