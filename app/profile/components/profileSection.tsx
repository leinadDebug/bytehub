"use client";
import React, { useState } from "react";
import {
  MessageSquareText,
  Edit3,
  Star,
  MapPin,
  Calendar,
  Shield,
  User,
  Users,
} from "lucide-react";
import { useThemeStore } from "@/lib/store/theme";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileSection = () => {
  const [activeTab, setActiveTab] = useState("about");
  const { theme, setTheme } = useThemeStore();
  const pathname = usePathname();

  // Mock user data
  const user = {
    username: "Sarah Johnson",
    avatar: "/api/placeholder/120/120",
    joinedDate: "June 2019",
    location: "San Francisco, CA",
    superhost: true,
    reviewCount: 47,
    rating: 4.9,
  };

  const tabs = [
    { id: "about", label: "About Me", icon: User },
    { id: "connections", label: "Connections", icon: Users },
  ];

  return (
    <div
      className={`min-h-screen transition-colors ${
        theme === "dark" ? "bg-[#0b0b0b]" : "bg-gray-50"
      }`}
    >
      {/* Mobile Header */}
      <div
        className={`lg:hidden sticky top-0 z-10 border-b ${
          theme === "dark"
            ? "bg-[#0b0b0b] border-white/10"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="px-4 py-3">
          <h1
            className={`text-xl font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Profile
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Desktop Sidebar */}
            <div
              className={`hidden lg:block rounded-2xl shadow-sm border p-6 ${
                theme === "dark"
                  ? "bg-[#0b0b0b] border-white/10 text-white"
                  : "bg-white border-gray-200 text-gray-900"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-6">Profile</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? theme === "dark"
                          ? "bg-white/10 text-white font-medium"
                          : "bg-gray-100 text-gray-900 font-medium"
                        : theme === "dark"
                        ? "text-gray-400 hover:bg-white/5"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Mobile Tabs */}
            <div
              className={`lg:hidden rounded-xl shadow-sm border mb-6 ${
                theme === "dark"
                  ? "bg-[#0b0b0b] border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                      index === 0 ? "rounded-l-xl" : "rounded-r-xl"
                    } ${
                      activeTab === tab.id
                        ? theme === "dark"
                          ? "bg-white/10 text-white"
                          : "bg-black text-white"
                        : theme === "dark"
                        ? "text-gray-400 hover:bg-white/5"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div
              className={`rounded-2xl shadow-sm border overflow-hidden ${
                theme === "dark"
                  ? "bg-[#0b0b0b] border-white/10 text-white"
                  : "bg-white border-gray-200 text-gray-900"
              }`}
            >
              {/* Header */}
              <div
                className={`px-6 py-6 border-b ${
                  theme === "dark" ? "border-white/10" : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {activeTab === "about" ? "About Me" : "Connections"}
                  </h2>
                  <Link href={`${pathname}/edit`}>
                    <button
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        theme === "dark"
                          ? "bg-white text-black hover:bg-gray-200"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      <Edit3 size={16} />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === "about" && (
                  <div className="space-y-8">
                    {/* Profile Card */}
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div
                        className={`rounded-2xl p-6 border ${
                          theme === "dark"
                            ? "bg-gradient-to-br from-orange-900/20 to-pink-900/20 border-white/10"
                            : "bg-gradient-to-br from-orange-50 to-pink-50 border-orange-100"
                        }`}
                      >
                        <div className="text-center space-y-4">
                          <div
                            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg ${
                              theme === "dark"
                                ? "bg-gradient-to-br from-orange-500 to-pink-500"
                                : "bg-gradient-to-br from-orange-400 to-pink-500"
                            }`}
                          >
                            {user.username.charAt(0)}
                          </div>

                          <div className="space-y-2">
                            <h3
                              className={`text-xl font-semibold ${
                                theme === "dark"
                                  ? "text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              {user.username}
                            </h3>

                            {user.superhost && (
                              <div
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                                  theme === "dark"
                                    ? "bg-orange-900/30 text-orange-400"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                <Star size={14} className="fill-current" />
                                Superhost
                              </div>
                            )}
                          </div>

                          <div
                            className={`space-y-2 text-sm ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <MapPin size={14} />
                              {user.location}
                            </div>
                            <div className="flex items-center justify-center gap-2">
                              <Calendar size={14} />
                              Joined {user.joinedDate}
                            </div>
                            <div className="flex items-center justify-center gap-2">
                              <Star size={14} />
                              {user.rating} ({user.reviewCount} reviews)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Complete Profile CTA */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-3">
                            Complete your profile
                          </h3>
                          <p
                            className={`leading-relaxed ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          >
                            Your Airbnb profile is an important part...
                          </p>
                        </div>
                        <Link href={`${pathname}/edit`}>
                          <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-200 shadow-sm">
                            Get started
                          </button>
                        </Link>
                      </div>
                    </div>

                    {/* Verification Section */}
                    <div
                      className={`pt-8 border-t ${
                        theme === "dark" ? "border-white/10" : "border-gray-200"
                      }`}
                    >
                      <h3 className="text-lg font-semibold mb-4">
                        Verification
                      </h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div
                          className={`flex items-center gap-3 p-4 border rounded-lg ${
                            theme === "dark"
                              ? "border-white/10"
                              : "border-gray-200"
                          }`}
                        >
                          <Shield className="text-orange-500" size={20} />
                          <span className="text-sm font-medium">
                            Identity verified
                          </span>
                        </div>
                        {/* repeat other items */}
                      </div>
                    </div>

                    {/* Reviews */}
                    <div
                      className={`pt-8 border-t ${
                        theme === "dark" ? "border-white/10" : "border-gray-200"
                      }`}
                    >
                      <button
                        className={`w-full sm:w-auto flex items-center gap-3 px-6 py-3 border rounded-lg transition-colors ${
                          theme === "dark"
                            ? "border-white/10 hover:bg-white/5"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <MessageSquareText
                          size={18}
                          className={
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }
                        />
                        <span className="font-medium">
                          Reviews I've written
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "connections" && (
                  <div className="text-center py-12">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                        theme === "dark" ? "bg-white/5" : "bg-gray-100"
                      }`}
                    >
                      <MessageSquareText
                        className={
                          theme === "dark" ? "text-gray-400" : "text-gray-400"
                        }
                        size={24}
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      No connections yet
                    </h3>
                    <p
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }
                    >
                      Connect with other hosts and guests to build your network.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
