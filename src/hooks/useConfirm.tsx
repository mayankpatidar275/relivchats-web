"use client";

import { create } from "zustand";
import { ReactNode } from "react";
import ConfirmDialog from "../components/ui/ConfirmDialog";

interface ConfirmState {
  isOpen: boolean;
  title: string;
  description: string | ReactNode;
  confirmText: string;
  cancelText: string;
  variant: "danger" | "warning" | "info" | "success";
  onConfirm: (() => void) | (() => Promise<void>);
  onCancel?: () => void;
}

interface ConfirmStore extends ConfirmState {
  isLoading: boolean;
  openConfirm: (config: Omit<ConfirmState, "isOpen">) => void;
  closeConfirm: () => void;
  setLoading: (loading: boolean) => void;
}

const useConfirmStore = create<ConfirmStore>((set) => ({
  isOpen: false,
  title: "",
  description: "",
  confirmText: "Confirm",
  cancelText: "Cancel",
  variant: "warning",
  isLoading: false,
  onConfirm: () => {},
  onCancel: undefined,
  openConfirm: (config) => set({ ...config, isOpen: true }),
  closeConfirm: () => set({ isOpen: false, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const state = useConfirmStore();

  const handleConfirm = async () => {
    state.setLoading(true);
    try {
      await state.onConfirm();
      state.closeConfirm();
    } catch (error) {
      console.error("Confirm action failed:", error);
    } finally {
      state.setLoading(false);
    }
  };

  const handleCancel = () => {
    state.onCancel?.();
    state.closeConfirm();
  };

  return (
    <>
      {children}
      <ConfirmDialog
        isOpen={state.isOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title={state.title}
        description={state.description}
        confirmText={state.confirmText}
        cancelText={state.cancelText}
        variant={state.variant}
        isLoading={state.isLoading}
      />
    </>
  );
}

export function useConfirm() {
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  return {
    confirm: (config: Omit<ConfirmState, "isOpen">) => {
      return new Promise<boolean>((resolve) => {
        openConfirm({
          ...config,
          onConfirm: async () => {
            await config.onConfirm();
            resolve(true);
          },
          onCancel: () => {
            config.onCancel?.();
            resolve(false);
          },
        });
      });
    },
  };
}
