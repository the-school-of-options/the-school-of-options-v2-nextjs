"use client"
import React, { useEffect, useMemo, useState } from 'react'

function useQueryParam(name: string) {
  const search = typeof window !== 'undefined' ? window.location.search : ''
  return useMemo(() => new URLSearchParams(search).get(name) || '', [search, name])
}

const WebcastPage = () => {
  const meetingNumber = useQueryParam('mn')
  const passcode = useQueryParam('pwd')
  const displayName = useQueryParam('name') || 'Guest'
  const generatedEmail = useMemo(() => `guest-${Date.now().toString(36)}@guest.local`, [])
  const email = useQueryParam('email') || generatedEmail

  const [error, setError] = useState<string | null>(null)
  const [joining, setJoining] = useState(false)
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    if (!meetingNumber) return
    let cancelled = false
    ;(async () => {
      try {
        setJoining(true)
        setError(null)

        // Dynamically import Zoom SDK to avoid SSR issues
        const { ZoomMtg } = await import('@zoom/meetingsdk')

        // Ensure Client View root containers exist
        if (!document.getElementById('zmmtg-root')) {
          const root = document.createElement('div')
          root.id = 'zmmtg-root'
          document.body.appendChild(root)
        }
        if (!document.getElementById('aria-notify-area')) {
          const aria = document.createElement('div')
          aria.id = 'aria-notify-area'
          document.body.appendChild(aria)
        }

        try {
          ZoomMtg.preLoadWasm()
          ZoomMtg.prepareWebSDK()
        } catch {}

        // Request signature from our server
        const resp = await fetch('/api/zoom-sdk/signature', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mn: meetingNumber, role: 0 })
        })
        if (!resp.ok) {
          const data = await resp.json().catch(() => ({}))
          throw new Error(data.detail || 'Failed to get signature')
        }
        const { signature } = await resp.json()

        if (cancelled) return

        await new Promise<void>((resolve, reject) => {
          ZoomMtg.init({
            leaveUrl: `${window.location.origin}/webcast?left=1`,
            patchJsMedia: true,
            success: () => resolve(),
            error: (err: any) => reject(err)
          })
        })

        await new Promise<void>((resolve, reject) => {
          ZoomMtg.join({
            signature,
            meetingNumber,
            passWord: passcode,
            userName: displayName,
            userEmail: email,
            success: () => resolve(),
            error: (err: any) => reject(err)
          })
        })
        setJoined(true)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : 'Failed to join meeting')
      } finally {
        setJoining(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [meetingNumber, passcode, displayName, email])

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="w-full shrink-0 px-4 py-3 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="text-sm sm:text-base font-medium">The School of Options</div>
          <div className="text-xs text-white/60">Embedded Zoom Webcast</div>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">
        {!meetingNumber ? (
          <div className="absolute inset-0 grid place-items-center p-6">
            <div className="text-center">
              <p className="text-lg font-medium">Missing meeting number</p>
              <p className="mt-2 text-white/70">Use /webcast?mn=MeetingNumber&pwd=pass</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            {!joined && <div className="text-white/60 text-sm">Launching Zoom…</div>}
          </div>
        )}

        {joining && (
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="px-4 py-2 rounded bg-white/10">Joining…</div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="px-4 py-3 rounded bg-red-500/20 border border-red-500/40 text-red-200 max-w-md text-center">
              {error}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default WebcastPage