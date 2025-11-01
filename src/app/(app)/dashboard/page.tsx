import ChatsListSection from "@/src/components/dashboard/ChatsListSection";
import CreditBalanceWidget from "@/src/components/dashboard/CreditBalanceWidget";
import DashboardHeader from "@/src/components/dashboard/DashboardHeader";
import QuickActionsSection from "@/src/components/dashboard/QuickActionsSection";
import WelcomeModal from "@/src/components/modals/WelcomeModal";

export default function DashboardPage() {
  return (
    <>
      <WelcomeModal />
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content - 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              <ChatsListSection />
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-8">
              <CreditBalanceWidget />
              <QuickActionsSection />
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
