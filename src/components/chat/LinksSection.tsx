"use client";

import { useState } from "react";
import {
  Link2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { ChatMetadata } from "@/src/features/chats/types";

interface LinksSectionProps {
  metadata: ChatMetadata;
}

export default function LinksSection({ metadata }: LinksSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  if (!metadata.links_shared_count || metadata.links_shared_count === 0) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const links = (metadata as any).links || [];

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Link2 className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-bold text-gray-900">
            Shared Links ({metadata.links_shared_count})
          </h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Expandable content */}
      {isExpanded && links.length > 0 && (
        <div className="p-4 pt-0 border-t border-gray-100">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {links.map((link: any, idx: number) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm truncate block mb-2"
                    >
                      {link.url}
                      <ExternalLink className="w-3 h-3 inline ml-1" />
                    </a>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span>Shared by {link.user}</span>
                      <span>•</span>
                      <span>{formatDate(link.timestamp)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(link.url)}
                    className="shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copy link"
                  >
                    {copiedUrl === link.url ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
