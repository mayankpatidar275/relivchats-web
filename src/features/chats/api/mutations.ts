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
  // Upload chat file
  // uploadChat: async (
  //   file: File,
  //   categorySlug?: string
  // ): Promise<UploadChatResponse> => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   if (categorySlug) {
  //     formData.append("category_slug", categorySlug);
  //   }

  //   // Note: We need to handle file upload differently - can't use clientApi due to FormData
  //   // The token will be added by middleware/interceptor
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/chats/upload`,
  //     {
  //       method: "POST",
  //       body: formData,
  //       // Let browser set Content-Type with boundary
  //     }
  //   );

  //   if (!response.ok) {
  //     const error = await response
  //       .json()
  //       .catch(() => ({ detail: "Upload failed" }));
  //     throw new Error(error.detail || "Upload failed");
  //   }

  //   return response.json();
  // },

  // Assign category to chat
  // assignCategory: async (data: AssignCategoryRequest): Promise<Chat> => {
  //   return clientApi.patch<Chat>(`/chats/${data.chat_id}/category`, {
  //     category_id: data.category_id,
  //   });
  // },

  // Unlock all insights for a category
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
