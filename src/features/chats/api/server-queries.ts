import { serverApi } from "@/src/lib/api/server-api";
import type { Chat } from "../types";

export const chatsApi = {
  // Client-side only - needs auth
  getChat: async (chatId: string): Promise<Chat> => {
    return serverApi.get<Chat>(`chats/${chatId}`);
  },
};
