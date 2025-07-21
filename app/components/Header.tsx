import Link from "next/link";
import { Menu, Search, Globe, User, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  name: string;
}

export function Header({ name }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 py-3 px-4 sm:px-6 lg:px-8 glassmorphism">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold gradient-text">ByteHub</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-lg">
          <div className="relative w-full">
            <button className="w-full flex items-center justify-between text-left bg-white/20 border border-white/30 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center text-white">
                <span className="text-sm font-medium">Anywhere</span>
                <span className="mx-2 text-white/50">|</span>
                <span className="text-sm font-medium">Any week</span>
                <span className="mx-2 text-white/50">|</span>
                <span className="text-sm text-white/70">Add guests</span>
              </div>
              <div className="bg-gradient-brand p-2 rounded-full text-white shadow-md hover:shadow-lg transition-shadow">
                <Search className="h-4 w-4" />
              </div>
            </button>
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
  );
}
