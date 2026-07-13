# 🛒 Connecting the BidFTA Resale Finder

The **Resale Finder** (`resale.html`) reads live data from **BidFTA.com** — every item in
an auction, its **MSRP** and **current bid** — and gives you a one-tap **eBay Sold** lookup
so you can see what things actually resell for before you bid.

BidFTA's data can't be read straight from a phone browser (the site blocks cross-origin
requests). The fix is a tiny **free Cloudflare Worker** that relays the requests. **No API
key, no account with BidFTA, and no cost** — the Worker just forwards public data.

This takes about 3 minutes, one time.

---

## Step 1 — Deploy the Worker proxy

1. Create a free account at **[dash.cloudflare.com](https://dash.cloudflare.com)**.
2. In the sidebar: **Workers & Pages → Create → Create Worker**. Give it any name
   (e.g. `bidfta-proxy`), click **Deploy**.
3. Click **Edit code**. Delete what's there, then **paste the entire contents of
   [`bidfta-worker.js`](./bidfta-worker.js)** from this repo. Click **Deploy** (top right).
4. Copy your Worker URL — it looks like **`https://bidfta-proxy.YOURNAME.workers.dev`**.

That's it — there's no secret to add (unlike the beat generator's Worker).

---

## Step 2 — Put it in the app

1. Open **`resale.html`** and tap **⚙︎** (top right).
2. Keep the mode on **Proxy (recommended)**.
3. Paste your Worker URL into **Worker / Proxy URL**.
4. **Save.**

Now paste a BidFTA **auction link** (or just the auction number) into the box and tap
**Load**. You'll get every item with MSRP, current bid, potential margin, and an **eBay
Sold** button.

---

## How to use it

- **Find an auction:** browse [bidfta.com](https://www.bidfta.com), open an auction, and
  copy the link (e.g. `https://www.bidfta.com/283423`). You can also paste a single item
  link — the tool loads that item's whole auction.
- **Auction number works too:** just type `283423`.
- **MSRP** is BidFTA's own "sample online retail price."
- **Margin** = MSRP − current bid, plus the bid as a **% of MSRP** (lower % = better deal).
- **eBay Sold** opens eBay's *Sold & Completed* search for that item so you see real,
  recent resale prices — the true resale value, not just asking prices.
- Use **Sort** (best margin, lowest bid %, ending soonest, highest MSRP), the **filter**
  box, and **Hide closed** to work a big auction fast.

---

## Troubleshooting
| Message | Fix |
|---|---|
| **No proxy URL set** | Tap ⚙︎ and paste your Worker URL, then Save. |
| **Unexpected (non-JSON) response** | The Worker URL is wrong or not deployed — re-check Step 1.4 (no trailing slash needed, the app handles it). |
| **BidFTA returned 404 / No items found** | The auction ended or the number is off. Grab a fresh link from bidfta.com. |
| **Host not allowed** | You pointed the Worker at something other than BidFTA — it only proxies `auction.bidfta.io`. |

---

## Notes
- The Worker only ever forwards requests to BidFTA's public API (`auction.bidfta.io` /
  `auction.api.bidfta.io`) — it's allowlisted, so it can't be misused as an open proxy.
- Your Worker URL is stored **only on your device** (browser localStorage). Nothing is
  committed to this repo.
- BidFTA is an independent company; this tool just reads their public listings. Always
  confirm details on BidFTA before bidding.
