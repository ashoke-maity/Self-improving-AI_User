import React, { useState } from "react";
import UserAPI from "../api/axios";
import { useNavigate } from "react-router-dom";

function UserAuth() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isRegistering) {
        // Registration API Call
        console.log("Registration attempt", formData);
        const response = await UserAPI.post("/register", {
          FirstName: formData.firstName,
          LastName: formData.lastName,
          Email: formData.email,
          Password: formData.password,
        });
        if (response.status === 201) {
          console.log("User registered successfully", response.data);
          // Wait briefly, or maybe switch them to the login flow immediately:
          setIsRegistering(false);
          navigate("/");
        } else {
          console.error("Registration failed", response.data);
        }
      } else {
        // Login API Call
        console.log("Login attempt", {
          email: formData.email,
          password: formData.password,
        });
        const response = await UserAPI.post("/login", {
          Email: formData.email,
          Password: formData.password,
        });
        if (response.status === 200) {
          console.log("User logged in successfully", response.data);
          navigate("/Home");
        } else {
          console.error("Login failed", response.data);
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = (e) => {
    e.preventDefault();
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white font-sans">
      <div className="w-full max-w-[420px] p-8 sm:p-10 bg-[#121212] border border-gray-800 rounded-3xl shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight m-0">
            {isRegistering ? "Create an Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            {isRegistering
              ? "Sign up to get started."
              : "Please enter your details to sign in."}
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-1/2">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-300 ml-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required={isRegistering}
                  className="bg-[#0a0a0a] border border-gray-800 px-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full"
                />
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-300 ml-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required={isRegistering}
                  className="bg-[#0a0a0a] border border-gray-800 px-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300 ml-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="bg-[#0a0a0a] border border-gray-800 px-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300 ml-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="bg-[#0a0a0a] border border-gray-800 pl-4 pr-12 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {!isRegistering && (
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  className="w-4 h-4 rounded border-gray-700 bg-[#0a0a0a] text-indigo-500 focus:ring-indigo-500 focus:ring-offset-gray-900 cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <a
                href="#"
                className="font-medium text-indigo-400 hover:text-indigo-300 mt-1"
              >
                Forgot Password?
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : isRegistering ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="text-center mt-8 text-sm text-gray-400">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
          <a
            href="#"
            onClick={toggleMode}
            className="font-semibold text-indigo-400 hover:text-indigo-300 ml-1"
          >
            {isRegistering ? "Sign in" : "Sign up"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserAuth;
