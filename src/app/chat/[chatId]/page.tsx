// app/chat/[chatId]/page.tsx
import ChatPageClient from "@/src/components/chat/ChatPageClient";

interface PageProps {
  params: { chatId: string };
}

export default async function Page({ params }: PageProps) {
  // This runs on the server; params is available synchronously
  const { chatId } = await params;

  // Render the client component and pass chatId as a prop
  return <ChatPageClient chatId={chatId} />;
}

export function generateMetadata() {
  return {
    title: `Chat Analysis | Reliv Chats`,
    description: "View your chat analysis and insights",
  };
}
