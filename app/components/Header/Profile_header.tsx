import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Globe, Menu, Search, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getCurrentUser } from "@/lib/auth";

export default async function Profile_header() {
  const user = await getCurrentUser();

  const name = user?.username || "Guest";
  const profileImg = user?.username
    ? user.username.charAt(0).toUpperCase()
    : "G";

  return (
    <div>
      <header className="glassmorphism sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="gradient-text text-2xl font-bold">
                  ByteHub
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-1 text-sm font-medium rounded-full px-4 py-2 text-white hover:bg-white/10 transition-colors">
                <span>{name}</span>
              </button>

              <button className="rounded-full">
                <Avatar>
                  <AvatarImage src={user?.avatar || ""}></AvatarImage>
                  <AvatarFallback className="font-semibold p-0 m-0 bg-gradient-brand text-white">
                    {profileImg}
                  </AvatarFallback>
                </Avatar>
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full border-white/20 border p-2 text-white hover:bg-white/10 transition-colors">
                    <Menu className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 glassmorphism text-white border-white/20"
                >
                  <DropdownMenuItem className="font-medium hover:bg-white/20">
                    Sign up
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/20">
                    Log in
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/20">
                    <Link href="/dashboard" className="w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/20">
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/20">
                    Host your home
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/20">
                    Host an experience
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/20">
                    Help
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
