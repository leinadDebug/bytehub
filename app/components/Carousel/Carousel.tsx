"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./carousel.css";

interface CarouselProps {
  slides: {
    id: number;
    imgSrc: string;
    alt: string;
  }[];
}

export default function Carousel({ slides }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const slideWidth = 100; // percent

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
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative w-full h-full overflow-hidden  ">
        <div
          className="flex transition-transform duration-300 ease-out scroll-snap-x scroll-smooth"
          style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
          ref={containerRef}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="flex-[0_0_100%] snap-center min-w-0 flex-shrink-0 h-full"
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
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
                      : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D"
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
          className={`absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 shadow-md transition-colors z-10 ${
            selectedIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
          }`}
          aria-label="Previous"
        >
          ←
        </button>
        <button
          onClick={scrollNext}
          disabled={selectedIndex === slides.length - 1}
          className={`absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 shadow-md transition-colors z-10 ${
            selectedIndex === slides.length - 1
              ? "opacity-30 cursor-not-allowed"
              : ""
          }`}
          aria-label="Next"
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === selectedIndex
                ? "bg-gray-800 dark:bg-gray-200"
                : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
