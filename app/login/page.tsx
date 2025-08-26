"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      // simulate dashboard loading
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-500 ${
        theme === "dark" ? "bg-[#0b0b0b] text-white" : "bg-white text-black"
      }`}
    >
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="absolute top-5 right-5 px-3 py-1 text-sm rounded-full border shadow-sm hover:opacity-80 transition"
      >
        {theme === "dark" ? "☀ Light" : "🌙 Dark"}
      </button>

      {/* Main Content */}
      <main
        className={`flex flex-1 flex-col md:flex-row items-center justify-center gap-12 px-6 py-12 ${
          loading ? "opacity-40" : null
        }`}
      >
        {/* Brand Section */}
        <div className="max-w-xl text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
            <div className="grid place-items-center h-12 w-12 rounded-full bg-white text-[#0b0b0b] text-2xl font-black shadow-md">
              🐙
            </div>
            <span className="text-2xl font-bold">ByteHub</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
            Welcome back to ByteHub. <br /> Manage your bookings with ease.
          </h1>
          <p className="text-gray-500 text-base md:text-lg">
            Log in to access your account and continue where you left off.
          </p>
        </div>

        {/* Login Card */}
        <div
          className={`w-full max-w-md p-8 rounded-2xl shadow-xl backdrop-blur-md border transition-all duration-500 ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-gray-100 border-gray-200"
          }`}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Login
          </h1>
          <p className="text-center text-sm text-gray-400 mb-6">
            Enter your credentials to access your dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-700"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-700"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 transition"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            <div className="mt-4 text-center">
              <p className="text-gray-400">
                Don’t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ByteHub. All rights reserved.
      </footer>

      {loading ? (
        <div
          className={`absolute top-0 bottom-0 left-0 right-0  p-10 rounded-lg h-fit w-fit m-auto flex flex-col items-center justify-center ${
            theme === "dark"
              ? "bg-[#0b0b0b] border-white/5 border-2 text-white"
              : "bg-white text-black"
          }`}
        >
          <div
            className={`flex flex-col items-center gap-4 
        ${
          theme === "dark"
            ? "bg-transparent text-white"
            : "bg-transparent text-black"
        }`}
          >
            <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-medium">Loading your dashboard...</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
