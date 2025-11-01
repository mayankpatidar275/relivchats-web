import CategorySelector from "@/src/components/chat/CategorySelector";
import ChatHeader from "@/src/components/chat/ChatHeader";
import FreeStatsSection from "@/src/components/chat/FreeStatsSection";
import InsightsDisplaySection from "@/src/components/chat/InsightsDisplaySection";
import ThemeProvider from "@/src/components/chat/ThemeProvider";
import UnlockInsightsSection from "@/src/components/chat/UnlockInsightsSection";
import { serverApi } from "@/src/lib/api/server-api";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;

  // Fetch chat server-side to get category for theme
  let chat;
  try {
    chat = await serverApi.get(`chats/${chatId}`);
  } catch {
    // Handle error - chat might not exist
  }

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
  let chat;
  try {
    chat = await serverApi.get(`/chats/${chatId}`);
  } catch (error) {
    return null;
  }

  // Only show if no category assigned
  if (chat?.category_id) {
    return null;
  }

  return <CategorySelector chatId={chatId} />;
}

export function generateMetadata({ params }: ChatPageProps) {
  return {
    title: `Chat Analysis | Reliv Chats`,
    description: "View your chat analysis and insights",
  };
}
