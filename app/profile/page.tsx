import React from "react";
import Profile_header from "../components/Header/Profile_header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type Props = {};

export default function Profile({}: Props) {
  return (
    <div className="px-10 lg:px-20">
      {/* Nav */}
      <Profile_header name="cagilo" profileImg="C" />
      {/* Main */}
      <section className="grid grid-cols-3 ">
        <Card className="space-y-2  tracking-tighter leading-tight border-none shadow-none">
          <CardHeader className="text-xl font-semibold">Profile</CardHeader>
          <ul className="max-w-44">
            <li className="p-2 hover:bg-gray-200 rounded-r-lg">About Me</li>
            <li className="p-2 hover:bg-gray-200 rounded-r-lg">Connections</li>
          </ul>
        </Card>
        <Card className="col-span-2 border-none shadow-none">
          <CardHeader className=" text-xl font-semibold">
            About Me
            <span>
              <Link href="/profile/edit">
                <Button
                  size="sm"
                  className="bg-gray-100 text-slate-900 hover:bg-gray-100 hover:shadow-inner transition-all"
                >
                  Edit
                </Button>
              </Link>
            </span>
          </CardHeader>
          <CardContent className="grid grid-cols-2 pb-4 mb-4 ">
            <Card className="w-full h-full max-w-[303px] max-h-[289px] grid rounded-2xl shadow-sm drop-shadow-lg p-4 gap-2">
              <div className="col-span-2 flex flex-col items-center justify-center space-y-1 ">
                <Avatar className="w-20 h-20">
                  <AvatarImage></AvatarImage>
                  <AvatarFallback className="bg-black text-slate-100 text-4xl font-bold m-aut0">
                    C
                  </AvatarFallback>
                </Avatar>
                <CardHeader className="p-0 m-0 text-2xl font-semibold">
                  Nelito
                </CardHeader>
                <CardDescription>superhost</CardDescription>
              </div>
            </Card>
            <Card className="space-y-2 my-auto tracking-tighter leading-tight border-none shadow-none">
              <CardHeader className="p-0 m-0 text-xl font-semibold">
                Complete your profile
              </CardHeader>
              <CardDescription>
                Your Airbnb profile is an important part of every reservation.
                Complete yours to help other hosts and guests get to know you.
              </CardDescription>
              <Button>Get started</Button>
            </Card>
            <div className="text-slate-800 text-sm pt-6 mt-4 border-t flex items-center gap-2">
              <MessageSquareText size={17} strokeWidth={1} />
              <h5>Reviews I’ve written</h5>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
