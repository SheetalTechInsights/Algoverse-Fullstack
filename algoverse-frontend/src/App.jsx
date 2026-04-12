import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PatternDetails from "./pages/PatternDetails";
import AlgorithmDetails from "./pages/AlgorithmDetails";
import Footer from "./components/Footer";
import Chatbot from "./components/chatbot/Chatbot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow">
        <Routes>

          {/*  Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/*  Default → redirect logic handled inside Home */}
          <Route path="/" element={<Home />} />

          {/*  Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/*  Protected Pattern Page */}
          <Route
            path="/pattern/:id"
            element={
              <ProtectedRoute>
                <PatternDetails />
              </ProtectedRoute>
            }
          />

          {/*  Protected Problem Page (IMPORTANT) */}
          <Route
            path="/pattern/:id/:problemId"
            element={
              <ProtectedRoute>
                <AlgorithmDetails />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>

      {/* Chatbot */}
      <Chatbot />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;