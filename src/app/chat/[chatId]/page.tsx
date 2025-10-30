import CategorySelectorWrapper from "@/src/components/chat/CategorySelectorWrapper";
import ChatHeader from "@/src/components/chat/ChatHeader";
import FreeStatsSection from "@/src/components/chat/FreeStatsSection";
import InsightsDisplaySection from "@/src/components/chat/InsightsDisplaySection";
import UnlockInsightsSection from "@/src/components/chat/UnlockInsightsSection";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;

  // In real implementation, you'd fetch this data
  // For now, we'll use the components with client-side data fetching

  return (
    <div className="min-h-screen bg-gray-50">
      <ChatHeader chatId={chatId} />
      <FreeStatsSection chatId={chatId} />

      {/* Show category selector only if no category assigned */}
      {/* This will be handled by the component itself checking chat.category_id */}
      <CategorySelectorWrapper chatId={chatId} />

      <UnlockInsightsSection chatId={chatId} />
      <InsightsDisplaySection chatId={chatId} />
    </div>
  );
}

export function generateMetadata({ params }: ChatPageProps) {
  return {
    title: `Chat Analysis | Reliv Chats`,
    description: "View your chat analysis and insights",
  };
}
