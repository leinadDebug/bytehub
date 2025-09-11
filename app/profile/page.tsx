import React from "react";
import Profile_header from "../components/Header/Profile_header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Footer from "../components/Footer/Footer";
import { getCurrentUser } from "@/lib/auth";
import ProfileSection from "./components/profileSection";

type Props = {};

export default async function Profile({}: Props) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen  text-white flex flex-col">
      <div className="">
        <Profile_header name={user?.username} profileImg={user?.avatar} />
        <ProfileSection />
      </div>
      <Footer />
    </div>
  );
}
