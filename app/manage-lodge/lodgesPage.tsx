"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLodgeStore } from "@/lib/store/lodgeStore";
import { useThemeStore } from "@/lib/store/theme";

interface Props {
  lodges: Lodge[];
}
interface Lodge {
  title: string;
  user: string;
  price: number;
  host: {
    hostName: string;
    superHost: boolean;
    responseRate: number;
    reviews: number;
    rating: number;
  };
}

export default function LodgeManagementPage({ lodges }: Props) {
  const router = useRouter();
  const { setSelectedLodge } = useLodgeStore();
  const { theme, toggleTheme } = useThemeStore();

  const containerBg =
    theme === "dark" ? "bg-[#0b0b0b] text-white" : "bg-gray-50 text-gray-900";
  const cardBg =
    theme === "dark"
      ? "bg-white/5 border-white/10 text-white"
      : "bg-white border-gray-200 text-gray-900";
  const textSecondary = theme === "dark" ? "text-white/70" : "text-gray-600";

  return (
    <div
      className={`${containerBg} min-h-screen transition-colors duration-300 `}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <button
          onClick={toggleTheme}
          className={`absolute top-5 right-5 px-4 py-2 text-sm rounded-full border shadow-sm hover:shadow-md transition-all duration-200 ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Lodge Management
            </h2>
            <p
              className={`text-sm sm:text-base mt-2 leading-relaxed ${textSecondary}`}
            >
              Edit details, manage availability, and maintain your housing
              portfolio with ease.
            </p>
          </div>
          <Link href={"/add-lodge"}>
            <Button className="flex items-center gap-2 rounded-2xl px-4 py-2 shadow-md hover:shadow-lg transition">
              <Plus className="h-4 w-4" /> Add Lodge
            </Button>
          </Link>
        </div>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lodges list */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {lodges.length > 0 ? (
                lodges.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedLodge(item)}
                    className={`cursor-pointer group rounded-2xl border shadow-lg p-5 flex flex-col justify-between transition hover:scale-[1.02] hover:shadow-xl ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {/* Title & Price */}
                    <div>
                      <h3
                        className={`text-lg font-semibold transition ${
                          theme === "dark"
                            ? "text-white group-hover:text-orange-400"
                            : "text-gray-900 group-hover:text-orange-500"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className={`text-sm mt-1 ${textSecondary}`}>
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Host Info */}
                    <div className="mt-4 flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          theme === "dark"
                            ? "bg-white/10 text-white/70"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        👤
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.host.hostName}
                        </p>
                        <p className={`text-xs ${textSecondary}`}>
                          {item.host.superHost
                            ? "🌟 Superhost"
                            : "Regular Host"}
                        </p>
                        <p
                          className={`text-xs flex items-center gap-1 ${textSecondary}`}
                        >
                          <Star className="w-3 h-3 text-yellow-400" />
                          {item.host.rating} ({item.host.reviews} reviews)
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-5 flex justify-end gap-3">
                      <Button
                        size="sm"
                        className="rounded-lg bg-blue-500/80 hover:bg-blue-500 text-white shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`manage-lodge/${i}`);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                        <span className="hidden sm:inline ml-1">Edit</span>
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-lg bg-red-500/80 hover:bg-red-500 text-white shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline ml-1">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className={`${textSecondary}`}>No lodge found.</p>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            {/* Quick actions */}
            <div className={`rounded-2xl border shadow-md p-6 ${cardBg}`}>
              <h3
                className={`text-sm sm:text-base font-semibold mb-4 ${textSecondary}`}
              >
                Quick Actions
              </h3>
              <ul
                className={`flex flex-wrap gap-3 text-xs sm:text-sm ${textSecondary}`}
              >
                <li className="px-3 py-1 rounded-lg bg-white/10">📌 Update</li>
                <li className="px-3 py-1 rounded-lg bg-white/10">
                  📌 Availability
                </li>
                <li className="px-3 py-1 rounded-lg bg-white/10">📌 Remove</li>
              </ul>
            </div>

            {/* Lodge details */}
            <div className={`rounded-2xl border shadow-md p-6 ${cardBg}`}>
              <h3
                className={`text-sm sm:text-base font-semibold mb-4 ${textSecondary}`}
              >
                Lodge Details
              </h3>
              <div className="w-full">
                <DisplayLodge theme={theme} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const DisplayLodge = ({ theme }: { theme: "light" | "dark" }) => {
  const { selectedLodge } = useLodgeStore();

  const textSecondary = theme === "dark" ? "text-white/70" : "text-gray-600";

  const Skeleton = (
    <div className="flex flex-col gap-4 animate-pulse">
      <div
        className={`h-5 w-40 rounded-md ${
          theme === "dark" ? "bg-white/20" : "bg-gray-200"
        }`}
      ></div>
      <div
        className={`h-4 w-24 rounded-md ${
          theme === "dark" ? "bg-white/10" : "bg-gray-200"
        }`}
      ></div>
      <div className="flex items-center gap-3 mt-2">
        <div
          className={`w-12 h-12 rounded-full ${
            theme === "dark" ? "bg-white/10" : "bg-gray-200"
          }`}
        ></div>
        <div className="space-y-2">
          <div
            className={`h-3 w-24 rounded-md ${
              theme === "dark" ? "bg-white/20" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`h-2 w-32 rounded-md ${
              theme === "dark" ? "bg-white/10" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`h-2 w-40 rounded-md ${
              theme === "dark" ? "bg-white/10" : "bg-gray-200"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );

  if (!selectedLodge) return Skeleton;

  return (
    <div className="space-y-4">
      {/* Title & Price */}
      <div>
        <p
          className={`text-lg font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {selectedLodge.title}
        </p>
        <p className={`text-sm ${textSecondary}`}>
          ₦{selectedLodge.price.toLocaleString()}
        </p>
      </div>

      {/* Host */}
      <div>
        <p className={`text-sm ${textSecondary}`}>Host</p>
        <div className="mt-2 flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              theme === "dark"
                ? "bg-white/10 text-white/70"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            👤
          </div>
          <div>
            <p
              className={
                theme === "dark"
                  ? "text-white font-medium"
                  : "text-gray-900 font-medium"
              }
            >
              {selectedLodge.host.hostName}
            </p>
            <p className={`text-xs ${textSecondary}`}>
              Superhost: {selectedLodge.host.superHost ? "Yes" : "No"}
            </p>
            <p className={`text-xs ${textSecondary}`}>
              Responses: {selectedLodge.host.responseRate}% • Reviews:{" "}
              {selectedLodge.host.reviews} • Rating: {selectedLodge.host.rating}{" "}
              ⭐
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
