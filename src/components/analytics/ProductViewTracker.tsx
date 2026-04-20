"use client";

import { useEffect } from "react";

export default function ProductViewTracker({ productId }: { productId: string }) {
  useEffect(() => {
    let sessionId = sessionStorage.getItem("hk_sid");
    if (!sessionId) {
      sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("hk_sid", sessionId);
    }

    fetch("/api/analytics/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, sessionId }),
    }).catch(() => {});
  }, [productId]);

  return null;
}
