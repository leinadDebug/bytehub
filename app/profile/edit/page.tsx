import Profile_header from "@/app/components/Header/Profile_header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowBigLeftIcon, Camera, Plus, PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Footer from "@/app/components/Footer/Footer";
import { getCurrentUser } from "@/lib/auth";

type Props = {};

export default async function ({}: Props) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="px-5 md:px-10 lg:px-20 flex-grow">
        <Profile_header />

        <main className="grid sm:grid-cols-3 gap-4 max-w-7xl mx-auto ">
          {/* Avatar Card */}
          <Card className="w-full sm:col-span-1 border-none shadow-none bg-transparent">
            <CardContent className="p-4">
              <div className="flex flex-col items-center w-full">
                <Avatar className="w-[min(80vw,300px)] h-[min(80vw,300px)] sm:w-40 sm:h-40">
                  <AvatarImage src={user?.avatar || ""} alt="Profile picture" />
                  <AvatarFallback
                    className="bg-gradient-brand text-slate-100 text-[120px] sm:text-6xl font-bold"
                    aria-label="User initial"
                  >
                    {user?.username
                      ? user.username.charAt(0).toUpperCase()
                      : "G"}
                  </AvatarFallback>
                </Avatar>

                <Button
                  size="sm"
                  className="text-sm font-bold bg-white text-black rounded-full w-fit -m-2 z-10 hover:bg-gray-800 hover:text-white shadow-lg transition-colors duration-200"
                  aria-label="Add profile photo"
                >
                  <Camera className="w-4 h-4" />
                  <span>Add</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details Card */}
          <Card className="sm:col-span-2 p-6 space-y-6 border-none shadow-none glassmorphism">
            <div className="space-y-4">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl">My profile</CardTitle>
              </CardHeader>
              <CardDescription className="text-base text-white/70">
                Hosts and guests can see your profile and it may appear across
                Airbnb to help us build trust in our community. Learn more
              </CardDescription>
            </div>
            <CardContent className="p-0 space-y-6">
              <ul className="grid sm:grid-cols-2 gap-4 text-base md:text-sm text-white/80">
                {[
                  "Where I've always wanted to go",
                  "My work",
                  "My most useless skill",
                  "Pets",
                  "Where I went to school",
                  "My favorite song in high school",
                  "My fun fact",
                  "My biography title would be",
                  "Languages I speak",
                  "I'm obsessed with",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="py-2 border-b border-dotted border-white/30"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="space-y-4">
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl">About me</CardTitle>
                </CardHeader>
                <CardDescription className="text-base text-white/70">
                  Write something fun and punchy.
                </CardDescription>
                <Button
                  variant="outline"
                  className="text-white font-medium border-white/30 hover:bg-white/10"
                >
                  Add intro
                </Button>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-4 border-t py-4 border-white/20">
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl">Where I've been</CardTitle>
                </CardHeader>
                <CardDescription className="text-base text-white/70">
                  Pick the stamps you want other people to see on your profile.
                </CardDescription>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Card
                      key={i}
                      className="h-32 border-dashed border-white/30 hover:bg-white/10 transition-colors bg-transparent"
                    >
                      <CardContent className="h-full flex items-center justify-center p-0">
                        <div className="text-center text-white/50">
                          <PlusCircle className="w-6 h-6 mx-auto mb-2" />
                          <span className="text-sm">Next destination</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              {/* My Interests Section */}
              <div className="space-y-4 border-t py-4 border-white/20">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">My interests</h3>
                  <p className="text-sm text-white/70">
                    Find common ground with other guests and hosts by adding
                    interests to your profile.
                  </p>
                </div>

                {/* Plus Buttons Row */}
                <div className="flex gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="icon"
                      className="w-12 h-12 rounded-lg border-dashed border-white/30 hover:bg-white/10"
                    >
                      <Plus className="w-5 h-5 text-white/50" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Sticky */}
              <div className="md:flex sticky bottom-0 glassmorphism py-4 px-5 justify-between gap-4 border-t border-white/20 hidden transition-all duration-500 ease-in-out transform translate-y-0">
                <Button
                  variant="ghost"
                  className="text-white/80 hover:text-white transition-all duration-500 hover:bg-white/10 hover:translate-x-[-2px]"
                >
                  <ArrowBigLeftIcon className="w-5 h-5 mr-2" />
                  Back
                </Button>
                <Button className="font-medium transition-all duration-500 bg-gradient-brand text-white hover:scale-[1.02] active:scale-[0.98]">
                  Done
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        {/* Sticky Bottom Buttons (Mobile) */}
        <div className="sticky bottom-0 glassmorphism border-t border-white/20 py-4 px-5 md:hidden transition-all duration-500 ease-in-out">
          <div className="flex justify-between max-w-7xl mx-auto">
            <Button className="font-semibold w-full bg-gradient-brand text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              Done
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
