// src/components/category/UploadSection.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryUI } from "@/src/features/categories/utils";
import { useUploadChat } from "@/src/features/chats/api";
import UploadZone, { UploadProgress } from "../upload/UploadZone";
import UploadProgressModal from "../upload/UploadProgressModal";

interface UploadSectionProps {
  category: CategoryUI;
}

export default function UploadSection({ category }: UploadSectionProps) {
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

  const handleUpload = async (file: File, categoryId?: string) => {
    setUploadProgress("uploading");

    // Simulate progress for better UX
    setTimeout(() => setUploadProgress("parsing"), 1500);
    setTimeout(() => setUploadProgress("analyzing"), 3000);

    return await uploadChatMutation.mutateAsync({
      file,
      categoryId: categoryId || category.id,
    });
  };

  const theme = {
    color: category.color,
    textColor: category.textColor,
    lightBg: category.lightBg,
    borderColor: category.borderColor,
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
              <UploadZone
                theme={theme}
                title={`Upload Your ${category.display_name} Chat`}
                description="Get instant free stats • Choose to unlock insights anytime"
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                uploadHandler={handleUpload}
                categoryId={category.id}
                variant="default"
              />
            </div>

            {/* Quick benefits - Takes 2 columns */}
            <div className="md:col-span-2 space-y-3 sm:space-y-4">
              <div className="bg-white rounded-xl p-4 border-2 border-gray-100">
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${category.textColor} mb-2`}
                >
                  ⚡
                </div>
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
