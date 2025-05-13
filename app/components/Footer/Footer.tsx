import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

type Props = {};

function Footer({}: Props) {
  return (
    <Card className="bg-slate-100 px-10 lg:px-40">
      <div className="flex flex-col">
        <Card className="bg-slate-100 border-0 shadow-none">
          <CardHeader className=" text-xl">
            Inspiration for future getaways
          </CardHeader>
          <CardContent>
            <div className="">
              <div className="menubar items-start flex gap-5 ">
                <h1 className="underline hover:no-underline underline-offset-8 text-gray-500 hover:text-black ">
                  Unique stays
                </h1>
                <h1 className="hover:underline underline-offset-8 text-gray-500 hover:text-black ">
                  Categories Travel tips & inspiration
                </h1>
                <h1 className="hover:underline underline-offset-8 text-gray-500 hover:text-black ">
                  Airbnb-friendly apartments
                </h1>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 my-4">
                <div>
                  <label>Cabins </label>
                  <h2 className="text-gray-500 hover:text-black font-light text-sm">
                    United States
                  </h2>
                </div>
                <div>
                  <label>Treehouses </label>
                  <h2 className="text-gray-500 hover:text-black font-light text-sm">
                    United States
                  </h2>
                </div>
                <div>
                  <label>Glamping </label>
                  <h2 className="text-gray-500 hover:text-black font-light text-sm">
                    United States
                  </h2>
                </div>
                <div>
                  <label>Tiny Houses </label>
                  <h2 className="text-gray-500 hover:text-black font-light text-sm">
                    United States
                  </h2>
                </div>
                <div>
                  <label>Beach Houses </label>
                  <h2 className="text-gray-500 hover:text-black font-light text-sm">
                    United States
                  </h2>
                </div>
                <div>
                  <label>Campers and RVs</label>
                  <h2 className="text-gray-500 hover:text-black font-light text-sm">
                    United States
                  </h2>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col md:flex-row justify-between">
          <Card className="border-none shadow-none bg-slate-100">
            <CardHeader>Support</CardHeader>
            <CardContent>
              <ul className="text-sm space-y-3">
                <li>Help Center</li>
                <li>Anti-discrimination</li>
                <li>Disability support</li>
                <li>Cancellation options</li>
                <li>Report neighborhood concern</li>
                <li>AirCover</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none bg-slate-100">
            <CardHeader>Hosting</CardHeader>
            <CardContent>
              <ul className="text-sm space-y-3">
                <li>Airbnb your home</li>
                <li>AirCover for Hosts</li>
                <li>Hosting resources</li>
                <li>Community forum</li>
                <li>Hosting responsibly</li>
                <li>Airbnb-friendly apartments</li>
                <li>Join a free Hosting class</li>
                <li>Find a co‑host</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none bg-slate-100">
            <CardHeader>Airbnb</CardHeader>
            <CardContent>
              <ul className="text-sm space-y-3">
                <li>Newsroom</li>
                <li>New features</li>
                <li>Careers</li>
                <li>Investors</li>
                <li>Gift cards</li>
                <li>Airbnb.org emergency stays</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <CardFooter className="py-10 text-sm m-auto flex space-x-44">
          <div>
            &copy; 2025 Airbnb, Inc. · Terms · Sitemap · Privacy · Your Privacy
            Choices
          </div>
          <div>English · Usdt · Facebook · Instagram</div>
        </CardFooter>
      </div>
    </Card>
  );
}

export default Footer;
