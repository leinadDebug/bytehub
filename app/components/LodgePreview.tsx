import { Badge } from "@/components/ui/badge";
import { Eye, MapPin } from "lucide-react";
import Image from "next/image";

interface LodgePreviewProps {
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

export const LodgePreview = ({ formData }: LodgePreviewProps) => {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg sticky top-20">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Eye className="w-5 h-5" />
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
              <span className="text-lg text-white/70">{formData.title}</span>
            ) : (
              <span className="text-sm text-white/50">
                Images will appear here
              </span>
            )}
          </div>
        )}

        {/* Basic Info */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-lg">
              {formData.title || "Your lodge title"}
            </h4>
            {formData.price && (
              <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ${formData.price}/mo
              </span>
            )}
          </div>

          {formData.location?.address && (
            <p className="text-sm text-white/70 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {formData.location.address}
            </p>
          )}
        </div>

        {/* Room Details */}
        {(formData.bedrooms || formData.beds || formData.bathrooms) && (
          <div className="flex gap-4">
            {formData.bedrooms && (
              <Badge variant="outline" className="border-white/20">
                {formData.bedrooms}{" "}
                {formData.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
              </Badge>
            )}
            {formData.beds && (
              <Badge variant="outline" className="border-white/20">
                {formData.beds} {formData.beds === 1 ? "Bed" : "Beds"}
              </Badge>
            )}
            {formData.bathrooms && (
              <Badge variant="outline" className="border-white/20">
                {formData.bathrooms}{" "}
                {formData.bathrooms === 1 ? "Bath" : "Baths"}
              </Badge>
            )}
          </div>
        )}

        {/* Description */}
        {formData.description ? (
          <p className="text-sm line-clamp-3">{formData.description}</p>
        ) : (
          <p className="text-sm text-white/50 italic">
            Description will appear here
          </p>
        )}

        {/* Amenities */}
        {formData.amenities && formData.amenities.length > 0 && (
          <div className="space-y-2">
            <h5 className="text-sm font-medium">Amenities</h5>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.slice(0, 5).map((amenity) => (
                <Badge
                  key={amenity}
                  variant="outline"
                  className="border-white/20 text-xs"
                >
                  {amenity}
                </Badge>
              ))}
              {formData.amenities.length > 5 && (
                <Badge variant="outline" className="border-white/20 text-xs">
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
