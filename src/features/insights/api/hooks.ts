import { useQuery, type Query } from "@tanstack/react-query";
import { queryKeys } from "@/src/lib/query/keys";
import { insightsApi, type InsightResponse } from "./client-queries";

export const useChatInsights = (chatId: string) => {
  return useQuery({
    queryKey: queryKeys.chats.insights(chatId),
    queryFn: () => insightsApi.getChatInsights(chatId),
    enabled: !!chatId,
    refetchInterval: (query: Query<InsightResponse, Error>) => {
      const data = query.state.data;

      console.log("[useChatInsights] refetchInterval called", {
        chatId,
        hasData: !!data,
        generation_status: data?.generation_status,
        insightsCount: data?.insights.length,
      });

      // Don't poll if no data yet
      if (!data) {
        console.log("[useChatInsights] No data, returning false");
        return false;
      }

      // Poll every 3 seconds while any insights are generating
      const isGenerating =
        data.generation_status === "generating" ||
        data.generation_status === "queued" ||
        data.insights.some(
          (insight) =>
            insight.status === "generating" ||
            insight.status === "pending"
        );

      const insightStatuses = data.insights.map(i => ({
        id: i.id,
        type: i.insight_type_name,
        status: i.status
      }));

      console.log("[useChatInsights] Insight statuses:", insightStatuses);
      console.log("[useChatInsights] isGenerating:", isGenerating, "- returning:", isGenerating ? 3000 : false);

      return isGenerating ? 3000 : false; // 3 seconds
    },
  });
};
