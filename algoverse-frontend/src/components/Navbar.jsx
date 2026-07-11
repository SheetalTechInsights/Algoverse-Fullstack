import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("home");
  const [username, setUsername] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("username");
    setUsername(user);
  }, [location]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActive("");
    } else {
      setActive("home");
    }
    setMenuOpen(false);
  }, [location]);

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

  const handleHomeClick = () => {
    setActive("home");
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePatternsClick = () => {
    setMenuOpen(false);
    navigate("/#patterns");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-emerald-600 tracking-tight"
        >
          AlgoVerse
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8 font-medium items-center">
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

          <Link to="/dashboard" className="text-gray-600 hover:text-emerald-600">
            Dashboard
          </Link>

          <button
            onClick={handlePatternsClick}
            className={`transition ${
              active === "patterns"
                ? "text-emerald-600 font-semibold"
                : "text-gray-600 hover:text-emerald-600"
            }`}
          >
            Patterns
          </button>

          {username ? (
            <div className="flex items-center space-x-4">
              <span className="text-emerald-600 font-semibold">Hi, {username}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/signup" className="text-gray-600 hover:text-emerald-600 font-medium">
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-emerald-600"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <button
            onClick={handleHomeClick}
            className={`block w-full text-left py-2 ${
              active === "home" ? "text-emerald-600 font-semibold" : "text-gray-600"
            }`}
          >
            Home
          </button>

          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-gray-600"
          >
            Dashboard
          </Link>

          <button
            onClick={handlePatternsClick}
            className={`block w-full text-left py-2 ${
              active === "patterns" ? "text-emerald-600 font-semibold" : "text-gray-600"
            }`}
          >
            Patterns
          </button>

          {username ? (
            <div className="pt-2 border-t border-gray-100 space-y-3">
              <p className="text-emerald-600 font-semibold py-1">Hi, {username}</p>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-gray-100 space-y-3">
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-gray-600 font-medium"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}