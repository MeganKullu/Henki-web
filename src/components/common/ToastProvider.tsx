"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#333e48",
          color: "#fff",
          borderRadius: "4px",
          fontWeight: "500",
          fontSize: "14px",
        },
        success: {
          iconTheme: { primary: "#fed700", secondary: "#333e48" },
        },
      }}
    />
  );
}
