"use client";

import { useBalance } from "@/src/features/credits/api/hooks";
import { Plus, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import RecentTransactions from "./RecentTransactions";

export default function CreditBalanceWidget() {
  const router = useRouter();
  const {
    data: coins,
    isLoading: isLoadingBalance,
    isError: isErrorBalance,
  } = useBalance();

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
              <span className="text-5xl font-bold text-white">
                {" "}
                {isLoadingBalance ||
                isErrorBalance ||
                coins === null ||
                coins === undefined
                  ? "..."
                  : coins.balance}
              </span>
              <span className="text-xl text-white/80">coins</span>
            </div>
          </div>
          {/* TODO: use actual value for 50 and 100 or remove */}
          {/* <div className="text-sm text-white/80 mb-4">
            ≈{" "}
            {isLoadingBalance ||
            isErrorBalance ||
            coins === null ||
            coins === undefined
              ? "..."
              : Math.floor(coins.balance / 50)}{" "}
            friendship or{" "}
            {isLoadingBalance ||
            isErrorBalance ||
            coins === null ||
            coins === undefined
              ? "..."
              : Math.floor(coins.balance / 100)}{" "}
            romantic insights
          </div> */}

          <button
            onClick={() => router.push("/pricing")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-primary rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5" />
            Buy More Coins
          </button>
        </div>
      </div>
      <RecentTransactions />
    </div>
  );
}
