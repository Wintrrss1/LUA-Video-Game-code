/* =============================================================================
   RAGE AI — Cloudflare Worker proxy for ElevenLabs Music
   -----------------------------------------------------------------------------
   Keeps your ElevenLabs API key OFF the phone (stored as a Worker secret) and
   adds the CORS headers a browser needs. The app POSTs a JSON body
   { prompt, music_length_ms, model_id } to this Worker; the Worker forwards it
   to ElevenLabs with your key and returns the MP3 audio.

   Setup is in PROXY_SETUP.md. In short:
     1. Create a Worker at dash.cloudflare.com → Workers & Pages.
     2. Paste this file as the Worker code and Deploy.
     3. Add a secret named ELEVENLABS_API_KEY with your key.
     4. Copy the Worker URL (https://xxxx.workers.dev) into the app's ⚙︎ settings.
   ========================================================================== */

const ELEVEN_URL = "https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128";

// Optional: lock this to your app's origin instead of "*" for tighter security,
// e.g. "https://wintrrss1.github.io"
const ALLOW_ORIGIN = "*";

function cors() {
  return {
    "Access-Control-Allow-Origin": ALLOW_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors() });
    }
    if (request.method !== "POST") {
      return new Response("POST only", { status: 405, headers: cors() });
    }
    if (!env.ELEVENLABS_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Worker missing ELEVENLABS_API_KEY secret." }),
        { status: 500, headers: { ...cors(), "Content-Type": "application/json" } }
      );
    }

    let payload;
    try {
      payload = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Body must be JSON." }),
        { status: 400, headers: { ...cors(), "Content-Type": "application/json" } });
    }

    // Whitelist / sanitize the fields we forward.
    const body = {
      prompt: String(payload.prompt || "").slice(0, 2000),
      music_length_ms: Math.min(300000, Math.max(3000, parseInt(payload.music_length_ms, 10) || 30000)),
    };
    if (payload.model_id) body.model_id = String(payload.model_id);

    let upstream;
    try {
      upstream = await fetch(ELEVEN_URL, {
        method: "POST",
        headers: {
          "xi-api-key": env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Upstream fetch failed: " + e.message }),
        { status: 502, headers: { ...cors(), "Content-Type": "application/json" } });
    }

    if (!upstream.ok) {
      const text = await upstream.text();
      return new Response(text, {
        status: upstream.status,
        headers: { ...cors(), "Content-Type": upstream.headers.get("content-type") || "application/json" },
      });
    }

    // Stream the audio straight back with CORS headers.
    return new Response(upstream.body, {
      status: 200,
      headers: {
        ...cors(),
        "Content-Type": upstream.headers.get("content-type") || "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  },
};
