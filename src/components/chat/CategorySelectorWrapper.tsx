"use client";

import { useChat } from "@/src/features/chats/api";
import CategorySelector from "./CategorySelector";

// Wrapper to conditionally show CategorySelector
export default function CategorySelectorWrapper({
  chatId,
}: {
  chatId: string;
}) {
  const { data: chat } = useChat(chatId);

  // Only show if no category assigned
  if (!chat || chat.category_id) {
    return null;
  }

  return <CategorySelector chatId={chatId} />;
}
