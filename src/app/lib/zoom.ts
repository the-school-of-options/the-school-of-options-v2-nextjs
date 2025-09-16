// Server-only helper to fetch & cache a Zoom S2S OAuth token.
let tokenCache: { token: string; exp: number } | null = null;

export async function getZoomToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (tokenCache && tokenCache.exp - 60 > now) return tokenCache.token;

  const accountId = process.env.ZOOM_ACCOUNT_ID!;
  const clientId = process.env.ZOOM_CLIENT_ID!;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET!;
  if (!accountId || !clientId || !clientSecret) {
    throw new Error("Missing Zoom env vars");
  }

  const url = new URL("https://zoom.us/oauth/token");
  url.searchParams.set("grant_type", "account_credentials");
  url.searchParams.set("account_id", accountId);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zoom token error: ${res.status} ${text}`);
  }

  const data = await res.json();
  tokenCache = { token: data.access_token, exp: now + (data.expires_in ?? 3600) };
  return tokenCache.token;
}
