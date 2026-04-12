import { Link, useNavigate } from "react-router-dom";

export default function PatternCard({ id, title, problems = [] }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const token = localStorage.getItem("token");

    if (!token) {
      e.preventDefault(); // stop navigation
      navigate("/login");
    }
  };

  return (
    <Link to={`/pattern/${id}`} onClick={handleClick}>
      <div
        className="bg-white p-6 rounded-2xl shadow-sm 
                   hover:shadow-xl hover:-translate-y-1 
                   transition duration-300 
                   border border-gray-100 cursor-pointer"
      >
        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>

        <p className="text-gray-500 mb-4">
          {problems.length} Problems
        </p>

        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className="bg-green-500 h-2 rounded-full w-2/3"></div>
        </div>
      </div>
    </Link>
  );
}