import ChatsListSection from "@/src/components/dashboard/ChatsListSection";
import CreditBalanceWidget from "@/src/components/dashboard/CreditBalanceWidget";
import DashboardHeader from "@/src/components/dashboard/DashboardHeader";
// import QuickActionsSection from "@/src/components/dashboard/QuickActionsSection";
import WelcomeModal from "@/src/components/modals/WelcomeModal";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <>
      <Suspense fallback={null}>
        <WelcomeModal />
      </Suspense>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />

        {/* Main Content - Mobile First Layout */}
        <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
          {/* Mobile: Stacked Layout, Desktop: Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Main Content - Takes 2 columns on desktop */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <ChatsListSection />
            </div>

            {/* Sidebar - Takes 1 column on desktop, stacks on top on mobile */}
            <div className="space-y-4 order-1 lg:order-2">
              <CreditBalanceWidget />
              {/* <QuickActionsSection /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: "Dashboard | Reliv Chats",
  description: "Manage your chats and insights",
};
