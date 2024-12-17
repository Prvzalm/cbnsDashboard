import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginLeft, LoginRight } from "../assets";

const Login = () => {
  const navigate = useNavigate(); // For navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded credentials
  const validEmail = "cribonix@gmail.com";
  const validPassword = "Cribonix@1234#";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === validEmail && password === validPassword) {
      navigate("/", { replace: true });
      sessionStorage.setItem("isAuthenticated", true);
    } else {
      // Show error message
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex h-full">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center w-1/3 bg-[#1F1F1F] text-white p-8">
        <h1 className="text-4xl font-bold mb-4">Admin Login</h1>
        <p className="text-gray-400 text-lg mb-6">
          Yhe abhi socha ni h baad mai likhege
        </p>
        <img src={LoginLeft} alt="Left Illustration" />
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-2/3">
        <div className="p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Login Details</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Login
            </button>
          </form>
        </div>
        <div>
          <img src={LoginRight} alt="Right Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
