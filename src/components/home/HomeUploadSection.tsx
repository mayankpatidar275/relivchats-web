// src/components/home/HomeUploadSection.tsx
"use client";

import { useUploadChat } from "@/src/features/chats/api";
import { CheckCircle, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UploadProgressModal from "../upload/UploadProgressModal";
import UploadZone, { UploadProgress } from "../upload/UploadZone";

export default function HomeUploadSection() {
  const router = useRouter();
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const uploadChatMutation = useUploadChat();

  const handleUploadComplete = (chatId: string) => {
    setUploadProgress("completed");
    setTimeout(() => {
      router.push(`/chat/${chatId}`);
    }, 1000);
  };

  const handleUploadError = (errorMsg: string) => {
    setUploadProgress("error");
    setError(errorMsg);
  };

  const handleUpload = async (file: File) => {
    setUploadProgress("uploading");

    // Simulate progress for better UX
    setTimeout(() => setUploadProgress("parsing"), 1500);
    setTimeout(() => setUploadProgress("analyzing"), 1500);

    return await uploadChatMutation.mutateAsync({
      file,
    });
  };

  const theme = {
    color: "from-primary to-accent-pink",
    textColor: "text-primary",
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
            <div className="mb-6 md:mb-8">
              <UploadZone
                theme={theme}
                title="Upload Your Chat"
                description="Get instant free statistics and unlock deeper AI insights"
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                uploadHandler={handleUpload}
                variant="home"
              />
            </div>

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
