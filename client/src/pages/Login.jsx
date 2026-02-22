import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt', formData);
    // Add logic here to authenticate the user
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white font-sans">

      <div className="w-full max-w-[420px] p-8 sm:p-10 bg-[#121212] border border-gray-800 rounded-3xl shadow-2xl">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight m-0">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2 text-sm">Please enter your details to sign in.</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
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
            <label htmlFor="password" className="text-sm font-medium text-gray-300 ml-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="bg-[#0a0a0a] border border-gray-800 px-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input type="checkbox" name="remember" className="w-4 h-4 rounded border-gray-700 bg-[#0a0a0a] text-indigo-500 focus:ring-indigo-500 focus:ring-offset-gray-900 cursor-pointer" />
              <span>Remember me</span>
            </label>
            <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300 mt-1">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
          >
            Sign In
          </button>

        </form>

        <div className="text-center mt-8 text-sm text-gray-400">
          Don't have an account?
          <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300 ml-1">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;