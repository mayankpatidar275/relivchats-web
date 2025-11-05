import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@clerk/nextjs";
import { queryKeys } from "@/src/lib/query/keys";
import { chatsApi } from "./queries";
import { chatsMutations } from "./mutations";
import { UnlockInsightsRequest, UploadChatRequest } from "../types";

// Queries
export const useChats = () => {
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: queryKeys.chats.lists(),
    queryFn: chatsApi.getChats,
    enabled: isSignedIn,
  });
};

export const useChat = (chatId: string) => {
  return useQuery({
    queryKey: queryKeys.chats.detail(chatId),
    queryFn: () => chatsApi.getChat(chatId),
    enabled: !!chatId,
  });
};

// Mutations
export const useUploadChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UploadChatRequest) => chatsMutations.uploadChat(data),
    onSuccess: () => {
      // Invalidate chats list to show new upload
      queryClient.invalidateQueries({ queryKey: queryKeys.chats.lists() });
    },
  });
};

// export const useAssignCategory = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (data: AssignCategoryRequest) =>
//       chatsMutations.assignCategory(data),
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({
//         queryKey: queryKeys.chats.detail(variables.chat_id),
//       });
//     },
//   });
// };

export const useUnlockInsights = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UnlockInsightsRequest) =>
      chatsMutations.unlockInsights(data),
    onSuccess: (_, variables) => {
      // Invalidate insights for this chat
      queryClient.invalidateQueries({
        queryKey: queryKeys.chats.detail(variables.chat_id),
      });
      // Invalidate credit balance
      queryClient.invalidateQueries({
        queryKey: queryKeys.credits.balance(),
      });
    },
  });
};

export const useDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => chatsApi.deleteChat(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chats.lists() });
    },
  });
};
