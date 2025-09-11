"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DoorOpen,
  Check,
  X,
  CalendarCheck,
  KeyIcon,
  Star,
  Heart,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/app/components/Footer/Footer";
import { Location } from "@/types/lodges";
import dynamic from "next/dynamic";
import ImageCarousel from "./imageCarousel";
import { useThemeStore } from "@/lib/store/theme";
import Link from "next/link";

interface LodgeHost {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  joinDate: string;
  responseRate: number;
  hostingSince: string;
  cohosts?: { name: string; avatar: string }[];
  reviewCount: number;
  averageRating: number;
}

interface LodgeReview {
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  hostingDuration: string;
}

interface Lodge {
  id: string;
  title: string;
  location: Location;
  description: string;
  price: number;
  images: string[];
  amenities: string[];
  unavailableAmenities: string[];
  bedrooms: number;
  beds: number;
  bathrooms: number;
  host: LodgeHost;
  reviews: LodgeReview[];
  rating: number;
  reviewCount: number;
  checkInDate: string;
  checkOutDate: string;
  cancellationPolicy: string;
  sleepingArrangement: {
    bedrooms: {
      type: string;
      count: number;
    }[];
  };
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
}

const MapSection = dynamic(() => import("../../components/MapSection"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray-200 rounded-xl animate-pulse" />
  ),
});

// Dummy data for missing properties
const getDummyLodgeData = {
  id: "2",
  title: "Loft in Vredehoek",
  location: {
    address: "12 Vredehoek Ave, Cape Town, South Africa",
    coordinates: { lng: 18.4161, lat: -33.9249 },
  },
  description:
    "Experience luxury living in this stunning penthouse loft with breathtaking mountain and city views. This beautifully designed space features floor-to-ceiling windows, modern furnishings, and a private rooftop terrace. Perfect for couples or solo travelers seeking a unique Cape Town experience. The apartment is located in the trendy Vredehoek neighborhood, just minutes from the city center and Table Mountain. Enjoy world-class restaurants, cafes, and attractions within walking distance.",
  price: 330,
  images: {
    cover: "",
    room: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop",
    others: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    ],
  },
  amenities: [
    "Private pool",
    "Mountain view",
    "City view",
    "Free WiFi",
    "Kitchen",
    "Air conditioning",
    "Workspace",
    "Free parking",
    "Rooftop terrace",
    "Smart TV",
    "Coffee machine",
    "Dishwasher",
  ],
  unavailableAmenities: [
    "Gym access",
    "Hot tub",
    "Pets allowed",
    "Smoking allowed",
    "Events allowed",
  ],
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  host: {
    name: "Sarah",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isSuperhost: true,
    joinDate: "March 2019",
    responseRate: 98,
    hostingSince: "5 years",
    reviewCount: 529,
    averageRating: 4.86,
    cohosts: [
      {
        name: "Michael",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    ],
  },
  reviews: [
    {
      author: "Emma",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      date: "September 2024",
      content:
        "Absolutely stunning place with incredible views! Sarah was an amazing host and the rooftop terrace was perfect for morning coffee. The location is ideal for exploring Cape Town.",
      hostingDuration: "3 years",
    },
    {
      author: "James",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      date: "August 2024",
      content:
        "The loft exceeded all expectations. Modern, clean, and the private pool was a fantastic bonus. Will definitely book again on my next visit to Cape Town!",
      hostingDuration: "2 years",
    },
  ],
  rating: 4.86,
  reviewCount: 529,
  checkInDate: "2024-10-24",
  checkOutDate: "2024-10-26",
  cancellationPolicy: "Free cancellation for 48 hours",
  sleepingArrangement: {
    bedrooms: [
      {
        type: "1 queen bed",
        count: 1,
      },
    ],
  },
  highlights: [
    {
      icon: "KeyIcon",
      title: "Self check-in",
      description: "Check yourself in with the keypad.",
    },
    {
      icon: "DoorOpen",
      title: "Great location",
      description: "95% of recent guests gave the location a 5-star rating.",
    },
    {
      icon: "CalendarCheck",
      title: "Free cancellation",
      description: "Cancel before Oct 22 for a full refund.",
    },
  ],
};

export default function LodgeDetails() {
  const lodge = getDummyLodgeData;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { theme, setTheme } = useThemeStore();
  const [isLiked, setIsLiked] = useState(false);

  const description = lodge?.description || "";
  const displayedDescription = showFullDescription
    ? description
    : `${description.substring(0, Math.min(300, description.length))}${
        description.length > 300 ? "..." : ""
      }`;

  const themeClasses = {
    bg: theme === "dark" ? "bg-[#0b0b0b]" : "bg-white",
    text: theme === "dark" ? "text-white" : "text-gray-900",
    textSecondary: theme === "dark" ? "text-white/70" : "text-gray-600",
    textMuted: theme === "dark" ? "text-white/50" : "text-gray-500",
    border: theme === "dark" ? " border-white/10  " : "border-white",
    card:
      theme === "dark"
        ? "bg-[#1a1a1a] border-white/10"
        : "bg-orange-50 border border-gray-200 shadow-sm",
    button: `
  px-5 py-2.5 
  rounded-xl font-semibold 
  shadow-sm active:scale-95
  transition-all duration-200 ease-in-out
  ${
    theme === "dark"
      ? "bg-orange-600 text-white hover:bg-orange-600/90 shadow-orange-900/20"
      : "bg-orange-500 text-white hover:bg-orange-500/90 shadow-orange-500/30"
  }
`,
    gradient: "bg-gradient-to-r from-[#E61E4D] to-[#BD1E59]", // Airbnb's signature gradient
  };

  return (
    <div
      className={`min-h-screen relative flex flex-col ${themeClasses.bg} ${themeClasses.text} `}
    >
      <ImageCarousel images={lodge?.images} />
      <div className="px-4 md:px-6 lg:px-20 flex-grow max-w-7xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <nav className="py-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className={themeClasses.textSecondary}>Home</span>
            <span className={themeClasses.textMuted}>/</span>
            <span className={themeClasses.textSecondary}>South Africa</span>
            <span className={themeClasses.textMuted}>/</span>
            <span className={themeClasses.textSecondary}>Cape Town</span>
            <span className={themeClasses.textMuted}>/</span>
            <span>Vredehoek</span>
          </div>
        </nav>

        {/* Title and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Title + Rating + Location */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {lodge?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current text-black" />
                <span className="font-medium">{lodge?.rating}</span>
                <span className={themeClasses.textSecondary}>
                  ({lodge?.reviewCount} reviews)
                </span>
              </div>
              <span className={themeClasses.textSecondary}>•</span>
              <span
                className={`${themeClasses.textSecondary} underline cursor-pointer`}
              >
                {lodge?.location.address}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className={`${themeClasses.button} rounded-lg px-4 py-2`}
            >
              <span className="mr-1">📤</span>
              Share
            </Button>
            <Button
              variant="ghost"
              className={`${themeClasses.button} rounded-lg px-4 py-2`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                className={`w-4 h-4 mr-1 ${
                  isLiked ? "fill-orange-500 text-orange-500" : ""
                }`}
              />
              Save
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="hidden  md:grid grid-cols-4 grid-rows-2 gap-2 h-[400px] rounded-xl overflow-hidden mb-8">
          <div className="col-span-2 row-span-2">
            <img
              className="w-full h-full object-cover hover:brightness-110 transition-all duration-200 cursor-pointer"
              src={lodge?.images.others[0]}
              alt="Main property view"
            />
          </div>
          {lodge?.images.others.slice(1, 5).map((image, index) => (
            <img
              key={index}
              className="w-full h-full object-cover hover:brightness-110 transition-all duration-200 cursor-pointer"
              src={image}
              alt={`Property view ${index + 2}`}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Overview */}
            <div className={` border-b ${themeClasses.border}`}>
              <div className="flex gap-2 md:justify-between items-start mb-4">
                <div className="order-2  md:order-1">
                  <h2 className="text-md md:text-xl font-semibold tracking-tight ">
                    Entire loft hosted by {lodge?.host.name}
                  </h2>
                  <p className={themeClasses.textSecondary}>
                    {lodge?.bedrooms} bedroom • {lodge?.beds} bed •{" "}
                    {lodge?.bathrooms} bath
                  </p>
                </div>
                <Avatar className="w-14 h-14 order-1 md:order-2">
                  <AvatarImage src={lodge?.host.avatar} />
                  <AvatarFallback>{lodge?.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Highlights */}
            <div className={`pb-8 border-b ${themeClasses.border} space-y-6`}>
              {lodge?.highlights.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="mt-1">
                    {item.icon === "KeyIcon" && <KeyIcon className="w-6 h-6" />}
                    {item.icon === "DoorOpen" && (
                      <DoorOpen className="w-6 h-6" />
                    )}
                    {item.icon === "CalendarCheck" && (
                      <CalendarCheck className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className={`pb-8 border-b ${themeClasses.border}`}>
              <p className={`${themeClasses.textSecondary}  leading-relaxed`}>
                {displayedDescription}
              </p>
              <Button
                variant="ghost"
                className={`${themeClasses.button} mt-4 underline p-2 h-auto font-medium`}
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "Show less" : "Show more"}
                <span className="ml-1">{">"}</span>
              </Button>
            </div>

            {/* Sleeping Arrangements */}
            <div className={`pb-8 border-b ${themeClasses.border}`}>
              <h2 className="text-xl font-semibold tracking-tight mb-6">
                Where you'll sleep
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lodge?.sleepingArrangement.bedrooms.map((bedroom, index) => (
                  <div
                    key={index}
                    className={`${themeClasses.card} rounded-xl p-4`}
                  >
                    <img
                      className="w-full h-32 object-cover rounded-lg mb-4"
                      src={lodge?.images.room}
                      alt="Bedroom"
                    />
                    <h3 className="font-medium">Bedroom {index + 1}</h3>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>
                      {bedroom.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className={`pb-8 border-b ${themeClasses.border}`}>
              <h2 className="text-xl font-semibold tracking-tight mb-6">
                What this place offers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lodge?.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>{amenity}</span>
                  </div>
                ))}
                {lodge?.unavailableAmenities.map((amenity, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 ${themeClasses.textMuted} line-through`}
                  >
                    <X className="w-5 h-5" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
              <Button
                className={`${themeClasses.button} mt-6 w-full py-3 font-medium border rounded-lg`}
              >
                Show all amenities
              </Button>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <Star className="w-5 h-5 fill-current text-orange-600" />
                <h2 className="text-xl font-semibold">
                  {lodge?.rating} • {lodge?.reviewCount} reviews
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lodge?.reviews.map((review, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>
                          {review.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{review.author}</h4>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>
                          {review.date}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`text-sm ${themeClasses.textSecondary} leading-relaxed`}
                    >
                      {review.content}
                    </p>
                  </div>
                ))}
              </div>
              <Button
                className={`${themeClasses.button} mt-6 w-fit px-6 py-3 font-medium border rounded-lg`}
              >
                Show all {lodge?.reviewCount} reviews
              </Button>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className={`${themeClasses.card} rounded-xl p-6 sticky top-6`}>
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-2xl font-semibold">
                    ${lodge?.price}
                  </span>
                  <span className={`${themeClasses.textSecondary} ml-1`}>
                    night
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <Star className="w-4 h-4 fill-current text-orange-600" />
                  <span className="font-medium">{lodge?.rating}</span>
                  <span className={themeClasses.textSecondary}>
                    ({lodge?.reviewCount})
                  </span>
                </div>
              </div>

              <div className={`border rounded-lg ${themeClasses.border} mb-4`}>
                <div className="grid grid-cols-2">
                  <div className={`p-3 border-r  ${themeClasses.border}`}>
                    <label
                      className={`text-xs font-medium  ${themeClasses.textSecondary} uppercase tracking-wide`}
                    >
                      Check-in
                    </label>
                    <div className="mt-1 font-medium">
                      {/* {new Date(lodge?.checkInDate).toLocaleDateString()} */}
                    </div>
                  </div>
                  <div className="p-3">
                    <label
                      className={`text-xs font-medium ${themeClasses.textSecondary} uppercase tracking-wide`}
                    >
                      Checkout
                    </label>
                    <div className="mt-1 font-medium">
                      {/* {new Date(lodge?.checkOutDate).toLocaleDateString()} */}
                    </div>
                  </div>
                </div>
                <div className={`p-3 border-t ${themeClasses.border}`}>
                  <label
                    className={`text-xs font-medium ${themeClasses.textSecondary} uppercase tracking-wide`}
                  >
                    Guests
                  </label>
                  <div className="mt-1 font-medium">2 guests</div>
                </div>
              </div>
              <Link href={"booking"}>
                <Button
                  className={`w-full ${themeClasses.button}  font-medium py-3 rounded-lg mb-4 hover:opacity-90`}
                >
                  Reserve
                </Button>
              </Link>

              <p
                className={`text-center text-sm ${themeClasses.textSecondary} mb-4`}
              >
                You won't be charged yet
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="underline">${lodge?.price} × 2 nights</span>
                  {/* <span>${lodge?.price * 2}</span> */}
                </div>
                <div className="flex justify-between">
                  <span className="underline">Cleaning fee</span>
                  <span>$50</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Service fee</span>
                  <span>$83</span>
                </div>
                <div className={`border-t pt-3 ${themeClasses.border}`}>
                  <div className="flex justify-between font-medium">
                    <span>Total before taxes</span>
                    {/* <span>${lodge?.price * 2 + 50 + 83}</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            Where you'll be
          </h2>
          <p className={`${themeClasses.textSecondary} mb-6`}>
            {lodge?.location.address}
          </p>
          <div className="w-full h-96 rounded-xl overflow-hidden">
            <MapSection
              location={{
                lat: Number(lodge?.location.coordinates.lat),
                lng: Number(lodge?.location.coordinates.lng),
                address: lodge?.location.address?.toString() || "",
              }}
            />
          </div>
        </div>

        {/* Host Section */}
        <div className={`pb-8 border-b ${themeClasses.border} mb-12`}>
          <h2 className="text-xl font-semibold tracking-tight mb-6">
            Meet your Host
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between">
            <div
              className={`w-full h-full  grid grid-cols-3 rounded-2xl p-4 gap-2 border ${themeClasses.card}`}
            >
              <div className="col-span-2 flex flex-col items-center justify-center space-y-1">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={lodge?.host.avatar} />
                  <AvatarFallback>{lodge?.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-semibold mb-2">
                  {lodge?.host.name}
                </h3>
                {lodge?.host.isSuperhost && (
                  <span className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Superhost
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 grid-row-3 gap-4 text-center">
                <div className="space-y-2 border-b text-xs font-light pb-2 mb-2 border-white/20">
                  <div className="font-semibold text-lg ">
                    {lodge?.host.reviewCount}
                  </div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>
                    Reviews
                  </div>
                </div>
                <div className="space-y-2 border-b text-xs font-light pb-2 mb-2 border-white/20">
                  <div className="font-semibold text-lg ">
                    {lodge?.host.averageRating}
                  </div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>
                    Rating
                  </div>
                </div>
                <div className="space-y-2 text-xs font-light pb-2 mb-2">
                  <div className="font-semibold text-lg ">5</div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>
                    Years hosting
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">
                  Response rate: {lodge?.host.responseRate}%
                </h4>
                <p className={`text-sm ${themeClasses.textSecondary}`}>
                  Responds within an hour
                </p>
              </div>
              <Button
                className={`${themeClasses.button} border px-6 py-2 rounded-lg font-medium w-fit`}
              >
                Contact Host
              </Button>
              <div
                className={`text-xs ${themeClasses.textMuted} pt-4 border-t ${themeClasses.border}`}
              >
                To protect your payment, never transfer money or communicate
                outside of the Airbnb website or app.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
