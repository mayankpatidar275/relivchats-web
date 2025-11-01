"use client";

import { useConfirm } from "@/src/hooks/useConfirm";
import { clientApi } from "@/src/lib/api";
import { useUser } from "@clerk/nextjs";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { user } = useUser();
  const { confirm } = useConfirm();
  const [isDeleting, setIsDeleting] = useState(false);

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
          await clientApi.delete("/users/delete-account");

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Info */}
          <div className="bg-white rounded-3xl border-2 border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Profile Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Email
                </label>
                <div className="text-lg font-medium text-gray-900">
                  {user?.primaryEmailAddress?.emailAddress}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  User ID
                </label>
                <div className="text-sm font-mono text-gray-600">
                  {user?.id}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Member Since
                </label>
                <div className="text-sm text-gray-900">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-3xl border-2 border-red-200 p-8">
            <h2 className="text-2xl font-bold text-red-900 mb-2">
              Danger Zone
            </h2>
            <p className="text-gray-600 mb-6">
              Irreversible actions that affect your account
            </p>

            <div className="space-y-4">
              {/* Delete Account */}
              <div className="flex items-start justify-between p-6 border-2 border-red-200 rounded-2xl bg-red-50">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Trash2 className="w-5 h-5 text-red-600" />
                    <h3 className="font-bold text-gray-900">Delete Account</h3>
                  </div>
                  <p className="text-sm text-gray-700">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="ml-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center gap-2 shrink-0"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
