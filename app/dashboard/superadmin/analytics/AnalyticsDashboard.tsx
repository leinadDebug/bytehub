"use client";
import React from "react";
import DashboardCards from "../components/DashboardCards";
import { useThemeStore } from "@/lib/store/theme";

export default function AnalyticsDashboard() {
  const { theme } = useThemeStore();

  const isDark = theme === "dark";

  const containerClasses = isDark
    ? "bg-[#111a22] text-white"
    : "bg-gray-50 text-gray-900";

  const titleClasses = isDark ? "text-white" : "text-gray-900";
  const subtitleClasses = isDark ? "text-[#92adc9]" : "text-gray-600";

  const filterWrapperClasses = isDark ? "bg-[#233648]" : "bg-gray-200";

  const activeFilterClasses = isDark
    ? "has-[:checked]:bg-[#111a22] has-[:checked]:text-white"
    : "has-[:checked]:bg-white has-[:checked]:text-gray-900";

  const inactiveFilterClasses = isDark ? "text-[#92adc9]" : "text-gray-500";

  return (
    <div
      className={`relative flex size-full min-h-screen flex-col ${containerClasses} overflow-x-hidden pb-10`}
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Main Content */}
        <div className="flex flex-1 justify-center px-3 sm:px-6 lg:px-12 xl:px-24 2xl:px-40 py-4 sm:py-6 lg:py-8">
          <div className="layout-content-container flex w-full max-w-[1280px] flex-col">
            {/* Title */}
            <div className="flex flex-wrap justify-between gap-4 p-4 sm:p-6 lg:p-8">
              <div className="flex min-w-full sm:min-w-[18rem] flex-col gap-2 sm:gap-3">
                <p
                  className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug ${titleClasses}`}
                >
                  Analytics Dashboard
                </p>
                <p
                  className={`text-xs sm:text-sm md:text-base lg:text-lg font-normal ${subtitleClasses}`}
                >
                  Gain insights into your website&apos;s performance and user
                  behavior.
                </p>
              </div>
            </div>

            {/* Time Filter */}
            <div className="flex px-4 py-3">
              <div
                className={`flex h-10 flex-1 items-center justify-center rounded-lg p-1 ${filterWrapperClasses}`}
              >
                {["Daily", "Weekly", "Monthly", "Custom"].map((label) => (
                  <label
                    key={label}
                    className={`
                      flex cursor-pointer h-full grow items-center justify-center overflow-hidden
                      rounded-lg px-2 sm:px-3 md:px-4
                      ${activeFilterClasses}
                      ${inactiveFilterClasses}
                      text-xs sm:text-sm md:text-base font-medium
                    `}
                  >
                    <span className="truncate">{label}</span>
                    <input
                      type="radio"
                      name="time-range"
                      className="invisible w-0"
                      defaultChecked={label === "Monthly"}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Cards */}
            <DashboardCards />
          </div>
        </div>
      </div>
    </div>
  );
}
