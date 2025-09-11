"use client";
import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useThemeStore } from "@/lib/store/theme";

export default function TestimonialsPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { theme } = useThemeStore();

  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "Perfection! I used Ocean Explorer Logistics for a shipment from our warehouse to a customer across the country, and I couldn't be happier. Their support team was incredibly helpful from the start.",
      author: "Alcheri Banani",
      company: "Markert, Bizzbreak Inc",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 2,
      rating: 5,
      text: "Outstanding service from start to finish! The team handled our international shipment with professionalism. Every step was transparent and they kept us informed throughout.",
      author: "Sarah Johnson",
      company: "Global Trade Solutions",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 3,
      rating: 5,
      text: "I've worked with many logistics companies, but none match the reliability of Ocean Explorer. They always deliver and go above expectations.",
      author: "Michael Chen",
      company: "Pacific Import Co.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const current = testimonials[currentTestimonial];

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-neutral-950 text-neutral-100"
          : "bg-white text-neutral-900"
      }`}
    >
      <div className="max-w-7xl mx-auto  py-6 sm:py-10 md:py-16 relative">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4  bg-orange-500 text-white ">
            TESTIMONIALS
          </div>

          <div className="md:flex justify-center items-center">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 md:mb-3">
              What our clients say
            </h1>
            <div className="text-xl sm:text-3xl md:text-4xl text-[#FF385C] font-serif leading-none px-2 sm:px-4">
              "
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center">
          {/* Left Image */}
          <div className="lg:col-span-3">
            <div className="relative">
              <img
                src={current.image}
                alt={current.author}
                className="w-full max-w-sm mx-auto lg:mx-0 aspect-square object-cover rounded-2xl shadow-xl"
              />
              <div
                className={`absolute -bottom-3 -left-3 w-20 h-20 rounded-xl flex items-center justify-center text-xs font-medium ${
                  theme === "dark"
                    ? "bg-neutral-800 text-neutral-400"
                    : "bg-neutral-200 text-neutral-600"
                }`}
              >
                690x690
              </div>
            </div>
          </div>

          {/* Center Testimonial */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start space-x-1 mb-3 sm:mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FF385C] text-[#FF385C]"
                />
              ))}
            </div>

            <blockquote
              className={`text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 ${
                theme === "dark" ? "text-neutral-300" : "text-neutral-700"
              }`}
            >
              {current.text}
            </blockquote>

            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-1">
                {current.author}
              </h3>
              <p
                className={`text-xs sm:text-sm ${
                  theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                {current.company}
              </p>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center lg:justify-start space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial
                      ? "bg-[#FF385C]"
                      : theme === "dark"
                      ? "bg-neutral-700 hover:bg-neutral-600"
                      : "bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Badge */}
          <div className="lg:col-span-3 mt-4 lg:mt-0">
            <div
              className={`p-4 sm:p-6 rounded-xl text-center mx-auto shadow-md max-w-sm ${
                theme === "dark"
                  ? "bg-neutral-900 border border-neutral-800 text-white"
                  : "bg-neutral-100 border border-neutral-200 text-neutral-900"
              }`}
            >
              <div className="mb-3">
                <p
                  className={`text-xs sm:text-sm font-medium mb-1 ${
                    theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  REVIEWED ON
                </p>
                <h2 className="text-xl sm:text-2xl font-bold">Clutch</h2>
              </div>

              <div className="mb-3">
                <p
                  className={`text-xs sm:text-sm mb-2 ${
                    theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  Avg. Rating Based on 10k+ Company Reviews
                </p>
                <div className="flex justify-center items-center space-x-1 sm:space-x-2 mb-1">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FF385C] text-[#FF385C]"
                    />
                  ))}
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FF385C]/50 text-[#FF385C]" />
                </div>
                <p
                  className={`text-xs sm:text-sm ${
                    theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  (4.8 Out Of 5)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center lg:justify-between mt-4 sm:mt-6 space-x-2 lg:space-x-0">
          <button
            onClick={prevTestimonial}
            className={`shadow-md rounded-full p-2 sm:p-3 hover:shadow-lg transition-all duration-200 ${
              theme === "dark"
                ? "bg-neutral-900 border border-neutral-700 text-neutral-300"
                : "bg-white border border-neutral-300 text-neutral-600"
            }`}
          >
            <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className={`shadow-md rounded-full p-2 sm:p-3 hover:shadow-lg transition-all duration-200 ${
              theme === "dark"
                ? "bg-neutral-900 border border-neutral-700 text-neutral-300"
                : "bg-white border border-neutral-300 text-neutral-600"
            }`}
          >
            <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
