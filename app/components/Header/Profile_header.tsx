"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Globe, Menu, Search } from "lucide-react";
import Link from "next/link";
import { useThemeStore } from "@/lib/store/theme";

interface ProfileHeaderProps {
  name?: string;
  profileImg?: string;
}

export default function ProfileHeader({
  name = "Guest",
  profileImg,
}: ProfileHeaderProps) {
  const { theme, setTheme } = useThemeStore();

  const displayName = name || "Guest";
  const avatarFallback = displayName.charAt(0).toUpperCase();

  return (
    <div>
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b shadow-sm transition-colors duration-300 ${
          theme === "dark"
            ? "bg-[#0b0b0b] border-white/10 text-white"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
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
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <Link
                href="/become-a-host"
                className={`hidden lg:block text-sm font-medium px-3 py-2 rounded-full transition-colors ${
                  theme === "dark"
                    ? "text-white hover:bg-white/10"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {name}
              </Link>

              {/* Globe */}
              <button
                className={`p-3 rounded-full transition-colors ${
                  theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-50"
                }`}
              >
                <Globe
                  className={`h-4 w-4 ${
                    theme === "dark" ? "text-white" : "text-gray-700"
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex items-center gap-3 rounded-full p-2 pl-3 pr-2 hover:shadow-md transition-shadow ${
                      theme === "dark"
                        ? "bg-[#1a1a1a] border border-white/10"
                        : "bg-white border border-gray-300"
                    }`}
                  >
                    <Menu
                      className={`h-4 w-4 ${
                        theme === "dark" ? "text-white" : "text-gray-700"
                      }`}
                    />
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profileImg || ""} alt={displayName} />
                      <AvatarFallback
                        className={`text-sm font-medium ${
                          theme === "dark"
                            ? "bg-orange-500 text-white"
                            : "bg-orange-500 text-white"
                        }`}
                      >
                        {avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className={`w-56 mt-2 shadow-lg rounded-xl border transition-colors ${
                    theme === "dark"
                      ? "bg-[#1a1a1a] border-white/10 text-white"
                      : "bg-white border-gray-200 text-gray-800"
                  }`}
                >
                  <div className="py-1">
                    <DropdownMenuItem
                      className={`px-4 py-3 cursor-pointer font-medium rounded-lg ${
                        theme === "dark"
                          ? "hover:bg-white/10"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <Link href="/profile" className="w-full">
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className={`px-4 py-3 cursor-pointer rounded-lg ${
                        theme === "dark"
                          ? "hover:bg-white/10"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <Link href="/dashboard" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className={`px-4 py-3 cursor-pointer rounded-lg ${
                        theme === "dark"
                          ? "hover:bg-white/10"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <Link href="/trips" className="w-full">
                        Trips
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className={`px-4 py-3 cursor-pointer rounded-lg ${
                        theme === "dark"
                          ? "hover:bg-white/10"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <Link href="/wishlists" className="w-full">
                        Wishlists
                      </Link>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator
                    className={theme === "dark" ? "bg-white/10" : "bg-gray-200"}
                  />

                  <div className="py-1">
                    <DropdownMenuItem
                      className={`px-4 py-3 cursor-pointer rounded-lg ${
                        theme === "dark"
                          ? "hover:bg-white/10"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <Link href="/add-lodge" className="w-full">
                        Host a lodge
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={`px-4 py-3 cursor-pointer rounded-lg ${
                        theme === "dark"
                          ? "hover:bg-white/10"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <Link href="/manage-lodge" className="w-full">
                        Manage a lodge
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={`px-4 py-3 cursor-pointer rounded-lg ${
                        theme === "dark"
                          ? "hover:bg-red-600"
                          : "hover:bg-red-500 hover:text-white"
                      }`}
                    >
                      <Link href="/logout" className="w-full">
                        Log out
                      </Link>
                    </DropdownMenuItem>

                    {/* …continue with Manage your lodges, Help Center, Logout, etc. */}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
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
        </div>
      </header>
    </div>
  );
}
