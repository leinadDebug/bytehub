"use client";

import { useThemeStore } from "@/lib/store/theme";
import { Lock, Mail, User, UserCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const { theme, setTheme } = useThemeStore();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [role, setRole] = useState<"User" | "Host" | "Owner">("User");
  const cycleRole = () => {
    if (role === "User") setRole("Host");
    else if (role === "Host") setRole("Owner");
    else setRole("User");
  };
  const host = true;

  const data = {
    email,
    userName,
    password,
    role,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log(data);

    try {
      const createResponse = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          username: userName,
          role: role,
          host: host,
        }),
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.json();
        throw new Error(errorData.message || "Failed to create user");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
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
          <div className="md:hidden mb-2">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="grid place-items-center h-14 w-14 rounded-2xl bg-white text-white text-2xl font-black shadow-lg">
                🐙
              </div>
              <span className="font-extrabold tracking-tight text-2xl bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                ByteHub
              </span>
            </div>
            <h1 className="text-xl font-bold leading-tight mb-2 px-2">
              Streamline lodge rentals with ease
            </h1>
            <p className="text-gray-500 text-sm px-4">
              A smarter way to handle your bookings and payments.
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
              Streamline lodge rentals with ease. <br /> Book, manage, and
              monitor—all in one platform.
            </h1>
            <p className="text-gray-500 text-base md:text-lg lg:text-xs">
              A smarter way to handle your bookings and payments.
            </p>
          </div>
        </div>

        {/* Registration Card */}
        <div
          className={`w-full max-w-md p-4 sm:p-8 rounded-2xl shadow-xl backdrop-blur-md border transition-all duration-500 ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-gray-100 border-gray-200"
          }`}
        >
          <h1 className="text-2xl  font-bold text-center mb-2 hidden sm:block">
            Create Account
          </h1>
          <p className="text-center text-sm text-gray-400/70 mb-6">
            Welcome! Please register your new credentials.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
            {/* Role Switcher */}
            <div className="flex items-end sm:px-4">
              <button
                type="button"
                onClick={cycleRole}
                className={`w-full flex items-center justify-between gap-4 px-5 py-3 md:px-6 md:py-4 lg:px-4 lg:py-3 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group ${
                  theme === "dark"
                    ? "bg-white/10 border-white/20 hover:bg-white/15"
                    : "bg-white/80 border-white/40 hover:bg-white/90 shadow-lg"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-xl p-2 md:p-2.5 group-hover:scale-110 transition-transform duration-200">
                    <User className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] md:text-xs opacity-60 uppercase tracking-wider font-medium">
                      Register as
                    </p>
                    <p className="font-bold text-base md:text-lg lg:text-sm bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      {role}
                    </p>
                  </div>
                </div>
                <div className="text-orange-500 opacity-60 group-hover:opacity-100 transition-opacity duration-200 text-lg md:text-xl">
                  ⟲
                </div>
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 md:p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs md:text-sm backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 flex-shrink-0"></div>
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

            {/* Username Field */}
            <div className="group">
              <label className="block mb-1 md:mb-2 text-xs md:text-sm font-medium opacity-90">
                Username
              </label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 opacity-40 group-focus-within:opacity-70 transition-opacity" />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className={`w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 rounded-xl border transition-all duration-200 text-sm md:text-base font-medium ${
                    theme === "dark"
                      ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/15 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                      : "bg-white border-gray-200 text-gray-800 placeholder-gray-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 shadow-sm"
                  } focus:outline-none`}
                  placeholder="Choose a username"
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

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white py-3 md:py-4 px-5 md:px-6 rounded-xl text-sm md:text-base font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              {loading ? (
                <div className="flex items-center justify-center gap-2 md:gap-3">
                  <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating your account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Create Account</span>
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </div>
                </div>
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-3 md:pt-4 border-gray-500 border-t border-opacity-20">
              <p className="text-xs md:text-sm opacity-70">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-orange-500 hover:text-orange-400 font-semibold underline underline-offset-2 transition-colors duration-200"
                  onClick={() => router.push("/login")}
                >
                  Sign in here
                </button>
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
                Creating your account
              </p>
              <p
                className={`text-xs ${
                  theme === "dark" ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Welcome to ByteHub! We're setting everything up
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
