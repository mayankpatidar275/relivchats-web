"use client";

import { Coins, Plus, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreditBalanceWidget() {
  const router = useRouter();

  // TODO: Replace with actual API call
  const balance = 50;
  const recentTransactions = [
    {
      id: "1",
      type: "earned" as const,
      amount: 50,
      description: "Signup bonus",
      date: "2024-01-15",
    },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Balance Card */}
      <div className="relative bg-linear-to-br from-primary to-primary-hover p-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white/90">
              Your Balance
            </span>
          </div>

          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-white">{balance}</span>
              <span className="text-xl text-white/80">coins</span>
            </div>
          </div>

          <div className="text-sm text-white/80 mb-4">
            ≈ {Math.floor(balance / 50)} friendship or{" "}
            {Math.floor(balance / 100)} romantic insights
          </div>

          <button
            onClick={() => router.push("/pricing")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-primary rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5" />
            Buy More Coins
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-gray-900">Recent Activity</h4>
          {recentTransactions.length > 3 && (
            <button className="text-xs text-primary hover:text-purple-700 font-medium flex items-center gap-1">
              View All
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="space-y-2">
          {recentTransactions.length > 0 ? (
            recentTransactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                      transaction.type === "earned"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    {transaction.type === "earned" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <Coins className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-bold shrink-0 ml-2 ${
                    transaction.type === "earned"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "earned" ? "+" : "-"}
                  {transaction.amount}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Coins className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No transactions yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Your activity will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
