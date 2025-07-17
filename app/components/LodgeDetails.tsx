"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DoorOpen,
  Coffee,
  BedDouble,
  Check,
  X,
  CalendarCheck,
  CheckCircle,
  KeyIcon,
  MessageSquareText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Footer from "../components/Footer/Footer";
import { Calendar } from "@/components/ui/calendar";

export default function LodgeDetails({ lodge }: { lodge: any }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-5 md:px-10 lg:px-15 flex-grow max-w-7xl mx-auto">
        <section>
          <Card className="flex flex-col border-none shadow-none">
            <CardHeader className="order-2 sm:order-1 text-2xl">
              {lodge.title ||
                "CASA JUNE: Room between the Sea and the Forest in Floripa"}
            </CardHeader>
            <CardContent className="order-1 sm:order-2 my-4 mx-0 ">
              <section className="sm:rounded-lg grid grid-cols-[repeat(auto-fit,_minmax(250px,_3fr))] gap-4 p-0 m-0">
                <div className="s">
                  <img
                    className="w-full h-full object-cover transition-opacity duration-300 sm:rounded-l-2xl"
                    src={lodge.image || "https://picsum.photos/600/350?v=1"}
                    alt="main view"
                  />
                </div>
                <div className="hidden sm:grid grid-cols-2 grid-rows-2 gap-4">
                  <img
                    className="w-full h-full object-cover transition-opacity duration-300"
                    src="https://picsum.photos/600/350?v=2"
                    alt="side view1"
                  />
                  <img
                    className="w-full h-full object-cover transition-opacity duration-300 sm:rounded-r-2xl"
                    src="https://picsum.photos/600/350?v=3"
                    alt="side view3"
                  />
                  <img
                    className="w-full h-full object-cover transition-opacity duration-300"
                    src="https://picsum.photos/600/350?v=4"
                    alt="side view4"
                  />
                  <img
                    className="w-full h-full object-cover transition-opacity duration-300 sm:rounded-r-2xl"
                    src="https://picsum.photos/600/350?v=5"
                    alt="side view2"
                  />
                </div>
              </section>
            </CardContent>
          </Card>
        </section>
        <section className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left Column - Property Details */}
          <Card className="border-none shadow-none flex-1">
            <CardHeader className="space-y-1 px-0 pt-0">
              <h2 className="text-xl font-semibold">
                {lodge.location || "Room in Florianópolis, Brazil"}
              </h2>
              <p className="text-gray-500 text-sm">
                {lodge.bedInfo || "1 double bed · Dedicated bathroom"}
              </p>
            </CardHeader>

            <CardContent className="space-y-6 px-0">
              {/* Host Section */}
              <div className="flex items-start gap-4 border-b pb-6">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={lodge.hostImage || "https://github.com/vercel.png"}
                  />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Stay with {lodge.hostName || "Nelito"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {lodge.hostDescription || "Superhost · 4 years hosting"}
                  </p>
                  <p className="text-xs text-gray-400 pt-1">
                    {lodge.hostJoined || "Joined December 2021"}
                  </p>
                </div>
              </div>

              {/* Amenities Section */}
              <div className="space-y-4 border-b pb-6">
                {[
                  {
                    icon: <KeyIcon className="w-5 h-5" />,
                    title: "Great check-in experience",
                    description:
                      "Recent guests loved the smooth start to this stay",
                  },
                  {
                    icon: <DoorOpen className="w-5 h-5" />,
                    title: "Room in a townhouse",
                    description:
                      "Your own room in a home, plus access to shared spaces",
                  },
                  {
                    icon: <CalendarCheck className="w-5 h-5" />,
                    title: "Free cancellation before Dec 21",
                    description: "Get a full refund if you change your mind",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1">{item.icon}</div>
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
                  <p className="text-sm line-clamp-5 text-gray-700">
                    {lodge.description ||
                      `Some info has been automatically translated. Show original
                      About this place We rent a comfortable room in our house.
                      Enjoy the ocean and forest views in this peaceful and
                      well-located place 2 km from downtown Floripa, 1.5 km from the
                      Convention Center and 4 km from UFSC. The bedroom and bathroom
                      are private, with a minibar and work desk. The living room and
                      kitchen are shared only with the owners. CASAJUNE was born
                      from the dream of a couple in love with the island and its
                      beauties. BRING Good Energies, respect and gratitude. TAKE
                      Away Good Experiences and our friendship. The space Our house
                      is new and super comfortable with a beautiful view of the sea
                      and the Atlantic Forest. In the bedroom you will find a
                      comfortable double bed, work desk, minibar, bedding, blankets,
                      towels and a wardrobe. The ground floor of the house is shared
                      with the owners, where you will find a living area, living and
                      dining room and full kitchen with barbecue. All this with
                      views of the sea and the Atlantic Forest, as we have an APA in
                      the back of our house. Guest access You will have access to
                      the house by means of an electronic lock and the information
                      will be sent one day before the accommodation. Your room is on
                      the ground floor, just right after the entrance door. The gate
                      key will be at the gate and you must leave it there after
                      entering. ***We offer early check-in from 6 a.m. and late
                      check-out until 8 p.m. with an additional 1/2 day, subject to
                      availability*** ***We request the full name and ID number of
                      all guests for access to the accommodation*** ***Please note
                      that access to the accommodation is restricted exclusively to
                      guests, and visits or entry by people not staying at the
                      location are not allowed*** ***Upon prior request, luggage
                      storage is allowed both before check-in and after check-out,
                      at no additional cost*** During your stay If we're at home,
                      they can interact with us without issue. We like pleasant
                      companions We have a cat, Agatha and work during the week away
                      from home. Other things to note For photo essays or
                      audiovisual production (films, podcasts, etc.) a fee ranging
                      from 200.00 to 700.00 (depending on the purpose of audiovisual
                      production and logistics) of image rights will be charged, in
                      addition to the daily rate. Show more`}
                  </p>
                  <Button
                    variant="ghost"
                    className="bg-gray-100 text-slate-900 hover:bg-accent/70 "
                  >
                    See more
                  </Button>
                </div>
              </div>

              {/* Sleep Section */}
              <div className="space-y-4 border-b pb-6">
                <h2 className="text-xl font-semibold">Where you'll sleep</h2>
                <img
                  className="w-full rounded-xl"
                  src={lodge.bedImage || "https://picsum.photos/600/350?v=4"}
                  alt="Bedroom"
                />
                <div className="pt-2">
                  <h3 className="text-base font-medium">Bedroom</h3>
                  <p className="text-sm text-gray-500">
                    {lodge.bedType || "1 double bed"}
                  </p>
                </div>
              </div>

              {/* Amenities List */}
              <div className="space-y-4 border-b pb-6">
                <h2 className="text-xl font-semibold">
                  What this place offers
                </h2>
                <ul className="grid sm:grid-cols-2 gap-4 text-sm">
                  {[
                    "Lock on bedroom door",
                    "Waterfront",
                    "Kitchen",
                    "Wifi",
                    "Dedicated workspace",
                    "Free street parking",
                    "TV",
                    "Exterior security cameras on property",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                  {["Carbon monoxide alarm", "Smoke alarm"].map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-400"
                      >
                        <X className="w-4 h-4" />
                        Unavailable: {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="space-y-4 border-b pb-2 mb-4">
                <h1 className="text-1xl ">5 nights in Florianópolis</h1>
                <p className="text-gray-500 text-sm">
                  May 18, 2025 - May 23, 2025
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
          <Card className="flex-2 p-4 w-fit h-fit text-lg shadow-xl sticky top-10 hidden sm:block">
            <CardDescription>Prices include all fees</CardDescription>
            <CardContent>
              <CardHeader>
                {lodge.priceInfo || "$247 for 8 nights for 8 nights"}
              </CardHeader>
              <div className="grid grid-cols-2 gap-1">
                <div className="border border-slate-200 p-2 flex flex-col text-xs rounded-tl-lg">
                  <label>CHECK IN</label>
                  <input />
                </div>
                <div className="border border-slate-200 p-2 flex flex-col text-xs rounded-tr-lg">
                  <label>CHECK OUT</label>
                  <input />
                </div>
                <div className="border border-slate-200 p-2 flex flex-col text-xs rounded-b-lg col-span-2 ">
                  <label>GUESTS</label>
                  <input />
                </div>
              </div>
              <Button className="bg-black mt-4 w-full">
                Check availability
              </Button>
            </CardContent>
          </Card>
        </section>
        <section className="p-6">
          <div className="border-b pb-2 mb-4">
            <h1 className="text-2xl font-bold font-sans">
              {lodge.rating || "4.99"}
            </h1>
            <h2>Guest favorite</h2>
            <p>
              This home is a guest favorite based on ratings, reviews, and
              reliability
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 border-b pb-4 mb-4 gap-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage
                  src={lodge.reviewerImage || "https://github.com/vercel.png"}
                />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1 w-full">
                <div>
                  <h4 className="text-sm font-semibold">
                    {lodge.reviewerName || "Bruno"}
                  </h4>
                  <p className="text-sm">
                    {lodge.reviewerInfo || "3 years on Airbnb"}
                  </p>
                </div>
                <div className="pt-2 text-xs max-w-[90%] lg:max-w-[70%]">
                  <label className="block mb-1">
                    ⭐️⭐️⭐️, · 1 week ago · Stayed a few nights
                  </label>
                  <p className="text-muted-foreground">
                    {lodge.reviewText ||
                      "MORE THAN EXCELLENT! Very cozy and very modern house (the highlight)!! My only problem was not being able to get more rss… many"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 border-b pb-2 mb-4">
            <h1 className="text-1xl ">Where you’ll be</h1>
            <p className="text-gray-500 text-sm">
              {lodge.locationInfo || "Florianópolis, Santa Catarina, Brazil"}
            </p>
          </div>
          <div className="space-y-4 border-b pb-2 mb-4">
            <h1 className="text-1xl ">Meet your host</h1>
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <Card className="w-full h-full max-w-[363px] max-h-[289px] grid grid-cols-3 rounded-2xl shadow-sm drop-shadow-lg p-4 gap-2">
                <div className="col-span-2 flex flex-col items-center justify-center space-y-1 ">
                  <Avatar className="w-28 h-28">
                    <AvatarImage src={lodge.hostImage || ""}></AvatarImage>
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <CardHeader className="p-0 m-0 text-2xl font-semibold">
                    {lodge.hostName || "Nelito"}
                  </CardHeader>
                  <CardDescription>superhost</CardDescription>
                </div>
                <div>
                  <div className="space-y-2 border-b text-xs font-extralight  pb-2 mb-2 ">
                    <h2 className="text-xl font-semibold">
                      {lodge.hostReviews || "102"}
                    </h2>
                    <label>Reviews</label>
                  </div>
                  <div className="space-y-2 border-b text-xs font-extralight pb-2 mb-2  ">
                    <h2 className="text-xl font-semibold">
                      {lodge.hostRating || "4.95"}
                    </h2>
                    <label>Rating</label>
                  </div>
                  <div className="space-y-2  text-xs font-extralight pb-2 mb-2  ">
                    <h2 className="text-xl font-semibold">
                      {lodge.hostYears || "4"}
                    </h2>
                    <label>Years hosting</label>
                  </div>
                </div>
              </Card>
              <div className="space-y-3 text-lg ">
                <div className="space-y-1 text-sm text-gray-600 font-extralight">
                  <h1 className="text-lg text-black">
                    {lodge.hostName || "Nelito"} is a Superhost
                  </h1>
                  <p className="text-sm text-gray-600 font-extralight">
                    Superhosts are experienced, highly rated hosts who are
                    committed to providing great stays for guests.
                  </p>
                </div>
                <div className="space-y-1">
                  <h1 className="text-lg text-black">Co-hosts</h1>
                  <div className="space-y-1 text-sm text-gray-600 font-extralight space-x-2 flex items-center ">
                    <Avatar>
                      <AvatarImage src={lodge.hostImage || ""}></AvatarImage>
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <label className="text-sm">
                      {lodge.hostName || "Nelito"}
                    </label>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600 font-extralight">
                  <h1 className="text-lg text-black">Host details</h1>
                  <p>
                    Response rate: 100% <br />
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
