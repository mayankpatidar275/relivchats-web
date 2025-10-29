// src/features/chats/hooks.ts
// import { clientFetch } from "@/src/lib/api-client";
// import { useQuery } from "@tanstack/react-query";

// export function useChat(chatId: string) {
//   return useQuery(
//     ["chat", chatId],
//     async () => {
//       return clientFetch(`/v1/chats/${chatId}`);
//     },
//     {
//       refetchInterval: (data) => {
//         // poll while analysis is not complete
//         if (!data) return 0;
//         const isDone = data.insights?.every(
//           (i: any) => i.status === "COMPLETED" || i.status === "FAILED"
//         );
//         return isDone ? 0 : 2000; // poll every 2s while running
//       },
//     }
//   );
// }
