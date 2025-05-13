import Link from "next/link";
import { Menu, Search, Globe, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  name: string;
}

export function Header({ name }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-[#4D7C8A] text-2xl font-bold">ByteHub</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1 max-w-md">
            <div className="relative w-full">
              <button className="w-full flex items-center justify-between text-left bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-800">
                    Anywhere
                  </span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm font-medium text-gray-800">
                    Any week
                  </span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm text-gray-500">Add guests</span>
                </div>
                <div className="bg-[#4D7C8A] p-2 rounded-full text-white">
                  <Search className="h-4 w-4" />
                </div>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white">
            <button className="hidden md:flex items-center gap-1 text-sm text-gray-400 font-medium rounded-full bg-white border border-gray-200 px-4 py-2 shadow-sm hover:shadow-md transition-all">
              <span>{name}</span>
            </button>

            <button className="rounded-full">
              <Globe className="h-5 w-5" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border-gray-200 border px-4 py-2 ">
                  <Menu className="h-4 w-4" />
                  <User className="h-5 w-5" />
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
  );
}
