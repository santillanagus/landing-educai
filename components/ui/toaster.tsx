"use client";

import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  ToastClose,
} from "./toast";
import { useToast } from "./use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <ToastProvider>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          open
          onOpenChange={open => {
            if (!open) dismiss(toast.id);
          }}
        >
          {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
          {toast.description && (
            <ToastDescription>{toast.description}</ToastDescription>
          )}
          <ToastClose onClick={() => dismiss(toast.id)}>Cerrar</ToastClose>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
