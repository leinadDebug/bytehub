"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./carousel.css";

interface CarouselProps {
  slides: {
    id: number;
    imgSrc: string;
    alt: string;
    title: string;
    owner: string;
  }[];
}

export default function Carousel({ slides }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  const scrollTo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const offset = container.clientWidth * index;
    container.scrollTo({ left: offset, behavior: "smooth" });
    setSelectedIndex(index);
  };

  const scrollPrev = () => {
    if (selectedIndex > 0) scrollTo(selectedIndex - 1);
  };

  const scrollNext = () => {
    if (selectedIndex < slides.length - 1) scrollTo(selectedIndex + 1);
  };

  const onImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  }, []);

  useEffect(() => {
    setLoadedImages(new Array(slides.length).fill(false));
  }, [slides.length]);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl glassmorphism">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
          ref={containerRef}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex-[0_0_100%] relative">
              <div className="aspect-square w-full bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden">
                {/* Loading spinner */}
                {!loadedImages[index] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-neon rounded-full animate-spin shadow-neon"></div>
                  </div>
                )}
                <img
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    loadedImages[index] ? "opacity-100" : "opacity-0"
                  }`}
                  src={
                    loadedImages[index]
                      ? slide.imgSrc
                      : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                  }
                  alt={slide.alt}
                  onLoad={() => onImageLoad(index)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={scrollPrev}
          disabled={selectedIndex === 0}
          className={`absolute top-1/2 left-4 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md text-white shadow-lg shadow-black/30 transition-all hover:scale-110 z-10 ${
            selectedIndex === 0 ? "opacity-0 cursor-not-allowed" : "opacity-100"
          }`}
          aria-label="Previous"
        >
          &lt;
        </button>
        <button
          onClick={scrollNext}
          disabled={selectedIndex === slides.length - 1}
          className={`absolute top-1/2 right-4 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md text-white shadow-lg shadow-black/30 transition-all hover:scale-110 z-10 ${
            selectedIndex === slides.length - 1
              ? "opacity-0 cursor-not-allowed"
              : "opacity-100"
          }`}
          aria-label="Next"
        >
          &gt;
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => {
            const handleDotClick = (e: React.MouseEvent) => {
              e.stopPropagation();
              scrollTo(index);
            };
            return (
              <button
                key={index}
                onClick={handleDotClick}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-neon scale-150 shadow-neon"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Title & owner */}
      <div className=" p-3">
        <h3 className="font-semibold text-white text-lg text-white/90 truncate">
          {slides[selectedIndex].title}
        </h3>
        <p className="text-sm text-white/60 ">
          by {slides[selectedIndex].owner}
        </p>
      </div>
    </div>
  );
}
