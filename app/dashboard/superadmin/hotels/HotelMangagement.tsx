"use client";
import React from "react";
import { useThemeStore } from "@/lib/store/theme";

const hostels = [
  {
    name: "The Wanderer's Nest",
    location: "City Center, Metropolis",
    beds: "20 beds",
    price: "$25",
    rating: "4.5",
    status: "Approved",
  },
];

const HotelManagement: React.FC = () => {
  const { theme } = useThemeStore();

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
  return (
    <div
      className={`relative flex size-full min-h-screen flex-col overflow-x-hidden pb-10 sm:pb-0 ${palette.cardBg}`}
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
                  className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug ${palette.textPrimary}`}
                >
                  Hotel Management
                </p>
                <p
                  className={`text-xs sm:text-sm md:text-base lg:text-lg font-normal ${palette.textMuted}`}
                >
                  Manage all Hotel listings, including editing details,
                  approving submissions, and removing listings.
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="px-4 sm:px-6 lg:px-8 py-3">
              <label className="flex w-full min-w-[10rem] flex-col">
                <div
                  className={`flex h-11 sm:h-12 w-full items-stretch rounded-lg overflow-hidden`}
                >
                  {/* Icon container */}
                  <div
                    className={`flex items-center justify-center px-3 ${palette.inputBg} ${palette.textMuted}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>

                  {/* Input */}
                  <input
                    type="text"
                    placeholder="Search Hotels by name or location"
                    className={`flex-1 ${palette.inputBg} px-3 sm:px-4 text-sm sm:text-base ${palette.inputText} ${palette.inputPlaceholder} border-0 focus:outline-none focus:ring-0`}
                  />
                </div>
              </label>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2">
              {["Location", "Amenities", "Status"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`flex h-8 sm:h-9 items-center rounded-lg ${palette.buttonBg} px-3 sm:px-4 text-xs sm:text-sm font-medium ${palette.buttonText} ${palette.buttonHover} transition`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="lg:px-4 py-3 overflow-x-auto">
              <div className="px-4 py-3 @container mb-12 lg:mb-0">
                {/* Mobile / Tablet Table */}
                <div
                  className={`lg:hidden overflow-x-auto border ${palette.tableBorder} rounded-lg ${palette.tableBg}`}
                >
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr
                        className={`${palette.tableHeaderBg} ${palette.textPrimary}`}
                      >
                        <th className="px-3 py-2 text-left font-medium">
                          Hostel
                        </th>
                        <th className="px-3 py-2 text-left font-medium">
                          Price
                        </th>
                        <th className="px-3 py-2 text-left font-medium">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {hostels.map((hostel, idx) => (
                        <tr
                          key={idx}
                          className={`border-t ${palette.tableBorder}`}
                        >
                          <td className={`${palette.textPrimary} px-3 py-2`}>
                            <div className="font-semibold">{hostel.name}</div>
                            <div className={`${palette.textMuted} text-xs`}>
                              {hostel.location}
                            </div>
                            <div className={`${palette.textMuted} text-xs`}>
                              {hostel.beds}
                            </div>
                          </td>
                          <td className={`${palette.textMuted} px-3 py-2`}>
                            {hostel.price}
                          </td>
                          <td className="px-3 py-2">
                            <button
                              className={`rounded-lg h-7 px-3 ${palette.buttonBg} ${palette.buttonText} text-xs font-medium`}
                            >
                              {hostel.status}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Desktop Table Layout */}
                <div
                  className={`hidden lg:block overflow-x-auto rounded-lg border ${palette.tableBorder} ${palette.tableBg}`}
                >
                  <table className="min-w-full">
                    <thead>
                      <tr className={`${palette.tableHeaderBg}`}>
                        {[
                          "Hostel Name",
                          "Location",
                          "Beds/Rooms",
                          "Avg. Price/Night",
                          "Rating",
                          "Status",
                          "Actions",
                        ].map((title, i) => (
                          <th
                            key={i}
                            className={`px-4 py-3 text-left ${
                              i < 6 ? palette.textPrimary : palette.textMuted
                            } text-sm font-medium`}
                          >
                            {title}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {hostels.map((hostel, idx) => (
                        <tr
                          key={idx}
                          className={`border-t ${palette.tableBorder}`}
                        >
                          <td
                            className={`${palette.textPrimary} px-4 py-2 text-sm`}
                          >
                            {hostel.name}
                          </td>
                          <td
                            className={`${palette.textMuted} px-4 py-2 text-sm`}
                          >
                            {hostel.location}
                          </td>
                          <td
                            className={`${palette.textMuted} px-4 py-2 text-sm`}
                          >
                            {hostel.beds}
                          </td>
                          <td
                            className={`${palette.textMuted} px-4 py-2 text-sm`}
                          >
                            {hostel.price}
                          </td>
                          <td
                            className={`${palette.textMuted} px-4 py-2 text-sm`}
                          >
                            {hostel.rating}
                          </td>
                          <td className="px-4 py-2">
                            <button
                              className={`flex items-center justify-center rounded-lg h-8 px-4 ${palette.buttonBg} ${palette.buttonText} text-sm font-medium`}
                            >
                              {hostel.status}
                            </button>
                          </td>
                          <td
                            className={`${palette.textMuted} px-4 py-2 text-sm font-bold`}
                          >
                            Edit | Delete
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelManagement;
