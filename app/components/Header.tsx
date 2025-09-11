"use client";
import Link from "next/link";
import { Menu, Search, Globe, User, Sparkles, X, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { INotification } from "@/lib/modal/notification";
import { useThemeStore } from "@/lib/store/theme";

interface HeaderProps {
  name: string;
}

export function Header({ name }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const { theme } = useThemeStore();
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
          setHasUnread(data.some((n: INotification) => !n.read));
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleSearchIconClick = () => setSearchOpen((prev) => !prev);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/dashboard?query=${searchValue.trim()}`);
    }
    setSearchOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 py-3 px-4 sm:px-6 lg:px-8 backdrop-blur-md border-b transition-colors duration-300
            ${
              theme === "dark"
                ? "bg-[#0b0b0b]/90 border-[#2a2a2a]"
                : "bg-white border-gray-100"
            }`}
      >
        <div className=" mx-auto flex justify-between items-center">
          {/* LOGO */}
          <Link href="/" className="flex items-center group">
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
                className={`${theme === "dark" ? "text-white" : "text-black"}`}
              >
                Byte
                <span className="ml-1 text-orange-500">Hub</span>
              </span>
            </span>
          </Link>

          {/* Search Bar (desktop) */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-lg">
            <div className="relative w-full">
              <button
                className={`w-full flex items-center justify-between text-left border px-4 py-2 shadow-lg hover:shadow-xl transition-all
                    ${searchOpen ? "rounded-t-2xl" : "rounded-full"}
                    ${
                      theme === "dark"
                        ? "bg-[#0b0b0b]/70 border-[#2a2a2a]"
                        : "bg-white/70 border-gray-200"
                    }`}
                onClick={handleSearchIconClick}
                type="button"
              >
                <div
                  className={`flex items-center ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  <span className="text-sm font-medium">Anywhere</span>
                  <span className="mx-2 opacity-50">|</span>
                  <span className="text-sm font-medium">Any week</span>
                  <span className="mx-2 opacity-50">|</span>
                  <span className="text-sm opacity-70">Add guests</span>
                </div>
                <div className="bg-orange-500 p-2 rounded-full text-white shadow-md hover:shadow-lg transition-shadow">
                  {searchOpen ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </div>
              </button>

              {/* Sliding Search Bar */}
              <div
                className={`absolute left-0 right-0 z-40 flex justify-center transition-all duration-500 overflow-hidden rounded-b-2xl shadow-sm hover:shadow-md 
                    ${
                      searchOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                    }`}
                style={{ top: "100%" }}
              >
                <form
                  onSubmit={handleSearch}
                  className={`w-full max-w-xl flex items-center gap-0 p-4 border rounded-t-none border-t-0
                      ${
                        theme === "dark"
                          ? "bg-[#0b0b0b]/90 border-[#2a2a2a]"
                          : "bg-white/90 border-gray-200"
                      }`}
                >
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search for lodges..."
                    className={`w-full text-sm bg-transparent focus:outline-none ${
                      theme === "dark"
                        ? "text-white placeholder-gray-400"
                        : "text-gray-700 placeholder-gray-500"
                    }`}
                  />
                  <button
                    type="submit"
                    className={`p-3 rounded-full transition-colors mr-1 ${
                      theme === "dark"
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              className={`hidden md:flex items-center gap-2 text-sm font-medium rounded-full px-4 py-2 transition-all
                  ${
                    theme === "dark"
                      ? "text-white hover:bg-white/10"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
            >
              <span>{name}</span>
              <Sparkles className="h-4 w-4 text-neon" />
            </button>

            <button
              className={`rounded-full p-2 transition-colors
                  ${
                    theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"
                  }`}
            >
              <Globe
                className={`h-5 w-5 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              />
            </button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`relative rounded-full p-2 transition-colors
                      ${
                        theme === "dark"
                          ? "hover:bg-white/10"
                          : "hover:bg-gray-100"
                      }`}
                >
                  <Bell
                    className={`h-5 w-5 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  />
                  {hasUnread && (
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-neon animate-pulse" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={`w-80 backdrop-blur-md rounded-2xl shadow-lg border transition-colors
                    ${
                      theme === "dark"
                        ? "bg-[#0b0b0b] border-[#2a2a2a] text-white"
                        : "bg-white border-gray-100 text-gray-900"
                    }`}
              >
                <DropdownMenuItem className="font-bold p-3">
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator
                  className={theme === "dark" ? "bg-white/10" : "bg-gray-200"}
                />
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={String(notification._id)}
                      className={`${
                        theme === "dark"
                          ? "hover:bg-white/10"
                          : "hover:bg-gray-100"
                      } p-3`}
                    >
                      <div className="flex items-start gap-3">
                        {!notification.read && (
                          <div className="mt-1 h-2 w-2 rounded-full bg-neon" />
                        )}
                        <div
                          className={notification.read ? "ml-5 opacity-70" : ""}
                        >
                          <p className="font-semibold">
                            {notification.type.replace(/_/g, " ")}
                          </p>
                          <p className="text-xs opacity-70">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem className="p-3 text-center text-sm opacity-70">
                    You have no new notifications.
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-2 rounded-full border px-3 py-2 transition-all
                      ${
                        theme === "dark"
                          ? "border-white/20 bg-white/10 hover:bg-white/20"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                      }`}
                >
                  <Menu
                    className={`h-5 w-5 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  />
                  <User
                    className={`h-5 w-5 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={`w-56 backdrop-blur-md rounded-2xl shadow-lg border transition-colors
                    ${
                      theme === "dark"
                        ? "bg-[#0b0b0b] border-[#2a2a2a] text-white"
                        : "bg-white border-gray-100 text-gray-900"
                    }`}
              >
                <DropdownMenuItem
                  className={
                    theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"
                  }
                >
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"
                  }
                >
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator
                  className={theme === "dark" ? "bg-white/10" : "bg-gray-200"}
                />
                <DropdownMenuItem
                  className={
                    theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"
                  }
                >
                  Help
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"
                  }
                >
                  Log in
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`font-medium ${
                    theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"
                  }`}
                >
                  Sign up
                </DropdownMenuItem>
                <DropdownMenuSeparator
                  className={theme === "dark" ? "bg-white/10" : "bg-gray-200"}
                />
                <DropdownMenuItem
                  className={
                    theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"
                  }
                >
                  <Link href="/add-lodge" className="w-full">
                    Host a lodge
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Search Bar (mobile) */}
        <div className="md:hidden  mt-3">
          <button
            onClick={handleSearchIconClick}
            className={`w-full flex items-center justify-between text-left border px-4 py-3 rounded-full shadow-md 
      ${
        theme === "dark"
          ? "bg-[#0b0b0b]/70 border-[#2a2a2a] text-white"
          : "bg-white/70 border-gray-200 text-gray-900"
      }`}
          >
            <span className="text-sm opacity-70">Where to?</span>
            <div className="bg-orange-500 p-2 rounded-full text-white shadow-md">
              <Search className="h-4 w-4" />
            </div>
          </button>

          {/* Slide-down panel for search input */}
          <div
            className={`transition-all overflow-hidden 
      ${searchOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <form
              onSubmit={handleSearch}
              className={`w-full flex items-center gap-2 mt-2 p-3 border rounded-lg 
        ${
          theme === "dark"
            ? "bg-[#0b0b0b]/90 border-[#2a2a2a]"
            : "bg-white/90 border-gray-200"
        }`}
            >
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search for lodges..."
                className={`w-full text-sm bg-transparent focus:outline-none 
          ${
            theme === "dark"
              ? "text-white placeholder-gray-400"
              : "text-gray-700 placeholder-gray-500"
          }`}
              />
              <button
                type="submit"
                className="p-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </header>
    </>
  );
}
