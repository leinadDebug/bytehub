// app/components/LodgeForm.tsx
"use client";

import { UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlignLeft,
  ArrowBigLeftIcon,
  Bed,
  BedSingle,
  Camera,
  ClipboardList,
  DollarSign,
  DoorOpen,
  Globe,
  HomeIcon,
  Map,
  MapPin,
  Navigation,
  PenTool,
  Plus,
  ShowerHead,
  Star,
  UploadCloud,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
// ... other imports ...

interface LodgeFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

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

export function LodgeForm({ form }: LodgeFormProps) {
  const amenitiesOptions = [
    "WiFi",
    "Private pool",
    "Ocean view",
    "Beach access",
    "Air conditioning",
    "Kitchen",
    "Free parking",
    "Washing machine",
    "TV",
    "Workspace",
  ];

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-w-5xl mx-auto p-4">
          {/* Floating Header */}
          <div className=" top-4 z-10 mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-500/20">
                <HomeIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                  List Your Student Lodge
                </h1>
                <p className="text-sm text-white/70 mt-1">
                  Fill in the details below to connect with students looking for
                  housing
                </p>
              </div>
            </div>
          </div>

          {/* Main Form Container */}
          <div className="space-y-8">
            {/* Progress Indicator */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
              <div className="flex justify-between mb-2 text-sm text-white/80">
                <span>0%</span>
                <span>100%</span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500"
                  style={{ width: "25%" }}
                />
              </div>
              <p className="mt-2 text-xs text-center text-white/60">
                Section 1 of 4 - Basic Information
              </p>
            </div>

            {/* Basic Information Section */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <ClipboardList className="w-5 h-5 text-blue-300" />
                </div>
                <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                  Basic Information
                </h2>
              </div>

              <div className="grid gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-white/80 flex items-center gap-2">
                          <PenTool className="w-4 h-4" />
                          Lodge Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Luxury Beachfront Lodge"
                            className="bg-white/5 border-white/10 hover:bg-white/10 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400/90" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-white/80 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Price per month ($)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                              $
                            </span>
                            <Input
                              type="number"
                              placeholder="e.g., 350"
                              className="bg-white/5 border-white/10 pl-8 hover:bg-white/10 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/50"
                              {...field}
                              value={field.value || "--"}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400/90" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-white/80 flex items-center gap-2">
                        <AlignLeft className="w-4 h-4" />
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your lodge... Mention nearby universities, transportation, and what makes your place special for students"
                          rows={4}
                          className="bg-white/5 border-white/10 hover:bg-white/10 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400/90" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Location Section */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <MapPin className="w-5 h-5 text-purple-300" />
                </div>
                <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
                  Location Details
                </h2>
              </div>

              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="location.address"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-white/80 flex items-center gap-2">
                        <Navigation className="w-4 h-4" />
                        Full Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 123 University Ave, College Town, CA 90210"
                          className="bg-white/5 border-white/10 hover:bg-white/10 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400/90" />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="location.coordinates.lat"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-white/80 flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Latitude
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 34.0381"
                            className="bg-white/5 border-white/10 hover:bg-white/10 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400/90" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location.coordinates.lng"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-white/80 flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Longitude
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 118.6923"
                            className="bg-white/5 border-white/10 hover:bg-white/10 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400/90" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Interactive Map Placeholder */}
                <div className="mt-4 rounded-xl overflow-hidden border border-white/10 h-48 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                    <div className="text-center p-6 rounded-lg bg-black/20">
                      <Map className="w-8 h-8 mx-auto mb-2 text-white/60" />
                      <p className="text-sm text-white/60">
                        Interactive map preview will appear here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Details Section */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <Bed className="w-5 h-5 text-amber-300" />
                </div>
                <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-100">
                  Room Configuration
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-white/80 flex items-center gap-2">
                        <DoorOpen className="w-4 h-4" />
                        Bedrooms
                      </FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 hover:bg-white/10">
                            <SelectValue placeholder="Select bedrooms" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800/95 border border-white/10">
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <SelectItem
                              key={num}
                              value={num.toString()}
                              className="hover:bg-white/10 focus:bg-white/10"
                            >
                              {num} {num === 1 ? "bedroom" : "bedrooms"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400/90" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="beds"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-white/80 flex items-center gap-2">
                        <BedSingle className="w-4 h-4" />
                        Beds
                      </FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 hover:bg-white/10">
                            <SelectValue placeholder="Select beds" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800/95 border border-white/10">
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <SelectItem
                              key={num}
                              value={num.toString()}
                              className="hover:bg-white/10 focus:bg-white/10"
                            >
                              {num} {num === 1 ? "bed" : "beds"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400/90" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-white/80 flex items-center gap-2">
                        <ShowerHead className="w-4 h-4" />
                        Bathrooms
                      </FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 hover:bg-white/10">
                            <SelectValue placeholder="Select bathrooms" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800/95 border border-white/10">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem
                              key={num}
                              value={num.toString()}
                              className="hover:bg-white/10 focus:bg-white/10"
                            >
                              {num} {num === 1 ? "bathroom" : "bathrooms"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400/90" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Amenities Section */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <Star className="w-5 h-5 text-emerald-300" />
                </div>
                <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-100">
                  Amenities & Features
                </h2>
              </div>

              <p className="text-sm text-white/70 mb-6">
                Select all amenities available at your lodge. Students love
                places with great features!
              </p>

              <FormField
                control={form.control}
                name="amenities"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {amenitiesOptions.map((amenity) => (
                        <FormField
                          key={amenity}
                          control={form.control}
                          name="amenities"
                          render={({ field }) => (
                            <FormItem
                              key={amenity}
                              className="flex items-center space-x-3"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(amenity)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          amenity,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== amenity
                                          )
                                        );
                                  }}
                                  className="border-white/20 data-[state=checked]:bg-blue-500/90 data-[state=checked]:border-blue-500"
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal text-white/80 hover:text-white transition-colors cursor-pointer">
                                {amenity}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage className="text-red-400/90" />
                  </FormItem>
                )}
              />
            </div>

            {/* Images Upload Section */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-pink-500/20">
                  <Camera className="w-5 h-5 text-pink-300" />
                </div>
                <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100">
                  Lodge Photos
                </h2>
              </div>

              <p className="text-sm text-white/70 mb-6">
                Upload high-quality photos of your lodge (minimum 3). First
                image will be featured.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="group aspect-square rounded-xl overflow-hidden relative border-2 border-dashed border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 flex flex-col items-center justify-center p-4 text-center">
                      <Plus className="w-8 h-8 mx-auto mb-2 text-white/50 group-hover:text-white/70 transition-colors" />
                      <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                        Add photo {i + 1}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/40 rounded-full p-2">
                        <UploadCloud className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-white/50">
                Tip: Include bedroom, kitchen, bathroom, exterior, and common
                areas
              </p>
            </div>

            {/* Action Buttons */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
              <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
                <Button
                  variant="ghost"
                  type="button"
                  className="text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ArrowBigLeftIcon className="w-5 h-5 mr-2" />
                  Cancel
                </Button>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="border-white/30 bg-transparent hover:bg-white/10 hover:border-white/50"
                  >
                    Save Draft
                  </Button>
                  <Button
                    type="submit"
                    className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-[1.02] transition-transform hover:shadow-lg"
                  >
                    <span className="relative z-10">Publish Lodge</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 hover:opacity-100 transition-opacity"></span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
