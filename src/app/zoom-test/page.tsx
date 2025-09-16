"use client";

import { useEffect, useState } from "react";

export default function ZoomTestPage() {
  const [loading, setLoading] = useState(false);
  const [lastFetchedAt, setLastFetchedAt] = useState<string | null>(null);

  async function fetchMeetings() {
    setLoading(true);
    try {
      const res = await fetch("/api/meetings/upcoming", { cache: "no-store" });
      const json = await res.json();
      console.log("Zoom upcoming meetings:", json);
      setLastFetchedAt(new Date().toLocaleString());
    } catch (e) {
      console.error("Failed to fetch meetings", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Zoom Meetings – Console Log Demo</h1>
      <p>
        Open the browser console to see the API response.
        {lastFetchedAt ? ` (Last fetched: ${lastFetchedAt})` : null}
      </p>
      <button onClick={fetchMeetings} disabled={loading}>
        {loading ? "Fetching..." : "Refetch & Log"}
      </button>
    </div>
  );
}
