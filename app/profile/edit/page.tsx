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

type Props = {};

export default function ({}: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-5 md:px-10 lg:px-20 flex-grow">
        <Profile_header name="cagilo" profileImg="C" />

        <main className="grid sm:grid-cols-3 gap-4 max-w-7xl mx-auto ">
          {/* Avatar Card - Optimized for performance */}
          <Card className="w-full sm:col-span-1 border-none shadow-none">
            <CardContent className="p-4">
              <div className="flex flex-col items-center w-full">
                <Avatar className="w-[min(80vw,300px)] h-[min(80vw,300px)] sm:w-40 sm:h-40 transition-transform duration-200">
                  <AvatarImage alt="Profile picture" />
                  <AvatarFallback
                    className="bg-slate-800 text-slate-100 text-[120px] sm:text-6xl font-bold"
                    aria-label="User initial"
                  >
                    C
                  </AvatarFallback>
                </Avatar>

                <Button
                  size="sm"
                  className="text-sm font-bold bg-white text-black rounded-full w-fit -m-2 z-10 hover:bg-slate-800 hover:text-white shadow-lg transition-colors duration-200"
                  aria-label="Add profile photo"
                >
                  <Camera className="w-4 h-4" />
                  <span>Add</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details Card - Optimized list rendering */}
          <Card className="sm:col-span-2 p-6 space-y-6 border-none shadow-none">
            <div className="space-y-4">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl">My profile</CardTitle>
              </CardHeader>
              <CardDescription className="text-base">
                Hosts and guests can see your profile and it may appear across
                Airbnb to help us build trust in our community. Learn more
              </CardDescription>
            </div>
            <CardContent className="p-0 space-y-6">
              <ul className="grid sm:grid-cols-2 gap-4 text-base md:text-sm text-gray-500">
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
                    className="py-2 border-b border-dotted border-slate-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="space-y-4">
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl">About me</CardTitle>
                </CardHeader>
                <CardDescription className="text-base">
                  Write something fun and punchy.
                </CardDescription>
                <Button
                  variant="outline"
                  className="text-foreground font-medium border-border hover:bg-accent"
                >
                  Add intro
                </Button>
              </div>

              <Separator />

              <div className="space-y-4 border-t py-4">
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl">Where I've been</CardTitle>
                </CardHeader>
                <CardDescription className="text-base">
                  Pick the stamps you want other people to see on your profile.
                </CardDescription>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Card
                      key={i}
                      className="h-32 border-dashed hover:bg-accent/50 transition-colors"
                    >
                      <CardContent className="h-full flex items-center justify-center p-0">
                        <div className="text-center text-muted-foreground">
                          <PlusCircle className="w-6 h-6 mx-auto mb-2" />
                          <span className="text-sm">Next destination</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              {/* My Interests Section */}
              <div className="space-y-4 border-t py-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">My interests</h3>
                  <p className="text-sm text-muted-foreground">
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
                      className="w-12 h-12 rounded-lg border-dashed hover:bg-accent/50"
                    >
                      <Plus className="w-5 h-5 text-muted-foreground" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Sticky */}
              <div className="md:flex sticky bottom-0 bg-white backdrop-blur-xs py-4 px-5 justify-between gap-4 border-t hidden transition-all duration-500 ease-in-out transform translate-y-0">
                <Button
                  variant="ghost"
                  className="text-muted-foreground transition-all duration-500 hover:bg-accent/50 hover:translate-x-[-2px]"
                >
                  <ArrowBigLeftIcon color="w-5 h-5 mr-2 transition-all duration-500" />
                  Back
                </Button>
                <Button className="font-medium transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]">
                  Done
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        {/* Sticky Bottom Buttons (Mobile) */}
        <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t py-4 px-5 md:hidden transition-all duration-500 ease-in-out">
          <div className="flex justify-between max-w-7xl mx-auto">
            <Button className="font-semibold w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              Done
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
