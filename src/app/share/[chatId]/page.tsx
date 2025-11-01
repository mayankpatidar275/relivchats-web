import { notFound } from "next/navigation";
import { MessageCircle, Users, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

interface SharePageProps {
  params: {
    chatId: string;
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const { chatId } = await params;

  // Fetch public chat stats (create a public endpoint for this)
  let chat;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chats/${chatId}/stats`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) throw new Error("Chat not found");
    chat = await response.json();
  } catch (error) {
    notFound();
  }

  const daysDiff = Math.ceil(
    (new Date(chat.chat_metadata.date_range.end).getTime() -
      new Date(chat.chat_metadata.date_range.start).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-white to-accent-pink/5">
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm mb-6">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-gray-700">
              Shared Chat Statistics
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            {chat.filename}
          </h1>
          <p className="text-xl text-gray-600">Analyzed with Reliv Chats AI</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Messages</div>
                <div className="text-4xl font-bold text-gray-900">
                  {chat.chat_metadata.total_messages.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {chat.chat_metadata.total_words.toLocaleString()} words
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Participants</div>
                <div className="text-4xl font-bold text-gray-900">
                  {chat.participants.length}
                </div>
                <div className="text-sm text-gray-500 mt-1">Active members</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Chat Duration</div>
                <div className="text-4xl font-bold text-gray-900">
                  {daysDiff}
                </div>
                <div className="text-sm text-gray-500 mt-1">days</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Avg per Day</div>
                <div className="text-4xl font-bold text-gray-900">
                  {chat.chat_metadata.messages_per_day_avg.toFixed(1)}
                </div>
                <div className="text-sm text-gray-500 mt-1">messages</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Emojis */}
        {chat.chat_metadata.top_emojis.length > 0 && (
          <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Most Used Emojis
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {chat.chat_metadata.top_emojis
                .slice(0, 8)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((emoji: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl min-w-20"
                  >
                    <div className="text-4xl">{emoji.emoji}</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {emoji.count}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-linear-to-br from-primary to-primary-deep rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <div className="text-5xl mb-4">✨</div>
          <h2 className="text-3xl font-bold mb-4">Want Deeper Insights?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Unlock AI-powered analysis of your chats. Get emotional patterns,
            communication insights, and personalized recommendations.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Try Reliv Chats Free
            <MessageCircle className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function generateMetadata({ params }: SharePageProps) {
  return {
    title: "Shared Chat Statistics | Reliv Chats",
    description: "View shared chat analysis and statistics",
  };
}
