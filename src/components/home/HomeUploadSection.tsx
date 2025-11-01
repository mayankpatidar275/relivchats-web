"use client";

import { useState, useRef } from "react";
import { Upload, FileText, ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
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
      router.push("/signup");
      return;
    }

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const validTypes = [".txt", ".zip", ".json"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

    if (!validTypes.includes(fileExtension)) {
      setError("Please upload a valid chat export file (.txt, .zip, or .json)");
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    if (!isSignedIn) {
      router.push("/signup");
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
      router.push("/signup");
      return;
    }

    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!isSignedIn) {
      router.push("/signup");
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

      <section className="py-24 bg-linear-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full border border-green-300">
                <CheckCircle className="w-4 h-4 text-green-700" />
                <span className="text-sm font-semibold text-green-700">
                  100% Free to Start
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Upload Your Chat,
                <br />
                <span className="bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent">
                  Get Instant Insights
                </span>
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed">
                No signup required for basic stats! Upload any WhatsApp,
                Telegram, or Instagram chat and see your conversation patterns
                in seconds.
              </p>

              {/* Features */}
              <div className="space-y-3 pt-4">
                {[
                  "Free basic statistics for every chat",
                  "Message counts, timelines, and activity patterns",
                  "100% private and secure",
                  "Unlock deeper AI insights with coins",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Upload Area */}
            <div className="space-y-6">
              {/* Upload Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleUploadClick}
                className={`relative border-3 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? "border-primary bg-primary/5 scale-105"
                    : "border-gray-300 bg-white hover:border-primary/50 hover:bg-gray-50"
                } shadow-lg hover:shadow-xl`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.zip,.json"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                <div className="space-y-6">
                  {/* Icon */}
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-linear-to-br from-primary to-accent-pink rounded-2xl blur-xl opacity-30" />
                    <div className="relative w-20 h-20 mx-auto bg-linear-to-br from-primary to-accent-pink rounded-2xl flex items-center justify-center">
                      <Upload className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {selectedFile ? (
                    <div className="space-y-3">
                      <FileText className="w-10 h-10 mx-auto text-primary" />
                      <p className="font-semibold text-gray-900 text-lg">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpload();
                        }}
                        className="px-8 py-3 bg-linear-to-r from-primary to-primary-hover text-white rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
                      >
                        Analyze Now
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          Drop your chat file here
                        </h3>
                        <p className="text-gray-600">or click to browse</p>
                      </div>

                      <div className="flex items-center justify-center gap-3">
                        <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                          .txt
                        </span>
                        <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                          .zip
                        </span>
                        <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                          .json
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && !uploadProgress && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Supported Platforms */}
              <div className="flex items-center justify-center gap-6 flex-wrap pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                    W
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    WhatsApp
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    T
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Telegram
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                    I
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Instagram
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
