import React from "react";
import DesktopHeader from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";
import { useThemeStore } from "@/lib/store/theme";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-white text-white p-0 m-0">
      <DesktopHeader />
      <div className="flex-1 flex flex-col">
        <MobileNav />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
