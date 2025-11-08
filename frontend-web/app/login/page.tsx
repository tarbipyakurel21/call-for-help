"use client";

import { useState } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("consumer");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email: loginEmail, password: loginPassword });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup:", { name: signupName, email: signupEmail, password: signupPassword, role: signupRole });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-t-lg font-semibold ${
              isLogin ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-t-lg font-semibold ${
              !isLogin ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Signup
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-700 text-gray-900 dark:text-gray-100"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-700 text-gray-900 dark:text-gray-100"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-cyan-400 dark:hover:bg-cyan-300 transition"
            >
              Login
            </button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-600 dark:text-cyan-300 font-semibold hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-700 text-gray-900 dark:text-gray-100"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-700 text-gray-900 dark:text-gray-100"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-700 text-gray-900 dark:text-gray-100"
              required
            />
            <select
              value={signupRole}
              onChange={(e) => setSignupRole(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-700 text-gray-900 dark:text-gray-100"
            >
              <option value="consumer">Consumer</option>
              <option value="responder">Responder</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-cyan-400 dark:hover:bg-cyan-300 transition"
            >
              Sign up
            </button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-600 dark:text-cyan-300 font-semibold hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
