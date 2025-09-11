"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LodgeForm } from "./LodgeForm";
import { LodgePreview } from "./LodgePreview";
import * as z from "zod";
import { useThemeStore } from "@/lib/store/theme";

export function LodgeFormWithPreview() {
  const { theme } = useThemeStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: {
        address: "",
        coordinates: {
          lat: "",
          lng: "",
        },
      },
      description: "",
      images: [],
      amenities: [],
      bedrooms: 1,
      beds: 1,
      price: 0,
      bathrooms: 1,
      host: {
        name: "",
        avatar: "",
        isSuperhost: false,
        response: 0,
        reviewCount: 0,
        averageRating: 0,
      },
    },
  });

  return (
    <div
      className={` ${
        theme == "dark"
          ? "bg-[#0b0b0b] min-h-screen"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-50"
      }`}
    >
      <div className="max-w-7xl grid grid-cols-1 gap-8 lg:grid-cols-3 mx-auto">
        {" "}
        {/* Form Section */}
        <div className="lg:col-span-2">
          <LodgeForm form={form} theme={theme} />
        </div>
        {/* Preview Section */}
        <div className="hidden lg:block lg:col-span-1">
          {/* On mobile, it stacks below the form */}
          <LodgePreview formData={form.watch()} theme={theme} />
        </div>
      </div>
    </div>
  );
}

// Move your formSchema here if it's not already in a separate file
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  location: z.object({
    address: z.string().min(5, "Address is required"),
    coordinates: z.object({
      lat: z.string().regex(/^-?\d+\.\d+$/, "Invalid latitude format"),
      lng: z.string().regex(/^-?\d+\.\d+$/, "Invalid longitude format"),
    }),
  }),
  bedrooms: z.number().min(1, "At least 1 bedroom required"),
  beds: z.number().min(1, "At least 1 bed required"),
  bathrooms: z.number().min(1, "At least 1 bathroom required"),
  amenities: z.array(z.string()).min(1, "Select at least 1 amenity"),
  host: z.object({
    name: z.string(),
    avatar: z.string(),
    isSuperhost: z.boolean(),
    response: z.number().min(0),
    reviewCount: z.number().min(0),
    averageRating: z.number().min(0),
  }),
  images: z
    .array(
      z.object({
        url: z.string(),
        publicId: z.string().optional(),
      })
    )
    .min(1, "At least 1 image required"),
});
