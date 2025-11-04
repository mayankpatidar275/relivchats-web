"use client";

import { useUser } from "@clerk/nextjs";
import { Upload, FileText, Lock, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { DragEvent, useRef, useState } from "react";
import { CategoryUI } from "@/src/features/categories/utils";
import { useUploadChat } from "@/src/features/chats/api";
import UploadProgressModal from "../upload/UploadProgressModal";

interface UploadSectionProps {
  category: CategoryUI;
}

type UploadProgress =
  | "uploading"
  | "parsing"
  | "analyzing"
  | "completed"
  | "error";

export default function UploadSection({ category }: UploadSectionProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const uploadChatMutation = useUploadChat();

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

  const handleFileSelect = async (file: File) => {
    const validTypes = [".txt", ".zip"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

    if (!validTypes.includes(fileExtension)) {
      setError(
        "Please upload a valid WhatsApp (.txt) or Telegram (.zip) export file"
      );
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadProgress("uploading");
    setError(null);

    try {
      const response = await uploadChatMutation.mutateAsync({
        file: selectedFile,
        categoryId: category.id,
      });

      setTimeout(() => {
        router.push(`/chat/${response.chat_id}`);
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setUploadProgress("error");
      setError(err.message || "Upload failed. Please try again.");
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

  return (
    <>
      <UploadProgressModal
        isOpen={uploadProgress !== null}
        progress={uploadProgress || "uploading"}
        error={error || undefined}
      />

      <section id="upload" className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {/* Compact header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              Upload Your{" "}
              <span className={category.textColor}>
                {category.display_name}
              </span>{" "}
              Chat
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Get instant free stats • Choose to unlock insights anytime
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 items-start">
            {/* Upload zone - Takes 3 columns */}
            <div className="md:col-span-3">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleUploadClick}
                className={`relative border-3 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all ${
                  isDragging
                    ? `${category.lightBg} ${category.borderColor}`
                    : "bg-white border-gray-300 hover:border-gray-400"
                }`}
              >
                {!isSignedIn && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                    <div className="text-center space-y-3">
                      <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto" />
                      <p className="text-base sm:text-lg font-semibold text-gray-900">
                        Sign in to upload
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push("/sign-up");
                        }}
                        className={`px-5 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r ${category.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm sm:text-base`}
                      >
                        Create Free Account
                      </button>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.zip"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                <div className="space-y-4 sm:space-y-6">
                  <div className="relative inline-block">
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${category.color} rounded-xl sm:rounded-2xl blur-xl opacity-30`}
                    />
                    <div
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-linear-to-br ${category.color} rounded-xl sm:rounded-2xl flex items-center justify-center`}
                    >
                      <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                  </div>

                  {selectedFile ? (
                    <div className="space-y-2">
                      <FileText
                        className={`w-7 h-7 sm:w-8 sm:h-8 mx-auto ${category.textColor}`}
                      />
                      <p className="font-semibold text-sm sm:text-base text-gray-900">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpload();
                        }}
                        className={`mt-3 sm:mt-4 px-5 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r ${category.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm sm:text-base`}
                      >
                        Upload & Analyze
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        Drop file or click to browse
                      </h3>
                      <div className="flex items-center justify-center gap-3">
                        <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs sm:text-sm font-medium text-gray-700">
                          .txt
                        </span>
                        <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs sm:text-sm font-medium text-gray-700">
                          .zip
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-xs sm:text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>

            {/* Quick benefits - Takes 2 columns */}
            <div className="md:col-span-2 space-y-3 sm:space-y-4">
              <div className="bg-white rounded-xl p-4 border-2 border-gray-100">
                <Zap
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${category.textColor} mb-2`}
                />
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                  Instant Free Stats
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Message counts, activity, and patterns
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border-2 border-gray-100">
                <div className="text-2xl sm:text-3xl mb-2">🔒</div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                  100% Private
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Encrypted and never shared
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border-2 border-gray-100">
                <div className="text-2xl sm:text-3xl mb-2">🪙</div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                  Unlock Anytime
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  {category.base_cost} coins for full analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
