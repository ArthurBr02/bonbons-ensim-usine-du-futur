"use client";
import { create } from "zustand";

type Step = "cart" | "form" | "success";

interface CartStore {
  qty: number;
  isOpen: boolean;
  step: Step;
  orderId: string | null;
  increment: () => void;
  decrement: () => void;
  open: () => void;
  close: () => void;
  setStep: (step: Step) => void;
  setOrderId: (id: string) => void;
}

export const useCart = create<CartStore>((set) => ({
  qty: 0,
  isOpen: false,
  step: "cart",
  orderId: null,
  increment: () => set((s) => ({ qty: s.qty + 1 })),
  decrement: () => set((s) => ({ qty: Math.max(0, s.qty - 1) })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setStep: (step) => set({ step }),
  setOrderId: (orderId) => set({ orderId }),
}));
