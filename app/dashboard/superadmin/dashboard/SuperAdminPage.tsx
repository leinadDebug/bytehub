"use client";

import { useThemeStore } from "@/lib/store/theme";
import React from "react";

interface Props {
  hotelData: hotel[];
  userData: user[];
}

interface hotel {
  name: string;
  location: string;
  status: string;
  bookings: string;
  revenue: string;
}

interface user {
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function SuperAdminPage(props: Props) {
  const { theme, setTheme } = useThemeStore();
  const { hotelData, userData } = props;
  const themeClasses =
    theme === "dark" ? "bg-[#111a22] text-white" : "bg-gray-50 text-gray-900";

  const palette =
    theme === "light"
      ? {
          cardBg: "bg-white",
          border: "border-gray-200",
          textPrimary: "text-gray-900",
          textMuted: "text-gray-500",
          inputBg: "bg-gray-100",
          inputText: "text-gray-900",
          inputPlaceholder: "placeholder:text-gray-500",
          buttonBg: "bg-gray-200",
          buttonText: "text-gray-900",
          buttonHover: "hover:bg-gray-300",
          tableBg: "bg-white",
          tableHeaderBg: "bg-gray-100",
          tableBorder: "border-gray-200",
        }
      : {
          cardBg: "bg-[#111a22]",
          border: "border-[#324d67]",
          textPrimary: "text-white",
          textMuted: "text-[#92adc9]",
          inputBg: "bg-[#233648]",
          inputText: "text-white",
          inputPlaceholder: "placeholder:text-[#92adc9]",
          buttonBg: "bg-[#233648]",
          buttonText: "text-white",
          buttonHover: "hover:bg-[#2d4a63]",
          tableBg: "bg-[#111a22]",
          tableHeaderBg: "bg-[#192633]",
          tableBorder: "border-[#324d67]",
        };

  const cardClasses = `rounded-lg border p-4 lg:p-6 ${
    theme === "dark"
      ? `${palette.cardBg} ${palette.border}`
      : `${palette.cardBg} ${palette.border}`
  }`;
  return (
    <div
      className={`relative flex size-full min-h-screen flex-col ${themeClasses} overflow-x-hidden p-4`}
      style={{ fontFamily: `Inter, "Noto Sans", sans-serif` }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center px-4 sm:px-6 lg:px-12 xl:px-24 2xl:px-40 py-4 sm:py-6 lg:py-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              <p
                className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${palette.textPrimary}`}
              >
                Super Admin Dashboard
              </p>
              <p
                className={`text-xs sm:text-sm md:text-base lg:text-lg ${palette.textMuted}`}
              >
                Gain insights into your website&apos;s performance and manage
                hotels and users.
              </p>
            </div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`px-3 py-1 text-sm rounded-full border shadow-sm ${palette.buttonBg} ${palette.buttonText} ${palette.buttonHover}`}
            >
              {theme === "dark" ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 overflow-x-hidden w-full max-w-[1280px] mx-auto">
          {/* Overview Section */}
          <div className="mb-6 lg:mb-8">
            <h2 className="text-base sm:text-xl font-semibold mb-2">
              Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6">
              <div className={`${cardClasses} border rounded-lg p-3 lg:p-6`}>
                <h3
                  className={`text-xs font-medium mb-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Total Bookings
                </h3>
                <p className="text-lg lg:text-2xl font-semibold">1,234</p>
              </div>
              <div className={`${cardClasses} border rounded-lg p-3 lg:p-6`}>
                <h3
                  className={`text-xs font-medium mb-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Total Revenue
                </h3>
                <p className="text-lg lg:text-2xl font-semibold">$567,890</p>
              </div>
              <div className={`${cardClasses} border rounded-lg p-3 lg:p-6`}>
                <h3
                  className={`text-xs font-medium mb-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Active Users
                </h3>
                <p className="text-lg lg:text-2xl font-semibold">500</p>
              </div>
            </div>
          </div>

          {/* Hotel Management */}
          <div className="mb-8">
            <h2 className="text-base sm:text-xl font-semibold mb-4">
              Hotel Management
            </h2>

            {/* Desktop Table View */}
            <div
              className={`overflow-x-auto border ${palette.border} rounded-lg ${palette.tableBg} hidden md:block`}
            >
              <table className="min-w-full text-sm">
                <thead className={palette.tableHeaderBg}>
                  <tr>
                    {[
                      "Hotel Name",
                      "Location",
                      "Status",
                      "Bookings",
                      "Revenue",
                      "Actions",
                    ].map((title, i) => (
                      <th
                        key={i}
                        className={`px-4 py-3 text-left font-medium ${palette.textPrimary} uppercase tracking-wider text-xs`}
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hotelData.map((hotel, idx) => (
                    <tr key={idx} className={`border-t ${palette.tableBorder}`}>
                      <td className={`${palette.textPrimary} px-4 py-2`}>
                        {hotel.name}
                      </td>
                      <td className={`${palette.textMuted} px-4 py-2`}>
                        {hotel.location}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            hotel.status === "Active"
                              ? "bg-green-500/10 text-green-600"
                              : "bg-orange-500/10 text-orange-600"
                          }`}
                        >
                          {hotel.status}
                        </span>
                      </td>
                      <td className={`${palette.textMuted} px-4 py-2`}>
                        {hotel.bookings}
                      </td>
                      <td className={`${palette.textMuted} px-4 py-2`}>
                        {hotel.revenue}
                      </td>
                      <td className={`${palette.textMuted} px-4 py-2`}>
                        <button
                          className={`text-sm font-medium p-1 ${palette.buttonText} ${palette.buttonHover}`}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
              {hotelData.map((hotel, index) => (
                <div
                  key={index}
                  className={`${cardClasses} border rounded-lg p-4`}
                >
                  <div className="flex flex-col space-y-3">
                    {/* Header: Name + Action */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold">{hotel.name}</h3>
                        <p
                          className={`text-xs mt-1 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {hotel.location}
                        </p>
                      </div>
                      <button
                        className={`text-xs font-medium px-3 py-1 rounded ml-3 whitespace-nowrap ${
                          theme === "dark"
                            ? "text-blue-400 hover:text-blue-300 hover:bg-gray-700"
                            : "text-blue-600 hover:text-blue-500 hover:bg-gray-100"
                        }`}
                      >
                        View Details
                      </button>
                    </div>

                    {/* Status + Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Left Column */}
                      <div className="space-y-2">
                        {/* Status */}
                        <div>
                          <span
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          >
                            Status:{" "}
                          </span>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              hotel.status === "Active"
                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                : "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                            }`}
                          >
                            {hotel.status}
                          </span>
                        </div>

                        {/* Bookings */}
                        <div>
                          <span
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          >
                            Bookings:{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            {hotel.bookings}
                          </span>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-2">
                        {/* Revenue */}
                        <div>
                          <span
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          >
                            Revenue:{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            {hotel.revenue}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Management */}
          <div className="mb-8">
            <h2 className="text-base sm:text-xl font-semibold mb-4">
              User Management
            </h2>

            {/* Desktop Table View */}
            <div
              className={`overflow-x-auto border ${palette.border} rounded-lg ${palette.tableBg} hidden md:block`}
            >
              <table className="min-w-full text-sm">
                <thead className={palette.tableHeaderBg}>
                  <tr>
                    {["User Name", "Email", "Role", "Status", "Actions"].map(
                      (title, i) => (
                        <th
                          key={i}
                          className={`px-4 py-3 text-left font-medium ${palette.textPrimary} uppercase tracking-wider text-xs`}
                        >
                          {title}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, idx) => (
                    <tr key={idx} className={`border-t ${palette.border}`}>
                      <td className={`${palette.textPrimary} px-4 py-2`}>
                        {user.name}
                      </td>
                      <td className={`${palette.textMuted} px-4 py-2`}>
                        {user.email}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === "Admin"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            user.status === "Active"
                              ? "bg-green-500/10 text-green-700"
                              : "bg-orange-500/10 text-orange-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className={`text-sm font-medium ${palette.buttonText} ${palette.buttonHover}`}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
              {userData.map((user, index) => (
                <div
                  key={index}
                  className={`${cardClasses} border rounded-lg p-4`}
                >
                  <div className="flex flex-col space-y-3">
                    {/* Header with name and action */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">{user.name}</h3>
                        <p
                          className={`text-xs mt-1 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {user.email}
                        </p>
                      </div>
                      <button
                        className={`text-xs font-medium px-3 py-1 rounded ${
                          theme === "dark"
                            ? "text-blue-300 hover:text-blue-200 hover:bg-gray-800"
                            : "text-blue-600 hover:text-blue-500 hover:bg-gray-50"
                        }`}
                      >
                        Edit
                      </button>
                    </div>

                    {/* Role and Status badges */}
                    <div className="flex flex-wrap gap-2">
                      <div>
                        <span
                          className={`text-xs ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Role:{" "}
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === "Admin"
                              ? "bg-purple-500/10 text-purple-700 dark:text-purple-300"
                              : "bg-blue-500/10 text-blue-700 dark:text-blue-300"
                          }`}
                        >
                          {user.role}
                        </span>
                      </div>
                      <div>
                        <span
                          className={`text-xs ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Status:{" "}
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            user.status === "Active"
                              ? "bg-green-500/10 text-green-700 dark:text-green-300"
                              : "bg-orange-500/10 text-orange-700 dark:text-orange-300"
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/*Analytics */}
          <div>
            <h2 className="text-base sm:text-xl lg:text-xl font-semibold mb-4">
              Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className={`${cardClasses} border rounded-lg p-4 lg:p-6`}>
                <h3
                  className={`text-base lg:text-lg font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Bookings by Month
                </h3>
                <p className="text-2xl lg:text-3xl font-bold mb-1">1,234</p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Last 12 Months
                </p>
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Graph placeholder - Bookings data visualization would appear
                    here
                  </p>
                </div>
              </div>

              <div className={`${cardClasses} border rounded-lg p-4 lg:p-6`}>
                <h3
                  className={`text-base lg:text-lg font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Revenue Trend
                </h3>
                <p className="text-2xl lg:text-3xl font-bold mb-1">$567,890</p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Last 12 Months
                </p>
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Graph placeholder - Revenue trend visualization would appear
                    here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
