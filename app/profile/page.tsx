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

type Props = {};

export default async function Profile({}: Props) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="px-5 md:px-10 lg:px-20 flex-grow">
        <Profile_header />
        {/* Main */}
        <section className="grid sm:grid-cols-3 max-w-7xl mx-auto">
          <Card className="space-y-2 tracking-tighter leading-tight border-none shadow-none sm:block hidden bg-transparent">
            <CardHeader className="text-xl font-semibold">
              <CardTitle className="text-2xl">Profile</CardTitle>
            </CardHeader>
            <ul className="max-w-44">
              <li className="p-2 hover:bg-white/10 rounded-r-lg">About Me</li>
              <li className="p-2 hover:bg-white/10 rounded-r-lg">
                Connections
              </li>
            </ul>
          </Card>
          <Card className="col-span-2 border-none shadow-none bg-transparent">
            <CardHeader className="text-xl font-semibold">
              <CardTitle className="text-2xl">About Me</CardTitle>
              <Link href="/profile/edit">
                <Button
                  size="sm"
                  className="bg-gradient-brand text-white hover:bg-white/20 transition-all"
                >
                  Edit
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 pb-4 mb-4 gap-5 ">
              <Card className="w-full h-full max-w-[303px] max-h-[289px] grid rounded-2xl p-4 gap-2 glassmorphism">
                <div className="col-span-2 flex flex-col items-center justify-center space-y-1 ">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user?.avatar || ""}></AvatarImage>
                    <AvatarFallback className="bg-gradient-brand text-slate-100 text-4xl font-bold m-aut0">
                      {user?.username
                        ? user.username.charAt(0).toUpperCase()
                        : "G"}
                    </AvatarFallback>
                  </Avatar>
                  <CardHeader className="p-0 m-0 text-2xl font-semibold">
                    {user?.username || "Guest"}
                  </CardHeader>
                  <CardDescription className="text-neon">
                    superhost
                  </CardDescription>
                </div>
              </Card>
              <Card className="space-y-2 my-auto tracking-normal leading-tight border-none shadow-none bg-transparent">
                <CardHeader className="p-0 m-0 text-2xl font-semibold tracking-tighter">
                  Complete your profile
                </CardHeader>
                <CardDescription className="text-base leading-tight text-white/70">
                  Your Airbnb profile is an important part of every reservation.
                  Complete yours to help other hosts and guests get to know you.
                </CardDescription>
                <Link href={"/profile/edit"}>
                  <Button className="my-4 p-5 bg-gradient-brand text-white font-semibold">
                    Get started
                  </Button>
                </Link>
              </Card>
              <div className="text-white/80 text-sm pt-6 mt-4 border-t flex items-center gap-2 border-white/20">
                <Button
                  variant="ghost"
                  className="bg-white/10 text-white hover:bg-white/20 transition-all duration-500 hover:translate-x-[-2px]"
                >
                  <MessageSquareText size={17} strokeWidth={1} />
                  Reviews I’ve written
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
      <Footer />
    </div>
  );
}
