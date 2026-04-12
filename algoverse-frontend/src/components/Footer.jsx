import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 grid md:grid-cols-3 gap-8">
        
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold text-green-500 mb-4">
            AlgoVerse
          </h2>
          <p className="text-sm text-gray-400">
            A structured platform to master DSA patterns
            for coding interviews and real-world problem solving.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-green-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-green-500 transition">
                Patterns
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-green-500 transition">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">
            Connect
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <span className="text-gray-400">
                contact@algoverse.com
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} AlgoVerse. All rights reserved.
      </div>

    </footer>
  );
}
