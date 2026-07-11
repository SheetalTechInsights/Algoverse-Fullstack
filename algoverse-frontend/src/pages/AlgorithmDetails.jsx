import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { API_BASE_URL } from "../config";

const LANGUAGES = {
  java: { label: "Java", extension: java(), pistonLang: "java" },
  javascript: { label: "JavaScript", extension: javascript(), pistonLang: "javascript" },
  python: { label: "Python", extension: python(), pistonLang: "python" },
  cpp: { label: "C++", extension: cpp(), pistonLang: "cpp" },
};

const DEFAULT_SNIPPETS = {
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  javascript: `console.log("Hello, World!");`,
  python: `print("Hello, World!")`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
};

export default function AlgorithmDetails() {
  const { problemId } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("java");
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  const token = localStorage.getItem("token");

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
          // Agar backend se starterCode aaya hai use karo, warna default Java snippet
          setCode(data.starterCode || DEFAULT_SNIPPETS.java);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [problemId, token, navigate]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(DEFAULT_SNIPPETS[newLang]);
    setOutput("");
  };

  const runCode = async () => {
    setRunning(true);
    setOutput("Running...");

    try {
      // Get the latest available version for the selected language
      const runtimesRes = await fetch("https://emkc.org/api/v2/piston/runtimes");
      const runtimes = await runtimesRes.json();
      const runtime = runtimes.find(
        (r) => r.language === LANGUAGES[language].pistonLang
      );

      const res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: LANGUAGES[language].pistonLang,
          version: runtime ? runtime.version : "*",
          files: [{ content: code }],
        }),
      });

      const data = await res.json();

      const stdout = data.run?.stdout || "";
      const stderr = data.run?.stderr || "";
      const compileError = data.compile?.stderr || "";

      if (compileError) {
        setOutput("Compilation Error:\n" + compileError);
      } else if (stderr) {
        setOutput("Runtime Error:\n" + stderr);
      } else {
        setOutput(stdout || "Code ran successfully (no output).");
      }
    } catch (err) {
      setOutput("Error running code: " + err.message);
    } finally {
      setRunning(false);
    }
  };

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            Implementation
          </h2>

          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {Object.entries(LANGUAGES).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>

            <button
              onClick={runCode}
              disabled={running}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 sm:px-5 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap"
            >
              {running ? "Running..." : "▶ Run"}
            </button>
          </div>
        </div>

        <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <CodeMirror
            value={code}
            height="320px"
            theme="dark"
            extensions={[LANGUAGES[language].extension]}
            onChange={(value) => setCode(value)}
            basicSetup={{
              lineNumbers: true,
              foldGutter: false,
            }}
          />
        </div>

        {/* Output panel */}
        <div className="mt-4 bg-gray-900 rounded-xl p-4 sm:p-5 min-h-[80px]">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">
            Output
          </p>
          <pre className="text-green-400 text-xs sm:text-sm whitespace-pre-wrap font-mono">
            {output || "Click 'Run' to execute your code"}
          </pre>
        </div>
      </div>

    </div>
  );
}