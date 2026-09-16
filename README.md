# 🔥 RAGE AI — Beat Generator

Generate **real** underground rap / rage-type beats (Ken Carson, Vax, Carti, Destroy Lonely
style) from a text prompt, right on your iPhone. Pick a vibe or describe one, hit **Generate**,
and get a full audio beat you can play and download.

Beats are produced by the **[ElevenLabs Music](https://elevenlabs.io/music-api)** AI (official,
licensed, cleared for commercial use), so this needs an ElevenLabs account + API key and uses
credits per beat.

Three apps live here:
- **`index.html`** — RAGE AI, the AI beat generator (needs your API key).
- **`studio.html`** — a free, offline, synthesized beat *maker* (a 16-step drum machine + one-tap
  pattern generator). Lower fidelity, but 100% free and no account.
- **[`cfb27/`](./cfb27/)** — 🏈 **CFB 27 Play Caller**: pick your College Football 27 offensive
  playbook and your opponent's defensive playbook, get an authentic down-and-distance call sheet
  and a 15-play opening script. Free, offline, no account.
  Live at **https://wintrrss1.github.io/LUA-Video-Game-code/cfb27/**

---

## 🚀 Get started (about 5 minutes, one time)

1. **Open the app** (see hosting below).
2. Tap **⚙︎** and connect your ElevenLabs API key — full walkthrough in **[PROXY_SETUP.md](./PROXY_SETUP.md)**.
   - **Proxy mode (recommended):** paste a free Cloudflare Worker URL (code in [`worker.js`](./worker.js)). Keeps your key off the phone and works reliably on iPhone.
   - **Direct mode:** paste your key straight into the app (may be blocked by Safari's CORS — fall back to Proxy).
3. Pick a preset (e.g. **Ken Carson Rage**) or type your own prompt, set length, hit **✨ Generate Beat**.
4. Play it, **⬇ Download** the `.mp3`, or **↻ Regenerate** for a new take.

---

## 📲 Hosting it on your iPhone (GitHub Pages)

This repo auto-deploys via GitHub Actions. Your live URL is:

### **https://wintrrss1.github.io/LUA-Video-Game-code/**

- First deploy can take 1–3 minutes to go live; refresh if you briefly see a blank/404.
- In Safari, open the link, then **Share → Add to Home Screen** to install it like a real app.
- Every push to the branch redeploys automatically (workflow in `.github/workflows/pages.yml`).

---

## 💸 Costs & notes
- **ElevenLabs Music is paid** — each generation (and each regenerate) uses credits from your account.
- Generation runs on ElevenLabs' servers and takes ~20–60s; the app shows a live timer.
- Your API key / Worker URL are stored **only on your device** (and, for the key in Proxy mode, on your own Cloudflare Worker). Nothing sensitive is committed to this repo.
- Prompts are tuned for the rage/opium/underground-trap sound. Edit the text box for any style.

---

## 🛠️ Files
| File | What it is |
|---|---|
| `index.html` | RAGE AI beat generator (front-end) |
| `worker.js` | Cloudflare Worker proxy for the ElevenLabs Music API |
| `PROXY_SETUP.md` | Step-by-step key + Worker setup |
| `studio.html` | Free offline synthesized beat maker |
| `manifest.webmanifest`, `sw.js`, `icon*` | PWA install + offline shell |
| `cfb27/` | CFB 27 Play Caller — call sheet + opening script generator ([details](./cfb27/README.md)) |
| `.github/workflows/pages.yml` | Auto-deploy to GitHub Pages |

Turn it up. 🔊
