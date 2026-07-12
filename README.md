# 🔥 RAGE — Underground Beat Maker

A complete, **install-free** beat maker for making dark underground rap / rage / opium-type beats
in the vein of **Ken Carson, Vax, Playboi Carti, Destroy Lonely** and that whole sound — right in
your iPhone browser. No account, no samples to download, works **fully offline**.

Everything is synthesized live with the **Web Audio API**: distorted 808s with glide, punchy kicks,
claps/snares, fast trap hats with rolls, detuned reverb-drenched synth leads, and a one-tap
**beat generator** that writes a full rage-style pattern in a dark minor/phrygian key.

---

## 📲 How to use it on your iPhone

You have two easy options.

### Option A — GitHub Pages (recommended, gives you a real link)
1. On GitHub, go to this repo's **Settings → Pages**.
2. Under **Build and deployment → Source**, pick **Deploy from a branch**.
3. Choose branch **`claude/rap-beat-generator-app-d143vh`** (or `main` after you merge) and folder **`/ (root)`**, then **Save**.
4. Wait ~1 minute, then open the URL GitHub gives you (like `https://<you>.github.io/<repo>/`) on your iPhone in **Safari**.
5. Tap the **Share** button → **Add to Home Screen**. Now it launches full-screen like a real app and works offline. 🎉

### Option B — just open the file
Open `index.html` in mobile Safari (e.g. via iCloud Drive / Files) and it runs immediately.
The offline/home-screen install works best when it's served over `https` (Option A).

---

## 🎛️ Controls

| Control | What it does |
|---|---|
| **▶ / ■** | Play / stop the loop |
| **✨ Generate** | Instantly writes a fresh rage-style beat (new drums, 808 line, melody, tempo, key & FX). Tap it until you catch a vibe. |
| **BPM** | Tempo (default 146 — sweet spot for the genre). Or use **TAP** to tap it in. |
| **KEY / SCALE** | Root note + scale. **Phrygian** is the darkest; Minor & Minor-Pentatonic are classic. |
| **SWING** | Adds groove/shuffle to the off-beats. |
| **Clear** | Empties the current pattern. |
| **🔊** | Master mute. |
| **A–H** | 8 pattern slots — build an intro/verse/beat-switch and use **⧉** to copy the current one forward. |

### The step grid
- **Tap a cell** to turn a hit on/off.
- On the **808** and **LEAD** rows, **drag up/down** on a cell to change its note (it stays locked to the current scale, so it always sounds right).
- **M** = mute a track, **S** = solo it.

### Sound & FX (sliders under the grid)
- **808 Distortion / Sub / Glide** — the core of the rage 808. Crank distortion for that gritty, clipped low end and glide for note-to-note slides.
- **Kick Punch**, **Reverb**, **Lead Echo**, **Lead Detune**, **Master Tone** (global low-pass for that muffled/underwater switch-up).

---

## 🎧 Tips for the sound
- Use **headphones** — the 808 sub and reverb tails don't come through phone speakers.
- Hit **Generate** a few times, then hand-tweak: nudge the 808 distortion up, pull the **Master Tone** down for the intro and open it up on the drop.
- Long gaps after an 808 note = a longer sliding 808 (it auto-extends into empty steps).
- Chain patterns **A → B** with a snare roll at the end of a bar for beat switches.

---

## 🛠️ Tech
- Single-page app, no build step, no dependencies.
- `index.html` — the whole app (UI + Web Audio engine + generator).
- `manifest.webmanifest`, `sw.js`, `icon*.png/svg` — PWA install + offline support.

Made to run anywhere a browser runs. Turn it up. 🔊
