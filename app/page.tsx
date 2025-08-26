"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden transition-colors duration-500 ${
        theme === "dark" ? "bg-[#0b0b0b] text-white" : "bg-white text-black"
      }`}
    >
      {/* Dotted grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            theme === "dark"
              ? "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)"
              : "radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Gradient blobs */}
      <div
        className={`absolute -left-40 top-56 h-[520px] w-[520px] rounded-full blur-3xl opacity-70 transition-transform duration-500`}
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          background:
            theme === "dark"
              ? "linear-gradient(to top right, #c2410c, #ea580c, #b91c1c)"
              : "linear-gradient(to top right, #fde68a, #f59e0b, #f87171)",
        }}
      />
      <div
        className={`absolute right-20 bottom-36 h-[360px] w-[360px] rounded-full blur-2xl transition-transform duration-500`}
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
          background:
            theme === "dark"
              ? "linear-gradient(to bottom right, #f97316aa, #fb923c80, #fcd34d66)"
              : "linear-gradient(to bottom right, #facc15aa, #fbbf2480, #fef3c766)",
        }}
      />

      {/* Header */}
      <header className="relative z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className={`grid place-items-center h-8 w-8 rounded-full shadow-md text-xl font-black ${
                theme === "dark" ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              🐙
            </div>
            <span className="text-lg font-semibold">
              Byte<span className="ml-1 text-[#ff6a00]">Hub</span>
            </span>
          </div>
          {/* Nav Links */}
          <ul
            className={`hidden md:flex items-center gap-8 text-sm ${
              theme === "dark" ? "text-white/80" : "text-black/80"
            }`}
          >
            {["Home", "Features", "About", "Docs", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="hover:opacity-100 transition cursor-pointer"
              >
                {item}
              </a>
            ))}
          </ul>
          {/* CTA + Theme Toggle */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/15">
              👾
            </button>
            <button className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/15">
              X
            </button>
            <Link
              href="./dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-[#ff6a00] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              Explore Lodges
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 text-white"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1
            className={`text-4xl md:text-6xl font-semibold leading-tight ${
              theme === "dark" ? "text-white/80" : "text-black/80"
            }`}
          >
            Streamline lodge rentals with ease.
            <br />
            Book, manage, and monitor—all in one platform.
          </h1>
          <div className="mt-8 flex justify-center gap-3">
            <input
              type="email"
              placeholder="Enter your email to get started"
              className={`h-12 w-full max-w-md rounded-xl border px-4 focus-within:ring-2 outline-none ${
                theme === "dark"
                  ? "border-white/10 bg-white/5 text-white/90 placeholder-white/60 focus-within:ring-orange-500/60"
                  : "border-black/10 bg-black/5 text-black/90 placeholder-black/60 focus-within:ring-orange-500/60"
              }`}
            />
            <button className="h-12 rounded-xl bg-[#ff6a00] px-5 text-sm font-semibold hover:brightness-110">
              <span className="text-white">Notify Me</span>
            </button>
          </div>
        </section>

        {/* Features */}
        <section
          id="Features"
          className="mx-auto max-w-7xl px-6 py-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              title: "Browse Lodges",
              desc: "Search, filter, and compare lodges based on price, amenities, and availability.",
            },
            {
              title: "Seamless Booking",
              desc: "Reserve and pay for your stay securely in just a few clicks.",
            },
            {
              title: "Host Dashboard",
              desc: "For lodge managers to list properties, manage bookings, and monitor performance.",
            },
            {
              title: "Owner Insights",
              desc: "Track lodge earnings, reviews, and activity as an owner.",
            },
            {
              title: "Complaint Resolution",
              desc: "Report and track issues with lodges smoothly.",
            },
            {
              title: "Role-based Access",
              desc: "Different views and permissions for Users, Hosts, and Owners.",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-6 backdrop-blur-sm hover:bg-opacity-10 transition font-sans ${
                theme === "dark"
                  ? "border-white/10 bg-white/5 text-white"
                  : "border-black/10 bg-black/5 text-black"
              }`}
              style={{ transform: `translateY(${scrollY * 0.05}px)` }}
            >
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p
                className={`mt-2  ${
                  theme === "dark" ? "text-white/80" : "text-black/80"
                }`}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </section>
        <section
          className="mx-auto max-w-7xl grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-12 px-6 lg:px-12 py-20
  rounded-3xl border  dark:bg-[#0b0b0b]/80 bg-gray-10
  border-gray-200/50 dark:border-white/10 bg-opacity-20 transition-colors duration-500"
        >
          {/* Left: copy + subscribe */}
          <div>
            <h1
              className={`text-3xl md:text-5xl font-semibold leading-tight max-w-xl font-sans ${
                theme === "dark" ? "text-white/80" : "text-black/80"
              } text-gray-900 dark:text-white/80`}
            >
              Join us in shaping the future
              <br /> of AI as it evolves into a reality
            </h1>

            {/* Subscribe */}
            <div className="mt-8 flex w-full max-w-xl items-center gap-3">
              <div
                className="flex h-12 flex-1 items-center rounded-xl border 
        border-gray-300 dark:border-white/10 
        bg-white/70 dark:bg-white/5 
        px-4 focus-within:ring-2 focus-within:ring-orange-500/60"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-gray-900 dark:text-white/90 placeholder-gray-400 dark:placeholder-white/50 outline-none"
                />
              </div>
              <button
                className="h-12 shrink-0 rounded-xl bg-[#ff6a00] px-6 text-sm font-semibold 
        text-white hover:brightness-110 transition"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Right: columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:pl-12">
            {/* Product */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-white/40">
                Product
              </h3>
              <ul className="mt-4 space-y-3 text-gray-700 dark:text-white/80">
                <li className="hover:text-[#ff6a00] transition-transform hover:translate-x-1">
                  Testnet
                </li>
                <li className="hover:text-[#ff6a00] transition-transform hover:translate-x-1">
                  AI Studio
                </li>
              </ul>
            </div>

            {/* Docs */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-white/40">
                Docs
              </h3>
              <ul className="mt-4 space-y-3 text-gray-700 dark:text-white/80">
                <li className="hover:text-[#ff6a00] transition-transform hover:translate-x-1">
                  Blog
                </li>
                <li className="hover:text-[#ff6a00] transition-transform hover:translate-x-1">
                  Docs
                </li>
                <li className="hover:text-[#ff6a00] transition-transform hover:translate-x-1">
                  Research
                </li>
              </ul>
            </div>

            {/* Ecosystem */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-white/40">
                Ecosystem
              </h3>
              <ul className="mt-4 space-y-3 text-gray-700 dark:text-white/80">
                <li className="hover:text-[#ff6a00] transition-transform hover:translate-x-1">
                  Open Circle
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Watermark */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-24 mx-auto select-none text-center font-extrabold tracking-tight text-gray-500/30"
        style={{ fontSize: "18vw", lineHeight: 0.9 }}
      >
        BYTEHUB
      </div>

      {/* Footer */}
      <footer className="relative z-20">
        <div
          className={`mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 text-sm sm:flex-row ${
            theme === "dark" ? "text-white/70" : "text-black/70"
          }`}
        >
          <p>© {new Date().getFullYear()} Bytehub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-100">
              Privacy Policy
            </a>
            <a href="#" className="hover:opacity-100">
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
