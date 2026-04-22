// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

function NotFound() {
  return (
    <div className="relative flex items-center justify-center min-h-[90vh] bg-white overflow-hidden">

      {/* 🔥 Gradient Blob Background */}
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-[#7A1CAC] to-[#AD49E1] rounded-full blur-3xl opacity-20 animate-pulse"></div>

      {/* 🔥 Content */}
      <div className="relative text-center z-10">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-[#EBD3F8] animate-bounce">
            <SearchX size={40} className="text-[#7A1CAC]" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-7xl font-extrabold text-[#7A1CAC] tracking-wide">
          404
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          Oops! The page you're looking for doesn’t exist.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 rounded-full text-white 
          bg-gradient-to-r from-[#7A1CAC] to-[#AD49E1]
          hover:scale-105 transition-transform duration-300 shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;