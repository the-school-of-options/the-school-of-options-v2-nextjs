// Server-only helper to fetch & cache a Zoom S2S OAuth token.
let tokenCache: { token: string; exp: number; api_url?: string } | null = null;

export async function getZoomToken(retryCount: number = 0): Promise<string | { access_token: string; api_url: string }> {
  const now = Math.floor(Date.now() / 1000);
  
  // Check if we have a valid cached token (with 5 minute buffer)
  if (tokenCache && tokenCache.exp - 300 > now) {
    console.log(`Using cached token. Expires in ${tokenCache.exp - now} seconds`);
    if (tokenCache.api_url) {
      return { access_token: tokenCache.token, api_url: tokenCache.api_url };
    }
    return tokenCache.token;
  }
  
  // Clear expired cache
  if (tokenCache && tokenCache.exp <= now) {
    console.log("Clearing expired token cache");
    tokenCache = null;
  }

  const accountId = process.env.ZOOM_ACCOUNT_ID!;
  const clientId = process.env.ZOOM_CLIENT_ID!;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET!;
  
  if (!accountId || !clientId || !clientSecret) {
    const missingVars = [];
    if (!accountId) missingVars.push('ZOOM_ACCOUNT_ID');
    if (!clientId) missingVars.push('ZOOM_CLIENT_ID');
    if (!clientSecret) missingVars.push('ZOOM_CLIENT_SECRET');
    
    throw new Error(`Missing Zoom environment variables: ${missingVars.join(', ')}. Please check your .env.local file and ensure all required Zoom credentials are configured.`);
  }

  console.log("Fetching new Zoom token...");
  console.log("Using Account ID:", accountId);
  console.log("Using Client ID:", clientId);
  console.log("Client Secret exists:", !!clientSecret);
  
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
      console.error("Request details:", {
        url: url.toString(),
        accountId: accountId,
        clientId: clientId,
        hasClientSecret: !!clientSecret
      });
      throw new Error(`Zoom token error: ${res.status} ${text}`);
    }

    const data = await res.json();
    
    if (!data.access_token) {
      console.error("No access token received from Zoom. Response:", data);
      throw new Error("No access token received from Zoom");
    }
    
    // Cache the token with expiration time
    const expiresIn = data.expires_in ?? 3600;
    tokenCache = { 
      token: data.access_token, 
      exp: now + expiresIn,
      api_url: data.api_url
    };
    
    console.log(`Zoom token refreshed. Expires in ${expiresIn} seconds`);
    console.log(`Token starts with: ${data.access_token.substring(0, 20)}...`);
    console.log(`API URL: ${data.api_url}`);
    console.log(`Current server time: ${new Date().toISOString()}`);
    
    if (data.api_url) {
      return { access_token: data.access_token, api_url: data.api_url };
    }
    return tokenCache.token;
  } catch (error) {
    console.error("Failed to fetch Zoom token:", error);
    // Clear cache on error
    tokenCache = null;
    
    // Retry logic with exponential backoff
    if (retryCount < 3) {
      const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
      console.log(`Retrying token fetch in ${delay}ms (attempt ${retryCount + 1}/3)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return getZoomToken(retryCount + 1);
    }
    
    throw error;
  }
}

// Function to clear token cache (useful when getting expired token errors)
export function clearZoomTokenCache() {
  console.log("Manually clearing Zoom token cache");
  tokenCache = null;
}
