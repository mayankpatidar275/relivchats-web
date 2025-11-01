import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/src/lib/query/keys";
import { insightsApi } from "./client-queries";

export const useChatInsights = (chatId: string) => {
  return useQuery({
    queryKey: queryKeys.chats.insights(chatId),
    queryFn: () => insightsApi.getChatInsights(chatId),
    enabled: !!chatId,
    // refetchInterval: (data) => {
    //   // Poll every 5 seconds if any insights are still generating
    //   const hasGenerating = data?.some(
    //     (insight) =>
    //       insight.status === "generating" || insight.status === "pending"
    //   );
    //   return hasGenerating ? 5000 : false;
    // },
  });
};
