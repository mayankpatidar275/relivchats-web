"use client";

import { useTransactions } from "@/src/features/credits/api/hooks";
import { ArrowRight, Coins, TrendingUp } from "lucide-react";
import { useState } from "react";
import TransactionsModal from "../modals/TransactionsModal";

export default function RecentTransactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
  } = useTransactions();

  if (isLoadingTransactions) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-gray-900">Recent Activity</h4>
        </div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-pulse"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-gray-200 shrink-0"></div>
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-10 shrink-0 ml-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isErrorTransactions || !transactions) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-gray-900">Recent Activity</h4>
        </div>
        <div className="text-center py-8">
          <Coins className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Failed to load transactions</p>
          <p className="text-xs text-gray-400 mt-1">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-gray-900">Recent Activity</h4>
        {transactions.total_count > 3 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xs text-primary hover:text-purple-700 font-medium flex items-center gap-1 transition-colors"
            aria-label="View all transactions"
          >
            View All
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="space-y-2">
        {transactions.total_count > 0 ? (
          transactions.transactions.slice(0, 5).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                    transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {transaction.amount > 0 ? (
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
                    {formatDate(transaction.created_at)}
                  </p>
                </div>
              </div>
              <span
                className={`text-sm font-bold shrink-0 ml-2 ${
                  transaction.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}
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

      <TransactionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

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
