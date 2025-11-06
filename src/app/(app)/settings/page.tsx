"use client";

import { useDeleteUserMutation } from "@/src/features/users/api";
import { useConfirm } from "@/src/hooks/useConfirm";
import { useUser } from "@clerk/nextjs";
import {
  AlertTriangle,
  Trash2,
  User,
  Mail,
  Calendar,
  Shield,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { user } = useUser();
  const { confirm } = useConfirm();
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteUserMutation = useDeleteUserMutation();

  const handleDeleteAccount = async () => {
    await confirm({
      title: "Delete Account Forever?",
      description: (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-red-900">
                This action is permanent and cannot be undone.
              </p>
              <p className="text-red-800">We will permanently delete:</p>
              <ul className="list-disc list-inside space-y-1 text-red-700">
                <li>Your account and profile</li>
                <li>All uploaded chats and messages</li>
                <li>All unlocked insights and analysis</li>
                <li>Your remaining coin balance</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-700">
            Are you absolutely sure you want to proceed?
          </p>
        </div>
      ),
      confirmText: "Delete My Account",
      cancelText: "Keep My Account",
      variant: "danger",
      onConfirm: async () => {
        setIsDeleting(true);
        try {
          await deleteUserMutation.mutateAsync();

          // Sign out from Clerk (frontend)
          window.location.href = "/";
        } catch (error) {
          console.error("Failed to delete account:", error);
          alert(
            "Failed to delete account. Please try again or contact support."
          );
        } finally {
          setIsDeleting(false);
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Header - Compressed */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            Account Settings
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your account and preferences
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Profile Info - Compact Cards */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-gray-100 p-5 sm:p-8">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Profile Information
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                <Mail className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1 block">
                    Email Address
                  </label>
                  <div className="text-sm sm:text-base font-medium text-gray-900 truncate">
                    {user?.primaryEmailAddress?.emailAddress}
                  </div>
                </div>
              </div>

              {/* User ID */}
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                <Shield className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1 block">
                    User ID
                  </label>
                  <div className="text-xs sm:text-sm font-mono text-gray-600 truncate">
                    {user?.id}
                  </div>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1 block">
                    Member Since
                  </label>
                  <div className="text-sm sm:text-base text-gray-900">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone - Compact */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-red-200 p-5 sm:p-8">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-red-900">
                Danger Zone
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
              Irreversible actions that affect your account
            </p>

            {/* Delete Account */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-4 sm:p-6 border-2 border-red-200 rounded-xl sm:rounded-2xl bg-red-50">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    Delete Account
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-700">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="w-full sm:w-auto sm:ml-4 px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Account</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Support Section - NEW */}
          <div className="bg-linear-to-br from-primary-light to-accent-pink-light rounded-2xl sm:rounded-3xl border-2 border-primary/20 p-5 sm:p-6 text-center">
            <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
              Need help or have questions?
            </p>
            <a
              href="mailto:mayankpatidar275@gmail.com"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white hover:bg-gray-50 text-gray-900 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all shadow-sm"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
