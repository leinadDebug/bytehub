import React, { useState, useRef, useEffect } from "react";

interface imagesProps {
  images: {
    cover: string;
    room: string;
    others: string[];
  };
}

const ImageCarousel = ({ images }: imagesProps) => {
  // Sample lodge data for demonstration

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(newIndex);
    }
  };

  const scrollToImage = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      });
    }
  };

  // Desktop grid layout
  if (!isMobile) {
    return null;
  }

  // Mobile carousel layout
  return (
    <div className="relative w-full mb-8 md:hidden">
      {/* Main carousel */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory"
        onScroll={handleScroll}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {images.others.map((image: string, index: number) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-[300px] snap-start"
          >
            <img
              className="w-full h-full object-cover"
              src={image}
              alt={`Property view ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.others.map((_: string, index: number) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-white scale-110"
                : "bg-white/60 hover:bg-white/80"
            }`}
            onClick={() => scrollToImage(index)}
          />
        ))}
      </div>

      {/* Mini preview images at bottom sides */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between pointer-events-none">
        {/* Left preview */}
        {currentIndex > 0 && (
          <button
            className="w-12 h-8 rounded overflow-hidden opacity-70 hover:opacity-90 transition-opacity pointer-events-auto"
            onClick={() => scrollToImage(currentIndex - 1)}
          >
            <img
              className="w-full h-full object-cover"
              src={images.others[currentIndex - 1]}
              alt="Previous"
            />
          </button>
        )}

        <div className="flex-1" />

        {/* Right preview */}
        {currentIndex < images.others.length - 1 && (
          <button
            className="w-12 h-8 rounded overflow-hidden opacity-70 hover:opacity-90 transition-opacity pointer-events-auto"
            onClick={() => scrollToImage(currentIndex + 1)}
          >
            <img
              className="w-full h-full object-cover"
              src={images.others[currentIndex + 1]}
              alt="Next"
            />
          </button>
        )}
      </div>

      {/* Cover Image */}
      {images.cover ? (
        <div className="absolute -bottom-6 left-4">
          <div
            className={`
      relative w-24 h-24 rounded-2xl overflow-hidden
      shadow-lg transition-transform duration-300 hover:scale-105
      border-4
     border-white
    `}
          >
            <img
              src={images.cover}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            {/* Overlay subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageCarousel;
