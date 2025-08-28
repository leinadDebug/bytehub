"use client";

import { Lock, Mail } from "lucide-react";
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
        <div className="w-full max-w-xl text-center md:text-left">
          {/* Mobile Header - Compact and centered */}
          <div className="md:hidden mb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="grid place-items-center h-14 w-14 rounded-2xl bg-white text-white text-2xl font-black shadow-lg">
                🐙
              </div>
              <span className="font-extrabold tracking-tight text-2xl bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                ByteHub
              </span>
            </div>
            <h1 className="text-xl font-bold leading-tight mb-2 px-2">
              Welcome back, ByteHuber!
            </h1>
            <p className="text-gray-500 text-sm px-4">
              Sign in to manage your bookings
            </p>
          </div>

          {/* Desktop Header - Original design */}
          <div className="hidden md:block">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <div className="grid place-items-center h-12 w-12 rounded-full bg-white text-white text-2xl font-black shadow-md">
                🐙
              </div>
              <span className="font-extrabold tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                Byte<span className="text-orange-600">Hub</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-2xl font-semibold leading-tight mb-4">
              Welcome ByteHuber. <br /> Manage your bookings with ease.
            </h1>
            <p className="text-gray-500 text-base md:text-lg lg:text-xs">
              Log in to access your account and continue where you left off.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div
          className={`w-full max-w-md p-4 sm:p-8 rounded-2xl shadow-xl backdrop-blur-md border transition-all duration-500 ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-gray-100 border-gray-200"
          }`}
        >
          <h1 className="text-2xl  font-bold text-center mb-2 hidden sm:block">
            Login
          </h1>
          <p className="text-center text-sm text-gray-400/70 mb-6">
            Enter your credentials to access your dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm backdrop-blur-sm shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0"></div>
                  {error}
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="group">
              <label className="block mb-1 md:mb-2 text-xs md:text-sm font-medium opacity-90">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 opacity-40 group-focus-within:opacity-70 transition-opacity" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 rounded-xl border transition-all duration-200 text-sm md:text-base font-medium ${
                    theme === "dark"
                      ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/15 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                      : "bg-white border-gray-200 text-gray-800 placeholder-gray-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 shadow-sm"
                  } focus:outline-none`}
                  placeholder="your@email.com"
                />
              </div>
            </div>
            {/* Password Field */}
            <div className="group">
              <label className="block mb-1 md:mb-2 text-xs md:text-sm font-medium opacity-90">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 opacity-40 group-focus-within:opacity-70 transition-opacity" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 rounded-xl border transition-all duration-200 text-sm md:text-base font-medium ${
                    theme === "dark"
                      ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/15 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                      : "bg-white border-gray-200 text-gray-800 placeholder-gray-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 shadow-sm"
                  } focus:outline-none`}
                  placeholder="Create a secure password"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white py-3 md:py-4 px-5 md:px-6 rounded-xl text-sm md:text-base font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            {/* Footer */}
            <div className="pt-2 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Don’t have an account?{" "}
                <Link
                  href="/register"
                  className="text-orange-500 hover:text-orange-400 font-semibold underline underline-offset-2 transition-colors duration-200"
                >
                  Sign up here
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
          className={`absolute inset-0 flex items-center justify-center p-8 rounded-2xl transition-all duration-300 ${
            theme === "dark"
              ? "bg-[#0b0b0b]/95 border border-slate-700/50"
              : "bg-white/95 border border-slate-200/50"
          }`}
        >
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Professional Spinner */}
            <div className="relative">
              <div
                className={`h-10 w-10 border-2 rounded-full animate-spin ${
                  theme === "dark"
                    ? "border-slate-600 border-t-slate-300"
                    : "border-slate-300 border-t-slate-600"
                }`}
              ></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-t from-transparent to-orange-500/60">
                🐙
              </div>
            </div>

            {/* Clean Typography */}
            <div className="space-y-1">
              <p
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Setting up your dashboard
              </p>
              <p
                className={`text-xs ${
                  theme === "dark" ? "text-slate-400" : "text-slate-500"
                }`}
              >
                This will only take a moment
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
