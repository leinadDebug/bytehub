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
      description: "",
      price: 0,
      location: {
        address: "",
        coordinates: {
          lat: "",
          lng: "",
        },
      },
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      amenities: [],
      images: [],
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
  images: z.array(z.string()).min(1, "At least 1 image required"),
});
