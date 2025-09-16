import { NextResponse } from "next/server";
import { getZoomToken } from "@/app/lib/zoom";

export async function GET() {
  try {
    const token = await getZoomToken();
    const zoomUrl =
      "https://api.zoom.us/v2/users/me/meetings?type=upcoming&page_size=50";

    const res = await fetch(zoomUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "zoom_error", detail: text },
        { status: 502 }
      );
    }

    const data = await res.json();
    const items = (data.meetings ?? []).map((m: any) => ({
      id: m.id,
      topic: m.topic,
      start_time: m.start_time,
      timezone: m.timezone,
      duration: m.duration,
      join_url: m.join_url, // may exist on some responses; include if present
    }));

    return NextResponse.json({
      items,
      next_page_token: data.next_page_token ?? null,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "internal_error", detail: e?.message ?? "unknown" },
      { status: 500 }
    );
  }
}
