// src/components/upload/UploadZone.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useRef, DragEvent } from "react";
import { Upload, FileText, Lock } from "lucide-react";

export type UploadProgress =
  | "uploading"
  | "parsing"
  | "analyzing"
  | "completed"
  | "error";

interface UploadZoneProps {
  // Theme
  theme: {
    color: string;
    textColor: string;
    lightBg?: string;
    borderColor?: string;
  };

  // Content
  title: string;
  description?: string;
  showBenefits?: boolean;

  // Behavior
  onUploadComplete: (chatId: string) => void;
  onUploadError?: (error: string) => void;

  // Upload function
  uploadHandler: (
    file: File,
    categoryId?: string
  ) => Promise<{ chat_id: string }>;

  // Optional category for category-specific uploads
  categoryId?: string;

  // UI variants
  variant?: "default" | "home";
}

export default function UploadZone({
  theme,
  //   title,
  //   description,
  //   showBenefits = false,
  onUploadComplete,
  onUploadError,
  uploadHandler,
  categoryId,
  variant = "default",
}: UploadZoneProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (!isSignedIn) {
      router.push("/sign-up");
      return;
    }

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const validTypes = [".txt", ".zip"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

    if (!validTypes.includes(fileExtension)) {
      const errorMsg =
        "Please upload a valid WhatsApp (.txt) or Telegram (.zip) export file";
      setError(errorMsg);
      onUploadError?.(errorMsg);
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !isSignedIn) return;

    setIsUploading(true);
    setError(null);

    try {
      const response = await uploadHandler(selectedFile, categoryId);
      onUploadComplete(response.chat_id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMsg = err.message || "Upload failed. Please try again.";
      setError(errorMsg);
      onUploadError?.(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSignedIn) {
      router.push("/sign-up");
      return;
    }

    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!isSignedIn) {
      router.push("/sign-up");
    } else {
      fileInputRef.current?.click();
    }
  };

  const isHomeVariant = variant === "home";

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.zip"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
        className={`relative border-3 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
          isDragging
            ? `${theme.lightBg || "bg-primary/5"} ${
                theme.borderColor || "border-primary"
              } scale-[1.02]`
            : "bg-white border-gray-300 hover:border-gray-400"
        } ${
          isHomeVariant
            ? "p-8 md:p-12 shadow-lg hover:shadow-xl"
            : "p-8 sm:p-10"
        }`}
      >
        {!isSignedIn && (
          <div
            className={`absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10 ${
              isHomeVariant ? "p-8" : "p-6"
            }`}
          >
            <div className="text-center space-y-3">
              <Lock
                className={`${
                  isHomeVariant ? "w-12 h-12" : "w-10 h-10 sm:w-12 sm:h-12"
                } text-gray-400 mx-auto`}
              />
              <p
                className={`font-semibold text-gray-900 ${
                  isHomeVariant ? "text-lg" : "text-base sm:text-lg"
                }`}
              >
                Sign in to upload
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/sign-up");
                }}
                className={`bg-linear-to-r ${
                  theme.color
                } text-white rounded-xl font-semibold hover:shadow-lg transition-all ${
                  isHomeVariant
                    ? "px-6 py-3 text-base"
                    : "px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base"
                }`}
              >
                Create Free Account
              </button>
            </div>
          </div>
        )}

        <div
          className={`space-y-4 sm:space-y-6 ${
            isHomeVariant ? "md:space-y-6" : ""
          }`}
        >
          <div className="relative inline-block">
            <div
              className={`absolute inset-0 bg-linear-to-br ${
                theme.color
              } rounded-xl blur-xl opacity-20 ${
                isHomeVariant ? "sm:rounded-2xl" : "sm:rounded-2xl"
              }`}
            />
            <div
              className={`relative mx-auto bg-linear-to-br ${
                theme.color
              } rounded-xl flex items-center justify-center ${
                isHomeVariant
                  ? "w-16 h-16 md:w-20 md:h-20 rounded-2xl"
                  : "w-16 h-16 sm:w-20 sm:h-20 sm:rounded-2xl"
              }`}
            >
              {selectedFile ? (
                <FileText
                  className={`text-white ${
                    isHomeVariant
                      ? "w-8 h-8 md:w-10 md:h-10"
                      : "w-8 h-8 sm:w-10 sm:h-10"
                  }`}
                />
              ) : (
                <Upload
                  className={`text-white ${
                    isHomeVariant
                      ? "w-8 h-8 md:w-10 md:h-10"
                      : "w-8 h-8 sm:w-10 sm:h-10"
                  }`}
                />
              )}
            </div>
          </div>

          {selectedFile ? (
            <div className="space-y-2">
              <p
                className={`font-semibold text-gray-900 ${
                  isHomeVariant
                    ? "text-base md:text-lg"
                    : "text-sm sm:text-base"
                }`}
              >
                {selectedFile.name}
              </p>
              <p
                className={`text-gray-600 ${
                  isHomeVariant ? "text-sm" : "text-xs sm:text-sm"
                }`}
              >
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpload();
                }}
                disabled={isUploading}
                className={`mt-3 sm:mt-4 bg-linear-to-r ${
                  theme.color
                } text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 ${
                  isHomeVariant
                    ? "px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
                    : "px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base"
                }`}
              >
                {isUploading ? "Uploading..." : "Upload & Analyze"}
              </button>
            </div>
          ) : (
            <>
              <h3
                className={`font-bold text-gray-900 ${
                  isHomeVariant ? "text-xl md:text-2xl" : "text-lg sm:text-xl"
                }`}
              >
                {isHomeVariant
                  ? "Drop your chat file here"
                  : "Drop file or click to browse"}
              </h3>
              {isHomeVariant && (
                <p className="text-sm md:text-base text-gray-600">
                  or click to browse
                </p>
              )}
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <span
                  className={`px-3 py-1.5 bg-gray-100 rounded-lg font-medium text-gray-700 ${
                    isHomeVariant ? "text-xs md:text-sm" : "text-xs sm:text-sm"
                  }`}
                >
                  .txt
                </span>
                <span
                  className={`px-3 py-1.5 bg-gray-100 rounded-lg font-medium text-gray-700 ${
                    isHomeVariant ? "text-xs md:text-sm" : "text-xs sm:text-sm"
                  }`}
                >
                  .zip
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div
          className={`mt-4 p-3 bg-red-50 border border-red-200 rounded-xl ${
            isHomeVariant ? "mb-6 md:mb-8" : ""
          }`}
        >
          <p
            className={`text-red-700 ${
              isHomeVariant ? "text-sm" : "text-xs sm:text-sm"
            }`}
          >
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
