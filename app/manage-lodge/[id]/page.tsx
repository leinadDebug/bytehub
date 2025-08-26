"use client";
import {
  Edit,
  Trash2,
  CalendarCheck,
  Home,
  Star,
  Check,
  Bed,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageCarousel from "./carousel/imageCarousel";
import { useThemeStore } from "@/lib/store/theme";

interface Lodge {
  title: string;
  user: string;
  price: number;
  description: string;
  host: {
    hostName: string;
    superHost: boolean;
    responseRate: number;
    reviews: number;
    rating: number;
  };
  room: {
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  coverImage: string;
  roomImage: string;
  otherImages: string[];
  amenities: string[];
  complaints: {
    message: string;
    user: string;
    date: string; // ISO string
    status: "pending" | "resolved";
  }[];
}

export default function EditLodge() {
  const lodge: Lodge = {
    title: "Cozy Apartment in Lagos",
    user: "680faaf3b867a36cca27dbe6",
    price: 35000,
    description:
      "A modern 2-bedroom apartment located in the heart of Lagos with fast WiFi, 24/7 electricity, and close proximity to major landmarks.",
    host: {
      hostName: "John Doe",
      superHost: true,
      responseRate: 95,
      reviews: 42,
      rating: 4.7,
    },
    room: {
      bedrooms: 4,
      beds: 4,
      bathrooms: 4,
    },
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    roomImage:
      "https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
    otherImages: [
      "https://plus.unsplash.com/premium_photo-1706140675031-1e0548986ad1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
      "https://i.pinimg.com/736x/84/78/ef/8478efedc704ce33bf840a88fe791af0.jpg",
      "https://img.freepik.com/free-photo/3d-rendering-minimalist-interior-with-copy-space_23-2150943527.jpg?semt=ais_hybrid&w=740&q=80",
    ],
    amenities: ["Private", "Ocean view", "Wifi"],
    complaints: [
      {
        message: "The air conditioning was not working properly.",
        user: "Jane Smith",
        date: "2025-08-20",
        status: "resolved",
      },
      {
        message: "WiFi was unstable during my stay.",
        user: "Michael Lee",
        date: "2025-08-22",
        status: "pending",
      },
      {
        message: "WiFi was unstable during my stay.",
        user: "Michael Lee",
        date: "2025-08-22",
        status: "pending",
      },
    ],
  };

  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(lodge.title);
  const [price, setPrice] = useState(lodge.price);
  const [description, setDescription] = useState(lodge.description);
  const { theme, toggleTheme } = useThemeStore();

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#0b0b0b] text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={toggleTheme}
          className={`absolute top-5 right-5 px-4 py-2 text-sm rounded-full border shadow-sm hover:shadow-md transition-all duration-200 ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Lodge Details
            </h2>
            <p
              className={`mt-2 text-sm sm:text-base leading-relaxed ${
                theme === "dark" ? "text-white/70" : "text-gray-600"
              }`}
            >
              Manage your lodge details, availability, and host information with
              ease.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              className={`flex items-center gap-2 rounded-2xl px-4 py-2 shadow-md hover:shadow-lg transition-all duration-200 ${
                theme === "dark"
                  ? "bg-slate-500/80 hover:bg-slate-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              <Edit className="h-4 w-4" />
              Save Changes
            </button>
            <button
              className={`flex items-center gap-2 rounded-2xl px-4 py-2 shadow-md hover:shadow-lg transition-all duration-200 ${
                theme === "dark"
                  ? "bg-red-500/80 hover:bg-red-600 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-2 order-1 lg:order-1 space-y-6">
            {/* Overview */}
            <div
              className={`rounded-2xl shadow-lg p-6 ${
                theme === "dark"
                  ? "bg-gradient-to-b from-white/5 to-white/5 border border-white/10"
                  : "bg-white border border-gray-200 shadow-xl"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={handleBlur}
                      className={`text-2xl font-semibold rounded px-2 py-1 ${
                        theme === "dark"
                          ? "text-white bg-white/10 border border-white/20"
                          : "text-gray-900 bg-gray-50 border border-gray-300"
                      }`}
                    />
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      onBlur={handleBlur}
                      className={`text-lg rounded px-2 py-1 ${
                        theme === "dark"
                          ? "text-white/70 bg-white/10 border border-white/20"
                          : "text-gray-700 bg-gray-50 border border-gray-300"
                      }`}
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => setIsEditing(true)}
                    className="cursor-pointer space-y-1"
                  >
                    <h3
                      className={`text-2xl font-semibold mb-2 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`text-lg ${
                        theme === "dark" ? "text-white/70" : "text-gray-700"
                      }`}
                    >
                      ₦{price.toLocaleString()}{" "}
                      <span className="text-sm">/ night</span>
                    </p>
                    <span
                      className={`text-xs ${
                        theme === "dark" ? "text-white/60" : "text-gray-500"
                      }`}
                    >
                      {`Having ${lodge.room.beds ?? 0} beds, ${
                        lodge.room.bedrooms ?? 0
                      } bedrooms, and ${lodge.room.bathrooms ?? 0} bathrooms`}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Edit
                    className={`w-5 h-5 cursor-pointer hover:opacity-80 ${
                      theme === "dark"
                        ? "text-white/60 hover:text-white"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  />
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg h-fit ${
                      theme === "dark"
                        ? "bg-white/10"
                        : "bg-yellow-50 border border-yellow-200"
                    }`}
                  >
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span
                      className={`text-sm font-medium ${
                        theme === "dark" ? "text-white/80" : "text-gray-700"
                      }`}
                    >
                      {lodge.host.rating} ({lodge.host.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Carousel */}
              <div
                className={`mb-5 rounded-2xl shadow-lg p-1 sm:p-2 ${
                  theme === "dark"
                    ? "bg-gradient-to-b from-transparent to-white/5 border border-white/10"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <ImageCarousel
                  images={[
                    lodge.coverImage,
                    lodge.roomImage,
                    ...lodge.otherImages,
                  ]}
                />
              </div>

              {/* Host Info */}
              <div>
                <p
                  className={`text-sm mb-3 ${
                    theme === "dark" ? "text-white/70" : "text-gray-600"
                  }`}
                >
                  Host
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      theme === "dark"
                        ? "bg-white/10 text-white/70"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    👤
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {lodge.host.hostName}
                    </p>
                    <p
                      className={`text-xs ${
                        theme === "dark" ? "text-white/60" : "text-gray-500"
                      }`}
                    >
                      {lodge.host.superHost ? "🌟 Superhost" : "Regular Host"}
                    </p>
                    <p
                      className={`text-xs flex items-center gap-1 ${
                        theme === "dark" ? "text-white/60" : "text-gray-500"
                      }`}
                    >
                      <Star className="w-3 h-3 text-yellow-500" />
                      {lodge.host.rating} ({lodge.host.reviews} reviews)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div
              className={`rounded-2xl shadow-lg p-6 ${
                theme === "dark"
                  ? "bg-gradient-to-b from-white/10 to-white/5 border border-white/10"
                  : "bg-white border border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                About this lodge
              </h3>
              {isEditing ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={handleBlur}
                  className={`text-sm leading-relaxed w-full rounded p-2 resize-none ${
                    theme === "dark"
                      ? "text-white bg-white/10 border border-white/20"
                      : "text-gray-700 bg-gray-50 border border-gray-300"
                  }`}
                  rows={3}
                />
              ) : (
                <p
                  className={`text-sm leading-relaxed cursor-pointer ${
                    theme === "dark" ? "text-white/70" : "text-gray-700"
                  }`}
                  onClick={() => setIsEditing(true)}
                >
                  {description}
                </p>
              )}
            </div>

            {/* Host Performance */}
            <div
              className={`rounded-2xl shadow-lg p-5 ${
                theme === "dark"
                  ? "bg-gradient-to-b from-white/10 to-white/5 border border-white/10"
                  : "bg-white border border-gray-200"
              }`}
            >
              <h3
                className={`text-base font-semibold mb-3 ${
                  theme === "dark" ? "text-white/80" : "text-gray-900"
                }`}
              >
                Host Performance
              </h3>
              <div
                className={`grid grid-cols-3 ${
                  theme === "dark"
                    ? "divide-x divide-white/10"
                    : "divide-x divide-gray-200"
                }`}
              >
                <div className="flex flex-col items-center px-2">
                  <p className="text-lg font-bold text-orange-500">
                    {lodge.host.rating}
                  </p>
                  <p
                    className={`text-xs ${
                      theme === "dark" ? "text-white/60" : "text-gray-500"
                    }`}
                  >
                    Rating
                  </p>
                </div>
                <div className="flex flex-col items-center px-2">
                  <p className="text-lg font-bold text-green-500">
                    {lodge.host.responseRate}%
                  </p>
                  <p
                    className={`text-xs ${
                      theme === "dark" ? "text-white/60" : "text-gray-500"
                    }`}
                  >
                    Response
                  </p>
                </div>
                <div className="flex flex-col items-center px-2">
                  <p className="text-lg font-bold text-blue-500">
                    {lodge.host.reviews}
                  </p>
                  <p
                    className={`text-xs ${
                      theme === "dark" ? "text-white/60" : "text-gray-500"
                    }`}
                  >
                    Reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Complaints */}
            <div
              className={`rounded-2xl shadow-lg p-6 ${
                theme === "dark"
                  ? "bg-gradient-to-b from-transparent to-white/5 border border-white/10"
                  : "bg-white border border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-6 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Complaints
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pending Complaints */}
                <div>
                  <h4
                    className={`text-sm font-medium mb-3 ${
                      theme === "dark" ? "text-white/80" : "text-gray-700"
                    }`}
                  >
                    Pending
                  </h4>
                  {lodge.complaints.filter((c) => c.status === "pending")
                    .length > 0 ? (
                    <ul className="space-y-3">
                      {lodge.complaints
                        .filter((c) => c.status === "pending")
                        .map((complaint, idx) => (
                          <li
                            key={idx}
                            className={`flex flex-col sm:flex-row sm:items-start justify-between p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow gap-4 ${
                              theme === "dark"
                                ? "bg-orange-500/5 border border-white/10"
                                : "bg-orange-50 border border-orange-200"
                            }`}
                          >
                            {/* Complaint Info */}
                            <div className="flex-1 space-y-2">
                              <p
                                className={`font-medium line-clamp-2 text-sm sm:text-sm ${
                                  theme === "dark"
                                    ? "text-white/90"
                                    : "text-gray-900"
                                }`}
                              >
                                {complaint.message}
                              </p>
                              <div
                                className={`flex flex-col sm:flex-row sm:items-center sm:gap-4 text-xs ${
                                  theme === "dark"
                                    ? "text-white/50"
                                    : "text-gray-500"
                                }`}
                              >
                                <span>👤 {complaint.user}</span>
                                <span>{complaint.date.toString()}</span>
                              </div>
                              <span
                                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                                  complaint.status === "resolved"
                                    ? "bg-green-500/20 text-green-600"
                                    : theme === "dark"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {complaint.status === "resolved"
                                  ? "Resolved"
                                  : "Pending"}
                              </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 sm:flex-col sm:gap-2">
                              {complaint.status !== "resolved" && (
                                <button
                                  className={`flex items-center justify-center w-10 h-10 rounded-lg border transition ${
                                    theme === "dark"
                                      ? "bg-yellow-500/20 border-white/10 text-white/80 hover:bg-yellow-500/40"
                                      : "bg-yellow-100 border-yellow-200 text-yellow-700 hover:bg-yellow-200"
                                  }`}
                                >
                                  <Check className="w-5 h-5" />
                                </button>
                              )}
                              <button
                                className={`flex items-center justify-center w-10 h-10 rounded-lg border transition ${
                                  theme === "dark"
                                    ? "bg-red-500/20 border-white/10 text-white/80 hover:bg-red-500/40"
                                    : "bg-red-100 border-red-200 text-red-700 hover:bg-red-200"
                                }`}
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p
                      className={`text-sm italic ${
                        theme === "dark" ? "text-white/50" : "text-gray-500"
                      }`}
                    >
                      No pending complaints.
                    </p>
                  )}
                </div>

                {/* Resolved Complaints */}
                <div>
                  <h4
                    className={`text-sm font-medium mb-3 ${
                      theme === "dark" ? "text-white/80" : "text-gray-700"
                    }`}
                  >
                    Resolved
                  </h4>
                  {lodge.complaints.filter((c) => c.status === "resolved")
                    .length > 0 ? (
                    <ul className="space-y-3">
                      {lodge.complaints
                        .filter((c) => c.status === "resolved")
                        .map((complaint, idx) => (
                          <li
                            key={idx}
                            className={`p-4 rounded-xl border text-sm transition ${
                              theme === "dark"
                                ? "bg-green-500/5 border-white/10 text-white/80 hover:bg-green-500/10"
                                : "bg-green-50 border-green-200 text-gray-800 hover:bg-green-100"
                            }`}
                          >
                            <p
                              className={`font-medium ${
                                theme === "dark"
                                  ? "text-white/90"
                                  : "text-gray-900"
                              }`}
                            >
                              {complaint.message}
                            </p>
                            <div
                              className={`mt-2 flex items-center justify-between text-xs ${
                                theme === "dark"
                                  ? "text-white/50"
                                  : "text-gray-500"
                              }`}
                            >
                              <span>👤 {complaint.user}</span>
                              <span>{new Date(complaint.date).toString()}</span>
                            </div>
                            <span
                              className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                                theme === "dark"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              Resolved
                            </span>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p
                      className={`text-sm italic ${
                        theme === "dark" ? "text-white/50" : "text-gray-500"
                      }`}
                    >
                      No resolved complaints.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6 order-1 lg:order-2">
            {/* Amenities */}
            <div
              className={`rounded-2xl shadow-md p-6 ${
                theme === "dark"
                  ? "bg-gradient-to-b from-white/10 to-white/5 border border-white/10"
                  : "bg-white border border-gray-200"
              }`}
            >
              <h3
                className={`text-sm sm:text-base font-semibold mb-4 ${
                  theme === "dark" ? "text-white/80" : "text-gray-900"
                }`}
              >
                Amenities
              </h3>
              <ul className="flex flex-wrap gap-3">
                {lodge.amenities && lodge.amenities.length > 0 ? (
                  lodge.amenities.map((amenity, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs sm:text-sm transition ${
                        theme === "dark"
                          ? "bg-white/10 text-white/70 hover:bg-white/20"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      📌 {amenity}
                    </li>
                  ))
                ) : (
                  <p
                    className={`text-xs italic ${
                      theme === "dark" ? "text-white/50" : "text-gray-500"
                    }`}
                  >
                    No amenities listed.
                  </p>
                )}
              </ul>
            </div>

            {/* Availability */}
            <div
              className={`rounded-2xl shadow-md p-6 ${
                theme === "dark"
                  ? "bg-gradient-to-b from-white/10 to-white/5 border border-white/10"
                  : "bg-white border border-gray-200"
              }`}
            >
              <h3
                className={`text-sm sm:text-base font-semibold mb-4 ${
                  theme === "dark" ? "text-white/80" : "text-gray-900"
                }`}
              >
                Availability Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-white/70" : "text-gray-600"
                    }`}
                  >
                    Current Status
                  </span>
                  <span className="text-sm text-green-500 font-medium">
                    Available
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 text-xs bg-green-500 hover:bg-green-600 rounded-lg text-white transition">
                    Keep Available
                  </button>
                  <button className="flex-1 px-3 py-2 text-xs bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white transition">
                    Mark Unavailable
                  </button>
                </div>
              </div>
            </div>

            {/* Management Tools */}
            <div
              className={`rounded-2xl shadow-md p-6 ${
                theme === "dark"
                  ? "bg-gradient-to-b from-white/10 to-white/5 border border-white/10"
                  : "bg-white border border-gray-200"
              }`}
            >
              <h3
                className={`text-sm sm:text-base font-semibold mb-4 ${
                  theme === "dark" ? "text-white/80" : "text-gray-900"
                }`}
              >
                Management Tools
              </h3>
              <div className="space-y-3">
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                    theme === "dark"
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <CalendarCheck className="w-4 h-4 text-orange-500" />
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-white/80" : "text-gray-700"
                    }`}
                  >
                    Manage Calendar
                  </span>
                </button>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                    theme === "dark"
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <Home className="w-4 h-4 text-blue-500" />
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-white/80" : "text-gray-700"
                    }`}
                  >
                    Update Property
                  </span>
                </button>
              </div>
            </div>

            {/* Summary */}
            <div
              className={`rounded-2xl shadow-md p-6 ${
                theme === "dark"
                  ? "bg-gradient-to-b from-white/10 to-white/5 border border-white/10"
                  : "bg-white border border-gray-200"
              }`}
            >
              <h3
                className={`text-sm sm:text-base font-semibold mb-4 ${
                  theme === "dark" ? "text-white/80" : "text-gray-900"
                }`}
              >
                Lodge Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span
                    className={
                      theme === "dark" ? "text-white/60" : "text-gray-600"
                    }
                  >
                    Price per night
                  </span>
                  <span
                    className={`font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    ₦{lodge.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span
                    className={
                      theme === "dark" ? "text-white/60" : "text-gray-600"
                    }
                  >
                    Host status
                  </span>
                  <span className="text-orange-500 font-medium">
                    {lodge.host.superHost ? "Superhost" : "Regular"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span
                    className={
                      theme === "dark" ? "text-white/60" : "text-gray-600"
                    }
                  >
                    Total reviews
                  </span>
                  <span
                    className={`font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {lodge.host.reviews}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
