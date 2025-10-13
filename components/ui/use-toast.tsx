"use client";

import * as React from "react";

type ToastItem = {
  id: number;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

type ToastContextValue = {
  toasts: ToastItem[];
  toast: (t: Omit<ToastItem, "id">) => void;
  dismiss: (id: number) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const toast = React.useCallback((t: Omit<ToastItem, "id">) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, ...t }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(item => item.id !== id));
    }, 4000);
  }, []);

  const dismiss = React.useCallback((id: number) => {
    setToasts(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProviderClient");
  }
  return ctx;
}
