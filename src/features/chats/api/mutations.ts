import { clientApi } from "@/src/lib/api";
import type {
  UnlockInsightsRequest,
  UnlockInsightsResponse,
  UploadChatRequest,
  UploadChatResponse,
} from "../types";

export const chatsMutations = {
  // Upload chat file
  uploadChat: async (data: UploadChatRequest): Promise<UploadChatResponse> => {
    const form = new FormData();
    form.append("file", data.file);
    if (data.categoryId) form.append("category_id", data.categoryId);
    return clientApi.postForm<UploadChatResponse>("chats/upload", form);
  },

  // Unlock all insights for a category (simplified)
  unlockInsights: async (
    data: UnlockInsightsRequest
  ): Promise<UnlockInsightsResponse> => {
    return clientApi.post<UnlockInsightsResponse>("/insights/unlock", data);
  },

  // Delete chat
  deleteChat: async (chatId: string): Promise<void> => {
    return clientApi.delete<void>(`chats/${chatId}`);
  },
};
