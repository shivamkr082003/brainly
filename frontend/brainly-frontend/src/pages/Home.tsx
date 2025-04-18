import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-indigo-50 via-purple-100 to-indigo-200">
      
      {/* Left - Hero Content */}
      <div className="flex flex-col justify-center px-10 py-20 lg:w-1/2 space-y-8">
        <div className="flex items-center gap-3">
          <div className="text-purple-600 w-12 h-12">
            <Logo />
          </div>
          <h1 className="text-4xl font-bold italic text-purple-700 tracking-wide">Brainly</h1>
        </div>

        <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Capture your thoughts. <br />
          Access them anytime.
        </h2>

        <p className="text-lg text-gray-600 max-w-xl">
          Brainly is your personal digital notepad – save ideas, links, tweets, videos, or anything you want to revisit.
          Organized. Private. Always accessible.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-xl text-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="bg-white border border-gray-300 hover:border-gray-400 text-gray-800 py-3 px-8 rounded-xl text-lg font-semibold shadow-sm transition-all duration-300 transform hover:scale-105"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Right - Illustration */}
      <div className="hidden lg:flex items-center justify-center lg:w-1/2 bg-white shadow-inner">
        <img
          src="/saveimage.png"
          alt="Note Taking Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default HomePage;





