import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

export default function AlgorithmDetails() {
  const { problemId } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // ✅ If not logged in → redirect
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/api/problems/${problemId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 401) {
          // token invalid / expired
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setProblem(data);
          setCode(data.starterCode || "");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [problemId, token, navigate]);

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!problem) return <div className="p-20 text-center">Problem Not Found</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      {/* Problem Title */}
      <div>
        <h1 className="text-4xl font-bold">
          {problem.name}
        </h1>
        <p className="text-gray-600 mt-4 leading-relaxed">
          {problem.description}
        </p>
      </div>

      {/* Approach */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">
          Approach
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {problem.approach}
        </p>
      </div>

      {/* Pseudocode */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">
          Pseudocode
        </h2>
        <pre className="bg-gray-900 text-green-400 
                        rounded-xl p-6 text-sm 
                        overflow-x-auto whitespace-pre-wrap">
          {problem.pseudoCode}
        </pre>
      </div>

      {/* Code Editor */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Implementation
        </h2>

        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <Editor
            height="450px"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => setCode(value)}
            theme="vs-dark"
          />
        </div>
      </div>

    </div>
  );
}