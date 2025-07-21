"use client";

import {
  Activity,
  Car,
  Castle,
  Construction,
  Hotel,
  Mountain,
  Ship,
  TreePine,
  Waves,
} from "lucide-react";
import { Filter } from "@/types/lodges";
import { useRef, useState } from "react";

const filters: Filter[] = [
  { name: "All", icon: <Car size={24} /> },
  { name: "Castles", icon: <Castle size={24} /> },
  { name: "Forest", icon: <TreePine size={24} /> },
  { name: "Cruises", icon: <Ship size={24} /> },
  { name: "Hotels", icon: <Hotel size={24} /> },
  { name: "Mountains", icon: <Mountain size={24} /> },
  { name: "Construction", icon: <Construction size={24} /> },
  { name: "Activities", icon: <Activity size={24} /> },
  { name: "Beach", icon: <Waves size={24} /> },
];

export default function FilterSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleFilterClick = (name: string) => {
    setActiveFilter(name);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center space-x-4 my-4">
      <button
        onClick={scrollLeft}
        className="hidden md:block p-2 rounded-full bg-gradient-brand text-white shadow-lg hover:shadow-xl transition-shadow"
      >
        &lt;
      </button>

      <div
        ref={scrollContainerRef}
        className="flex-grow flex items-center space-x-6 overflow-x-auto whitespace-nowrap hide-scrollbar"
      >
        {filters.map((filter) => (
          <button
            key={filter.name}
            onClick={() => handleFilterClick(filter.name)}
            className={`flex flex-col items-center justify-center space-y-2 py-3 px-5 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              activeFilter === filter.name
                ? "glassmorphism shadow-neon"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            <div
              className={`${activeFilter === filter.name ? "text-neon" : ""}`}
            >
              {filter.icon}
            </div>
            <span
              className={`text-xs font-semibold ${
                activeFilter === filter.name ? "text-neon" : "text-white"
              }`}
            >
              {filter.name}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="hidden md:block p-2 rounded-full bg-gradient-brand text-white shadow-lg hover:shadow-xl transition-shadow"
      >
        &gt;
      </button>

      <button className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full glassmorphism text-white hover:shadow-neon transition-shadow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
        </svg>
        <span>Filters</span>
      </button>
    </div>
  );
}
