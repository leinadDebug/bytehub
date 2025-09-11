"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Plus, PlusCircle, ArrowBigLeftIcon } from "lucide-react";
import Footer from "@/app/components/Footer/Footer";
import { Separator } from "@radix-ui/react-dropdown-menu";
import ProfileHeader from "@/app/components/Header/Profile_header";
import { useThemeStore } from "@/lib/store/theme";

const user = {
  username: "Sarah Johnson",
  avatar: "/api/placeholder/120/120",
  joinedDate: "June 2019",
  location: "San Francisco, CA",
  superhost: true,
  reviewCount: 47,
  rating: 4.9,
};

export default function EditSection() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#0b0b0b] text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90"
        >
          Toggle {theme === "dark" ? "Light" : "Dark"}
        </Button>
      </div>

      <div className="px-5 md:px-10 lg:px-20 flex-grow">
        <main className="grid sm:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {/* Avatar Card */}
          <Card
            className={`w-full sm:col-span-1 border-none shadow-none ${
              theme === "dark" ? "bg-transparent" : "bg-white"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center w-full">
                <Avatar className="w-[min(80vw,300px)] h-[min(80vw,300px)] sm:w-40 sm:h-40">
                  <AvatarImage src={user?.avatar || ""} alt="Profile picture" />
                  <AvatarFallback
                    className={`text-[120px] sm:text-6xl font-bold ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-orange-500 to-orange-950 text-slate-100"
                        : "bg-gradient-to-br from-orange-500 to-orange-600 text-white"
                    }`}
                    aria-label="User initial"
                  >
                    {user?.username
                      ? user.username.charAt(0).toUpperCase()
                      : "G"}
                  </AvatarFallback>
                </Avatar>

                <Button
                  size="sm"
                  className={`text-sm font-bold rounded-full w-fit -m-2 z-10 shadow-lg transition-colors duration-200 ${
                    theme === "dark"
                      ? "bg-orange-500 text-white hover:bg-gray-800 hover:text-white"
                      : "bg-orange-500 text-white bg-gradient-to-br from-orange-100 to-orange-500"
                  }`}
                  aria-label="Add profile photo"
                >
                  <Camera className="w-4 h-4" />
                  <span>Add</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details Card */}
          <Card
            className={`sm:col-span-2 p-6 space-y-6 border-none shadow-none ${
              theme === "dark" ? "bg-[#0b0b0b]" : "bg-white"
            }`}
          >
            <div className="space-y-4">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl">My profile</CardTitle>
              </CardHeader>
              <CardDescription
                className={`text-base ${
                  theme === "dark" ? "text-white/70" : "text-gray-600"
                }`}
              >
                Hosts and guests can see your profile and it may appear across
                Airbnb to help us build trust in our community. Learn more
              </CardDescription>
            </div>

            <CardContent className="p-0 space-y-6">
              <ul
                className={`grid sm:grid-cols-2 gap-4 text-base md:text-sm ${
                  theme === "dark" ? "text-white/80" : "text-gray-700"
                }`}
              >
                {[
                  "Full Name",
                  "Date of Birth",
                  "Gender",
                  "Nationality",
                  "Phone",
                  "Email",
                  "Address",
                  "Student ID",
                  "Course",
                  "Room Number",
                  "Year",
                  "NIN",
                ].map((item, index) => (
                  <li
                    key={index}
                    className={`py-2 border-b border-dotted ${
                      theme === "dark" ? "border-white/30" : "border-gray-300"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="space-y-4">
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl">About me</CardTitle>
                </CardHeader>
                <CardDescription
                  className={`text-base ${
                    theme === "dark" ? "text-white/70" : "text-gray-600"
                  }`}
                >
                  Write something fun and punchy.
                </CardDescription>
                <Button
                  variant="outline"
                  className={`font-medium border ${
                    theme === "dark"
                      ? "text-white border-white/30 hover:bg-white/10"
                      : "text-gray-200 bg-gradient-to-br from-orange-500 to-orange-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Add intro
                </Button>
              </div>

              <Separator
                className={theme === "dark" ? "bg-white/20" : "bg-gray-200"}
              />

              <div
                className={`space-y-4 border-t py-4 ${
                  theme === "dark" ? "border-white/20" : "border-gray-200"
                }`}
              >
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl">Where I've been</CardTitle>
                </CardHeader>
                <CardDescription
                  className={`text-base ${
                    theme === "dark" ? "text-white/70" : "text-gray-600"
                  }`}
                >
                  Pick the stamps you want other people to see on your profile.
                </CardDescription>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Card
                      key={i}
                      className={`h-32 border-dashed transition-colors ${
                        theme === "dark"
                          ? "border-white/30 hover:bg-white/10 bg-transparent"
                          : "border-gray-300 hover:bg-gray-50 bg-gradient-to-br from-white to-orange-100"
                      }`}
                    >
                      <CardContent className="h-full flex items-center justify-center p-0">
                        <div
                          className={`text-center ${
                            theme === "dark" ? "text-white/50" : "text-gray-400"
                          }`}
                        >
                          <PlusCircle className="w-6 h-6 mx-auto mb-2" />
                          <span className="text-sm">Next destination</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* My Interests Section */}
              <div
                className={`space-y-4 border-t py-4 ${
                  theme === "dark" ? "border-white/20" : "border-gray-200"
                }`}
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">My interests</h3>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-white/70" : "text-gray-600"
                    }`}
                  >
                    Find common ground with other guests and hosts by adding
                    interests to your profile.
                  </p>
                </div>

                {/* Plus Buttons Row */}
                <div className="flex gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="icon"
                      className={`w-12 h-12 rounded-lg border-dashed transition-colors ${
                        theme === "dark"
                          ? "border-white/30 hover:bg-white/10"
                          : "border-gray-300 bg-gradient-to-br from-white to-orange-100 text-white"
                      }`}
                    >
                      <Plus
                        className={`w-5 h-5 ${
                          theme === "dark" ? "text-white/50" : "text-gray-500"
                        }`}
                      />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Sticky */}
              <div
                className={`md:flex sticky bottom-0 py-4 px-5 justify-between gap-4 border-t hidden transition-all duration-500 ease-in-out transform translate-y-0 ${
                  theme === "dark"
                    ? "bg-[#0b0b0b] border-white/20"
                    : "bg-white border-gray-200"
                }`}
              >
                <Button
                  variant="ghost"
                  className={`transition-all duration-500 hover:translate-x-[-2px] ${
                    theme === "dark"
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-gray-900 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  <ArrowBigLeftIcon className="w-5 h-5 mr-2" />
                  Back
                </Button>
                <Button className="font-medium transition-all duration-500 bg-orange-500 text-white hover:scale-[1.02] active:scale-[0.98]">
                  Done
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Sticky Bottom Buttons (Mobile) */}
        <div
          className={`sticky bottom-0 border-t py-4 px-5 md:hidden transition-all duration-500 ease-in-out ${
            theme === "dark"
              ? "glassmorphism border-white/20"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex justify-between max-w-7xl mx-auto">
            <Button className="font-semibold w-full bg-gradient-to-br from-orange-500 to-orange-600 text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
