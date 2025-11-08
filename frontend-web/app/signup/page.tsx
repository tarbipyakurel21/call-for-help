"use client";

import { useState } from "react";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("consumer"); // default role

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password, role });
    // TODO: Connect to your /register endpoint
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">Sign Up</h2>
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-700 text-gray-900 dark:text-gray-100"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-700 text-gray-900 dark:text-gray-100"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-700 text-gray-900 dark:text-gray-100"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-700 text-gray-900 dark:text-gray-100"
        >
          <option value="consumer">Consumer</option>
          <option value="responder">Responder</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-cyan-400 dark:hover:bg-cyan-300 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
