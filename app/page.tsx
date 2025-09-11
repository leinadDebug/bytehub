"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useThemeStore } from "@/lib/store/theme";
import { Inter, Noto_Sans, Notable } from "next/font/google";

interface Props {}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-noto" });
const notable = Notable({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-notable",
});

const LandingLayout: React.FC<Props> = () => {
  const { theme, setTheme } = useThemeStore();
  const [menuOpen, setMenuOpen] = useState(false);

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
          transform: `translateY(${2 * 0.1}px)`,
          background:
            theme === "dark"
              ? "linear-gradient(to top right, #c2410c, #ea580c, #b91c1c)"
              : "linear-gradient(to top right, #fde68a, #f59e0b, #f87171)",
        }}
      />
      <div
        className={`absolute right-20 bottom-36 h-[360px] w-[360px] rounded-full blur-2xl transition-transform duration-500`}
        style={{
          transform: `translateY(${2 * 0.15}px)`,
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

          {/* Desktop Nav */}
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

          {/* CTA + Theme Toggle (Desktop) */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/dashboard/Homepage"
              className="inline-flex items-center gap-2 rounded-xl bg-[#ff6a00] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              Explore Lodges
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-lg  border-gray-300 dark:border-gray-600"
            onClick={() => {
              console.log("Before toggle:", menuOpen);
              setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </nav>

        {/* Mobile Menu Drawer */}
        <div
          className={`md:hidden absolute top-16 inset-x-0 mx-4 rounded-2xl p-6 shadow-2xl border backdrop-blur-md transform transition-all duration-300 ${
            menuOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
          }    ${
            theme === "dark"
              ? "bg-[#111a22]/85 border-[#324d67]/50 text-white"
              : "bg-white/90 border-gray-200/70 text-gray-900"
          }`}
        >
          {/* Navigation Links */}
          <ul className="flex flex-col gap-4 text-base font-medium">
            {["Home", "Features", "About", "Docs", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setMenuOpen(false)}
                className={`relative px-2 py-1 transition-all rounded-lg ${
                  theme === "dark"
                    ? "hover:text-[#ff6a00] hover:bg-white/5"
                    : "hover:text-[#ff6a00] hover:bg-gray-100"
                }`}
              >
                {item}
                {/* underline accent effect */}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#ff6a00] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </ul>

          {/* Divider */}
          <div
            className={`my-6 h-px ${
              theme === "dark" ? "bg-white/10" : "bg-gray-200"
            }`}
          />

          {/* CTA Button */}
          <div className="flex flex-col gap-3">
            <Link
              href="./dashboard"
              className="inline-flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ff8800] px-5 py-3 text-sm font-semibold  text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              🚀 Explore Lodges
            </Link>
          </div>
        </div>
      </header>

      {/* Main content remains same (Hero, Features, Footer) */}
      {/* Main content */}
      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-20 text-center">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-notable  text-left tracking-wider sm:tracking-wide leading-snug sm:leading-tight md:leading-tight text-pretty transition-colors duration-500 ${
              theme === "dark" ? "text-white/85" : "text-black/85"
            }`}
          >
            Streamline lodge rentals with ease.
            <br className="hidden sm:inline" />
            Book, manage, and monitor—all in one platform.
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <input
              type="email"
              placeholder="Enter your email to get started"
              className={`h-12 w-full sm:w-[360px] rounded-xl border px-4 focus-within:ring-2 outline-none ${
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
          className="mx-auto max-w-7xl px-6 py-16 md:py-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
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
              style={{ transform: `translateY(${2 * 0.05}px)` }}
            >
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p
                className={`mt-2 ${
                  theme === "dark" ? "text-white/80" : "text-black/80"
                }`}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </section>

        {/* Newsletter + Links */}
        <section
          className={`mx-auto max-w-7xl grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-12 
    px-6 lg:px-12 py-16 md:py-20
    rounded-3xl border shadow-xl transition-colors duration-500
    ${
      theme === "dark"
        ? "bg-gradient-to-br from-[#0b0b0b]/90 to-[#111a22]/80 border-white/10 shadow-white/5"
        : "bg-gradient-to-br from-gray-50 to-white/80 border-gray-200/50 shadow-black/5"
    }`}
        >
          {/* Left */}
          <div className="flex flex-col justify-center">
            <h1
              className={`text-3xl md:text-5xl leading-tight max-w-xl font-notable ${
                theme === "dark" ? "text-white/90" : "text-gray-900"
              }`}
            >
              Join us in shaping the future
              <br /> of AI as it evolves into reality
            </h1>

            {/* Subscribe */}
            <div className="mt-8 flex w-full max-w-xl flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className={`h-12 w-full sm:w-[360px] rounded-xl border px-4 outline-none focus-within:ring-2 transition-colors duration-300 ${
                  theme === "dark"
                    ? "border-white/10 bg-white/5 text-white/90 placeholder-white/60 focus-within:ring-orange-500/60"
                    : "border-black/10 bg-black/5 text-black/90 placeholder-black/60 focus-within:ring-orange-500/60"
                }`}
              />

              <button
                className="h-12 shrink-0 rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ff8800] px-6 
        text-sm font-semibold text-white hover:scale-[1.02] active:scale-[0.98] 
        transition-transform shadow-md"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Right: Footer links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:pl-12">
            {[
              {
                title: "Product",
                links: ["Testnet", "AI Studio"],
              },
              {
                title: "Docs",
                links: ["Blog", "Docs", "Research"],
              },
              {
                title: "Ecosystem",
                links: ["Open Circle"],
              },
            ].map((col, i) => (
              <div key={i}>
                <h3 className="text-xs uppercase tracking-widest text-gray-500 dark:text-white/40">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li
                      key={link}
                      className="text-gray-700 dark:text-white/80 hover:text-[#ff6a00] 
              transition-transform hover:translate-x-1 cursor-pointer"
                    >
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Watermark */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-24 mx-auto select-none text-center font-extrabold tracking-tight text-gray-500/30 font-notable"
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
};

export default LandingLayout;
