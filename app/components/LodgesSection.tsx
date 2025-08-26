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
      <div className="flex flex-col items-center justify-center py-16 rounded-2xl backdrop-blur-md shadow-xl border border-white/10 bg-white/5">
        <SearchX className="mx-auto h-12 w-12 text-blue-400/60" />
        <h2 className="mt-4 text-xl font-semibold text-white/90">
          No lodges found
        </h2>
        <p className="mt-2 text-white/60 text-sm">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-sm font-light text-white/80 pt-3 w-fit">
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
                    alt: "Placeholder Image",
                    title: lodge.title,
                    owner: lodge.owner,
                  },
                ];

          return (
            <div
              key={lodge._id}
              className="rounded-2xl overflow-hidden shadow-lg backdrop-blur-md border border-white/10 bg-white/5 transition hover:scale-[1.02] hover:shadow-2xl duration-300"
            >
              <Link href={`/lodge/${lodge._id}`}>
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
