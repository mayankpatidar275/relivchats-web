import { clientApi } from "@/src/lib/api";
import type { Chat, ChatStats } from "../types";

export const chatsApi = {
  // Get all user's chats
  getChats: async (): Promise<Chat[]> => {
    return clientApi.get<Chat[]>("/chats");
  },

  // Get single chat
  getChat: async (chatId: string): Promise<Chat> => {
    return clientApi.get<Chat>(`/chats/${chatId}`);
  },

  // Get chat stats (free stats)
  getChatStats: async (chatId: string): Promise<ChatStats> => {
    return clientApi.get<ChatStats>(`/chats/${chatId}/stats`);
  },

  // Delete chat
  deleteChat: async (chatId: string): Promise<void> => {
    return clientApi.delete<void>(`/chats/${chatId}`);
  },
};
