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
    <Card className="bg-slate-100 px-10 lg:px-40 mt-auto">
      <div className="flex flex-col max-w-7xl mx-auto">
        <Card className="bg-slate-100 border-0 shadow-none">
          <CardHeader className=" text-xl">
            Inspiration for future getaways
          </CardHeader>
          <CardContent>
            <div className="menubar items-start flex gap-5 overflow-x-auto pb-2">
              <h1 className="underline hover:no-underline underline-offset-8 text-gray-500 hover:text-black transition-colors duration-200 whitespace-nowrap">
                Unique stays
              </h1>
              <h1 className="hover:underline underline-offset-8 text-gray-500 hover:text-black transition-colors duration-200 whitespace-nowrap">
                Categories Travel tips & inspiration
              </h1>
              <h1 className="hover:underline underline-offset-8 text-gray-500 hover:text-black transition-colors duration-200 whitespace-nowrap">
                Airbnb-friendly apartments
              </h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 my-4">
              {[
                "Cabins",
                "Treehouses",
                "Glamping",
                "Tiny Houses",
                "Beach Houses",
                "Campers and RVs",
              ].map((item) => (
                <div
                  key={item}
                  className="hover:scale-[1.02] transition-transform duration-200"
                >
                  <label className="font-medium">{item}</label>
                  <h2 className="text-gray-500 hover:text-black font-light text-sm transition-colors duration-200">
                    United States
                  </h2>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          {[
            {
              title: "Support",
              items: [
                "Help Center",
                "Anti-discrimination",
                "Disability support",
                "Cancellation options",
                "Report neighborhood concern",
                "AirCover",
              ],
            },
            {
              title: "Hosting",
              items: [
                "Airbnb your home",
                "AirCover for Hosts",
                "Hosting resources",
                "Community forum",
                "Hosting responsibly",
                "Airbnb-friendly apartments",
                "Join a free Hosting class",
                "Find a co‑host",
              ],
            },
            {
              title: "Airbnb",
              items: [
                "Newsroom",
                "New features",
                "Careers",
                "Investors",
                "Gift cards",
                "Airbnb.org emergency stays",
              ],
            },
          ].map((section) => (
            <Card
              key={section.title}
              className="border-none shadow-none bg-slate-100 flex-1"
            >
              <CardHeader className="text-lg font-medium">
                {section.title}
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="hover:text-black transition-colors duration-200 cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <CardFooter className="py-10 text-sm flex flex-col md:flex-row justify-between items-center gap-4 border-t">
          <div className="text-center md:text-left">
            &copy; 2025 Airbnb, Inc. · Terms · Sitemap · Privacy · Your Privacy
            Choices
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            <span>English</span>
            <span>USD</span>
            <span>Facebook</span>
            <span>Instagram</span>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

export default Footer;
