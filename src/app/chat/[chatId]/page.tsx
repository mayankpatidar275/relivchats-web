import ChatFlow from "@/src/components/chat/ChatFlow";
import ChatHeader from "@/src/components/chat/ChatHeader";
import FreeStatsSection from "@/src/components/chat/FreeStatsSection";
import InsightsDisplaySection from "@/src/components/chat/InsightsDisplaySection";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <ChatHeader chatId={chatId} />
      <FreeStatsSection chatId={chatId} />
      <ChatFlow chatId={chatId} />
      <InsightsDisplaySection chatId={chatId} />
    </div>
  );
}

export function generateMetadata() {
  return {
    title: `Chat Analysis | Reliv Chats`,
    description: "View your chat analysis and insights",
  };
}
