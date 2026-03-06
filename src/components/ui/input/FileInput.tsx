import React, { useState, useRef } from "react";

interface FileUploadProps {
  name: string; // Nama field untuk FormData
  label: string;
  accept?: string;
  onUpload: (file: File) => void;
}

export default function FileInput({
  name,
  label,
  accept,
  onUpload,
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      onUpload(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative group cursor-pointer border-2 border-dashed border-gray-300 rounded-2xl p-4 hover:border-forest transition-all bg-gray-50"
      >
        <input
          type="file"
          name={name}
          ref={fileInputRef}
          onChange={handlePreview}
          accept={accept}
          className="hidden"
        />

        {preview ? (
          <div className="relative h-40 w-full">
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white rounded-xl transition-opacity">
              Change Image
            </div>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center">
            <div className="p-3 bg-white rounded-full shadow-sm text-gray-400 group-hover:text-forest transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Click to upload {accept}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
