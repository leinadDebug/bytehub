"use client";

import { useState, useCallback } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  value: { url: string; publicId?: string }[];
  onChange: (value: { url: string; publicId?: string }[]) => void;
}

export function ImageUpload({ value = [], onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [widgetError, setWidgetError] = useState<string | null>(null);

  const handleRemove = (index: number) => {
    const newImages = [...value];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {value.map((image, index) => (
          <div
            key={index}
            className="relative group aspect-square rounded-xl overflow-hidden"
          >
            <img
              src={image.url}
              alt={`Lodge image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}

        <CldUploadWidget
          uploadPreset="Lodges" // Use your preset name directly here
          options={{
            multiple: true,
            maxFiles: 10,
            sources: ["local", "camera"],
            resourceType: "image",
            clientAllowedFormats: ["jpg", "png", "jpeg", "webp"],
            showPoweredBy: false,
          }}
          onUploadAdded={() => {
            setIsUploading(true);
            setWidgetError(null);
          }}
          onSuccess={(result) => {
            if (result?.info && typeof result.info !== "string") {
              onChange([
                ...value,
                {
                  url: result.info.secure_url,
                  publicId: result.info.public_id,
                },
              ]);
            }
            setIsUploading(false);
          }}
          onError={(error: any) => {
            console.error("Upload error:", error);
            setWidgetError(error.message || "Upload failed");
            setIsUploading(false);
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              disabled={isUploading}
              className={`aspect-square rounded-xl overflow-hidden relative border-2 border-dashed ${
                isUploading
                  ? "border-gray-500/50 cursor-not-allowed"
                  : "border-white/20 hover:border-white/40"
              } transition-all duration-300`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 flex flex-col items-center justify-center p-4 text-center">
                {isUploading ? (
                  <>
                    <Loader2 className="w-8 h-8 mx-auto mb-2 text-white/70 animate-spin" />
                    <span className="text-sm text-white/70">Uploading...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 mx-auto mb-2 text-white/50 group-hover:text-white/70 transition-colors" />
                    <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                      Add photos
                    </span>
                  </>
                )}
              </div>
            </button>
          )}
        </CldUploadWidget>
      </div>

      {widgetError && (
        <div className="text-red-400 text-sm p-2 bg-red-900/20 rounded-lg">
          {widgetError}
        </div>
      )}
    </div>
  );
}
