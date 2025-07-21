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

interface HeaderProps {
  name: string;
}

export function Header({ name }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
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
      <header className="sticky top-0 z-50 py-3 px-4 sm:px-6 lg:px-8 glassmorphism">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold gradient-text">ByteHub</span>
          </Link>

          {/* Search Bar (desktop) */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-lg">
            <div className="relative w-full">
              <button
                className={`w-full flex items-center justify-between text-left bg-white/20 border border-white/30 px-4 py-2 shadow-lg hover:shadow-xl transition-all ${
                  searchOpen ? "rounded-t-full" : "rounded-full"
                }`}
                onClick={handleSearchIconClick}
                type="button"
              >
                <div className="flex items-center text-white">
                  <span className="text-sm font-medium">Anywhere</span>
                  <span className="mx-2 text-white/50">|</span>
                  <span className="text-sm font-medium">Any week</span>
                  <span className="mx-2 text-white/50">|</span>
                  <span className="text-sm text-white/70">Add guests</span>
                </div>
                <div className="bg-gradient-brand p-2 rounded-full text-white shadow-md hover:shadow-lg transition-shadow">
                  {searchOpen ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </div>
              </button>
              {/* Sliding Search Bar (creatively under the button) */}
              <div
                className={`absolute left-0 right-0 z-40 flex justify-center transition-all duration-500 overflow-hidden ${
                  searchOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                }`}
                style={{ top: "100%" }}
              >
                <form
                  onSubmit={handleSearch}
                  className="w-full max-w-xl glassmorphism rounded-t-none border-t-0 flex items-center gap-0 p-4"
                >
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search for lodges..."
                    className="flex-1 px-4 py-2 rounded-l-lg bg-transparent border border-white/30 border-r-0 focus:outline-none focus:ring-2 focus:ring-neon text-white placeholder:text-white/70"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-r-lg bg-gradient-brand text-white font-semibold border border-l-0 border-white/30 hover:scale-105 transition-transform"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 text-sm text-white font-medium rounded-full px-4 py-2 transition-all hover:bg-white/20">
              <span>{name}</span>
              <Sparkles className="h-4 w-4 text-neon" />
            </button>

            <button className="rounded-full p-2 hover:bg-white/20 transition-colors">
              <Globe className="h-5 w-5 text-white" />
            </button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative rounded-full p-2 hover:bg-white/20 transition-colors">
                  <Bell className="h-5 w-5 text-white" />
                  {hasUnread && (
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-neon animate-pulse" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 glassmorphism text-white border-white/20"
              >
                <DropdownMenuItem className="font-bold p-3">
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20" />
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={String(notification._id)}
                      className="hover:bg-white/20 p-3"
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
                          <p className="text-xs text-white/70">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem className="p-3 text-center text-sm text-white/70">
                    You have no new notifications.
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-2 transition-all hover:bg-white/20">
                  <Menu className="h-5 w-5 text-white" />
                  <User className="h-5 w-5 text-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 glassmorphism text-white border-white/20"
              >
                <DropdownMenuItem className="hover:bg-white/20">
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/20">
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem className="hover:bg-white/20">
                  Help
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/20">
                  Log in
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium hover:bg-white/20">
                  Sign up
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem className="hover:bg-white/20">
                  Host an experience
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}
