import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("home");
  const [username, setUsername] = useState(null);

  // ✅ Load username from localStorage
  useEffect(() => {
    const user = localStorage.getItem("username");
    setUsername(user);
  }, [location]); // update when route changes

  // Detect route change
  useEffect(() => {
    if (location.pathname !== "/") {
      setActive("");
    } else {
      setActive("home");
    }
  }, [location]);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      const patternsSection = document.getElementById("patterns");

      if (!patternsSection) return;

      const sectionTop = patternsSection.offsetTop;
      const scrollPosition = window.scrollY + 100;

      if (scrollPosition >= sectionTop) {
        setActive("patterns");
      } else {
        setActive("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Home click
  const handleHomeClick = () => {
    setActive("home");

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-emerald-600 tracking-tight"
        >
          AlgoVerse
        </Link>

        <div className="space-x-8 font-medium flex items-center">

          {/* HOME */}
          <button
            onClick={handleHomeClick}
            className={`transition ${
              active === "home"
                ? "text-emerald-600 font-semibold"
                : "text-gray-600 hover:text-emerald-600"
            }`}
          >
            Home
          </button>
        <Link
  to="/dashboard"
  className="text-gray-600 hover:text-emerald-600"
>
  Dashboard
</Link>
          {/* PATTERNS */}
          <button
            onClick={() => navigate("/#patterns")}
            className={`transition ${
              active === "patterns"
                ? "text-emerald-600 font-semibold"
                : "text-gray-600 hover:text-emerald-600"
            }`}
          >
            Patterns
          </button>

          {/* ✅ AUTH SECTION */}
          {username ? (
            <div className="flex items-center space-x-4">
              <span className="text-emerald-600 font-semibold">
                Hi, {username}
              </span>

              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}