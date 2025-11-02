import CategorySelector from "@/src/components/chat/CategorySelector";
import ChatHeader from "@/src/components/chat/ChatHeader";
import FreeStatsSection from "@/src/components/chat/FreeStatsSection";
import InsightsDisplaySection from "@/src/components/chat/InsightsDisplaySection";
import ThemeProvider from "@/src/components/chat/ThemeProvider";
import UnlockInsightsSection from "@/src/components/chat/UnlockInsightsSection";
import { chatsApi } from "@/src/features/chats/api/server-queries";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;

  const chat = await chatsApi.getChat(chatId);

  return (
    <ThemeProvider categorySlug={chat?.category_slug}>
      <div className="min-h-screen bg-gray-50">
        <ChatHeader chatId={chatId} />
        <FreeStatsSection chatId={chatId} />
        <CategorySelectorWrapper chatId={chatId} />
        <UnlockInsightsSection chatId={chatId} />
        <InsightsDisplaySection chatId={chatId} />
      </div>
    </ThemeProvider>
  );
}

// Wrapper to conditionally show CategorySelector
async function CategorySelectorWrapper({ chatId }: { chatId: string }) {
  // Only show if no category assigned
  // if (chat?.category_id) {
  //   return null;
  // }

  return <CategorySelector chatId={chatId} />;
}

export function generateMetadata({}: ChatPageProps) {
  return {
    title: `Chat Analysis | Reliv Chats`,
    description: "View your chat analysis and insights",
  };
}
