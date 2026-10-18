"use client";

import { useEffect } from "react";

const PING_INTERVAL_MS = 10 * 60 * 1000;

// Pings the backend health endpoint when the homepage loads, then every 10 minutes
// while the tab is open, so the sleeping Render service stays awake.
// The response is not read, so CORS is not needed.
export default function KeepAlive() {
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
    const ping = () => {
      fetch(`${base}/health`, { mode: "no-cors", cache: "no-store" }).catch(() => {});
    };

    ping();
    const timer = setInterval(ping, PING_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return null;
}
