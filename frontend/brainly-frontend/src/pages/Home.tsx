import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Section for Branding (Only on large screens) */}
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="flex flex-col items-center max-w-md space-y-6 text-center text-white">
          <div className="pr-2 text-purple-600 w-20 ">
            <Logo />
          </div>
          <h1 className="text-3xl font-normal tracking-wider mb-2">
            Welcome to <span className="font-extrabold italic text-4xl underline">Brainly!</span>
          </h1>
          <span className="text-xl font-light tracking-tight">Think Smart. Log In Smarter.</span>
        </div>
      </div>

      {/* Right Section for Auth Actions */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-6">
          <div className="pr-2 text-purple-600  h-10 display flex items-center justify-center">
            <Logo />
          </div>
          <span className="font-semibold italic text-xl underline">Brainly</span>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Brainly</h2>
        <p className="text-gray-600 text-lg mb-8 text-center">
          A simple and secure way to manage your account. Get started below.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-sm">
          <button
            onClick={() => navigate("/signup")}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl text-lg font-semibold shadow-md hover:bg-purple-700 transform hover:scale-105 transition-all duration-300"
          >
            Signup
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl text-lg font-semibold shadow-md hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
          >
            Signin
          </button>
        </div>

        <div className="mt-10 text-sm text-gray-500">
          © 2025 Brainly Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default HomePage;


