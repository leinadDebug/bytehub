import Footer from "@/app/components/Footer/Footer";
import { Header } from "@/app/components/Header";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header name="guest" />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
