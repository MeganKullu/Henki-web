"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SiteVisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    let sessionId = sessionStorage.getItem("hk_sid");
    if (!sessionId) {
      sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("hk_sid", sessionId);
    }

    const alreadyTracked = sessionStorage.getItem("hk_visit_" + pathname);
    if (alreadyTracked) return;

    fetch("/api/analytics/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        path: pathname,
        referrer: document.referrer || null,
      }),
    })
      .then(() => sessionStorage.setItem("hk_visit_" + pathname, "1"))
      .catch(() => {});
  }, [pathname]);

  return null;
}
