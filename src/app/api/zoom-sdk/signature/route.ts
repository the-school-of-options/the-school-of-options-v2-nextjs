import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// POST /api/zoom-sdk/signature
// Generates a Meeting SDK signature for joining a Zoom meeting/webinar.
// Expects JSON body: { mn: string, role?: 0 | 1, tokenExpSeconds?: number }

function base64UrlEncode(input: Buffer | string): string {
  const base64 = (input instanceof Buffer ? input : Buffer.from(input))
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
  return base64
}

function createMeetingSdkSignature({ sdkKey, sdkSecret, meetingNumber, role }: { sdkKey: string; sdkSecret: string; meetingNumber: string; role: 0 | 1 }) {
  const iat = Math.floor(Date.now() / 1000) - 30 // 30s clock skew
  // Per Zoom docs, exp and tokenExp should generally match; use a 2h window
  const exp = iat + 60 * 60 * 2
  const tokenExp = exp

  const header = { alg: 'HS256', typ: 'JWT' }
  // Include appKey for new SDK requirements; keep sdkKey for backward compatibility
  const payload = { appKey: sdkKey, sdkKey, mn: meetingNumber, role, iat, exp, tokenExp }

  const headerBase64 = base64UrlEncode(JSON.stringify(header))
  const payloadBase64 = base64UrlEncode(JSON.stringify(payload))
  const toSign = `${headerBase64}.${payloadBase64}`
  const signature = crypto.createHmac('sha256', sdkSecret).update(toSign).digest('base64')
  const signatureBase64Url = signature.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

  return `${toSign}.${signatureBase64Url}`
}

export async function POST(req: NextRequest) {
  try {
    const { mn, role = 0 } = (await req.json()) as { mn?: string; role?: 0 | 1 }

    if (!mn) {
      return NextResponse.json({ error: 'invalid_request', detail: 'Missing meeting number "mn"' }, { status: 400 })
    }

    const sdkKey = process.env.ZOOM_MEETING_SDK_CLIENT_ID
    const sdkSecret = process.env.ZOOM_MEETING_SDK_CLIENT_SECRET

    if (!sdkKey || !sdkSecret) {
      return NextResponse.json(
        { error: 'config_error', detail: 'Missing ZOOM_MEETING_SDK_CLIENT_ID or ZOOM_MEETING_SDK_CLIENT_SECRET' },
        { status: 500 }
      )
    }

    const signature = createMeetingSdkSignature({ sdkKey, sdkSecret, meetingNumber: String(mn), role })
    return NextResponse.json({ signature })
  } catch (err) {
    console.error('Signature generation failed', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}


