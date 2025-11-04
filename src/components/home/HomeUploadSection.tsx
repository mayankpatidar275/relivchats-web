"use client";

import { useState, useRef } from "react";
import {
  Upload,
  FileText,
  ArrowRight,
  CheckCircle,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { chatsMutations } from "@/src/features/chats/api";
import UploadProgressModal from "../upload/UploadProgressModal";

type UploadProgress =
  | "uploading"
  | "parsing"
  | "analyzing"
  | "completed"
  | "error";

export default function HomeUploadSection() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
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
      setError("Please upload a valid WhatsApp chat export (.txt or .zip)");
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    if (!isSignedIn) {
      router.push("/sign-up");
      return;
    }

    setUploadProgress("uploading");
    setError(null);

    try {
      setTimeout(() => setUploadProgress("parsing"), 500);
      setTimeout(() => setUploadProgress("analyzing"), 1500);

      const response = await chatsMutations.uploadChat({ file: selectedFile });

      setUploadProgress("completed");

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

      <section
        id="home-upload"
        className="py-12 md:py-20 lg:py-24 bg-linear-to-br from-gray-50 to-white"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            {/* Header - Centered */}
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-green-50 rounded-full border border-green-200 mb-4">
                <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" />
                <span className="text-xs md:text-sm font-semibold text-green-700">
                  100% Free to Start
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
                Upload Your Chat
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                Get instant free statistics and unlock deeper AI insights
              </p>
            </div>

            {/* Upload Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadClick}
              className={`relative border-3 border-dashed rounded-2xl md:rounded-3xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-gray-300 bg-white hover:border-primary/50 hover:bg-gray-50"
              } shadow-lg hover:shadow-xl mb-6 md:mb-8`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.zip"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div className="space-y-4 md:space-y-6">
                {selectedFile ? (
                  /* File Selected State */
                  <div className="space-y-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-linear-to-br from-primary to-accent-pink rounded-2xl flex items-center justify-center">
                      <FileText className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-base md:text-lg mb-1">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpload();
                      }}
                      className="px-6 md:px-8 py-3 md:py-4 bg-linear-to-r from-primary to-primary-hover text-white rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2 text-sm md:text-base"
                    >
                      Analyze Now
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                ) : (
                  /* Empty State */
                  <>
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-linear-to-br from-primary to-accent-pink rounded-2xl blur-xl opacity-20" />
                      <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto bg-linear-to-br from-primary to-accent-pink rounded-2xl flex items-center justify-center">
                        <Upload className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        Drop your chat file here
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">
                        or click to browse
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs md:text-sm font-medium text-gray-700">
                        .txt
                      </span>
                      <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs md:text-sm font-medium text-gray-700">
                        .zip
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && !uploadProgress && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-6 md:mb-8">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Features Grid - Compact */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                    Free Statistics
                  </h4>
                  <p className="text-xs text-gray-600">
                    Message counts, activity patterns, top emojis
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                    100% Private
                  </h4>
                  <p className="text-xs text-gray-600">
                    Your data stays secure and encrypted
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                    Instant Results
                  </h4>
                  <p className="text-xs text-gray-600">
                    Analysis ready in seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
