# 🔌 Connecting RAGE AI to the beat generator

RAGE AI generates real beats using the **ElevenLabs Music** AI. You need an ElevenLabs
account + API key, and (recommended) a tiny free **Cloudflare Worker** that holds your
key safely and lets your phone talk to the API.

This takes about 5 minutes, one time.

---

## Step 1 — Get an ElevenLabs API key
1. Go to **[elevenlabs.io](https://elevenlabs.io)** and sign up / log in.
2. Music generation is a **paid** feature — add a plan or credits (each beat costs credits).
3. Open **Settings → API Keys** ([direct link](https://elevenlabs.io/app/settings/api-keys)) and **create a key**. Copy it (starts with `sk_...`).

You now have two ways to connect. **Proxy is recommended** (safer + always works on iPhone).

---

## Step 2 (recommended) — Set up the free Cloudflare Worker proxy

A Worker is a tiny piece of code that runs on Cloudflare's free tier. It holds your API
key so it never sits inside the app, and it adds the headers iPhone Safari needs.

1. Create a free account at **[dash.cloudflare.com](https://dash.cloudflare.com)**.
2. In the sidebar: **Workers & Pages → Create → Create Worker**. Give it any name, click **Deploy**.
3. Click **Edit code**. Delete what's there, then **paste the entire contents of [`worker.js`](./worker.js)** from this repo. Click **Deploy** (top right).
4. Add your key as a secret:
   - Go to the Worker's **Settings → Variables and Secrets** (or **Settings → Variables**).
   - Under **Secrets** (or "Environment Variables"), **Add** a variable:
     - **Name:** `ELEVENLABS_API_KEY`
     - **Value:** your `sk_...` key
     - Mark it **Encrypt / Secret** if offered. **Save and deploy.**
5. Copy your Worker URL — it looks like **`https://rage-ai.YOURNAME.workers.dev`**.

### Put it in the app
1. Open the app, tap **⚙︎** (top right).
2. Keep the mode on **Proxy (safer)**.
3. Paste your Worker URL into **Worker / Proxy URL**.
4. **Save.** Done — hit **Generate Beat**. 🔥

---

## Step 2 (alternative) — Direct key, no Worker

Faster to set up, but iPhone Safari may block it (browser CORS), and your key sits in the app.
Only use this if you don't want to set up a Worker.

1. Open the app, tap **⚙︎**, switch to **Direct key**.
2. Paste your `sk_...` key. Leave model as `music_v1`.
3. **Save** and generate.

If you see *"Blocked by the browser (CORS)"*, switch to **Proxy** mode — that always works.

---

## Troubleshooting
| Message | Fix |
|---|---|
| **API key rejected (401)** | Wrong/expired key. Re-copy it from ElevenLabs into ⚙︎ (or into the Worker secret). |
| **Out of credits (402)** | Add credits/subscription on ElevenLabs. |
| **Couldn't reach your Worker** | Check the Worker URL in ⚙︎ (no trailing slash), and that you clicked **Deploy**. |
| **Blocked by the browser (CORS)** | You're in Direct mode — switch to Proxy mode. |
| **Worker missing ELEVENLABS_API_KEY** | You skipped Step 2.4 — add the secret to the Worker and redeploy. |
| **Rate limited (429)** | Wait a few seconds and try again. |

---

## Notes
- Beats generate on ElevenLabs' servers and take ~20–60s. The app shows a timer.
- Every generation uses credits — even regenerations.
- Your key/URL are stored **only on your device** (browser localStorage) and, for the key, on your own Cloudflare Worker. Nothing is committed to this repo.
- No key / don't want to pay? The **[Studio synth](./studio.html)** works 100% free and offline (it's synthesized, not AI — lower fidelity, but no cost).
