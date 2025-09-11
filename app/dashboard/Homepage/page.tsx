"use client";
import React, { useState } from "react";
import { Search, Star } from "lucide-react";
import { useThemeStore } from "@/lib/store/theme";
import Footer from "@/app/components/Footer/Footer";
import TestimonialsPage from "./component/Testimonials";
import Link from "next/link";

export default function StayEaseHomepage() {
  const [activeTab, setActiveTab] = useState("Villa");
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useThemeStore();

  const propertyTypes = [
    {
      name: "Villa",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&h=200&fit=crop",
    },
    {
      name: "Apartments",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop",
    },
    {
      name: "Mansion",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
    },
    {
      name: "Cottage",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
    },
  ];

  const featuredStays = [
    {
      id: 1,
      title: "Luxury Villa with Pool",
      price: 350,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
      type: "Villa",
    },
    {
      id: 2,
      title: "Modern Apartment in City Center",
      price: 150,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      type: "Apartments",
    },
    {
      id: 3,
      title: "Grand Mansion with Garden",
      price: 800,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=300&fit=crop",
      type: "Mansion",
    },
    {
      id: 4,
      title: "Cozy Cottage by the Lake",
      price: 220,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      type: "Cottage",
    },
  ];

  const filteredStays =
    activeTab === "Villa"
      ? featuredStays
      : featuredStays.filter((stay) => stay.type === activeTab);

  return (
    <div>
      <div
        className={`min-h-screen font-sans ${
          theme === "dark"
            ? "bg-[#111a22] text-gray-200"
            : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <header
          className={`sticky top-0 z-50 border-b ${
            theme === "dark"
              ? "bg-[#0b0b0b] border-[#2a2a2a]"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <span className="inline-flex items-center text-xl font-bold tracking-tight">
                <div
                  className={`grid place-items-center h-9 w-9 mr-2 rounded-full shadow-sm transition-all duration-300  ${
                    theme === "dark"
                      ? "bg-[##00000014] text-white"
                      : "bg-gradient-to-br from-blue-100 via-green-50 to-blue-200 text-black"
                  } text-[var(--logo-text)] group-hover:scale-105 group-hover:shadow-md `}
                >
                  🐙
                </div>
                <span
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Byte
                  <span className="ml-1 text-orange-500">Hub</span>
                </span>
              </span>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-6 text-xs sm:text-sm md:text-base font-medium">
                {["Trips", "Messages"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className={`hover:text-orange-500 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </nav>

              {/* Theme + Auth */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={`px-3 py-1 rounded-full border text-xs sm:text-sm ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-500"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {theme === "dark" ? "Light" : "Dark"}
                </button>
                <Link href={"#"}>
                  <button className="text-sm sm:text-base font-medium hover:text-orange-500">
                    Host
                  </button>
                </Link>

                <Link href={"superadmin/dashboard"}>
                  <button className="bg-orange-500 text-white px-4 py-2 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base hover:bg-orange-600">
                    SuperAdmin
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Property Types */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-thin mb-8 flex tracking-tight">
              Explore by type
              {/* Search */}
              <div className="relative mb-6 w-full mx-auto ">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-3 py-3 rounded-full text-sm sm:text-base shadow-sm ${
                    theme === "dark"
                      ? "bg-[#1a1a1a] border border-gray-700 text-gray-200 focus:ring-orange-400"
                      : "bg-white border border-gray-200 focus:ring-orange-400"
                  }`}
                />
              </div>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {propertyTypes.map((type, index) => (
                <div
                  key={index}
                  className={`cursor-pointer group ${
                    theme === "dark" ? "text-gray-300" : ""
                  }`}
                >
                  <Link href="alllodges">
                    <div
                      className={`relative overflow-hidden rounded-lg mb-2 shadow-sm ${
                        theme === "dark" ? "bg-[#1a1a1a]" : "bg-white"
                      }`}
                    >
                      <img
                        src={type.image}
                        alt={type.name}
                        className="w-full h-48 sm:h-52 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                    </div>
                  </Link>
                  <h3 className="text-xs sm:text-sm md:text-base font-medium group-hover:text-orange-500">
                    {type.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Stays */}
        <section
          className={`py-12 ${
            theme === "dark" ? "bg-[#0b0b0b]" : "bg-gray-50"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl  mb-8 font-thin tracking-tight">
              Featured stays
            </h2>

            {/* Tabs */}
            <div className="relative mb-12">
              <div
                className={`flex overflow-x-auto no-scrollbar space-x-2 rounded-full p-2 shadow-sm max-w-full ${
                  theme === "dark" ? "bg-[#1a1a1a]" : "bg-white"
                }`}
              >
                {["Villa", "Apartments", "Mansion", "Cottage"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                  px-6 py-2 rounded-full font-medium text-sm transition-all duration-300
                  ${
                    activeTab === tab
                      ? "bg-orange-500 text-white shadow-lg scale-105 sticky right-0 left-0 z-10"
                      : theme === "dark"
                      ? "text-gray-400 hover:text-orange-500"
                      : "text-gray-600 hover:text-orange-500"
                  }
                `}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredStays.map((stay) => (
                <div
                  key={stay.id}
                  className={`rounded-lg shadow-sm hover:shadow-md transition overflow-hidden mb-3 ${
                    theme === "dark"
                      ? "bg-[#1a1a1a] border border-[#2a2a2a]"
                      : "bg-white"
                  }`}
                >
                  <img
                    src={stay.image}
                    alt={stay.title}
                    className="w-full h-46 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="text-sm sm:text-base md:text-base font-semibold mb-1">
                      {stay.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs sm:text-sm md:text-sm">
                      <span className="font-bold">${stay.price}/night</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 sm:w-4 fill-yellow-400 text-yellow-400" />
                        <span>{stay.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mb-12">
              <TestimonialsPage />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
