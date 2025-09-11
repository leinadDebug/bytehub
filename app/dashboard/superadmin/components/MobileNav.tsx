"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarCheck,
  Building2,
  Settings,
  CreditCard,
} from "lucide-react";
import { useThemeStore } from "@/lib/store/theme";

export default function MobileNav() {
  const pathname = usePathname();
  const { theme } = useThemeStore();

  const palette =
    theme === "light"
      ? {
          navBg: "rgba(255, 255, 255, 0.95)",
          borderTop: "rgba(229, 231, 235, 0.8)",
          text: "text-gray-500",
          textHover: "hover:text-gray-700",
          textActive: "text-blue-500",
          indicator: "bg-blue-500",
        }
      : {
          navBg: "rgba(17, 24, 39, 0.95)",
          borderTop: "rgba(55, 65, 81, 0.6)",
          text: "text-gray-400",
          textHover: "hover:text-gray-200",
          textActive: "text-blue-500",
          indicator: "bg-blue-500",
        };

  const sidebarItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "dashboard" },
    { label: "Charts", icon: CalendarCheck, href: "analytics" },
    { label: "Hotels", icon: Building2, href: "hotels" },
    { label: "Settings", icon: Settings, href: "settings" },
    { label: "Payments", icon: CreditCard, href: "transactions" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around lg:hidden shadow-lg backdrop-blur-md py-3 px-4"
      style={{
        borderTop: `1px solid ${palette.borderTop}`,
        backgroundColor: palette.navBg,
      }}
    >
      {sidebarItems.map((item) => {
        const isActive = pathname.endsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex flex-col items-center gap-1 transition-all duration-150 p-2 rounded-lg ${
              isActive
                ? `${palette.textActive} scale-105`
                : `${palette.text} ${palette.textHover}`
            }`}
          >
            {isActive && (
              <span
                className={`absolute -top-2 h-1 w-6 rounded-full ${palette.indicator} shadow-sm`}
              ></span>
            )}

            <Icon
              size={24}
              strokeWidth={isActive ? 2.4 : 2}
              className="transition-all duration-200"
            />

            <span
              className={`text-[11px] font-medium transition-all duration-200 ${
                isActive ? "font-semibold" : ""
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
