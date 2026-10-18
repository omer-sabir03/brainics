"use client";

import { useEffect } from "react";

// Pings the backend health endpoint when the homepage loads so the sleeping
// Render service wakes up. The response is not read, so CORS is not needed.
export default function KeepAlive() {
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
    fetch(`${base}/health`, { mode: "no-cors", cache: "no-store" }).catch(() => {});
  }, []);

  return null;
}
