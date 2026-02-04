"use client";

import { useTransactions } from "@/src/features/credits/api/hooks";
import { X, Coins, TrendingUp, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";

interface TransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TransactionsModal({
  isOpen,
  onClose,
}: TransactionsModalProps) {
  const [page] = useState(1);
  const {
    data: transactions,
    isLoading,
    isError,
  } = useTransactions(page, 50); // Fetch more transactions for the modal

  if (!isOpen) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const formatFullDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="transactions-modal-title"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2
                id="transactions-modal-title"
                className="text-xl font-bold text-gray-900"
              >
                All Transactions
              </h2>
              {transactions && (
                <p className="text-sm text-gray-500">
                  {transactions.total_count}{" "}
                  {transactions.total_count === 1
                    ? "transaction"
                    : "transactions"}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-sm text-gray-500">Loading transactions...</p>
            </div>
          ) : isError || !transactions ? (
            <div className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-sm font-medium text-gray-900 mb-1">
                Failed to load transactions
              </p>
              <p className="text-xs text-gray-500">Please try again later</p>
            </div>
          ) : transactions.total_count === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Coins className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-sm font-medium text-gray-900 mb-1">
                No transactions yet
              </p>
              <p className="text-xs text-gray-500">
                Your activity will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div
                      className={`w-10 h-10 rounded-lg shrink-0 flex items-center justify-center ${
                        transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {transaction.amount > 0 ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <Coins className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate mb-0.5">
                        {transaction.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500">
                          {formatDate(transaction.created_at)}
                        </p>
                        <span
                          className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          title={formatFullDate(transaction.created_at)}
                        >
                          • {formatFullDate(transaction.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-base font-bold shrink-0 ml-4 ${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - could add pagination here if needed */}
        {transactions && transactions.total_count > 50 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-center text-gray-500">
              Showing {Math.min(50, transactions.total_count)} of{" "}
              {transactions.total_count} transactions
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
