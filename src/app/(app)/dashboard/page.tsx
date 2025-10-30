import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CreditBalanceWidget from "@/components/dashboard/CreditBalanceWidget";
import ChatsListSection from "@/components/dashboard/ChatsListSection";
import QuickActionsSection from "@/components/dashboard/QuickActionsSection";

export default function DashboardPage() {
  return (
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
  );
}

export const metadata = {
  title: "Dashboard | Reliv Chats",
  description: "Manage your chats and insights",
};
