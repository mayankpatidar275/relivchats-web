"use client";

import { Coins, Plus, TrendingUp, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreditBalanceWidget() {
  const router = useRouter();

  // Mock data - replace with actual credit balance from API
  const balance = 50;
  const recentTransactions = [
    {
      id: "1",
      type: "earned",
      amount: 50,
      description: "Signup bonus",
      date: "2024-01-15",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Credit Balance</h3>
        <Coins className="w-6 h-6 text-amber-500" />
      </div>

      {/* Balance display */}
      <div className="bg-linear-to-br from-primary to-[--color-primary-hover] rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium text-white/80">
              Available Coins
            </span>
          </div>
          <div className="text-5xl font-bold mb-4">{balance}</div>
          <p className="text-sm text-white/80">
            Enough for {Math.floor(balance / 50)} friendship or{" "}
            {Math.floor(balance / 100)} romantic insights
          </p>
        </div>
      </div>

      {/* Buy more button */}
      <button
        onClick={() => router.push("/pricing")}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all mb-6"
      >
        <Plus className="w-5 h-5" />
        Buy More Coins
      </button>

      {/* Recent transactions */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Recent Activity
        </h4>
        <div className="space-y-3">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg ${
                      transaction.type === "earned"
                        ? "bg-green-100"
                        : "bg-red-100"
                    } flex items-center justify-center`}
                  >
                    {transaction.type === "earned" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <Coins className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-bold ${
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
            <p className="text-sm text-gray-500 text-center py-4">
              No transactions yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
