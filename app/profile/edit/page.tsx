import Profile_header from "@/app/components/Header/Profile_header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

type Props = {};

export default function ({}: Props) {
  return (
    <div className="px-10 lg:px-20">
      <Profile_header name="cagilo" profileImg="C" />
      <main className="grid grid-cols-3">
        <Card className=" col-span-1 border-none shadow-none">
          <CardContent className="p-4">
            <div className="  items-center flex flex-col">
              <Avatar className="w-40 h-40">
                <AvatarImage></AvatarImage>
                <AvatarFallback className="bg-slate-800 text-slate-100 text-4xl font-bold m-aut0">
                  C
                </AvatarFallback>
              </Avatar>

              <Button
                size="sm"
                className="text-sm text-black font-medium bg-white rounded-full w-fit -m-2 z-10 hover:text-white hover:bg-slate-800  shadow-lg"
              >
                <Camera />
                <span>Add</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 p-10 space-y-3 border-none shadow-none">
          <CardHeader className="p-0 m-0 text-xl font-semibold">
            My profile
          </CardHeader>
          <CardDescription>
            Hosts and guests can see your profile and it may appear across
            Airbnb to help us build trust in our community. Learn more
          </CardDescription>
          <CardContent className="space-y-3">
            <ul className="grid grid-cols-2 space-y-2 gap-x-6 text-gray-600 text-sm">
              <li className="py-2 border-b ">Where I've always wanted to go</li>
              <li className="py-2 border-b ">My work</li>
              <li className="py-2 border-b ">My most useless skill</li>
              <li className="py-2 border-b ">Pets</li>
              <li className="py-2 border-b ">Where i went to school</li>
              <li className="py-2 border-b ">
                My favorite song in high school
              </li>
              <li className="py-2 border-b ">My fun fact</li>
              <li className="py-2 border-b ">My biography title would be</li>
              <li className="py-2 border-b ">Languages I speak</li>
              <li className="py-2 border-b ">I'm obsessed with</li>
            </ul>
            <div>
              <h1 className="text-xl font-semibold">About Me</h1>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
