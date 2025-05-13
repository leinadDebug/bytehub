"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/bookings", label: "Bookings", icon: "📋" },
  { path: "/rooms", label: "Rooms", icon: "🏠" },
  { path: "/guests", label: "Guests", icon: "👥" },
  { path: "/reports", label: "Reports", icon: "📈" },
  { path: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-16"
      } bg-white border-r transition-all duration-300 hidden md:block min-h-screen relative group`}
    >
      {/* Minimize Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-white border rounded-full p-1.5 shadow-sm hover:bg-gray-50 transition-colors z-10"
        aria-label={sidebarOpen ? "Minimize sidebar" : "Expand sidebar"}
      >
        <span className="block w-4 h-4 text-gray-500">
          {sidebarOpen ? "←" : "→"}
        </span>
      </button>

      {/* Logo Section */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="font-bold text-lg text-blue-600 truncate">
            {sidebarOpen ? "ByteHub" : "🧭"}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors group/item ${
                  pathname === item.path
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-blue-500"
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <span className="text-xl min-w-[24px]">{item.icon}</span>
                <span className={`${!sidebarOpen && "hidden"}`}>
                  {item.label}
                </span>
                {!sidebarOpen && (
                  <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover/item:opacity-100 transition-opacity">
                    {item.label}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 w-full p-4 border-t">
        <div
          className={`flex items-center space-x-3 ${
            !sidebarOpen && "justify-center"
          }`}
        >
          <div className="text-2xl min-w-[32px]">👨‍💼</div>
          {sidebarOpen && (
            <div className="truncate">
              <div className="font-medium">Admin User</div>
              <div className="text-sm text-gray-500">Administrator</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
