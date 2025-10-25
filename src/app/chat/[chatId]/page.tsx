// src/app/chat/[chatId]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { useChat } from "@/features/chats/hooks";
import InsightCard from "@/components/analysis/InsightCard";

export default function ChatPage() {
  const { chatId } = useParams() as { chatId: string };
  const { data, isLoading } = useChat(chatId);

  if (isLoading) return <div className="p-6">Loading chat...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">{data?.title ?? "Chat"}</h1>

      <section className="mb-6">
        <h2 className="text-lg font-medium">Free stats</h2>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="p-4 border rounded">
            Total messages: {data?.stats?.totalMessages ?? "-"}
          </div>
          <div className="p-4 border rounded">
            Participants: {data?.stats?.participants?.length ?? "-"}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-3">Insights</h2>
        <div className="space-y-3">
          {data?.insights?.map((insight: any) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}

          {!data?.insights?.length && (
            <div className="p-4 border rounded">
              No insights generated yet. Click <strong>Unlock insights</strong>{" "}
              to spend coins and generate.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
