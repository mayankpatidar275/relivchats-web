// app/chat/[chatId]/cards/page.tsx
import CardsPageClient from "@/src/components/chat/cards/CardsPageClient";

interface PageProps {
  params: { chatId: string };
}

export default async function CardsPage({ params }: PageProps) {
  const { chatId } = await params;
  return <CardsPageClient chatId={chatId} />;
}

export function generateMetadata() {
  return {
    title: `Gift Cards | Reliv Chats`,
    description: "Download and share your chat analysis gift cards",
  };
}
