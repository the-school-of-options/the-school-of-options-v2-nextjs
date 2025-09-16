// Server-only helper to fetch & cache a Zoom S2S OAuth token.
let tokenCache: { token: string; exp: number } | null = null;

export async function getZoomToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  
  // Check if we have a valid cached token (with 5 minute buffer)
  if (tokenCache && tokenCache.exp - 300 > now) {
    return tokenCache.token;
  }

  const accountId = process.env.ZOOM_ACCOUNT_ID!;
  const clientId = process.env.ZOOM_CLIENT_ID!;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET!;
  
  if (!accountId || !clientId || !clientSecret) {
    throw new Error("Missing Zoom environment variables. Please check ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, and ZOOM_CLIENT_SECRET");
  }

  console.log("Fetching new Zoom token...");
  
  const url = new URL("https://zoom.us/oauth/token");
  url.searchParams.set("grant_type", "account_credentials");
  url.searchParams.set("account_id", accountId);

  try {
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Zoom token error: ${res.status} ${text}`);
      throw new Error(`Zoom token error: ${res.status} ${text}`);
    }

    const data = await res.json();
    
    if (!data.access_token) {
      throw new Error("No access token received from Zoom");
    }
    
    // Cache the token with expiration time
    const expiresIn = data.expires_in ?? 3600;
    tokenCache = { 
      token: data.access_token, 
      exp: now + expiresIn 
    };
    
    console.log(`Zoom token refreshed. Expires in ${expiresIn} seconds`);
    return tokenCache.token;
  } catch (error) {
    console.error("Failed to fetch Zoom token:", error);
    // Clear cache on error
    tokenCache = null;
    throw error;
  }
}
