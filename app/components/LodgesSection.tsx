"use client";
import React from "react";
import { Lodge } from "@/types/lodges";
import Carousel from "./Carousel/Carousel";
import Link from "next/link";

interface LodgesSectionProps {
  lodges: Lodge[];
}

const LodgesSection = ({ lodges }: LodgesSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-8">
      {lodges.map((lodge) => {
        const slides =
          lodge.images && lodge.images.length > 0
            ? lodge.images.map((img, i) => ({
                id: i,
                imgSrc: img,
                alt: lodge.title,
                title: lodge.title,
                owner: lodge.owner,
              }))
            : [
                {
                  id: 0,
                  imgSrc: "https://picsum.photos/600/350?random=1",
                  alt: "Placeholder Image 1",
                  title: lodge.title,
                  owner: lodge.owner,
                },
              ];

        return (
          <div key={lodge._id} className="glassmorphism p-2">
            <Link href={`/dashboard/lodges/${lodge._id}`}>
              <Carousel slides={slides} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default LodgesSection;
