import { clientApi } from "@/src/lib/api";
import type {
  UnlockInsightsRequest,
  UnlockInsightsResponse,
  UploadChatResponse,
} from "../types";

export const chatsMutations = {
  // Upload chat file
  uploadChat: async (
    file: File,
    categorySlug?: string
  ): Promise<UploadChatResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    if (categorySlug) {
      formData.append("category_slug", categorySlug);
    }

    // For file uploads, we need to override content-type
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chats/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          // Don't set Content-Type, let browser set it with boundary
          // Authorization header will be added by interceptor
        },
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return response.json();
  },

  // Unlock all insights for a category (simplified)
  unlockInsights: async (
    data: UnlockInsightsRequest
  ): Promise<UnlockInsightsResponse> => {
    return clientApi.post<UnlockInsightsResponse>("/insights/unlock", data);
  },

  // Delete chat
  deleteChat: async (chatId: string): Promise<void> => {
    return clientApi.delete<void>(`/chats/${chatId}`);
  },
};
