"use client";
import React from "react";
import { Lodge } from "@/types/lodges";
import Carousel from "./Carousel/Carousel";
import Link from "next/link";
import { SearchX } from "lucide-react";

interface LodgesSectionProps {
  lodges: Lodge[];
}

const LodgesSection = ({ lodges }: LodgesSectionProps) => {
  if (lodges.length === 0) {
    return (
      <div className="text-center py-16">
        <SearchX className="mx-auto h-12 w-12 text-white/50" />
        <h2 className="mt-4 text-xl font-semibold text-white">
          No lodges found
        </h2>
        <p className="mt-2 text-white/70">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-sm font-extralight  text-white pt-3 w-fit ">
        {lodges.length} {lodges.length === 1 ? "lodge" : "lodges"} available
      </h2>
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
    </div>
  );
};

export default LodgesSection;
