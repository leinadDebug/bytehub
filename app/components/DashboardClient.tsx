"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";

interface UserData {
  id: string;
  email: string;
  username: string;
}

interface DashboardClientProps {
  children: ReactNode;
}

export default function DashboardClient({ children }: DashboardClientProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load dashboard data");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Failed to logout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="space-y-6">
          <header className="flex items-center justify-between border-b-2 shadow-xl p-5">
            <h1 className="text-2xl font-bold text-gray-900 underline underline-offset-4  ">
              Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <h2 className="text-black py-5">Welcome, {user?.username}</h2>
              <button
                onClick={handleLogout}
                className="p-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
              >
                Logout
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                ⚙️
              </button>
            </div>
          </header>
          {children}
        </div>
      </main>
    </div>
  );
}
