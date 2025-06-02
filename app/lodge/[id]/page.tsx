"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DoorOpen, Check, X, CalendarCheck, KeyIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Footer from "@/app/components/Footer/Footer";
import { useParams } from "next/navigation";

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
  location: string;
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

export default function LodgeDetails() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [lodge, setLodge] = useState<Lodge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    if (!id) {
      setError("Lodge ID is missing");
      setLoading(false);
      return;
    }
    const fetchLodgeData = async () => {
      try {
        const response = await fetch(`/api/lodges/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch lodge data");
        }
        const data = await response.json();
        setLodge(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchLodgeData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading lodge details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!lodge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Lodge not found
      </div>
    );
  }

  const description = lodge.description || "";
  const displayedDescription = showFullDescription
    ? description
    : `${description.substring(0, Math.min(300, description.length))}${
        description.length > 300 ? "..." : ""
      }`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-5 md:px-10 lg:px-15 flex-grow max-w-7xl mx-auto">
        {/* Main Image Section */}
        <section>
          <Card className="flex flex-col border-none shadow-none">
            <CardHeader className="order-2 sm:order-1 text-2xl px-0">
              {lodge.title}
            </CardHeader>
            <CardContent className="order-1 sm:order-2 my-4 mx-0 px-0">
              <section className="sm:rounded-lg grid grid-cols-[repeat(auto-fit,_minmax(250px,_3fr))] gap-4 p-0 m-0">
                <div className="s">
                  <img
                    className="w-full h-full object-cover transition-opacity duration-300 sm:rounded-l-2xl"
                    src={
                      lodge?.images?.[0] || "https://picsum.photos/600/350?v=1"
                    }
                    alt="main view"
                  />
                </div>
                <div className="hidden sm:grid grid-cols-2 grid-rows-2 gap-4">
                  {lodge?.images?.slice(1, 5).map((image, index) => (
                    <img
                      key={index}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        index === 1 || index === 3 ? "sm:rounded-tr-2xl" : ""
                      }`}
                      src={
                        image || `https://picsum.photos/600/350?v=${index + 2}`
                      }
                      alt={`side view ${index + 1}`}
                    />
                  ))}
                </div>
              </section>
            </CardContent>
          </Card>
        </section>

        {/* Main Content Section */}
        <section className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left Column - Property Details */}
          <Card className="border-none shadow-none flex-1 px-0">
            <CardHeader className="space-y-1 px-0 pt-0">
              <h2 className="text-xl font-semibold">{lodge.location}</h2>
              <p className="text-gray-500 text-sm">
                {`${lodge.bedrooms} bedroom${lodge.bedrooms !== 1 ? "s" : ""} · 
                 ${lodge.beds} bed${lodge.beds !== 1 ? "s" : ""} · 
                 ${lodge.bathrooms} bathroom${
                  lodge.bathrooms !== 1 ? "s" : ""
                }`}
              </p>
            </CardHeader>

            <CardContent className="space-y-6 px-0">
              {/* Host Section */}
              <div className="flex items-start gap-4 border-b pb-6">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={lodge.host.avatar || "https://github.com/vercel.png"}
                  />
                  <AvatarFallback>{lodge.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Stay with {lodge.host.name}
                  </h3>
                  {lodge.host.isSuperhost && (
                    <p className="text-sm text-gray-500">
                      Superhost · {lodge.host.hostingSince} hosting
                    </p>
                  )}
                  <p className="text-xs text-gray-400 pt-1">
                    Joined {lodge.host.joinDate}
                  </p>
                </div>
              </div>

              {/* Highlights Section */}
              <div className="space-y-4 border-b pb-6">
                {lodge.highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1">
                      {item.icon === "KeyIcon" && (
                        <KeyIcon className="w-5 h-5" />
                      )}
                      {item.icon === "DoorOpen" && (
                        <DoorOpen className="w-5 h-5" />
                      )}
                      {item.icon === "CalendarCheck" && (
                        <CalendarCheck className="w-5 h-5" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* About Section */}
              <div className="space-y-4 border-b pb-6">
                <h2 className="text-xl font-semibold">About this place</h2>
                <div className="space-y-4">
                  <h3 className="text-base font-medium">The space</h3>
                  <p className="text-sm text-gray-700">
                    {displayedDescription}
                  </p>
                  <Button
                    variant="ghost"
                    className="bg-gray-100 text-slate-900 hover:bg-accent/70"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? "Show less" : "See more"}
                  </Button>
                </div>
              </div>

              {/* Sleep Section */}
              <div className="space-y-4 border-b pb-6">
                <h2 className="text-xl font-semibold">Where you'll sleep</h2>
                <img
                  className="w-full rounded-xl"
                  src={
                    lodge?.images?.[4] || "https://picsum.photos/600/350?v=5"
                  }
                  alt="Bedroom"
                />
                <div className="pt-2">
                  {lodge.sleepingArrangement.bedrooms.map((bedroom, index) => (
                    <div key={index}>
                      <h3 className="text-base font-medium">
                        Bedroom {index + 1}
                      </h3>
                      <p className="text-sm text-gray-500">{bedroom.type}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities List */}
              <div className="space-y-4 border-b pb-6">
                <h2 className="text-xl font-semibold">
                  What this place offers
                </h2>
                <ul className="grid sm:grid-cols-2 gap-4 text-sm">
                  {lodge.amenities.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                  {lodge.unavailableAmenities.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-400"
                    >
                      <X className="w-4 h-4" />
                      Unavailable: {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking Calendar */}
              <div className="space-y-4 border-b pb-2 mb-4">
                <h1 className="text-1xl">
                  5 nights in {lodge.location.split(",")[0]}
                </h1>
                <p className="text-gray-500 text-sm">
                  {lodge.checkInDate} - {lodge.checkOutDate}
                </p>
                <div className="flex">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md w-fit border-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Booking Card */}
          <Card className="flex-2 p-4 w-fit h-fit text-lg shadow-xl sticky top-10 hidden sm:block">
            <CardDescription>Prices include all fees</CardDescription>
            <CardContent className="p-0 pt-4">
              <CardHeader className="p-0 pb-4">
                ${lodge.price} for 8 nights
              </CardHeader>
              <div className="grid grid-cols-2 gap-1">
                <div className="border border-slate-200 p-2 flex flex-col text-xs rounded-tl-lg">
                  <label>CHECK IN</label>
                  <input
                    type="text"
                    readOnly
                    value={new Date(lodge.checkInDate).toLocaleDateString()}
                    className="pt-1 font-medium bg-transparent"
                  />
                </div>
                <div className="border border-slate-200 p-2 flex flex-col text-xs rounded-tr-lg">
                  <label>CHECK OUT</label>
                  <input
                    type="text"
                    readOnly
                    value={new Date(lodge.checkOutDate).toLocaleDateString()}
                    className="pt-1 font-medium bg-transparent"
                  />
                </div>
                <div className="border border-slate-200 p-2 flex flex-col text-xs rounded-b-lg col-span-2">
                  <label>GUESTS</label>
                  <input
                    type="text"
                    defaultValue="2 guests"
                    className="pt-1 font-medium bg-transparent"
                  />
                </div>
              </div>
              <Button className="bg-black mt-4 w-full">
                Check availability
              </Button>
              <p className="text-center text-sm mt-2 text-gray-500">
                {lodge.cancellationPolicy}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Reviews Section */}
        <section className="p-6">
          <div className="border-b pb-2 mb-4">
            <h1 className="text-2xl font-bold font-sans">
              {lodge.rating.toFixed(2)}
            </h1>
            <h2>Guest favorite</h2>
            <p>
              This home is a guest favorite based on ratings, reviews, and
              reliability
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 border-b pb-4 mb-4 gap-4">
            {lodge.reviews.slice(0, 2).map((review, index) => (
              <div key={index} className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src={review.avatar || "https://github.com/vercel.png"}
                  />
                  <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 w-full">
                  <div>
                    <h4 className="text-sm font-semibold">{review.author}</h4>
                    <p className="text-sm">
                      {review.hostingDuration} on Airbnb
                    </p>
                  </div>
                  <div className="pt-2 text-xs max-w-[90%] lg:max-w-[70%]">
                    <label className="block mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(review.rating) ? "⭐️" : "☆"}
                        </span>
                      ))}
                      {" · "}
                      {review.date} · {review.hostingDuration}
                    </label>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Location Section */}
          <div className="space-y-4 border-b pb-2 mb-4">
            <h1 className="text-1xl">Where you'll be</h1>
            <p className="text-gray-500 text-sm">{lodge.location}</p>
            <div className="w-full h-64 bg-gray-200 rounded-lg">
              {/* Map placeholder */}
            </div>
          </div>

          {/* Host Profile Section */}
          <div className="space-y-4 border-b pb-2 mb-4">
            <h1 className="text-1xl">Meet your host</h1>
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <Card className="w-full h-full max-w-[363px] max-h-[289px] grid grid-cols-3 rounded-2xl shadow-sm drop-shadow-lg p-4 gap-2">
                <div className="col-span-2 flex flex-col items-center justify-center space-y-1">
                  <Avatar className="w-28 h-28">
                    <AvatarImage src={lodge.host.avatar} />
                    <AvatarFallback>{lodge.host.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardHeader className="p-0 m-0 text-2xl font-semibold">
                    {lodge.host.name}
                  </CardHeader>
                  {lodge.host.isSuperhost && (
                    <CardDescription>Superhost</CardDescription>
                  )}
                </div>
                <div>
                  <div className="space-y-2 border-b text-xs font-extralight pb-2 mb-2">
                    <h2 className="text-xl font-semibold">
                      {lodge.host.reviewCount}
                    </h2>
                    <label>Reviews</label>
                  </div>
                  <div className="space-y-2 border-b text-xs font-extralight pb-2 mb-2">
                    <h2 className="text-xl font-semibold">
                      {lodge.host.averageRating.toFixed(2)}
                    </h2>
                    <label>Rating</label>
                  </div>
                  <div className="space-y-2 text-xs font-extralight pb-2 mb-2">
                    <h2 className="text-xl font-semibold">
                      {new Date().getFullYear() -
                        new Date(lodge.host.hostingSince).getFullYear()}
                    </h2>
                    <label>Years hosting</label>
                  </div>
                </div>
              </Card>
              <div className="space-y-3 text-lg">
                <div className="space-y-1 text-sm text-gray-600 font-extralight">
                  <h1 className="text-lg text-black">
                    {lodge.host.name} is a Superhost
                  </h1>
                  <p className="text-sm text-gray-600 font-extralight">
                    Superhosts are experienced, highly rated hosts who are
                    committed to providing great stays for guests.
                  </p>
                </div>
                {lodge.host.cohosts && (
                  <div className="space-y-1">
                    <h1 className="text-lg text-black">Co-hosts</h1>
                    {lodge.host.cohosts.map((cohost, index) => (
                      <div
                        key={index}
                        className="space-y-1 text-sm text-gray-600 font-extralight space-x-2 flex items-center"
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={cohost.avatar} />
                          <AvatarFallback>
                            {cohost.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <label className="text-sm">{cohost.name}</label>
                      </div>
                    ))}
                  </div>
                )}
                <div className="space-y-1 text-sm text-gray-600 font-extralight">
                  <h1 className="text-lg text-black">Host details</h1>
                  <p>
                    Response rate: {lodge.host.responseRate}% <br />
                    Responds within an hour
                  </p>
                </div>
                <div className="">
                  <Button className="bg-black">Message Host</Button>
                </div>
                <div className="border-t text-xs text-gray-500 px-2 mt-4">
                  <h5 className="my-4">
                    To help protect your payment, always use Airbnb to send
                    money and communicate with hosts
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
