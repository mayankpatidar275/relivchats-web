"use client";

import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

interface UploadProgressModalProps {
  isOpen: boolean;
  progress: "uploading" | "parsing" | "analyzing" | "completed" | "error";
  error?: string;
}

export default function UploadProgressModal({
  isOpen,
  progress,
  error,
}: UploadProgressModalProps) {
  if (!isOpen) return null;

  const steps = [
    {
      id: "uploading",
      label: "Uploading file",
      description: "Securely transferring your chat",
    },
    {
      id: "parsing",
      label: "Reading messages",
      description: "Extracting conversation data",
    },
    {
      id: "analyzing",
      label: "Computing stats",
      description: "Generating free insights",
    },
    { id: "completed", label: "Done!", description: "Your chat is ready" },
  ];

  const getCurrentStepIndex = () => {
    if (progress === "error") return -1;
    return steps.findIndex((step) => step.id === progress);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
        {error ? (
          // Error state
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Upload Failed</h3>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
            >
              Try Again
            </button>
          </div>
        ) : progress === "completed" ? (
          // Success state
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-20 animate-pulse" />
              <div className="relative w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Upload Complete!
            </h3>
            <p className="text-gray-600">
              Your chat has been analyzed. Redirecting...
            </p>
          </div>
        ) : (
          // Progress state
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Processing Your Chat
              </h3>
              <p className="text-gray-600">
                This usually takes just a few seconds
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => {
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;

                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 transition-all duration-300 ${
                      isActive ? "scale-105" : "scale-100"
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isCompleted
                          ? "bg-green-500"
                          : isActive
                          ? "bg-primary"
                          : "bg-gray-200"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : isActive ? (
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div
                        className={`font-semibold ${
                          isCompleted || isActive
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </div>
                      <div
                        className={`text-sm ${
                          isActive ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {step.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-primary to-[--color-accent-pink] transition-all duration-500 ease-out"
                style={{
                  width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
