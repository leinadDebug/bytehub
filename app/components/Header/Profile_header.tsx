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

interface Profile_headerProps {
  name: string;
  profileImg: string;
}

type Props = {};

export default function Profile_header({
  name,
  profileImg,
}: Profile_headerProps) {
  return (
    <div>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-[#4D7C8A] text-2xl font-bold">
                  ByteHub
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-4 bg-white">
              <button className="hidden md:flex items-center gap-1 text-sm text-gray-400 font-medium rounded-full bg-white  px-4 py-2 shadow-sm hover:shadow-md transition-all">
                <span>{name}</span>
              </button>

              <button className="rounded-full">
                <Avatar>
                  <AvatarImage src={profileImg}></AvatarImage>
                  <AvatarFallback className="font-semibold p-0 m-0">
                    {profileImg}
                  </AvatarFallback>
                </Avatar>
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full border-gray-200 border p-2 ">
                    <Menu className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="font-medium">
                    Sign up
                  </DropdownMenuItem>
                  <DropdownMenuItem>Log in</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Host your home</DropdownMenuItem>
                  <DropdownMenuItem>Host an experience</DropdownMenuItem>
                  <DropdownMenuItem>Help</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
