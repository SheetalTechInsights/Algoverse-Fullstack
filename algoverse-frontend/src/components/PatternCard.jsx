import { Link, useNavigate } from "react-router-dom";

export default function PatternCard({ id, title, problems = [] }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const token = localStorage.getItem("token");

    if (!token) {
      e.preventDefault();
      navigate("/login");
    }
  };

  const solvedCount = problems.filter((p) => p.status === "SOLVED").length;
  const progressPercent =
    problems.length === 0 ? 0 : Math.round((solvedCount / problems.length) * 100);

  return (
    <Link to={`/pattern/${id}`} onClick={handleClick}>
      <div
        className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm 
                   hover:shadow-xl hover:-translate-y-1 
                   transition duration-300 
                   border border-gray-100 cursor-pointer h-full"
      >
        <h3 className="text-base sm:text-lg font-semibold mb-2">
          {title}
        </h3>

        <p className="text-gray-500 text-sm mb-4">
          {problems.length} Problem{problems.length !== 1 ? "s" : ""}
        </p>

        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </Link>
  );
}