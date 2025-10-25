import { clientApi } from "@/src/lib/api";
import type {
  Chat,
  UnlockInsightRequest,
  UnlockInsightResponse,
  UploadChatResponse,
} from "../types";

export const chatsMutations = {
  // Upload chat file
  uploadChat: async (file: File): Promise<UploadChatResponse> => {
    const formData = new FormData();
    formData.append("file", file);

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

  // Unlock insights for a chat
  unlockInsights: async (
    data: UnlockInsightRequest
  ): Promise<UnlockInsightResponse> => {
    return clientApi.post<UnlockInsightResponse>("/insights/unlock", data);
  },

  // Assign category to chat
  assignCategory: async (chatId: string, categoryId: string): Promise<Chat> => {
    return clientApi.patch<Chat>(`/chats/${chatId}/category`, {
      category_id: categoryId,
    });
  },
};
