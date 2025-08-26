"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LodgeForm } from "./LodgeForm";
import { LodgePreview } from "./LodgePreview";
import * as z from "zod";

export function LodgeFormWithPreview() {
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section - 2/3 width on large screens */}
      <div className="lg:col-span-2">
        <LodgeForm form={form} />
      </div>

      {/* Preview Section - 1/3 width on large screens, hidden on mobile */}
      <div className="hidden lg:block mb-4">
        <LodgePreview formData={form.watch()} />
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
