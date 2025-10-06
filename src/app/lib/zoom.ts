// Server-only helper to fetch & cache a Zoom S2S OAuth token.
let tokenCache: { token: string; exp: number; api_url?: string } | null = null;

export async function getZoomToken(retryCount: number = 0): Promise<string | { access_token: string; api_url: string }> {
  const now = Math.floor(Date.now() / 1000);
  
  // Check if we have a valid cached token (with 5 minute buffer)
  if (tokenCache && tokenCache.exp - 300 > now) {
    if (tokenCache.api_url) {
      return { access_token: tokenCache.token, api_url: tokenCache.api_url };
    }
    return tokenCache.token;
  }
  
  // Clear expired cache
  if (tokenCache && tokenCache.exp <= now) {
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
      exp: now + expiresIn,
      api_url: data.api_url
    };
    
    
    if (data.api_url) {
      return { access_token: data.access_token, api_url: data.api_url };
    }
    return tokenCache.token;
  } catch (error) {
    // Clear cache on error
    tokenCache = null;
    
    // Retry logic with exponential backoff
    if (retryCount < 3) {
      const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
      await new Promise(resolve => setTimeout(resolve, delay));
      return getZoomToken(retryCount + 1);
    }
    
    throw error;
  }
}

// Function to clear token cache (useful when getting expired token errors)
export function clearZoomTokenCache() {
  tokenCache = null;
}
