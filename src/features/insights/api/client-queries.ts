import { clientApi } from "@/src/lib/api";

export interface InsightResponse {
  id: string;
  insight_type_id: string;
  insight_type_name: string;
  display_title: string;
  description?: string;
  icon?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any; // Dynamic JSON content
  status: "pending" | "generating" | "completed" | "failed";
  created_at: string;
}

export const insightsApi = {
  getChatInsights: async (chatId: string): Promise<InsightResponse[]> => {
    return clientApi.get<InsightResponse[]>(`chats/${chatId}/insights`);
  },
};
