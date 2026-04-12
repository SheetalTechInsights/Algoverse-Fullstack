import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const err = await res.text();
        alert("Login failed: " + err);
        return;
      }

      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);

      alert("Login Successful ");
      navigate("/dashboard"); 

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}