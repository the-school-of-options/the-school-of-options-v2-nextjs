import { NextResponse } from "next/server";
import { getZoomToken, clearZoomTokenCache } from "@/app/lib/zoom";

export async function GET() {
  try {
    const tokenData = await getZoomToken();
    const token = typeof tokenData === 'string' ? tokenData : tokenData.access_token;
    const apiUrl = typeof tokenData === 'object' && tokenData.api_url ? tokenData.api_url : "https://api.zoom.us";
    const zoomUrl = `${apiUrl}/v2/users/me/meetings?type=upcoming&page_size=50`;

    const res = await fetch(zoomUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Zoom API error: ${res.status} ${text}`);
      
      // Handle specific error cases
      if (res.status === 401) {
        // Clear token cache on authentication failure
        clearZoomTokenCache();
        
        return NextResponse.json(
          { 
            error: "zoom_auth_error", 
            detail: "Zoom authentication failed. Token cache cleared - please try again.",
            status: res.status,
            response_text: text
          },
          { status: 401 }
        );
      }
      
      if (res.status === 403) {
        return NextResponse.json(
          { error: "zoom_permission_error", detail: "Insufficient permissions to access Zoom meetings." },
          { status: 403 }
        );
      }
      
      return NextResponse.json(
        { error: "zoom_error", detail: `Zoom API error: ${res.status} ${text}` },
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

    console.log(`Successfully fetched ${items.length} upcoming meetings`);
    
    return NextResponse.json({
      items,
      next_page_token: data.next_page_token ?? null,
    });
  } catch (e: any) {
    console.error("Error in meetings API:", e);
    
    // Handle specific error types
    if (e.message?.includes("Missing Zoom environment variables")) {
      return NextResponse.json(
        { 
          error: "config_error", 
          detail: "Zoom configuration is missing. Please check your .env.local file and ensure ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, and ZOOM_CLIENT_SECRET are properly configured.",
          missing_vars: e.message.includes('ZOOM_ACCOUNT_ID') ? ['ZOOM_ACCOUNT_ID'] : [],
          help: "Visit https://marketplace.zoom.us/develop/apps to create a Zoom app and obtain the required credentials."
        },
        { status: 500 }
      );
    }
    
    if (e.message?.includes("Zoom token error")) {
      return NextResponse.json(
        { error: "token_error", detail: "Failed to obtain Zoom access token. Please check your credentials." },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "internal_error", detail: e?.message ?? "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
