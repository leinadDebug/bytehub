"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
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
      <main className="flex flex-1 flex-col md:flex-row items-center justify-center gap-12 px-6 py-12">
        {/* Brand Section */}
        <div className="max-w-xl text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
            <div className="grid place-items-center h-12 w-12 rounded-full bg-white text-[#0b0b0b] text-2xl font-black shadow-md">
              🐙
            </div>
            <span className="text-2xl font-bold">ByteHub</span>
          </div>

          <h1
            className={`text-3xl md:text-5xl font-semibold leading-tight mb-4 ${
              theme === "dark" ? "text-white/90" : "text-black/80"
            }`}
          >
            Streamline lodge rentals with ease. <br /> Book, manage, and
            monitor—all in one platform.
          </h1>
          <p className="text-gray-500 text-base md:text-lg">
            A smarter way to handle your bookings and payments.
          </p>
        </div>

        {/* Registration Card */}
        <div
          className={`w-full max-w-md p-8 rounded-2xl shadow-xl backdrop-blur-md border transition-all duration-500 ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-gray-100 border-gray-200"
          }`}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Create Account
          </h1>
          <p className="text-center text-sm text-gray-400 mb-6">
            Welcome! Please register your new credentials.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap gap-3 p-3 justify-between items-center">
              <Link
                href={"/login"}
                className="text-blue-600 underline underline-offset-2"
              >
                Login
              </Link>
              <div className="flex items-center">
                <button
                  type="button"
                  value={role}
                  onClick={cycleRole}
                  className={`flex item-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 ${
                    theme === "dark" ? "text-white" : "text-slate-200/80"
                  } font-medium shadow-md hover:opacity-90 transition`}
                >
                  <p>Register as</p>
                  <User className="bg-blue-400/40 rounded-lg p-1 " />
                  {role}
                </button>
              </div>
            </div>
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
              <label className="block mb-1 text-sm font-medium">Username</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-700"
                placeholder="Enter your username"
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
            <div>
              <label htmlFor=""></label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 transition"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
            <div className="mt-4 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-500 hover:text-blue-600"
                >
                  SignIn here
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
    </div>
  );
}
