"use client";
import React from "react";

import { Lodge } from "@/types/lodges";
import Carousel from "./Carousel/Carousel";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface LodgesSectionProps {
  lodges: Lodge[];
}

const SLIDES = [
  {
    id: 1,
    imgSrc: "https://picsum.photos/600/350?v=0",
    alt: "A beautiful landscape",
  },
  {
    id: 2,
    imgSrc: "https://picsum.photos/600/350?v=1",
    alt: "A city skyline",
  },
  {
    id: 3,
    imgSrc: "https://picsum.photos/600/350?v=2",
    alt: "A mountain view",
  },
];

const LodgesSection = ({ lodges }: LodgesSectionProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Available Lodges</CardTitle>
          <CardDescription>{lodges.length} are Available.</CardDescription>
        </CardHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-3">
          {lodges.map((lodge, i) => (
            <div
              key={i}
              className=" bg-slate-50 rounded-lg overflow-hidden shadow-sm space-y-4"
            >
              <div>
                <Carousel slides={SLIDES} />
              </div>

              <div className="p-3 text-gray-700 space-y-2">
                <a href="/lodge">
                  <CardTitle className="font-medium">{lodge.title}</CardTitle>
                </a>
                <h4 className="text-sm">Owner: {lodge._id}</h4>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LodgesSection;
