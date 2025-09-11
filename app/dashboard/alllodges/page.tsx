"use client";
import React, { useState } from "react";
import {
  Heart,
  Star,
  Plus,
  Minus,
  Maximize2,
  Map,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useThemeStore } from "@/lib/store/theme";
import Link from "next/link";

export default function PropertyListingsPage() {
  const { theme } = useThemeStore();
  const [favorites, setFavorites] = useState(new Set());
  const [hoveorangeProperty, setHoveorangeProperty] = useState<number | null>(
    null
  );
  const [showMap, setShowMap] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: number]: number;
  }>({});
  const [mapZoom, setMapZoom] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const properties = [
    {
      id: 1,
      title: "Loft in Vredehoek",
      subtitle: "Chic Penthouse with Private Pool & Breathtaking Views",
      bedrooms: "1 queen bed",
      dates: "Oct 24 - 26",
      price: 330,
      originalPrice: null,
      nights: 2,
      rating: 4.86,
      reviews: 529,
      image: {
        cover:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        room: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop",
        other: [
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800&h=600&fit=crop",
        ],
      },
      badge: "Guest favorite",
      location: {
        address: "12 Vredehoek Ave",
        coordinates: { lng: 23.4, lat: 40.89 },
      },
    },
    {
      id: 2,
      title: "Condo in Cape Town",
      subtitle: "Sailor's Away - 304 - 16 On Bree",
      bedrooms: "1 double bed",
      dates: "Oct 24 - 26",
      price: 130,
      originalPrice: 317,
      nights: 2,
      rating: 4.9,
      reviews: 298,
      image: {
        cover:
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        room: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        other: [
          "https://images.unsplash.com/photo-1599423300746-b62533397364?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop",
        ],
      },
      badge: "Guest favorite",
      location: {
        address: "16 Sunny Close",
        coordinates: { lng: 34.4, lat: 12.89 },
      },
    },
    {
      id: 3,
      title: "Condo in Cape Town",
      subtitle: "A Piece Of Heaven - 1305 - 16 On Bree",
      bedrooms: "1 double bed",
      dates: "Oct 10 - 12",
      price: 151,
      originalPrice: 327,
      nights: 2,
      rating: 4.86,
      reviews: 154,
      image: {
        cover:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        room: "https://images.unsplash.com/photo-1599423300744-bfc7b6a4f0cb?w=800&h=600&fit=crop",
        other: [
          "https://images.unsplash.com/photo-1600585154206-9d05d1a0a5f0?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1599423300735-3f7ddbb5e6aa?w=800&h=600&fit=crop",
        ],
      },
      badge: "Guest favorite",
      location: {
        address: "1305 Bree St",
        coordinates: { lng: 17.4, lat: 67.89 },
      },
    },
    {
      id: 4,
      title: "Apartment in Sea Point",
      subtitle: "Sea Point Studio on the Promenade",
      bedrooms: "1 queen bed",
      dates: "Oct 24 - 26",
      price: 180,
      originalPrice: null,
      nights: 2,
      rating: 5.0,
      reviews: 8,
      image: {
        cover:
          "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
        room: "https://images.unsplash.com/photo-1560185008-b033106afce8?w=800&h=600&fit=crop",
        other: [
          "https://images.unsplash.com/photo-1600566752832-c6e13d8b0f24?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1600566752019-f1e33ef61d92?w=800&h=600&fit=crop",
        ],
      },
      badge: "Guest favorite",
      location: {
        address: "21 Sea Point Blvd",
        coordinates: { lng: 89.4, lat: 121.89 },
      },
    },
    {
      id: 5,
      title: "Room in Oranjezicht",
      subtitle: "Stay with Faldelah · Pharmaceutical ind",
      bedrooms: "Private Travellers Only, Private Single Room",
      dates: "Oct 24 - 26",
      price: 787,
      originalPrice: null,
      nights: 2,
      rating: 4.92,
      reviews: 206,
      image: {
        cover:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        room: "https://images.unsplash.com/photo-1560184897-d17c5c1aeb98?w=800&h=600&fit=crop",
        other: [
          "https://images.unsplash.com/photo-1560184892-fd2a2c7d20d7?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1599423300746-b62533397364?w=800&h=600&fit=crop",
        ],
      },
      badge: "Guest favorite",
      location: {
        address: "45 Oranjezicht Rd",
        coordinates: { lng: 22.4, lat: 11.89 },
      },
    },
    {
      id: 6,
      title: "Apartment in Fish Hoek",
      subtitle: "Luxury Apartment with Unobstructed Sea Views",
      bedrooms: "1 queen bed",
      dates: "Oct 24 - 26",
      price: 330,
      originalPrice: null,
      nights: 2,
      rating: 5.0,
      reviews: 54,
      image: {
        cover:
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
        room: "https://images.unsplash.com/photo-1599423300735-3f7ddbb5e6aa?w=800&h=600&fit=crop",
        other: [
          "https://images.unsplash.com/photo-1600566752832-c6e13d8b0f24?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1600566752019-f1e33ef61d92?w=800&h=600&fit=crop",
        ],
      },
      badge: "Guest favorite",
      location: {
        address: "9 Fish Hoek Bay",
        coordinates: { lng: 51.4, lat: 71.89 },
      },
    },
  ];

  function toPercentString(value?: number): string {
    if (value === undefined || value === null) {
      return "0%";
    }
    return `${Math.floor(value)}%`;
  }

  const toggleFavorite = (propertyId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId);
    } else {
      newFavorites.add(propertyId);
    }
    setFavorites(newFavorites);
  };

  // Get all images for a property
  const getAllImages = (property: any) => {
    const images = [
      property.image.cover,
      property.image.room,
      ...property.image.other,
    ];
    return images.filter(Boolean); // Remove any undefined/null images
  };

  // Navigate to next image
  const nextImage = (propertyId: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % totalImages,
    }));
  };

  // Navigate to previous image
  const prevImage = (propertyId: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  // Mouse drag functions for map panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragOffset({ x: mapPosition.x, y: mapPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setMapPosition({
      x: dragOffset.x + deltaX / mapZoom,
      y: dragOffset.y + deltaY / mapZoom,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Map zoom functions
  const zoomIn = () => {
    setMapZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setMapZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setMapZoom(1.5);
    } else {
      setMapZoom(1);
      setMapPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div
      className={`h-screen flex flex-col sm:flex-row 2xl:justify-center overflow-y-auto hide-scrollbar ${
        theme === "dark"
          ? "bg-[#0b0b0b] text-white/90"
          : "bg-white text-black/90"
      }`}
    >
      {/* Mobile Toggle Button */}
      <div className={`sm:hidden sticky top-3 z-40 flex justify-end px-3`}>
        <button
          onClick={() => setShowMap(!showMap)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold shadow-md backdrop-blur-md transition-all duration-200
      ${
        theme === "dark"
          ? "bg-[#1c1c1c] text-orange-400 border border-[#2a2a2a] hover:bg-[#2a2a2a] active:scale-95"
          : "bg-white text-orange-500 border border-gray-200 hover:bg-orange-50 active:scale-95"
      }
    `}
        >
          <Map className="w-4 h-4" />
          <span className="text-sm">{showMap ? "Hide map" : "Show map"}</span>
        </button>
      </div>

      {/* Map Panel */}
      <div
        className={`
          ${
            showMap ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }
          sm:translate-y-0 sm:opacity-100
          order-1 sm:order-2 w-full md:w-1/2
          ${
            isFullscreen
              ? "fixed inset-0 z-50"
              : "fixed sm:static bottom-0 left-0"
          }
          ${isFullscreen ? "h-full" : "h-[60vh] sm:h-full"}
          transition-all duration-500 ease-in-out
          p-4 sm:p-10 z-40 sm:z-auto
        `}
      >
        <div className="w-full h-full rounded-3xl bg-gradient-to-br from-blue-100 via-green-50 to-blue-200 stick relative overflow-hidden">
          {/* Map Container with zoom and pan */}
          <div
            className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{
              transform: `scale(${mapZoom}) translate(${mapPosition.x}px, ${mapPosition.y}px)`,
              transformOrigin: "center center",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Map Labels */}
            <div className="absolute top-6 left-6 text-xs text-gray-600 font-medium">
              CAPE TOWN
            </div>
            <div className="absolute top-20 right-16 text-xs text-gray-600 font-medium">
              TABLE MOUNTAIN
            </div>
            <div className="absolute bottom-20 left-8 text-xs text-gray-600 font-medium">
              HOUT BAY
            </div>

            {/* Price Pins */}
            {properties.map((pin) => {
              const coordinates = pin.location?.coordinates;
              if (!coordinates) {
                return null;
              }
              return (
                <div
                  key={pin.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto"
                  style={{
                    left: toPercentString(pin.location.coordinates.lat),
                    top: toPercentString(pin.location.coordinates.lng),
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div
                    className={` border-2 px-2 py-1 rounded-full shadow-lg font-semibold text-sm transition-all duration-200 hover:scale-110 ${
                      hoveorangeProperty === pin.id
                        ? "border-black bg-slate-900 scale-110 duration-1000 text-white"
                        : "border-gray-300 bg-white text-black"
                    }`}
                  >
                    ${pin.price}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button
              onClick={toggleFullscreen}
              className="bg-white shadow-md rounded p-2 hover:shadow-lg transition-shadow sm:hidden"
            >
              <Maximize2 className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          <div className="absolute bottom-4 right-4 flex flex-col space-y-1">
            <button
              onClick={zoomIn}
              disabled={mapZoom >= 3}
              className="bg-white shadow-md rounded p-2 hover:shadow-lg transition-shadow border-b border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={zoomOut}
              disabled={mapZoom <= 0.5}
              className="bg-white shadow-md rounded p-2 hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          {/* Close fullscreen button */}
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 left-4 bg-white shadow-md rounded-full p-2 hover:shadow-lg transition-shadow z-10"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Google Attribution */}
          <div className="absolute bottom-2 left-2 text-xs text-gray-500">
            Google
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            Keyboard shortcuts | Map data ©2024 AfriGIS (Pty) Ltd, Google | 5 km
            | Terms | Report a map error
          </div>
        </div>
      </div>

      {/* Property Listings */}
      <div className="order-2 sm:order-1 flex flex-col">
        {/* Header */}
        <div className="px-6 md:px-8 py-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-white/10  ">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
              Over 1,000 homes within map area
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1">
              Showing 1 – 18
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-orange-500 shrink-0" />
            <span className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">
              Prices include all fees
            </span>
          </div>
        </div>

        {/* Property List */}
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {properties.map((property) => {
              const allImages = getAllImages(property);
              const currentIndex = currentImageIndex[property.id] || 0;
              const currentImage = allImages[currentIndex];

              return (
                <div
                  key={property.id}
                  onMouseEnter={() => setHoveorangeProperty(property.id)}
                  onMouseLeave={() => setHoveorangeProperty(null)}
                  className={`
                  group cursor-pointer max-w-full sm:max-w-sm
                  rounded-2xl overflow-hidden
                  transition-all duration-300
                  border
                  shadow-sm hover:shadow-lg
                  ${
                    theme === "dark"
                      ? `
                        bg-[#1a1a1a] 
                        text-white/80 
                        border-white/10 
                        hover:shadow-[0_0_0_3px_var(--airbnb-orange)] 
                        hover:scale-y-105
                      `
                      : `
                        bg-white 
                        text-black/80 
                        border-gray-200 
                        hover:shadow-[0_6px_15px_rgba(0,0,0,0.1)]
                        hover:ring-2 hover:ring-[var(--airbnb-orange)] hover:-translate-y-1
                      `
                  }
                `}
                >
                  {/* Image Section with Carousel */}
                  <div className="relative">
                    {property.badge && (
                      <div
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium shadow-md z-10 ${
                          theme === "dark"
                            ? "bg-[#1c1c1c] text-white  outline-1 outline-orange-400"
                            : "text-slate-900 bg-[#fffffff8] "
                        }`}
                      >
                        {property.badge}
                      </div>
                    )}

                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute top-3 right-3 p-2 rounded-full hover:bg-black hover:bg-opacity-20 z-10 transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.has(property.id)
                            ? "fill-orange-500 text-white "
                            : "fill-slate-700/40 text-white stroke-2"
                        }`}
                      />
                    </button>

                    {/* Navigation Buttons */}
                    {allImages.length > 1 && currentIndex > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage(property.id, allImages.length);
                        }}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 shadow-md z-10 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-700" />
                      </button>
                    )}

                    {allImages.length > 1 &&
                      currentIndex < allImages.length - 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage(property.id, allImages.length);
                          }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 shadow-md z-10 transition-all"
                        >
                          <ChevronRight className="w-4 h-4 text-gray-700" />
                        </button>
                      )}

                    {/* Image indicators */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {allImages.map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${
                            i === currentIndex
                              ? "bg-white"
                              : "bg-white bg-opacity-50"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => ({
                              ...prev,
                              [property.id]: i,
                            }));
                          }}
                        />
                      ))}
                    </div>

                    <img
                      src={currentImage}
                      alt={property.title}
                      className="w-full h-60 sm:h-64 object-cover rounded-2xl"
                    />
                  </div>
                  <Link href={"rooms"}>
                    <div className="p-3 sm:p-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm sm:text-base truncate">
                          {property.title}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-[#ff9f38] text-[#ff8838]" />
                          <span
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-700"
                                : "text-gray-500"
                            }-300 font-medium`}
                          >
                            {property.rating}
                          </span>
                        </div>
                      </div>

                      <p
                        className={`${
                          theme === "dark"
                            ? "text-gray-400/70"
                            : "text-gray-500"
                        } text-sm truncate`}
                      >
                        {property.subtitle}
                      </p>
                      <p
                        className={`${
                          theme === "dark" ? "text-gray-600" : "text-gray-500"
                        } text-sm`}
                      >
                        {property.bedrooms}
                      </p>
                      <p
                        className={`${
                          theme === "dark" ? "text-gray-600" : "text-gray-500"
                        } text-sm`}
                      >
                        {property.dates}
                      </p>

                      <div className="flex items-center space-x-1 sm:space-x-2">
                        {property.originalPrice && (
                          <span className="text-gray-400 text-sm line-through">
                            ${property.originalPrice}
                          </span>
                        )}
                        <span>${property.price}</span>
                        <span className="text-gray-600 light:text-gray-400 text-sm">
                          / {property.nights} nights
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
