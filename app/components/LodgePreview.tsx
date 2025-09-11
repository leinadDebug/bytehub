import { Badge } from "@/components/ui/badge";
import { Eye, MapPin } from "lucide-react";
import Image from "next/image";

interface LodgePreviewProps {
  theme: string;
  formData: {
    title?: string;
    price?: number;
    description?: string;
    bedrooms?: number;
    beds?: number;
    bathrooms?: number;
    amenities?: string[];
    location?: {
      address?: string;
    };
    images?: Array<{ url: string }>;
  };
}

export const LodgePreview = ({ formData, theme }: LodgePreviewProps) => {
  const isDark = theme === "dark";
  const themeClasses = (isDark: boolean) => ({
    card: isDark
      ? "bg-white/5 border-white/10 "
      : "bg-white border-gray-200 shadow-lg",
    text: {
      primary: isDark ? "text-white" : "text-gray-900",
      secondary: isDark ? "text-gray-400" : "text-gray-600",
      muted: isDark ? "text-gray-500" : "text-gray-400",
    },
    badge: isDark
      ? "border-white/20 text-white"
      : "border-gray-300 text-gray-700",
  });
  const t = themeClasses(isDark);

  return (
    <div
      className={`my-8 p-6 rounded-2xl sticky top-16 space-y-4 ${t.card} transition-colors`}
    >
      <h3 className={`text-2xl  font-bold tracking-tight ${t.text.primary}`}>
        Lodge Preview
      </h3>

      <div className="space-y-6">
        {/* Main Image */}
        {formData.images?.[0]?.url ? (
          <div className="aspect-video relative rounded-xl overflow-hidden">
            <Image
              src={formData.images[0].url}
              alt={formData.title || "Lodge preview"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
            {formData.title ? (
              <span className={`text-lg ${t.text.secondary}`}>
                {formData.title}
              </span>
            ) : (
              <span className={`text-sm ${t.text.muted}`}>
                Images will appear here
              </span>
            )}
          </div>
        )}

        {/* Basic Info */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h4 className={`font-medium text-lg ${t.text.primary}`}>
              {formData.title || "Your lodge title"}
            </h4>
            {formData.price && (
              <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ${formData.price}/mo
              </span>
            )}
          </div>

          {formData.location?.address && (
            <p
              className={`text-sm flex items-center gap-1 ${t.text.secondary}`}
            >
              <MapPin className="w-4 h-4" />
              {formData.location.address}
            </p>
          )}
        </div>

        {/* Room Details */}
        {(formData.bedrooms || formData.beds || formData.bathrooms) && (
          <div className="flex gap-4">
            {formData.bedrooms && (
              <Badge variant="outline" className={`${t.badge}`}>
                {formData.bedrooms}{" "}
                {formData.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
              </Badge>
            )}
            {formData.beds && (
              <Badge variant="outline" className={`${t.badge}`}>
                {formData.beds} {formData.beds === 1 ? "Bed" : "Beds"}
              </Badge>
            )}
            {formData.bathrooms && (
              <Badge variant="outline" className={`${t.badge}`}>
                {formData.bathrooms}{" "}
                {formData.bathrooms === 1 ? "Bath" : "Baths"}
              </Badge>
            )}
          </div>
        )}

        {/* Description */}
        {formData.description ? (
          <p className={`text-sm line-clamp-3 ${t.text.secondary}`}>
            {formData.description}
          </p>
        ) : (
          <p className={`text-sm italic ${t.text.muted}`}>
            Description will appear here
          </p>
        )}

        {/* Amenities */}
        {formData.amenities && formData.amenities.length > 0 && (
          <div className="space-y-2">
            <h5 className={`text-sm font-medium ${t.text.primary}`}>
              Amenities
            </h5>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.slice(0, 5).map((amenity) => (
                <Badge
                  key={amenity}
                  variant="outline"
                  className={`${t.badge} text-xs`}
                >
                  {amenity}
                </Badge>
              ))}
              {formData.amenities.length > 5 && (
                <Badge variant="outline" className={`${t.badge} text-xs`}>
                  +{formData.amenities.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Thumbnail Images */}
        {formData.images && formData.images.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-2">
            {formData.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="aspect-square relative rounded-lg overflow-hidden"
              >
                <Image
                  src={image.url}
                  alt={`Preview image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
