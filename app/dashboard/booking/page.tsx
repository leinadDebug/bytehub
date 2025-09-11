"use client";
import { useState } from "react";
import { ChevronLeft, Star, Heart, Diamond } from "lucide-react";
import { useThemeStore } from "@/lib/store/theme";

export default function BookingPage() {
  const [paymentOption, setPaymentOption] = useState("full");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const { theme } = useThemeStore();

  return (
    <div
      className={`min-h-screen font-sans ${
        theme === "dark" ? "bg-[#0b0b0b] text-white/80" : "bg-white text-black"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
        {/* Header */}
        <div className="flex items-center mb-8 md:mb-10">
          <button
            className={`mr-4 p-2 rounded-full transition-colors ${
              theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"
            }`}
          >
            <ChevronLeft
              className={`w-6 h-6 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Request to book
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Column - Steps */}
          <div className="space-y-8">
            {/* Step 1: Payment Options */}
            <div
              className={`border rounded-2xl shadow-md hover:shadow-lg transition-all p-6 md:p-8 ${
                theme === "dark"
                  ? "bg-[#1a1a1a] border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2 className="text-lg md:text-xl font-semibold mb-6">
                1. Choose when to pay
              </h2>

              <div className="space-y-4">
                <label
                  className={`flex items-center justify-between p-5 rounded-xl cursor-pointer border transition-all ${
                    paymentOption === "full"
                      ? "border-orange-500 bg-orange-300 bg-opacity-15"
                      : theme === "dark"
                      ? "border-white/10 hover:bg-white/5"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium">Pay $87.61 now</div>
                  <input
                    type="radio"
                    name="payment"
                    value="full"
                    checked={paymentOption === "full"}
                    onChange={(e) => setPaymentOption(e.target.value)}
                    className="w-5 h-5 text-orange-600 focus:ring-2 focus:ring-orange-500"
                  />
                </label>

                <label
                  className={`flex items-center justify-between p-5 rounded-xl cursor-pointer border transition-all ${
                    paymentOption === "partial"
                      ? "border-orange-500 bg-orange-300 bg-opacity-15"
                      : theme === "dark"
                      ? "border-white/10 hover:bg-white/5"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div>
                    <div className="font-medium">Pay part now, part later</div>
                    <p className="text-sm text-gray-600 mt-1">
                      $17.53 now, $70.08 on Nov 5. No extra fees.
                      <button className="text-orange-600 underline ml-1 hover:text-orange-700">
                        More info
                      </button>
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    value="partial"
                    checked={paymentOption === "partial"}
                    onChange={(e) => setPaymentOption(e.target.value)}
                    className="w-5 h-5 text-orange-600 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
                Done
              </button>
            </div>

            {/* Step 2: Payment Method */}
            <div
              className={`border rounded-2xl shadow-md hover:shadow-lg transition-all p-6 md:p-8 ${
                theme === "dark"
                  ? "bg-[#1a1a1a] border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                2. Add a payment method
              </h2>

              <button
                onClick={() => setShowPaymentForm(!showPaymentForm)}
                className={`w-full text-left p-4 rounded-xl transition-colors border ${
                  theme === "dark"
                    ? "border-white/10 hover:border-white/20"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }
                >
                  {showPaymentForm
                    ? "Hide payment form"
                    : "Click to add payment method"}
                </div>
              </button>

              {showPaymentForm && (
                <div
                  className={`mt-4 p-4 rounded-xl ${
                    theme === "dark" ? "bg-[#0f0f0f]" : "bg-gray-50"
                  }`}
                >
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card number"
                      className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent border ${
                        theme === "dark"
                          ? "bg-[#0b0b0b] border-white/10 text-white placeholder-gray-500"
                          : "bg-white border-gray-200 text-black placeholder-gray-400"
                      }`}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className={`p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent border ${
                          theme === "dark"
                            ? "bg-[#0b0b0b] border-white/10 text-white placeholder-gray-500"
                            : "bg-white border-gray-200 text-black placeholder-gray-400"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className={`p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent border ${
                          theme === "dark"
                            ? "bg-[#0b0b0b] border-white/10 text-white placeholder-gray-500"
                            : "bg-white border-gray-200 text-black placeholder-gray-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Message to Host */}
            <div
              className={`border rounded-2xl shadow-md hover:shadow-lg transition-all p-6 md:p-8 ${
                theme === "dark"
                  ? "bg-[#1a1a1a] border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                3. Write a message to the host
              </h2>

              <button
                onClick={() => setShowMessageForm(!showMessageForm)}
                className={`w-full text-left p-4 rounded-xl transition-colors border ${
                  theme === "dark"
                    ? "border-white/10 hover:border-white/20"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }
                >
                  {showMessageForm
                    ? "Hide message form"
                    : "Click to write a message (optional)"}
                </div>
              </button>

              {showMessageForm && (
                <textarea
                  className={`w-full mt-4 p-4 rounded-lg h-32 resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border ${
                    theme === "dark"
                      ? "bg-[#0b0b0b] border-white/10 text-white placeholder-gray-500"
                      : "bg-white border-gray-200 text-black placeholder-gray-400"
                  }`}
                  placeholder="Tell the host a bit about yourself and why you're traveling..."
                />
              )}
            </div>

            {/* Step 4: Review Request */}
            <div
              className={`border rounded-2xl shadow-md hover:shadow-lg transition-all p-6 md:p-8 ${
                theme === "dark"
                  ? "bg-[#1a1a1a] border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2 className="text-lg md:text-xl font-semibold">
                4. Review your request
              </h2>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:sticky lg:top-10">
            <div
              className={`border rounded-2xl shadow-md hover:shadow-lg transition-all p-6 md:p-8 ${
                theme === "dark"
                  ? "bg-[#1a1a1a] border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Property Card */}
              <div className="flex gap-4 mb-6">
                <div className="w-28 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      Property
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Viv's Palace</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Star className="w-4 h-4 text-orange-600 fill-current" />
                    <span>4.91 (497)</span>
                    <span className="ml-2 flex items-center gap-1 text-orange-600 font-medium">
                      <Heart className="w-4 h-4" /> Guest favourite
                    </span>
                  </div>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div
                className={`mb-6 pb-6 border-b ${
                  theme === "dark" ? "border-white/10" : "border-gray-200"
                }`}
              >
                <h4 className="font-semibold mb-1">Free cancellation</h4>
                <p className="text-sm text-gray-600">
                  Cancel before Nov 13 for a full refund.
                  <button className="text-orange-600 underline ml-1 hover:text-orange-700">
                    Full policy
                  </button>
                </p>
              </div>

              {/* Booking Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Dates</h4>
                    <p className="text-sm text-gray-600">Nov 14 – 16, 2025</p>
                  </div>
                  <button className="text-orange-600 underline text-sm font-medium hover:text-orange-700">
                    Change
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Guests</h4>
                    <p className="text-sm text-gray-600">1 adult</p>
                  </div>
                  <button className="text-orange-600 underline text-sm font-medium hover:text-orange-700">
                    Change
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div
                className={`border-t pt-6 mb-6 ${
                  theme === "dark" ? "border-white/10" : "border-gray-200"
                }`}
              >
                <h4 className="font-semibold mb-4">Price details</h4>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">2 nights x $43.81</span>
                  <span>$87.61</span>
                </div>

                <div
                  className={`flex justify-between items-center font-semibold text-lg border-t pt-4 ${
                    theme === "dark" ? "border-white/10" : "border-gray-200"
                  }`}
                >
                  <span>Total USD</span>
                  <span>$87.61</span>
                </div>

                <button className="text-orange-600 underline text-sm mt-2 hover:text-orange-700">
                  Price breakdown
                </button>
              </div>

              {/* Rare Find Badge */}
              <div
                className={`rounded-xl p-4 flex items-start gap-3 border ${
                  theme === "dark"
                    ? "bg-[#c5c2c2] border-white/10"
                    : "bg-orange-50 border-orange-200"
                }`}
              >
                <Diamond className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-orange-900 mb-1">
                    This is a rare find.
                  </h4>
                  <p className="text-sm text-orange-800">
                    Vivien's place is usually booked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
