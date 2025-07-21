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
      <div className="relative overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
          ref={containerRef}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex-[0_0_100%]">
              <div className="aspect-square w-full bg-gray-200 dark:bg-gray-800">
                {!loadedImages[index] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-l-gray-800 dark:border-l-gray-300 rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
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
          className={`absolute top-1/2 left-4 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 shadow-md transition-opacity z-10 ${
            selectedIndex === 0 ? "opacity-0 cursor-not-allowed" : "opacity-100"
          }`}
          aria-label="Previous"
        >
          &lt;
        </button>
        <button
          onClick={scrollNext}
          disabled={selectedIndex === slides.length - 1}
          className={`absolute top-1/2 right-4 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 shadow-md transition-opacity z-10 ${
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
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-neon scale-150 shadow-neon"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-3 px-1">
        <h3 className="font-semibold text-white">
          {slides[selectedIndex].title}
        </h3>
        <p className="text-sm text-white/70">{slides[selectedIndex].owner}</p>
      </div>
    </div>
  );
}
