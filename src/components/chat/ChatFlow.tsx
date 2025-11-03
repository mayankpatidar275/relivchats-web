"use client";

import { useState } from "react";
import CategorySelector from "./CategorySelector";
import UnlockInsightsSection from "./UnlockInsightsSection";
import { useChat } from "@/src/features/chats/api";

interface ChatFlowProps {
  chatId: string;
}

export default function ChatFlow({ chatId }: ChatFlowProps) {
  const { data: chat } = useChat(chatId);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  // If chat already has a category, don't show selector
  if (chat?.category_id) {
    return null;
  }

  return (
    <>
      <CategorySelector
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />
      <UnlockInsightsSection
        chatId={chatId}
        selectedCategoryId={selectedCategoryId}
      />
    </>
  );
}
