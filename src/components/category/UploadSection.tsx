"use client";

import { Upload, FileText, Shield, Zap, ArrowRight, Lock } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useRef, DragEvent } from "react";
import { Category } from "@/src/types/category";

interface UploadSectionProps {
  category: Category;
}

export default function UploadSection({ category }: UploadSectionProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Color mapping
  const colorMap: Record<
    string,
    {
      gradient: string;
      text: string;
      bg: string;
    }
  > = {
    romantic: {
      gradient: "from-romantic-from to-romantic-to",
      text: "text-pink-600",
      bg: "bg-pink-50",
    },
    friendship: {
      gradient: "from-friendship-from to-friendship-to",
      text: "text-blue-600",
      bg: "bg-blue-50",
    },
    family: {
      gradient: "from-family-from to-family-to",
      text: "text-green-600",
      bg: "bg-green-50",
    },
    work: {
      gradient: "from-work-from to-work-to",
      text: "text-purple-600",
      bg: "bg-purple-50",
    },
  };

  const colors = colorMap[category.slug] || colorMap.romantic;

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
      router.push("/signup");
      return;
    }

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    // Validate file type
    const validTypes = [".txt", ".zip"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

    if (!validTypes.includes(fileExtension)) {
      alert(
        "Please upload a valid WhatsApp (.txt) or Telegram (.zip) export file"
      );
      return;
    }

    setSelectedFile(file);
    // Here you would trigger the upload mutation
    console.log("File selected:", file.name);
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
    <section id="upload" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upload Your <span className={colors.text}>{category.name}</span>{" "}
            Chat
          </h2>
          <p className="text-lg text-gray-600">
            Get started in seconds. Upload your chat export and receive instant
            basic statistics for free.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Upload area */}
          <div className="space-y-6">
            {/* Drag and drop zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadClick}
              className={`relative border-3 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragging
                  ? `${colors.bg} border-${colors.text.replace("text-", "")}`
                  : "bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              {!isSignedIn && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                  <div className="text-center space-y-4">
                    <Lock className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-lg font-semibold text-gray-900">
                      Sign in to upload
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/signup");
                      }}
                      className={`px-6 py-3 bg-linear-to-r ${colors.gradient} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
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

              <div className="space-y-6">
                {/* Icon */}
                <div className="relative inline-block">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${colors.gradient} rounded-2xl blur-xl opacity-30`}
                  />
                  <div
                    className={`relative w-20 h-20 mx-auto bg-linear-to-br ${colors.gradient} rounded-2xl flex items-center justify-center`}
                  >
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                </div>

                {selectedFile ? (
                  <div className="space-y-2">
                    <FileText className={`w-8 h-8 mx-auto ${colors.text}`} />
                    <p className="font-semibold text-gray-900">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                    <button
                      className={`mt-4 px-6 py-3 bg-linear-to-r ${colors.gradient} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
                    >
                      Start Analysis
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Drag & drop your chat file
                    </h3>
                    <p className="text-gray-600">or click to browse</p>
                    <div className="flex items-center justify-center gap-4 pt-4">
                      <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                        .txt
                      </span>
                      <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                        .zip
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Supported platforms */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white text-xl">
                  W
                </div>
                <span className="text-sm font-medium text-gray-700">
                  WhatsApp
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white text-xl">
                  T
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Telegram
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xl">
                  I
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Instagram
                </span>
              </div>
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              What happens after upload?
            </h3>

            {[
              {
                icon: Zap,
                title: "Instant Processing",
                description:
                  "Your chat is analyzed immediately with our AI engine",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: FileText,
                title: "Free Basic Stats",
                description:
                  "Get message counts, participants, date ranges for free",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Shield,
                title: "100% Private & Secure",
                description:
                  "End-to-end encrypted. Your data never leaves our secure servers",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: ArrowRight,
                title: "Unlock Insights Anytime",
                description:
                  "Choose which AI insights to unlock using your coins",
                color: colors.gradient,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
