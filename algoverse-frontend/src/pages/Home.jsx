import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PatternCard from "../components/PatternCard";

export default function Home() {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // Fetch patterns ONLY if logged in
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:8080/api/patterns", {
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

  // Scroll to patterns
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
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">

      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 
                      text-white rounded-3xl shadow-xl 
                      py-24 px-10 text-center">

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Master DSA Pattern by Pattern
        </h1>

        
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
          Structured learning for coding interviews.
          Learn → Understand → Implement.
        </p>

        {/* 👇 Show username or CTA */}
        {token ? (
          <p className="text-lg font-semibold">
            Welcome, {username} 👋
          </p>
        ) : (
          <p className="text-md opacity-90">
            Login to start learning 🚀
          </p>
        )}
      </div>

      {/* If NOT logged in → show landing content */}
      {!token ? (
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Why Algoverse?</h2>
          <p className="max-w-xl mx-auto text-gray-600">
            Learn Data Structures & Algorithms in a structured way.
            Crack coding interviews with pattern-based learning.
          </p>

          <ul className="text-gray-700 space-y-2">
            <li>✔️ Pattern-based DSA roadmap</li>
            <li>✔️ Beginner to advanced problems</li>
            <li>✔️ Clean UI for focused learning</li>
          </ul>
        </div>
      ) : (
        /* Logged in → show patterns */
        <div id="patterns">
          <h2 className="text-3xl font-bold mb-10">
            Popular Patterns
          </h2>

          {loading ? (
            <p>Loading patterns...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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