import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PatternCard from "../components/PatternCard";
import { API_BASE_URL } from "../config";

export default function Home() {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/api/patterns`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setPatterns(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    if (location.hash === "#patterns") {
      setTimeout(() => {
        const section = document.getElementById("patterns");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 sm:space-y-24">

      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 
                      text-white rounded-2xl sm:rounded-3xl shadow-xl 
                      py-14 sm:py-20 md:py-24 px-5 sm:px-8 md:px-10 text-center">

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight">
          Master DSA Pattern by Pattern
        </h1>

        <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto mb-5 sm:mb-6">
          Structured learning for coding interviews.
          Learn → Understand → Implement.
        </p>

        {token ? (
          <p className="text-base sm:text-lg font-semibold">
            Welcome, {username} 👋
          </p>
        ) : (
          <p className="text-sm sm:text-md opacity-90">
            Login to start learning 🚀
          </p>
        )}
      </div>

      {!token ? (
        <div className="text-center space-y-5 sm:space-y-6 px-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Why Algoverse?</h2>
          <p className="max-w-xl mx-auto text-gray-600 text-sm sm:text-base">
            Learn Data Structures & Algorithms in a structured way.
            Crack coding interviews with pattern-based learning.
          </p>

          <ul className="text-gray-700 space-y-2 text-sm sm:text-base inline-block text-left">
            <li>✔️ Pattern-based DSA roadmap</li>
            <li>✔️ Beginner to advanced problems</li>
            <li>✔️ Clean UI for focused learning</li>
          </ul>
        </div>
      ) : (
        <div id="patterns">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 px-1">
            Popular Patterns
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading patterns...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {patterns.map((pattern) => (
                <PatternCard
                  key={pattern.id}
                  id={pattern.id}
                  title={pattern.title}
                  problems={pattern.problems || []}
                />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}