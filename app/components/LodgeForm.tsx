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
  Car,
  ClipboardList,
  DollarSign,
  DoorOpen,
  Globe,
  HomeIcon,
  Map,
  MapPin,
  Monitor,
  Navigation,
  PenTool,
  Plus,
  ShowerHead,
  Star,
  Trees,
  Tv,
  UploadCloud,
  Utensils,
  WashingMachine,
  Waves,
  Wifi,
  Wind,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "./ImageUpload";
// ... other imports ...
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { hostname } from "os";

interface LodgeFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  theme: string;
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

export function LodgeForm({ form, theme }: LodgeFormProps) {
  const isDark = theme == "dark";
  const router = useRouter();
  const amenitiesConfig = [
    { name: "WiFi", icon: Wifi },
    { name: "Private pool", icon: Waves },
    { name: "Ocean view", icon: Waves },
    { name: "Beach access", icon: Trees },
    { name: "Air conditioning", icon: Wind },
    { name: "Kitchen", icon: Utensils },
    { name: "Free parking", icon: Car },
    { name: "Washing machine", icon: WashingMachine },
    { name: "TV", icon: Tv },
    { name: "Workspace", icon: Monitor },
  ];

  const themeClasses = {
    background: isDark
      ? "bg-[#0b0b0b] min-h-screen"
      : "bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen",
    card: isDark
      ? "bg-white/5 border-white/10 backdrop-blur-sm"
      : "bg-white border-gray-200 shadow-lg",
    text: {
      primary: isDark ? "text-white" : "text-gray-900",
      secondary: isDark ? "text-white/70" : "text-gray-600",
      muted: isDark ? "text-white/50" : "text-gray-400",
    },
    input: isDark
      ? "bg-white/5 border-white/20 text-white placeholder:text-white/40 hover:bg-white/10 focus:bg-white/10 focus:ring-2 focus:ring-rose-400/50 focus:border-rose-400/50"
      : "bg-white border-gray-300 hover:border-gray-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-black",
    button: {
      primary:
        "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200",
      secondary: isDark
        ? "border-white/30 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white"
        : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900",
      ghost: isDark
        ? "text-white/70 hover:text-white hover:bg-white/5"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
    },
    checkbox: isDark
      ? "border-white/30 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
      : "border-gray-300 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500",
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Try to get current user to attach lodge to user if authenticated
      let userId: string | null = null;
      try {
        const meRes = await fetch("/api/auth/me", { cache: "no-store" });
        if (meRes.ok) {
          const me = await meRes.json();
          userId = me?.user?.id ?? null;
        }
      } catch (_) {
        // non-blocking if unauthenticated
      }

      const payload = {
        title: values.title,
        hostname: values.host.name,
        description: values.description,
        price: values.price,
        location: {
          address: values.location.address,
          coordinates: {
            lat: parseFloat(values.location.coordinates.lat).toString(),
            lng: parseFloat(values.location.coordinates.lng).toString(),
          },
        },
        bedrooms: values.bedrooms,
        beds: values.beds,
        bathrooms: values.bathrooms,
        amenities: values.amenities,
        images: values.images.map((img) => img.url),
      } as const;

      const endpoint = userId
        ? `/api/userlodges?userId=${encodeURIComponent(userId)}`
        : "/api/lodges";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let message = "Failed to create lodge";
        try {
          const err = await res.json();
          message = err?.error || err?.message || message;
        } catch {}
        throw new Error(message);
      }

      const data = await res.json();
      const created = data?.Lodge || data; // supports both /api/userlodges and /api/lodges responses

      toast.success("Lodge published successfully");
      // Reset and navigate to the new lodge page in dashboard
      form.reset();
      if (created?._id) {
        router.push(`/lodge/${created._id}`);
      }
    } catch (error: any) {
      console.error("Publish lodge error:", error);
      toast.error(error?.message || "Failed to publish lodge");
    }
  };

  return (
    <div className={`py-8 px-4 ${themeClasses.background}`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            {/* Header */}
            <div className={`mb-4 px-8`}>
              <div className="text-left">
                <h1
                  className={`text-2xl md:text-3xl font-bold tracking-tight ${
                    isDark
                      ? "bg-gradient-to-r from-white via-rose-100 to-pink-100 bg-clip-text text-transparent"
                      : "text-gray-900"
                  }`}
                >
                  Welcome your first guests
                </h1>
                <p
                  className={`text-sm md:text-lg   ${themeClasses.text.secondary}`}
                >
                  Tell us about your place and we'll help students find their
                  perfect home
                </p>
              </div>
            </div>

            {/* Main Form Container */}
            <div className="space-y-8">
              {/* Basic Information Section */}
              <section className={`p-8 rounded-3xl ${themeClasses.card}`}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500/20 to-pink-500/20">
                    <HomeIcon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h2
                      className={`text-2xl font-semibold tracking-tight ${themeClasses.text.primary}`}
                    >
                      Tell us about your place
                    </h2>
                    <p className={`text-sm ${themeClasses.text.secondary}`}>
                      Share the basic details that make your space special
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel
                            className={`text-sm font-medium flex items-center gap-2 ${themeClasses.text.primary}`}
                          >
                            <PenTool className="w-4 h-4" />
                            What's the name of your place?
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Cozy Studio Near Campus"
                              className={`h-12 text-base rounded-xl ${themeClasses.input}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="host.name"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel
                            className={`text-sm font-medium flex items-center gap-2 ${themeClasses.text.primary}`}
                          >
                            <PenTool className="w-4 h-4" />
                            Your name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Sarah"
                              className={`h-12 text-base rounded-xl ${themeClasses.input}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel
                          className={`text-sm font-medium flex items-center gap-2 ${themeClasses.text.primary}`}
                        >
                          <DollarSign className="w-4 h-4" />
                          Price per month
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span
                              className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-lg font-medium ${themeClasses.text.secondary}`}
                            >
                              $
                            </span>
                            <Input
                              type="number"
                              placeholder="650"
                              className={`h-12 text-base pl-8 rounded-xl ${themeClasses.input}`}
                              {...field}
                              value={field.value || ""}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-rose-500 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel
                          className={`text-sm font-medium flex items-center gap-2 ${themeClasses.text.primary}`}
                        >
                          <AlignLeft className="w-4 h-4" />
                          Describe your place
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Create a warm and inviting description. Mention what makes your place special, nearby universities, public transport, and why students will love staying here..."
                            rows={5}
                            className={`text-base rounded-xl resize-none ${themeClasses.input}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-rose-500 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* Location */}
              <section className={`p-8 rounded-3xl ${themeClasses.card}`}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500/20 to-cyan-500/20">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h2
                      className={`text-2xl font-semibold tracking-tight ${themeClasses.text.primary}`}
                    >
                      Where's your place located?
                    </h2>
                    <p className={`text-sm ${themeClasses.text.secondary}`}>
                      Help students find you easily
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="location.address"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel
                          className={`text-sm font-medium flex items-center gap-2 ${themeClasses.text.primary}`}
                        >
                          <Navigation className="w-4 h-4" />
                          Street address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 University Avenue, College Town"
                            className={`h-12 text-base rounded-xl ${themeClasses.input}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-rose-500 text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="location.coordinates.lat"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel
                            className={`text-sm font-medium flex items-center gap-2 ${themeClasses.text.primary}`}
                          >
                            <Globe className="w-4 h-4" />
                            Latitude
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="34.0522"
                              className={`h-12 text-base rounded-xl ${themeClasses.input}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location.coordinates.lng"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel
                            className={`text-sm font-medium flex items-center gap-2 ${themeClasses.text.primary}`}
                          >
                            <Globe className="w-4 h-4" />
                            Longitude
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="-118.2437"
                              className={`h-12 text-base rounded-xl ${themeClasses.input}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Map Preview */}
                  <div
                    className={`mt-6 rounded-2xl overflow-hidden h-64 relative border ${
                      isDark ? "border-white/10" : "border-gray-200"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 flex items-center justify-center ${
                        isDark
                          ? "bg-gradient-to-br from-orange-500/10 via-cyan-500/5 to-teal-500/10"
                          : "bg-gradient-to-br from-orange-50 via-cyan-50 to-teal-50"
                      }`}
                    >
                      <div
                        className={`text-center p-8 rounded-2xl ${
                          isDark ? "bg-black/20" : "bg-white/80"
                        }`}
                      >
                        <Map
                          className={`w-12 h-12 mx-auto mb-4 ${themeClasses.text.secondary}`}
                        />
                        <p className={`text-sm ${themeClasses.text.secondary}`}>
                          Interactive map will show your location
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Room Details */}
              <section className={`p-8 rounded-3xl ${themeClasses.card}`}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500/20 to-indigo-500/20">
                    <Bed className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h2
                      className={`text-2xl font-semibold tracking-tight ${themeClasses.text.primary}`}
                    >
                      Share some basics about your place
                    </h2>
                    <p className={`text-sm ${themeClasses.text.secondary}`}>
                      You'll add more details later, like bed types
                    </p>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel
                          className={`text-base font-medium flex items-center gap-3 ${themeClasses.text.primary}`}
                        >
                          <DoorOpen className="w-5 h-5 " />
                          Bedrooms
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={`h-14 text-base rounded-xl ${themeClasses.input}`}
                            >
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            className={`rounded-xl ${
                              isDark
                                ? "bg-gray-800 border-white/20"
                                : "bg-white border-gray-200 text-black"
                            }`}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <SelectItem
                                key={num}
                                value={num.toString()}
                                className={`text-base ${
                                  isDark
                                    ? "hover:bg-white/10 focus:bg-white/10"
                                    : "hover:bg-gray-100 focus:bg-gray-100"
                                }`}
                              >
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-rose-500 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="beds"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel
                          className={`text-base font-medium flex items-center gap-3 ${themeClasses.text.primary}`}
                        >
                          <BedSingle className="w-5 h-5" />
                          Beds
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={`h-14 text-base rounded-xl ${themeClasses.input}`}
                            >
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            className={`rounded-xl ${
                              isDark
                                ? "bg-gray-800 border-white/20"
                                : "bg-white border-gray-200 text-black"
                            }`}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <SelectItem
                                key={num}
                                value={num.toString()}
                                className={`text-base ${
                                  isDark
                                    ? "hover:bg-white/10 focus:bg-white/10"
                                    : "hover:bg-gray-100 focus:bg-gray-100"
                                }`}
                              >
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-rose-500 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel
                          className={`text-base font-medium flex items-center gap-3 ${themeClasses.text.primary}`}
                        >
                          <ShowerHead className="w-5 h-5" />
                          Bathrooms
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={`h-14 text-base rounded-xl ${themeClasses.input}`}
                            >
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            className={`rounded-xl ${
                              isDark
                                ? "bg-gray-800 border-white/20"
                                : "bg-white border-gray-200 text-black "
                            }`}
                          >
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <SelectItem
                                key={num}
                                value={num.toString()}
                                className={`text-base ${
                                  isDark
                                    ? "hover:bg-white/10 focus:bg-white/10"
                                    : "hover:bg-gray-100 focus:bg-gray-100"
                                }`}
                              >
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-rose-500 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* Amenities */}
              <section className={`p-8 rounded-3xl ${themeClasses.card}`}>
                <div className="flex items-center gap-4 mb-8">
                  <div>
                    <h2
                      className={`text-2xl font-semibold tracking-tight ${themeClasses.text.primary}`}
                    >
                      Tell students what your place has to offer
                    </h2>
                    <p className={`text-sm ${themeClasses.text.secondary}`}>
                      You can add more amenities after you publish your listing
                    </p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="amenities"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {amenitiesConfig.map((amenity) => {
                          const IconComponent = amenity.icon;
                          return (
                            <FormField
                              key={amenity.name}
                              control={form.control}
                              name="amenities"
                              render={({ field }) => (
                                <FormItem key={amenity.name}>
                                  <FormControl>
                                    <label
                                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                                        field.value?.includes(amenity.name)
                                          ? isDark
                                            ? "border-orange-500 bg-orange-500/10"
                                            : "border-orange-500 bg-orange-50"
                                          : isDark
                                          ? "border-white/20 hover:border-white/40"
                                          : "border-gray-200 hover:border-gray-300"
                                      }`}
                                    >
                                      <Checkbox
                                        checked={field.value?.includes(
                                          amenity.name
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                amenity.name,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== amenity.name
                                                )
                                              );
                                        }}
                                        className={`hidden ${themeClasses.checkbox}`}
                                      />
                                      <IconComponent
                                        className={`w-6 h-6 ${
                                          field.value?.includes(amenity.name)
                                            ? "text-rose-500"
                                            : themeClasses.text.secondary
                                        }`}
                                      />
                                      <span
                                        className={`text-base font-medium ${
                                          field.value?.includes(amenity.name)
                                            ? isDark
                                              ? "text-white"
                                              : "text-gray-900"
                                            : themeClasses.text.primary
                                        }`}
                                      >
                                        {amenity.name}
                                      </span>
                                    </label>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          );
                        })}
                      </div>
                      <FormMessage className="text-rose-500 text-sm mt-4" />
                    </FormItem>
                  )}
                />
              </section>

              {/* Photos */}
              <section className={`p-8 rounded-3xl ${themeClasses.card}`}>
                <div className="flex items-center gap-4 mb-8">
                  <div>
                    <h2
                      className={`text-2xl font-semibold tracking-tight ${themeClasses.text.primary}`}
                    >
                      Add some photos of your place
                    </h2>
                    <p className={`text-sm ${themeClasses.text.secondary}`}>
                      You'll need at least one photo to get started. You can add
                      more or make changes later.
                    </p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem
                      className={`rounded-xl ${
                        isDark
                          ? " border-white/20"
                          : "bg-gradient-to-r from-orange-500/60 to-red-500/20 p-2 text-black "
                      }`}
                    >
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage className="text-rose-500 text-sm" />
                    </FormItem>
                  )}
                />
              </section>

              {/* Action Buttons */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
                <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
                  <Button
                    variant="ghost"
                    type="button"
                    className={`text-gray-700/80 hover:text-white hover:bg-white/10 transition-colors`}
                  >
                    <ArrowBigLeftIcon className="w-5 h-5 mr-2" />
                    Cancel
                  </Button>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      className="text-gray-500 border-white/30 bg-transparent hover:bg-white/10 hover:border-white/50"
                    >
                      Save Draft
                    </Button>
                    <Button
                      type="submit"
                      className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:scale-[1.02] transition-transform hover:shadow-lg"
                    >
                      <span className="relative z-10">Publish Lodge</span>
                      <span className="absolute inset-0  transition-opacity"></span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
