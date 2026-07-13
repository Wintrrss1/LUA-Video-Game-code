/* =============================================================================
   BidFTA Resale Tool — Cloudflare Worker proxy
   -----------------------------------------------------------------------------
   BidFTA's public JSON API (auction.bidfta.io) does NOT send CORS headers, so a
   browser can't call it directly. This tiny Worker is a GET pass-through: the
   page asks for  {workerUrl}?url=<an encoded auction.bidfta.io URL>  and the
   Worker fetches it and returns the JSON with permissive CORS headers.

   There is NO API key or secret — the BidFTA endpoints we proxy are public.
   The host is allowlisted so the Worker can only ever be pointed at BidFTA.

   Setup is in BIDFTA_SETUP.md. In short:
     1. Create a Worker at dash.cloudflare.com -> Workers & Pages.
     2. Paste this file as the Worker code and Deploy.
     3. Copy the Worker URL (https://xxxx.workers.dev) into the app's gear menu.
   ========================================================================== */

// Only these hosts may be proxied. Anything else is rejected.
const ALLOWED_HOSTS = new Set([
  "auction.bidfta.io",
  "auction.api.bidfta.io",
]);

// Optional: lock this to your app's origin instead of "*" for tighter security,
// e.g. "https://wintrrss1.github.io"
const ALLOW_ORIGIN = "*";

function cors() {
  return {
    "Access-Control-Allow-Origin": ALLOW_ORIGIN,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: { ...cors(), "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors() });
    }
    if (request.method !== "GET") {
      return json({ error: "GET only" }, 405);
    }

    const target = new URL(request.url).searchParams.get("url");
    if (!target) {
      return json({ error: "Missing ?url= parameter." }, 400);
    }

    let upstreamUrl;
    try {
      upstreamUrl = new URL(target);
    } catch (e) {
      return json({ error: "Invalid url." }, 400);
    }

    if (upstreamUrl.protocol !== "https:" || !ALLOWED_HOSTS.has(upstreamUrl.hostname)) {
      return json({ error: "Host not allowed. Only BidFTA endpoints may be proxied." }, 400);
    }

    let upstream;
    try {
      upstream = await fetch(upstreamUrl.toString(), {
        headers: {
          // BidFTA's API expects a normal browser-ish request.
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; BidFTA-Resale-Tool/1.0)",
        },
      });
    } catch (e) {
      return json({ error: "Upstream fetch failed: " + e.message }, 502);
    }

    const bodyText = await upstream.text();
    return new Response(bodyText, {
      status: upstream.status,
      headers: {
        ...cors(),
        "Content-Type": upstream.headers.get("content-type") || "application/json",
        "Cache-Control": "no-store",
      },
    });
  },
};
