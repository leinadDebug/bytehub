"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeStore } from "@/lib/store/theme"; // optional: hook to get theme

interface NavItem {
  label: string;
  path: string;
}

interface DesktopHeaderProps {
  navItems?: NavItem[];
  logoText?: string;
  logoSubText?: string;
  userAvatar?: string;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  navItems = [
    { label: "Dashboard", path: "dashboard" },
    { label: "Analytics", path: "analytics" },
    { label: "Hotels", path: "hotels" },
    { label: "Settings", path: "settings" },
    { label: "Reviews", path: "#" },
    { label: "Payments", path: "transactions" },
  ],
  logoText = "ByteHub",
  logoSubText = "devs",
  userAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuA8beSaNnMYe6RYvlaDtSvbEn1aCoKEk_pcnDpkxcoP5k6EHwnrNBs3tw2xeByvSbZnn-nOFE_I_vDG450WfFnadEqYO0Hx-XbXkWPINLjqip_1ABJuznCo8lx9JJ_LZzrnB1_9Jq6XE6FiRzxUkxprc_znMwm6SBlcvMYnKsOKHBU8P3Tfzbg5cBKMb_zMqo8cn8d-4Z1a6QLp1xdxhGJY2Or7LfUzkv-Z6Yh1tPmOgS61f6KDvrbPpMRHYQ6L-B-hA9Y-FkH_qgM",
}) => {
  const pathname = usePathname();
  const { theme } = useThemeStore();

  const palette =
    theme === "light"
      ? {
          headerBg: "bg-white",
          border: "border-gray-200",
          text: "text-gray-900",
          textHover: "hover:text-gray-700",
          textActive: "text-blue-500",
          buttonBg: "bg-gray-200",
          buttonHover: "hover:bg-gray-300",
          buttonText: "text-gray-900",
          avatarBorder: "border-gray-300",
        }
      : {
          headerBg: "bg-[#111a22]",
          border: "border-[#233648]",
          text: "text-white",
          textHover: "hover:text-gray-300",
          textActive: "text-blue-500",
          buttonBg: "bg-[#233648]",
          buttonHover: "hover:bg-[#2e4a61]",
          buttonText: "text-white",
          avatarBorder: "border-[#324d67]",
        };

  return (
    <header
      className={`hidden lg:flex items-center justify-between whitespace-nowrap border-b ${palette.border} px-6 md:px-10 py-3 ${palette.headerBg}`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-4 ${palette.text}`}>
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          {logoText}
          <span>
            <span className="text-gray-400">{logoSubText}</span>
            {"/>"}
          </span>
        </h2>
      </div>

      {/* Nav + User */}
      <div className="flex flex-1 justify-end gap-6 md:gap-8">
        {/* Nav Links */}
        <nav className="flex items-center gap-6 md:gap-9">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? palette.textActive
                    : `${palette.text} ${palette.textHover}`
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Notification Bell */}
        <button
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${palette.buttonBg} ${palette.buttonText} shadow-sm ${palette.buttonHover} transition-colors`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
          </svg>
        </button>

        {/* User Avatar */}
        <div
          className="size-10 rounded-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${userAvatar})`,
            border: `1px solid ${palette.avatarBorder}`,
          }}
        />
      </div>
    </header>
  );
};

export default DesktopHeader;
