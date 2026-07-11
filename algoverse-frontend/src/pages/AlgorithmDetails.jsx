import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { API_BASE_URL } from "../config";

export default function AlgorithmDetails() {
  const { problemId } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE_URL}/api/problems/${problemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (res.status === 401) {
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

  if (loading) return <div className="p-10 sm:p-20 text-center">Loading...</div>;
  if (!problem) return <div className="p-10 sm:p-20 text-center">Problem Not Found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10 sm:space-y-16">

      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          {problem.name}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-3 sm:mt-4 leading-relaxed">
          {problem.description}
        </p>
      </div>

      <div className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
          Approach
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {problem.approach}
        </p>
      </div>

      <div className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
          Pseudocode
        </h2>
        <pre className="bg-gray-900 text-green-400 
                        rounded-xl p-4 sm:p-6 text-xs sm:text-sm 
                        overflow-x-auto whitespace-pre-wrap">
          {problem.pseudoCode}
        </pre>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Implementation
        </h2>

        <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          {isMobile ? (
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 bg-gray-900 text-green-400 font-mono text-xs p-4 focus:outline-none resize-none"
              spellCheck={false}
            />
          ) : (
            <Editor
              height="350px"
              defaultLanguage="javascript"
              value={code}
              onChange={(value) => setCode(value)}
              theme="vs-dark"
              options={{ fontSize: 13, minimap: { enabled: false } }}
            />
          )}
        </div>
      </div>

    </div>
  );
}